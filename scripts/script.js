let form = document.querySelector("form");
let username = document.getElementsByName("username");
let age = document.getElementsByName("age");
let email = document.getElementsByName("email");
let pw = document.getElementsByName("password");
let confirm = document.getElementById("Confirm");

function handleSubmit(e) {
  e.preventDefault();

  if (pw[0].value !== confirm.value) {
    alert("passwords dont match");
    return;
  }

  const regexStr = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/; // At least one letter, one number, and one special character

  if (!regexStr.test(pw[0].value)) {
    alert("Password needs number and symbol!");
    return
  }
  alert("Submitted");
}

form.addEventListener("submit", handleSubmit);

function validate(e) {
  let usrValid = validUsername();

  if (usrValid === false) {
    e.returnValue = false;
    return false;
  }

  let ageValid = validAge();
}