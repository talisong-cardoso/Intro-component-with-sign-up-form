const form = document.querySelector("#claim-form") as HTMLFormElement;

form.addEventListener("submit", handleSubmit);

function handleSubmit(event: Event) {
  event.preventDefault();
  const firstName = form["first-name"] as HTMLInputElement;
  const lastName = form["last-name"] as HTMLInputElement;
  const email = form["email"] as HTMLInputElement;
  const password = form["password"] as HTMLInputElement;

  handleFirstName(firstName);
  handleLastName(lastName);
  handleValidEmail(email);
  handlePassword(password);
}

function handleFirstName(input: HTMLInputElement): void {
  handleInputs(input, "First Name cannot be empty");
}

function handleLastName(input: HTMLInputElement): void {
  handleInputs(input, "Last Name cannot be empty", 2);
}

function handleValidEmail(input: HTMLInputElement) {
  const checkEmail = isValidEmail(input.value);
  if (typeof checkEmail === "string") {
    handleInputs(input, checkEmail);
  } else {
    handleInputs(input, checkEmail);
  }
}

function handlePassword(input: HTMLInputElement) {
  handleInputs(input, "Password cannot be empty", 6);
}
/**
 * Altera o DOM entre exibir e esconder um erro informativo ao usuário
 * @param input Elemento input a ser verificado.
 * @param textError  Texto personalizado que será exibido se o input for inválido.
 * @param limitCharacter Limete de caracteres necessários para a validação do input.
 */
function handleInputs(
  input: HTMLInputElement,
  textError: string | boolean,
  limitCharacter: number = 3
) {
  const id = input.id;
  const errorMessage = document.querySelector(
    `#${id} + p`
  ) as HTMLParagraphElement;
  const iconError = document.querySelector(`#${id} ~ img`) as HTMLImageElement;

  const showError = () => {
    const parentElement = input.parentElement as HTMLLabelElement;
    const errorMessage = document.createElement("p");
    const iconError = document.createElement("img");
    errorMessage.textContent = textError as string;
    errorMessage.id = `${id}-error`;
    iconError.src = "./src/assets/images/icon-error.svg";
    iconError.alt = "icon error";
    iconError.classList.add("claim-form__icon-error");
    parentElement.append(errorMessage, iconError);
    input.setAttribute("aria-invalid", "true");
    input.setAttribute("aria-errormessage", `${id}-error`);
  };

  const hiddenError = () => {
    errorMessage?.remove();
    iconError?.remove();
    input?.setAttribute("aria-invalid", "false");
    input.removeAttribute("aria-errormessage");
  };

  if (input.id == "email") {
    if (typeof isValidEmail(input.value) == "string") {
      if (!document.querySelector("#email-error")) {
        showError();
      }
    } else {
      console.log("else do email");
      hiddenError();
    }
  } else {
    if (!input.value || input.value.length < limitCharacter) {
      if (!errorMessage) {
        showError();
      }
    } else {
      hiddenError();
    }
  }
}

function isValidEmail(email: string): string | boolean {
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
function testEmail(email: string): boolean {
  const regEx = /^\w(\w\.?)+\w+@\w+(\.\w+)*(\w?)$/;
  return regEx.test(email);
}
