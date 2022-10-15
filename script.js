let firstNumber = '';
let secondNumber = '';
let operator = '';

let alreadyFloat = false;

let firstNumberUp = '';
let secondNumberUp = '';
let operatorUp = '';
let result = '';

const screenUp = document.getElementById('screen-up');
const screenDown = document.getElementById('screen-down');

const buttonClear = document.getElementById('button-clear');
const buttonDelete = document.getElementById('button-delete');
const buttonPoint = document.getElementById('button-point');
const buttonEqual = document.getElementById('button-equal');
const buttonNumbers = document.querySelectorAll('[data-number]');
const buttonOperators = document.querySelectorAll('[data-operator]')

window.addEventListener('keydown', keyboardInput);

const updateScreenDown = function(){
    screenDown.textContent = firstNumber + " " + operator + " " + secondNumber;

}
const updateScreenUp = function(){
    screenUp.textContent = firstNumberUp + " " + operatorUp + " " + secondNumberUp + " = " + result;
    alreadyFloat = false;
}

let updateResult = function(){
    switch(operator){
        case '+':
            result = parseFloat(firstNumber) + parseFloat(secondNumber);
            break;
        case '-':
            result = parseFloat(firstNumber) - parseFloat(secondNumber);
            break;
        case '/':
            result = parseFloat(firstNumber) / parseFloat(secondNumber);
            break;
        case '*':
            result = parseFloat(firstNumber) * parseFloat(secondNumber);
            break;
    }
    firstNumberUp = firstNumber;
    secondNumberUp = secondNumber;
    operatorUp = operator;
    firstNumber = result;
    secondNumber = '';
    operator = '';
}

updateScreenDown();

buttonNumbers.forEach(button => {
    button.addEventListener('click', e => {
        if(firstNumber !== '' && operator === ''){
            firstNumber = '';
            updateScreenDown();
        }
        secondNumber += e.target.textContent;
        updateScreenDown();
    })
})

buttonOperators.forEach(button => {
    button.addEventListener('click', e => {
        if(firstNumber !== '' && operator === ''){
            operator = e.target.value;
            updateScreenDown();
        }else if(secondNumber === '' && operator === ''){
            firstNumber = '0';
            operator = e.target.value;
            updateScreenDown();
        }else if(secondNumber === '' && operator !== ''){
            operator = e.target.value;
            updateScreenDown();
        }else if(secondNumber !== '' && operator === ''){
            firstNumber = secondNumber;
            secondNumber = '';
            operator = e.target.value;
            updateScreenDown();
        }else if(secondNumber !== '' && operator !== ''){
            updateResult();
            operator = e.target.value;
            updateScreenUp();
            updateScreenDown();
            if(firstNumber === ''){console.error('buttonOperators if statement error [first number is empty]')}
        }else{console.error('buttonOperators if statement error [global error]')}
        alreadyFloat = false;
    })
})

buttonPoint.addEventListener('click', e => {
    if(secondNumber === ''){
        secondNumber = '0' + e.target.textContent;
        alreadyFloat = true;
        updateScreenDown();
    }else if(alreadyFloat === false){
        secondNumber += e.target.textContent;
        alreadyFloat = true
        updateScreenDown();
    }else if(alreadyFloat === true){
        return;
    }
});

buttonEqual.addEventListener('click', e => {
    if(firstNumber === '' && secondNumber === ''){
        result = 0;
        updateScreenUp();
    }else if(secondNumber !== '' && operator === ''){
        secondNumberUp = secondNumber;
        result = secondNumber;
        updateScreenUp();
    }else if(operator !== '' && secondNumber === ''){
        secondNumber = 0;
        updateResult();
        updateScreenUp();
        updateScreenDown();
    }else if(operator !== '' && secondNumber !== ''){
        updateResult();
        updateScreenUp();
        updateScreenDown();
    }
})

buttonClear.addEventListener('click', e => {
    screenUp.textContent = '';
    screenDown.textContent = '';
    
    firstNumber = '';
    secondNumber = '';
    operator = '';
    
    alreadyFloat = false;
    
    firstNumberUp = '';
    secondNumberUp = '';
    operatorUp = '';
    result = '';
})

const removeLastChar = function(number){
    let numberString = number.toString()
    if(numberString.length > 1){
        numberString = numberString.slice(0, -1);
        number = numberString;    
    }else{
        number = '';
    }
    return number;
}

buttonDelete.addEventListener('click', e => {
    if(secondNumber === '' && operator === '' && firstNumber === ''){
        return;
    }else if(secondNumber === '' && operator === '' && firstNumber !== ''){
        if(firstNumber == result){
            firstNumber = '';
        }
        firstNumber = removeLastChar(firstNumber);
        updateScreenDown();
    }else if(secondNumber === '' && operator !== ''){
        operator = '';
        updateScreenDown();
    }else if(secondNumber !== ''){
        secondNumber = removeLastChar(secondNumber);
        updateScreenDown();
    }
})

function keyboardInput(e){
    let buttonId;
    if(e.key >= 0 && e.key <= 9 ||
        e.key == '+' ||
        e.key == '-' ||
        e.key == '*' ||
        e.key == '/'){
        buttonId = 'button-' + e.key;
    }else if(e.key == 'Enter'|| e.key == '='){
        buttonId = 'button-equal';
    }else if(e.key == '.' || e.key == ','){
        buttonId = 'button-point';
    }else if(e.key == 'Backspace'){
        buttonId = 'button-delete';
    }else if(e.key == 'Delete'){
        buttonId = 'button-clear';
    }
    document.getElementById(buttonId).click();
    buttonId = '';
}