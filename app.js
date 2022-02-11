const numBtns = document.querySelectorAll("[data-num]");
// operators /, *, -, +, %, and = ;
const operators = document.querySelectorAll("[data-operator]");
const clrBtns = document.querySelectorAll("[data-clr]");

const dTop = document.querySelector(".display-top");
const dBottom = document.querySelector(".display-bottom");

let state = {
  complete: 0,
};

let input = ""; //its set to '' to avoid 0 in the beginning
let periodCount = 0;
numBtns.forEach((numBtn) => {
  numBtn.addEventListener("click", (e) => {
    const targtNum = e.target.textContent;

    if (dBottom.textContent == "0" && targtNum == "0") return;
    if (targtNum == "." && periodCount > 0) return;
    if (targtNum == ".") periodCount++;
    if (dBottom.textContent == "0" && targtNum == ".") {
      input = "0";
    }
    input = input + targtNum;
    dBottom.textContent = input;
  });
});

const delBtn = document.querySelector("[data-del]");

delBtn.addEventListener("click", () => {
  if (leftOperand && !input) return;
  if (input.slice(-1) == ".") {
    periodCount = 0;
  }
  if (input.length <= 1) {
    dBottom.textContent = "0";
    //setting dBottomNum to '' to avoid concatening 0 in the beginning while adding new nums;
    input = "";
    return;
  }
  input = input.slice(0, -1);
  dBottom.textContent = input;
});

let [CEbtn, Cbtn] = [...clrBtns];

Cbtn.addEventListener("click", (e) => {
  clrAll();
});

CEbtn.addEventListener("click", (e) => {
  if (state.complete == 1) {
    clrAll();
    return;
  }
  input = "";
  dBottom.textContent = "0";
});

// operator portion
let leftOperand, rightOperand, operator;

operators.forEach((item) => {
  item.addEventListener("click", (e) => {
    let newNum = Number(input);
    if (!newNum) {
      if (leftOperand == null) return;
      operator = e.target.textContent[1];
      dTop.textContent = leftOperand + e.target.textContent;
      // updateTopDisplay(leftOperand, operator);
      return;
    }
    console.log(operator);
    console.log(newNum);
    if (leftOperand && !rightOperand) {
      rightOperand = newNum;
      leftOperand = calculate(leftOperand, operator, rightOperand);
      rightOperand = null;
      dBottom.textContent = leftOperand;
      dTop.textContent = leftOperand + e.target.textContent;
      input = "";
      state.complete = 1;
      return;
    }
    operator = e.target.textContent[1];
    leftOperand = newNum;

    updateTopDisplay(input, e.target.textContent[1]);
    state.complete = 0;
  });
});

function clrAll() {
  leftOperand = null;
  rightOperand = null;
  updateDisplays(leftOperand, null);
}

function calculate(leftOperand, operator, rightOperand) {
  switch (operator) {
    case "*":
      return leftOperand * rightOperand;
    case "+":
      return leftOperand + rightOperand;
    case "-":
      return leftOperand - rightOperand;
    case "+":
      return leftOperand + rightOperand;
    case "/":
      return leftOperand / rightOperand;
  }
}

const equals = document.querySelector("[data-equals]");

equals.addEventListener("click", (e) => {
  if (!leftOperand) return;
  rightOperand = Number(input);
  leftOperand = calculate(leftOperand, operator, rightOperand);
  rightOperand = null;
  state.complete = 1;
  updateDisplays(leftOperand, operator);
});

function updateDisplays(leftOperand, operator) {
  dTop.textContent = leftOperand + " " + operator;
  dBottom.textContent = leftOperand;

  if (leftOperand == null && operator == null) {
    dTop.textContent = "";
    dBottom.textContent = "0";
  }
  input = "";
}

function updateTopDisplay(leftOperand, operator) {
  dTop.textContent = leftOperand + " " + operator;
  input = "";
}
