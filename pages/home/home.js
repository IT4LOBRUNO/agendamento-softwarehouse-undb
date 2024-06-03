function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../../index.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    });
}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        findSchedule(user);
    }
});

function newSchedule() {
    window.location.href = "../agenda/agenda.html";
}

function findSchedule(user) {
    showLoading();
    firebase.firestore()
        .collection('schedules')
        .get()
        .then(snapshot => {
            hideLoading();
            const schedules = snapshot.docs.map(doc => doc.data());
            addScheduleToScreen(schedules);
        })
        .catch(error => {
            hideLoading();
            console.log(error);
            alert('Erro ao recuperar horários');
        });
}

function addScheduleToScreen(schedules) {
    const orderedList = document.getElementById('schedules');
    orderedList.innerHTML = '';

    schedules.forEach(schedule => {

        
        const li = document.createElement('li');
        li.classList.add(schedule.type);

        const date = document.createElement('p');
        date.innerHTML = `Entrada: ${formatDate(schedule.dateTime)}`;
        li.appendChild(date);

        if (schedule.endDateTime) {
            const endDateTime = document.createElement('p');
            endDateTime.innerHTML = `Saída: ${formatDate(schedule.endDateTime)}`;
            li.appendChild(endDateTime);
        }

        const type = document.createElement('p');
        type.innerHTML = `Agendado para: ${schedule.scheduleType}`;
        li.appendChild(type);

        const user = document.createElement('p');
        user.innerHTML = `Usuário: ${schedule.user.name}`;
        li.appendChild(user);

        if (schedule.description) {
            const description = document.createElement('p');
            description.innerHTML = `Motivo: ${schedule.description}`;
            li.appendChild(description);
        }

        orderedList.appendChild(li);
    });
}

function formatDate(dateTime) {
    const date = new Date(dateTime);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleString('pt-BR', options);
}
