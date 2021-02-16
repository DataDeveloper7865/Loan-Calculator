// So we only have to do this once, find these elements in DOM
const calcForm = document.getElementById("calc-form");

/** Retrieves current form values and returns {amount, years, rate}. */

function getFormValues() {
  let amount = document.getElementById('loan-amount').value;
  let years = document.getElementById('loan-years').value;
  let rate = document.getElementById('loan-rate').value;

  return {amount, years, rate}

}

/** Calculate monthly payment and return. */

function calcMonthlyPayment(amount, years, rate) {
  let periodicInterestRate = rate / 12;
  let totalNumPayments = years * 12;
  let monthlyPayment = (amount * periodicInterestRate) / (1 - ((1 + periodicInterestRate)**(-totalNumPayments)))
  return monthlyPayment
}

/** Get form values, calculate & update display. */

function getFormValuesAndDisplayResults() {
  let values = getFormValues();
  let displayedPayments = calcMonthlyPayment(values.amount, values.years, values.rate)
  let node = document.createElement('h3');
  node.innerText = displayedPayments.toString();
  document.getElementById('calc-monthly-payment').appendChild(node);
}

/** Set initial form values and show initial results. Called at app start. */

function setInitialValues() {
  // you can decide on some initial values
  document.getElementById('loan-amount').value = 100;
  document.getElementById('loan-years').value = 10;
  document.getElementById('loan-rate').value = 13
}

/** Start: set form defaults & display; attach form submit event listener. */

function start() {
  // so we can test the calcMonthlyPayment independently of all the
  // HTML, only do the rest if this is run on a page with the form
  if (!calcForm) return;

  setInitialValues();

  calcForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    getFormValuesAndDisplayResults();
  });
}

window.addEventListener('DOMContentLoaded', start);
