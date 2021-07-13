//grabbing the DOM elements
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message 
// form control is the parent element of the input
// adding .className overides the current class, make sure to include current class of 'form-control' aswell as new class of 'error'
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error'
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success'
}

// Check Email
function checkEmail (input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid')    
    }
}

//Check Required fields
// loop through array and do the check on each item
//for each is a higher order array method, basically a nicer way to write a for loop specifically for an array
//higher order array methods take in a function
function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

//check input length
function checkLength(input, min, max) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

//check passwords match
function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value ) {
        showError(input2, 'Passwords do not match');
    }
}

//Get Field Name
//return the input id but with the first letter uppercased
function getFieldName (input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event Listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
});









// if (username.value === '') {
//     showError(username, 'Username is required');
// } else {
//     showSuccess(username)
// }

// if (email.value === '') {
//     showError(email, 'Email is required');
// }else if(!isValidEmail(email.value)) {
//     showError(email, 'Email is not valid');
// } else {
//     showSuccess(email)
// }

// if (password.value === '') {
//     showError(password, 'Password is required');
// } else {
//     showSuccess(password)
// }

// if (password2.value === '') {
//     showError(password2, 'Password 2 is required');
// } else {
//     showSuccess(password2)
// }