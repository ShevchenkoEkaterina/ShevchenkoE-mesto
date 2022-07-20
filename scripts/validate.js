function sendForm (e) {
  e.preventDefault();

  const form = e.target;
  form.checkValidity()
}

function handleInputForm(e) {
  const currentForm = e.currentTarget;

  validateForm(currentForm);
  validateInput(e.target);
};

function validateForm(form) {
  const inputText = document.querySelector('.input__text');
  const inputSaveButton = document.querySelector('.input__save-button')

    if (form.checkValidity()) {
      inputSaveButton.removeAttribute('disabled');
      inputSaveButton.classList.remove('input__save-button_disabled');
      inputText.classList.remove('input__text_type_error');
    } else {
      inputSaveButton.setAttribute('disabled', true);
      inputSaveButton.classList.add('input__save-button_disabled');
      inputText.classList.add('input__text_type_error');
    }
};

function validateInput(input) {
  const errorElement = input.parentNode.querySelector(`#${input.id}-error`);
  errorElement.textContent = input.validationMessage;
};

validateForm(document.querySelector('.input_edit'))
document.querySelector('.input_edit').addEventListener('submit', sendForm);
document.querySelector('.input_edit').addEventListener('input', handleInputForm);

validateForm(document.querySelector('.input_add'))
document.querySelector('.input_add').addEventListener('submit', sendForm);
document.querySelector('.input_add').addEventListener('input', handleInputForm);