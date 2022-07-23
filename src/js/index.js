"use strict";
const form = document.querySelector("#claim-form");
form.addEventListener("submit", handleSubmit);
function handleSubmit(event) {
    event.preventDefault();
    const firstName = form["first-name"];
    const lastName = form["last-name"];
    const email = form["email"];
    const password = form["password"];
    handleValidEmail(email);
    // const paragEmailError = email.nextElementSibling as HTMLParagraphElement;
}
function handleValidEmail(email) {
    const checkEmail = isValidEmail(email.value);
    const parentLabel = email.parentElement;
    if (typeof checkEmail !== "string") {
        const errorMessage = parentLabel.children[1];
        const elemImg = parentLabel.children[2];
        errorMessage.setAttribute("hidden", "");
        elemImg.style.display = "none";
    }
    else {
        const errorMessage = document.createElement("p");
        const img = document.createElement("img");
        errorMessage.textContent = checkEmail;
        img.src = "./src/assets/images/icon-error.svg";
        img.classList.add("claim-form__icon-error");
        img.style.display = "block";
        if (parentLabel.childElementCount <= 1) {
            email.insertAdjacentElement("afterend", errorMessage);
        }
        if (parentLabel.childElementCount <= 2) {
            errorMessage.insertAdjacentElement("afterend", img);
        }
    }
}
function isValidEmail(email) {
    return !email
        ? "Field is empty"
        : !testEmail(email)
            ? "Looks like this is not an email"
            : true;
}
function testEmail(email) {
    const regEx = /^\w(\w\.?)+\w+@\w+(\.\w+)*(\w?)$/;
    return regEx.test(email);
}
