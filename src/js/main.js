// Imoport files 

import '../style/style.scss'

// Project name

document.title = "Pass generator";

// Main code

// Variables

const rangeInput = document.querySelector('#range-input');
const uppercase = document.querySelector('#uppercase');
const lowercase = document.querySelector('#lowercase');
const numbers = document.querySelector('#numbers');
const symbols = document.querySelector('#symbols');
const specialSymbols = document.querySelector('#special-symbols');
const strongPass = document.querySelector('.generator__strong');
const inputValue = document.querySelector('.generator__input');

const clickGenerate = document.querySelectorAll('.generate');
const clickCopy = document.querySelectorAll('.copy');

let range = 4;

// Password generator code

rangeInput.addEventListener('input', (event) => {
    range = event.target.value;
    document.querySelector('#pass-length').textContent = range;
});

function getRandomLetter(uppercase, lowercase) {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let randomIndex = Math.floor(Math.random() * alphabet.length);
    let randomLetter = alphabet[randomIndex];

    if (uppercase && !lowercase) {
        return randomLetter.toUpperCase();
    } else if (!uppercase && lowercase) {
        return randomLetter;
    } else if (!uppercase && !lowercase) {
        return getRandomNumber();
    } else {
        return Math.round(Math.random() * 2) === 2 ? randomLetter.toUpperCase() : randomLetter;
    }
}

function getRandomNumber() {
    let randomNumber = Math.floor(Math.random() * 10);
    return randomNumber;
}

function getRandomSymbol() {
    let symbols = '!@#$%^&*()_+-=[]{}/\;:,.<>?';
    let randomIndex = Math.floor(Math.random() * symbols.length);
    let randomSymbol = symbols[randomIndex];
    return randomSymbol;
}

function isStrongPassword(result) {
    let strength = 0;

    if (result.length >= 8) {
        strength++;
    }

    if (result.length >= 20 && /[^a-zA-Z0-9]/.test(result)) {
        strength++;
    }

    if (/\d/.test(result)) {
        strength++;
    }

    if (/[a-z]/.test(result) && /[A-Z]/.test(result)) {
        strength++;
    }

    if (/[^a-zA-Z0-9]/.test(result)) {
        strength++;
    }

    if (strength >= 4) {
        return "strong";
    } else if (strength >= 2) {
        return "medium";
    } else {
        return "weak";
    }
}

function updatePasswordStrength(result) {
    let strength = isStrongPassword(result);

    if (strength === 'weak') {
        strongPass.style.backgroundColor = 'red';
        strongPass.style.width = '20%';
    } else if (strength === 'medium') {
        strongPass.style.backgroundColor = 'yellow';
        strongPass.style.width = '50%';
    } else {
        strongPass.style.backgroundColor = 'green';
        strongPass.style.width = '100%';
    }
    console.log(strength);
}

function generationCondition(isLetters, isNumbers, isSpecialSymbols, toUpperCase, toLowercase) {
    let result = '';

    for (let i = 0; i < range; i++) {
        let randomType = Math.floor(Math.random() * 3);

        if (isLetters && isNumbers && isSpecialSymbols) {
            if (randomType === 0) {
                result += getRandomNumber();
            } else if (randomType === 1) {
                result += getRandomLetter(toUpperCase, toLowercase);
            } else if (randomType === 2) {
                result += getRandomSymbol();
            }
        } else if (isLetters && !isNumbers && !isSpecialSymbols) {
            result += getRandomLetter(toUpperCase, toLowercase);
        } else if (!isLetters && isNumbers && !isSpecialSymbols) {
            result += getRandomNumber();
        } else if (!isLetters && !isNumbers && isSpecialSymbols) {
            result += getRandomSymbol();
        } else if (isLetters && isNumbers && !isSpecialSymbols) {
            if (randomType === 0) {
                result += getRandomLetter(toUpperCase, toLowercase);
            } else if (randomType === 1) {
                result += getRandomNumber();
            } else {
                i--;
            }
        } else if (!isLetters && isNumbers && isSpecialSymbols) {
            if (randomType === 0) {
                result += getRandomLetter(toUpperCase, toLowercase);
            } else if (randomType === 1) {
                result += getRandomSymbol();
            } else {
                i--;
            }
        } else if (isLetters && !isNumbers && isSpecialSymbols) {
            if (randomType === 0) {
                result += getRandomLetter(toUpperCase, toLowercase);
            } else if (randomType === 1) {
                result += getRandomSymbol();
            } else {
                i--;
            }
        }
    }
    return result;
}

function generatePassword() {
    let isLetters = symbols.checked;
    let isNumbers = numbers.checked;
    let isSpecialSymbols = specialSymbols.checked;
    let toUpperCase = uppercase.checked;
    let toLowercase = lowercase.checked;

    let generatedPass = generationCondition(
        isLetters,
        isNumbers,
        isSpecialSymbols,
        toUpperCase,
        toLowercase
    );

    inputValue.value = generatedPass;
    updatePasswordStrength(generatedPass);
}

clickGenerate.forEach(item => {
    item.addEventListener('click', () => {
        generatePassword();
    });
})

// Copy password to the clipboard

function copyResult() {
    let copyText = inputValue;

    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);

    alert("Copied the text: " + copyText.value);
}

clickCopy.forEach(item => {
    item.addEventListener('click', () => {
        copyResult();
    })
});
