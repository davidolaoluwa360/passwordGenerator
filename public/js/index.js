"use strict";

//* Selecting Elements
const switchThumb = document.querySelectorAll(".ps-toggle-wrapper");
const psLengthInput = document.querySelector(".ps-range-input");
const psLengthOutput = document.querySelector(".range-output");
const generatePasswordBtn = document.querySelector(".ps-btn");
const displayPassword = document.querySelector(".ps-display-left");
const copyToClipboardBtn = document.querySelector(".ps-copy");

//* password generator data
const passwordStrength = {
  passwordLength: 12,
  hasNumber: false,
  hasLetter: true,
  hasSymbols: false,
};

//* function that set the passwordStrength value when clicked
const setSwitchValue = function () {
  const isNumberOpen = switchThumb[0].classList.contains("open");
  const isLetterOpen = switchThumb[1].classList.contains("open");
  const isSymbolOpen = switchThumb[2].classList.contains("open");

  passwordStrength.hasNumber = isNumberOpen;
  passwordStrength.hasLetter = isLetterOpen;
  passwordStrength.hasSymbols = isSymbolOpen;
};

//* function that toggle settings switch
const toggleSwitch = function (switchContainer) {
  switchContainer.classList.toggle("open");
};

//* function that generate password
const generatePassword = function () {
  //* convert the password length to a number
  const length = Number(passwordStrength.passwordLength);

  //* possible password number
  const numbers = "0123456789";

  //* possible password letters
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase();

  //* possible symbols
  const symbols = "!@#$%^&*";

  //* possible password
  let possiblePassword = "";

  //* random possible
  let password = "";

  if (passwordStrength.hasLetter) {
    possiblePassword = possiblePassword.concat(letters);
  }

  if (passwordStrength.hasNumber) {
    possiblePassword = possiblePassword.concat(numbers);
  }

  if (passwordStrength.hasSymbols) {
    possiblePassword = possiblePassword.concat(symbols);
  }

  for (let i = 0; i < length; i++) {
    const randomChar = Math.trunc(Math.random() * possiblePassword.length);
    password += possiblePassword[randomChar];
  }

  displayPassword.textContent = password;
};

//* Add Event Listener call
//* 1: an event listener that is been called when the switch is clicked
for (let index = 0; index < switchThumb.length; index++) {
  switchThumb[index].addEventListener("click", function () {
    toggleSwitch(this);
    setSwitchValue();
  });
}

//* 2: an event listener that set the input output range in the DOM and also set the password strength property when changes is detected
psLengthInput.addEventListener("input", function () {
  psLengthOutput.textContent = this.value;
  passwordStrength.passwordLength = this.value;
});

//* 3: an event listener that listen to click event on the generate password button and then generate the password;
generatePasswordBtn.addEventListener("click", generatePassword);

//* 4: an event listener that listen to the click event and add the generated password to the clipboard
copyToClipboardBtn.addEventListener("click", function () {
  navigator.permissions
    .query({ name: "clipboard-write" })
    .then((result) => {
      if (result.state == "granted" || result.state == "prompt") {
        navigator.clipboard
          .writeText(displayPassword.textContent)
          .then((result) => {
            alert("password successfully copied to the clipboard");
          })
          .catch((err) => {
            console.log("An error occure, please try again");
          });
      } else {
        alert("Your browser does not support clipboard access...\u{1F606}");
      }
    })
    .catch((e) => {
      alert("Permission Fail: Your browser do not support copying");
    });
});

//* end of event listener

//*  generate password once the DOM is loaded
generatePassword();
