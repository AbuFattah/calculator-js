const numBtns = document.querySelectorAll("[data-num]");
// operators /, *, -, +, %, and = ;
const operators = document.querySelectorAll("[data-operator]");
const clrBtns = document.querySelectorAll("[data-clr]");

const dTop = document.querySelector(".display-top");
const dBottom = document.querySelector(".display-bottom");

let bottomNum = ""; //its set to '' to avoid 0 in the beginning
let periodCount = 0;
numBtns.forEach((numBtn) => {
  numBtn.addEventListener("click", (e) => {
    const targtNum = e.target.textContent;

    if (dBottom.textContent == "0" && targtNum == "0") return;
    if (targtNum == "." && periodCount > 0) return;
    if (targtNum == ".") periodCount++;
    if (dBottom.textContent == "0" && targtNum == ".") {
      bottomNum = "0";
    }
    bottomNum = bottomNum + targtNum;
    dBottom.textContent = bottomNum;
  });
});

const delBtn = clrBtns[2];

delBtn.addEventListener("click", () => {
  if (leftOperand && !bottomNum) return;
  if (bottomNum.slice(-1) == ".") {
    periodCount = 0;
  }
  if (bottomNum.length <= 1) {
    dBottom.textContent = "0";
    //setting dBottomNum to '' to avoid concatening 0 in the beginning while adding new nums;
    bottomNum = "";
    return;
  }
  bottomNum = bottomNum.slice(0, -1);
  dBottom.textContent = bottomNum;
});

// operator portion
let leftOperand, rightOperand, operator;

operators.forEach((item) => {
  item.addEventListener("click", (e) => {
    let temp = Number(bottomNum);
    if (!temp) {
      if (leftOperand == null) return;
      operator = e.target.textContent[1];
      // dTop.textContent = leftOperand + e.target.textContent;
      updateTopDisplay(leftOperand, operator);
      return;
    }
    console.log(operator);
    console.log(temp);
    if (leftOperand && !rightOperand) {
      rightOperand = temp;
      leftOperand = calculate(leftOperand, operator, rightOperand);
      rightOperand = null;
      dBottom.textContent = leftOperand;
      dTop.textContent = leftOperand + e.target.textContent;
      bottomNum = "";
      return;
    }
    operator = e.target.textContent[1];
    leftOperand = temp;
    // dBottom.textContent = "";
    dTop.textContent = bottomNum + e.target.textContent;
    bottomNum = "";
    // console.log(leftOperand, rightOperand);
  });
});

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
  rightOperand = Number(bottomNum);
  leftOperand = calculate(leftOperand, operator, rightOperand);
  rightOperand = null;
  bottomNum = "";
  updateDisplays(leftOperand, operator);
});

function updateDisplays(leftOperand, operator) {
  dTop.textContent = leftOperand + " " + operator;
  dBottom.textContent = leftOperand;
}
