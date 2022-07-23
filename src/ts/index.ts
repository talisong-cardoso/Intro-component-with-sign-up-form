const form = document.querySelector("#claim-form") as HTMLFormElement;

form.addEventListener("submit", handleSubmit);

function handleSubmit(event: Event) {
  event.preventDefault();
  const firstName = form["first-name"] as HTMLInputElement;
  const lastName = form["last-name"] as HTMLInputElement;
  const email = form["email"] as HTMLInputElement;
  const password = form["password"] as HTMLInputElement;

  handleValidEmail(email);
}

function handleValidEmail(email: HTMLInputElement) {
  const checkEmail = isValidEmail(email.value);
  const parentLabel = email.parentElement as HTMLLabelElement;

  if (typeof checkEmail !== "string") {
    const errorMessage = parentLabel.children[1] as HTMLParagraphElement;
    const elemImg = parentLabel.children[2] as HTMLImageElement;

    errorMessage.setAttribute("hidden", "");
    elemImg.style.display = "none";
  } else {
    const errorMessage = document.createElement("p");
    const img = document.createElement("img");

    errorMessage.textContent = checkEmail;
    if (parentLabel.childElementCount <= 1) {
      email.insertAdjacentElement("afterend", errorMessage);
    }

    img.src = "./src/assets/images/icon-error.svg";
    img.classList.add("claim-form__icon-error");
    img.style.display = "block";
    if (parentLabel.childElementCount <= 2) {
      errorMessage.insertAdjacentElement("afterend", img);
    }
  }
}

function isValidEmail(email: string) {
  return !email
    ? "Field is empty"
    : !testEmail(email)
      ? "Looks like this is not an email"
      : true;
}

function testEmail(email: string) {
  const regEx = /^\w(\w\.?)+\w+@\w+(\.\w+)*(\w?)$/;
  return regEx.test(email);
}
