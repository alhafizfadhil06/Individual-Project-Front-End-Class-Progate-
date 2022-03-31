const calculatorScreen = document.querySelector('.calculator-screen');
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equalSign = document.querySelector('.equal-sign');
const clearBtn = document.querySelector('.all-clear');
const decimal = document.querySelector('.decimal');
const percentage = document.querySelector('.percentage');

let prevNumber = '';
let calculationOperator = '';
let currentNumber = '0';
let equalSignClicked = '0';         //untuk flag atau state apakah user menekan (=), '1' = true, '0' = false;
let minusNumber = '0';              //untuk flag atau state apakah user menginput operator (-) setelah (*) atau (/), '1' = true, '0' = false;

const updateScreen = (number) => {
    calculatorScreen.value = number;
};

const inputNumber = (number) => {
    if(minusNumber === '1'){
        number *= -1;
        minusNumber = '0';
    }

    if(calculationOperator === '' && equalSignClicked === '1'){  //Jika user menginput angka baru setelah menekan (=) tanpa menekan operator terlebih dahulu, maka result yang ditampilkan akan direset dengan angka yang baru diinput
        currentNumber = number;
        equalSignClicked = '0';
        return;
    }

    if(currentNumber === '0'){
        currentNumber = number;
    }else{
        currentNumber += number;
    }
};

const inputOperator = (operator) => {
    if(calculationOperator === '' ){
        prevNumber = currentNumber;
        calculationOperator = operator;
        currentNumber = '';
    }

    if(calculationOperator !== '' && currentNumber !== ''){              //Untuk input lebih dari 2 kali, misal: 2+3+4+5....
        calculate();
        prevNumber = currentNumber;
        updateScreen(currentNumber);
        calculationOperator = operator;
        currentNumber = '';
    }

    if((calculationOperator === '*' || calculationOperator === '/') && operator === '-' && currentNumber === ''){
        minusNumber = '1';
    }    
}

const calculate = () => {
    let result = '';
    
    switch(calculationOperator){
        case "+":
            result = parseFloat(prevNumber) + parseFloat(currentNumber);
            break;
        case "-":
            result = prevNumber - currentNumber;
            break;
        case "*":
            result = prevNumber * currentNumber;
            break;
        case "/":
            result = prevNumber / currentNumber;
            break;
        default:
            break;
    }
    currentNumber = result;
    calculationOperator = '';
}

const clearAll = () => {
    prevNumber = '';
    calculationOperator = '';
    currentNumber = '';
    equalSignClicked = '0';
    minusNumber = '0';
}

const inputDecimal = (dot) => {
    if(currentNumber.includes('.')){
        return;
    }
    currentNumber += dot;
}

const inputPercentage = () => {
    currentNumber = currentNumber / '100';      //Untuk nilai persen dari suatu angka
}

numbers.forEach((number)=>{
    number.addEventListener("click", (event)=>{
        inputNumber(event.target.value);
        updateScreen(currentNumber);
    });
});

operators.forEach((operator) => {
    operator.addEventListener("click", (event) => {
        inputOperator(event.target.value);
    });
});

equalSign.addEventListener("click", (event) => {
    calculate();
    equalSignClicked = '1';
    updateScreen(currentNumber);
})

clearBtn.addEventListener("click", (event) =>{
    clearAll();
    updateScreen(currentNumber);
})

decimal.addEventListener("click", (event) => {
    inputDecimal(event.target.value);
    updateScreen(currentNumber);
})

percentage.addEventListener("click", (event) => {
    inputPercentage();
    updateScreen(currentNumber);
})