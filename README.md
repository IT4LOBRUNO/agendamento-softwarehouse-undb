# Agendamento Softwarehouse
<p>Esse projeto foi criado para solucionar problemas de agendamento da sala da softwarehouse, garantindo a eficiência na marcação de horários e no uso dos espaços disponíveis. Ele visa projetar uma interface intuitiva que permita aos usuários realizar o agendamento da sala de forma segura, além de implementar um sistema de banco de dados para armazenar informações sobre horários de reserva e usuários. Utiliza Javascript, HTML, CSS e um banco de dados no Firebase para uma autenticação segura de usuários e armazenamento das informações de agendamento. Esta solução proporciona uma maneira eficaz e conveniente de gerenciar o agendamento das salas, promovendo uma melhor utilização dos recursos disponíveis.</p>

## **Recursos:**

- [x] Criação de usuários
- [x] Sistema de autenticação de usuários
- [x] Recuperação de senhas 
- [x] Agendamento sem conflitos
- [x] Interface intuitiva para agendamento
- [x] Armazenamento seguro de informações no Firebase
- [ ] Envio de email para os convidados

## **Programação Orientada a Objetos (POO)**

- **Abstração**: Várias funções definidas nesse código representam abstrações de diferentes aspectos do sistema, como manipulação de dados do usuário, validação de entrada de dados, manipulação de datas, entre outros.
- **Encapsulamento**: Cada função encapsula sua própria lógica e operações, assim existe uma clara separação de responsabilidades. Por exemplo, há uma função que encapsula a lógica de registro de novos usuários (register()), enquanto outra encapsula a validação da correspondência entre senhas (validatePasswordsMatch()).
- **Herança**: Reutilização de código através da criação de hierarquias de classes, onde as classes filhas herdam características e comportamentos das classes pai.
- **Polimorfismo**: Diferentes tipos de validação e manipulação de dados que podem ser tratados de formas diferentes no código, como validação para criação e login de usuários e validação de dados do banco de dados.
