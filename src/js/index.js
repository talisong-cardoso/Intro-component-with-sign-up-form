"use strict";
const form = document.querySelector("#claim-form");
form.addEventListener("submit", handleSubmit);
function handleSubmit(event) {
    event.preventDefault();
    const firstName = form["first-name"];
    const lastName = form["last-name"];
    const email = form["email"];
    const password = form["password"];
    handleFirstName(firstName);
    handleLastName(lastName);
    handleValidEmail(email);
    handlePassword(password);
}
function handleFirstName(input) {
    handleInputs(input, "First Name cannot be empty");
}
function handleLastName(input) {
    handleInputs(input, "Last Name cannot be empty", 2);
}
function handleValidEmail(input) {
    const checkEmail = isValidEmail(input.value);
    if (typeof checkEmail === "string") {
        handleInputs(input, checkEmail);
    }
    else {
        handleInputs(input, checkEmail);
    }
}
function handlePassword(input) {
    handleInputs(input, "Password cannot be empty", 6);
}
/**
 * Altera o DOM entre exibir e esconder um erro informativo ao usuário
 * @param input Elemento input a ser verificado.
 * @param textError  Texto personalizado que será exibido se o input for inválido.
 * @param limitCharacter Limete de caracteres necessários para a validação do input.
 */
function handleInputs(input, textError, limitCharacter = 3) {
    const id = input.id;
    const errorMessage = document.querySelector(`#${id} + p`);
    const iconError = document.querySelector(`#${id} ~ img`);
    const showError = () => {
        const parentElement = input.parentElement;
        const errorMessage = document.createElement("p");
        const iconError = document.createElement("img");
        errorMessage.textContent = textError;
        errorMessage.id = `${id}-error`;
        iconError.src = "./src/assets/images/icon-error.svg";
        iconError.alt = "icon error";
        iconError.classList.add("claim-form__icon-error");
        parentElement.append(errorMessage, iconError);
        input.setAttribute("aria-invalid", "true");
        input.setAttribute("aria-errormessage", `${id}-error`);
    };
    const hiddenError = () => {
        errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.remove();
        iconError === null || iconError === void 0 ? void 0 : iconError.remove();
        input === null || input === void 0 ? void 0 : input.setAttribute("aria-invalid", "false");
        input.removeAttribute("aria-errormessage");
    };
    if (input.id == "email") {
        if (typeof isValidEmail(input.value) == "string") {
            if (!document.querySelector("#email-error")) {
                showError();
            }
        }
        else {
            console.log("else do email");
            hiddenError();
        }
    }
    else {
        if (!input.value || input.value.length < limitCharacter) {
            if (!errorMessage) {
                showError();
            }
        }
        else {
            hiddenError();
        }
    }
}
function isValidEmail(email) {
    return !email
        ? "Email cannot be empty"
        : !testEmail(email)
            ? "Looks like this is not an email"
            : true;
}
/**
 * Retorna um valor Boolean se uma string corresponde ao padrão de um email ou não. `(regex feita por mim, qualquer falha de verificação reporte.)`.
 * @param email Uma string qualquer que será analisado se é um email.
 */
function testEmail(email) {
    const regEx = /^\w(\w\.?)+\w+@\w+(\.\w+)*(\w?)$/;
    return regEx.test(email);
}
