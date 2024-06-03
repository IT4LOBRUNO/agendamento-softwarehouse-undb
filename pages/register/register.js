/*firebase.auth().onAuthStateChanged(user => {
    if (user) {
        
    }
})*/

function loginScreen(){
    window.location.href = "../../index.html";
}

function onChangeEmail() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";
    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
    toggleRegisterButtonDisable();
}

function onChangeName() {
    const name = form.name().value;
    form.nameRequiredError().style.display = name ? "none" : "block";
    toggleRegisterButtonDisable();
}

function onChangePassword() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";
    form.passwordMinLengthError().style.display = password.length >= 6 ? "none" : "block";
    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}

function onChangeConfirmPassword() {
    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}

function register() {
    showLoading();

    const name = form.name().value;
    const email = form.email().value;
    const password = form.password().value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            return saveUserName(user.uid, name);
        })
        .then(() => {
            //Teste dia 17/05/2024 Se der ruim, apagar a função firebase signOut() + catch;

            //****** */
            firebase.auth().signOut().then(() => {
                window.location.href = "../../index.html";
            }).catch(() => {
                alert('Erro ao fazer logout');
            });
            //***** */

            hideLoading();
            window.location.href = "../../index.html";
        })
        .catch(error => {
            hideLoading();
            alert(getErrorMessage(error));
        });
}

function saveUserName(uid, name) {
    return firebase.firestore().collection('nomes').doc(uid).set({
        uid: uid,
        name: name
    });
}

function getErrorMessage(error) {
    if (error.code === "auth/email-already-in-use") {
        return "Email já está em uso";
    }
    return error.message;
}

function validatePasswordsMatch() {
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;
    form.confirmPasswordDoesntMatchError().style.display =
        password === confirmPassword ? "none" : "block";
}

function toggleRegisterButtonDisable() {
    form.registerButton().disabled = !isFormValid();
}

function isFormValid() {
    const name = form.name().value;
    if (!name) {
        return false;
    }

    const email = form.email().value;
    if (!email || !validateEmail(email)) {
        return false;
    }

    const password = form.password().value;
    if (!password || password.length < 6) {
        return false;
    }

    const confirmPassword = form.confirmPassword().value;
    if (password !== confirmPassword) {
        return false;
    }

    return true;
}

const form = {
    confirmPassword: () => document.getElementById('confirmPassword'),
    confirmPasswordDoesntMatchError: () => document.getElementById('password-doesnt-match-error'),
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    password: () => document.getElementById('password'),
    passwordMinLengthError: () => document.getElementById('password-min-length-error'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    registerButton: () => document.getElementById('register-button'),
    name: () => document.getElementById('name'),
    nameRequiredError: () => document.getElementById('name-required-error')
}
