function sendInvitationEmail(email, name, accessKey) {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('name', name);
    formData.append('accessKey', accessKey);
    formData.append('message', 'Convite para reunião');
    formData.append('subject', 'Convite para reunião');
    formData.append('honeypot', ''); // Campo de armadilha de spam

    fetch('https://api.staticforms.xyz/submit', {
        method: 'post',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            console.log(`Convite enviado para: ${email}`);
        } else {
            console.error('Erro ao enviar convite:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Erro ao enviar convite:', error);
    });
}

// Chamada de exemplo
const email = 'italos125@gmail.com';
const nome = 'Usuário';
const accessKey = 'ec54e720-f695-40b2-a1d1-a95d0bf8d4b1';

sendInvitationEmail(email, nome, accessKey);
