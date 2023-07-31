const remainingBudgetDisplay = document.getElementById('remaining-budget');
let budget = 2000;
let currentBudget = 0;
let currentAmount = 0;
let count=1;
let remainingBudget=0;

function getBudget() {
    const budgetInput = document.getElementById('budget-input');
    if (budgetInput.value === "") {
        alert("Budget can't be empty");
        saveData();

    } else {
        budget = parseFloat(budgetInput.value);
        currentBudget = budget;
        updateRemainingBudget();
        saveData();
    }
    budgetInput.value = "";
}

function updateRemainingBudget() {
    remainingBudget = currentBudget - currentAmount;
    remainingBudgetDisplay.innerText = "$" + remainingBudget.toFixed(2);
    saveData();
}

const historyContainer = document.getElementById('history');
const listContainer = historyContainer.querySelector("ul");

function addEntry() {
    const descriptionInput = document.getElementById('description-input');
    const amountInput = document.getElementById('amount-input');

    if (descriptionInput.value === "" || amountInput.value === "") {
        alert("Need to fill them");
        saveData();
    } else {
        let li = document.createElement("li");
        let span = document.createElement("span");

        // Serial number
        span.innerHTML = count++;
        li.appendChild(span);

        // Description
        let descriptionSpan = document.createElement("span");
        descriptionSpan.innerHTML = descriptionInput.value;
        li.appendChild(descriptionSpan);

        // Amount
        let amountSpan = document.createElement("span");
        amountSpan.innerHTML = "$" + parseInt(amountInput.value).toFixed(2);
        li.appendChild(amountSpan);

        listContainer.appendChild(li);

        currentAmount += parseInt(amountInput.value);
        descriptionInput.value = "";
        amountInput.value = "";
        updateRemainingBudget();
        saveData();
    }
}
function clearList(){
    listContainer.innerHTML="";
    currentAmount=0;
    count=1;
    remainingBudget=0;
    updateRemainingBudget();
    saveData();
}
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    const savedData = localStorage.getItem("data");
    if (savedData) {
        listContainer.innerHTML = savedData;
    }
}

showTask();
