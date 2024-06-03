document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obter os valores do formulário
    var formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        accessKey: 'd3c4ac8a-9e8d-49ce-a68b-b16be633dd08'
    };

    // Configurar a requisição
    fetch('https://api.staticforms.xyz/submit', { // Substitua por sua URL de API
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Mensagem enviada com sucesso!');
        } else {
            alert('Erro ao enviar mensagem: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Erro ao enviar o formulário:', error);
        alert('Erro ao enviar o formulário.');
    });
});
