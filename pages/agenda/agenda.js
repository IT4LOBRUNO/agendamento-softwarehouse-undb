function sendEmail(formData) {
    return fetch('https://api.staticforms.xyz/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json());
}

function saveSchedule() {
    showLoading();

    const user = firebase.auth().currentUser;
    if (!user) {
        hideLoading();
        alert('Usuário não autenticado');
        return;
    }

    const uid = user.uid;

    getUserName(uid)
        .then(userName => {
            const schedule = createSchedule(userName);

            return checkScheduleConflict(schedule)
                .then(() => {
                    return firebase.firestore().collection('schedules').add(schedule);
                })
                .then(() => {
                    const formData = {
                        message: `Você foi convidado para uma reunião na data ${formatDate(form.date().value)} às ${form.time().value} com a finalidade de ${form.scheduleType().value}. Descrição: ${form.description().value}`,
                        accessKey: 'ec54e720-f695-40b2-a1d1-a95d0bf8d4b1',
                        email: form.email().value
                    };
                    return sendEmail(formData);
                })
                .then(data => {
                    hideLoading();
                    if (data.success) {
                        alert('Mensagem enviada com sucesso!');
                    } else {
                        alert('Erro ao enviar mensagem: ' + data.message);
                    }
                    window.location.href = "../home/home.html";
                });
        })
        .catch(error => {
            hideLoading();
            alert('Erro ao salvar horário ou enviar email: ' + error.message);
        });
}

function checkScheduleConflict(newSchedule) {
    const date = newSchedule.dateTime.split('T')[0];
    const startTime = newSchedule.dateTime.split('T')[1];
    const endTime = newSchedule.endDateTime.split('T')[1];
    
    return firebase.firestore().collection('schedules')
        .where('dateTime', '>=', `${date}T${startTime}`)
        .where('dateTime', '<', `${date}T${endTime}`)
        .get()
        .then(querySnapshot => {
            if (!querySnapshot.empty) {
                throw new Error('Conflito de horários. Por favor, selecione outro horário.');
            }
        });
}

function cancelSchedule() {
    window.location.href = "../home/home.html";
}

function createSchedule(userName) {
    const date = form.date().value;
    const time = form.time().value;
    const endTime = form.endTime().value;
    return {
        dateTime: `${date}T${time}`,
        endDateTime: `${date}T${endTime}`,
        scheduleType: form.scheduleType().value,
        description: form.description().value,
        user: {
            name: userName
        }
    };
}

function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
}

function getUserName(uid) {
    return firebase.firestore().collection('nomes').doc(uid).get()
        .then(doc => {
            if (doc.exists) {
                return doc.data().name;
            } else {
                throw new Error('Nome do usuário não encontrado');
            }
        });
}

function onChangeDate() {
    const date = form.date().value;
    form.dateRequiredError().style.display = !date ? "block" : "none";

    toggleSaveButtonDisable();
}

function onChangeTime() {
    const time = form.time().value;
    const isValidTime = time >= '08:00' && time <= '21:00';
    form.timeRequiredError().style.display = !isValidTime ? "block" : "none";
    form.timeRequiredError().textContent = !isValidTime 
        ? "Horário de entrada deve ser entre 08:00 e 21:00" 
        : "Hora é obrigatória/inválida";

    onChangeEndTime();

    toggleSaveButtonDisable();
}

function onChangeEndTime() {
    const endTime = form.endTime().value;
    const time = form.time().value;
    const isEndTimeValid = endTime && endTime > time && endTime >= '08:01' && endTime <= '22:00';
    
    form.endTimeRequiredError().style.display = !isEndTimeValid ? "block" : "none";
    form.endTimeRequiredError().textContent = !isEndTimeValid
        ? (endTime <= time ? "Hora de saída deve ser maior que a hora de entrada" : "Horário de saída deve ser entre 08:01 e 22:00")
        : "Hora de saída é obrigatória/inválida";
    
    toggleSaveButtonDisable();
}

function onChangeScheduleType() {
    const scheduleType = form.scheduleType().value;
    form.scheduleTypeRequiredError().style.display = !scheduleType ? "block" : "none";

    toggleSaveButtonDisable();
}

function toggleSaveButtonDisable() {
    form.saveButton().disabled = !isFormValid();
}

function isFormValid() {
    const date = form.date().value;
    if (!date) {
        return false;
    }

    const time = form.time().value;
    if (!time || time < '08:00' || time > '21:00') {
        return false;
    }

    const endTime = form.endTime().value;
    if (!endTime || endTime <= time || endTime < '08:01' || endTime > '22:00') {
        return false;
    }

    const scheduleType = form.scheduleType().value;
    if (!scheduleType) {
        return false;
    }

    return true;
}

const form = {
    date: () => document.getElementById('date'),
    email: () => document.getElementById('emails'),
    time: () => document.getElementById('time'),
    endTime: () => document.getElementById('end-time'),
    description: () => document.getElementById('description'),
    dateRequiredError: () => document.getElementById('date-required-error'),
    timeRequiredError: () => document.getElementById('time-required-error'),
    endTimeRequiredError: () => document.getElementById('end-time-required-error'),
    saveButton: () => document.getElementById('save-button'),
    scheduleType: () => document.getElementById('schedule-type'),
    scheduleTypeRequiredError: () => document.getElementById('schedule-type-required-error')
};
