let numbers = [];
const blockNumbers = document.getElementById("mcd_mcm__numbers");
const inputNumber = document.getElementById("mcd_mcm__input");
const btnAddNumber = document.getElementById("mcd_mcm__btn-add");
const btnCalculate = document.getElementById("mcd_mcm__btn-result");
const mcdResult = document.getElementById("result__text-mcd");
const mcmResult = document.getElementById("result__text-mcm");

let calculated = false;

btnAddNumber.addEventListener("click", () => {
  if (inputNumber.value) addNumber(inputNumber.value);
});

inputNumber.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && inputNumber.value) addNumber(inputNumber.value);
});

btnCalculate.addEventListener("click", () => {
  calculated ? cleanAll() : calculate();
});

function addNumber(number) {
  numbers.push(number);
  const span = document.createElement("span");
  span.textContent = number;
  blockNumbers.appendChild(span);
  inputNumber.value = null;
}

function calculate_mcd(numbers) {
  while (numbers.length > 1) {
    numbers = ordenar(numbers);
    let a = numbers[0];
    let b = numbers[1];
    let c = a % b;
    numbers = numbers.slice(1, numbers.length);
    if (!numbers.includes(c) && c != 0) numbers.push(c);
  }
  return numbers[0];
}
function calculate_mcm(numbers) {
  while (numbers.length > 1) {
    let pair = [numbers[0], numbers[1]];
    let forPushing = (pair[0] * pair[1]) / calculate_mcd(pair);
    numbers.push(forPushing);
    numbers = numbers.slice(2, numbers.length);
  }
  return numbers[0];
}

function ordenar(numbers) {
  return numbers.sort((a, b) => b - a);
}

function calculate() {
  if (numbers.length == 0) return;
  mcdResult.textContent = calculate_mcd(numbers);
  mcdResult.parentElement.classList.add("result__mcd--show");
  mcmResult.textContent = calculate_mcm(numbers);
  mcmResult.parentElement.classList.add("result__mcm--show");
  btnAddNumber.classList.add("disabled");
  inputNumber.classList.add("disabled");
  inputNumber.value = "";
  btnCalculate.textContent = "Empezar de nuevo";

  calculated = true;
}

function cleanAll() {
  blockNumbers.innerHTML = "";
  numbers = [];
  mcdResult.parentElement.classList.remove("result__mcd--show");
  mcmResult.parentElement.classList.remove("result__mcm--show");
  btnAddNumber.classList.remove("disabled");
  inputNumber.classList.remove("disabled");
  btnCalculate.textContent = "Calcular";
  calculated = false;
}
// start();
