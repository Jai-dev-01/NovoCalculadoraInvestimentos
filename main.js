import { generateReturnsArray } from "./src/investimentGoals.js";
import { Chart } from "chart.js/auto";
import { createTable } from "./src/table.js";

const finalMoneyChart = document.getElementById("final-money-distribution");
const progressionChart = document.getElementById("progression");
const form = document.getElementById("investment-form");
const clearFormButton = document.getElementById("clear-form");
let doughnutChartReference = {};
let progressionChartReference = {};
const columnsArray = [
  { columnLabel: "total Investido", accessor: "investedAmount" },
  { columnLabel: "Rendimento Mensal", accessor: "interestReturns" },
  { columnLabel: "Rendimento total", accessor: "totalInterestReturns" },
  { columnLabel: "Mês", accessor: "month" },
  { columnLabel: "Quantia Total", accessor: "totalAmount" },
];
const calculateButton = document.getElementById("calculate-results");

function formatCurrency(value) {
  return value.toFixed(2);
}

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function renderProgression(event) {
  event.preventDefault();
  if (document.querySelector(".error")) {
    return;
  }
  // resetCharts();
  // const startingAmount = Number(form["starting-amount"].value);

  const startingAmount = Number(
    document.getElementById("starting-amount").value
  );
  const additionalContribuition = Number(
    document.getElementById("additional-contribuition").value
  );
  const timeAmount = Number(document.getElementById("time-amount").value);
  const timeAmountPeriod = document.getElementById("time-amount-period").value;
  const returnRate = Number(document.getElementById("return-rate").value);
  const returnRatePeriod = document.getElementById("evaluation-period").value;
  const taxRate = Number(document.getElementById("tax-rate").value);

  const returnsArray = generateReturnsArray(
    startingAmount,
    timeAmount,
    timeAmountPeriod,
    additionalContribuition,
    returnRate,
    returnRatePeriod
  );

  //   const finalInvestimentObjesct = returnsArray[returnsArray.length - 1];

  //   doughnutChartReference = new Chart(finalMoneyChart, {
  //     type: "doughnut",
  //     data: {
  //       labels: ["Total Investido", "Rendimento", "Imposto"],
  //       datasets: [
  //         {
  //           data: [
  //             formatCurrency(finalInvestimentObjesct.investedAmount),
  //             formatCurrency(
  //               finalInvestimentObjesct.totalInterestReturns * (1 - taxRate / 100)
  //             ),
  //             formatCurrency(
  //               finalInvestimentObjesct.totalInterestReturns * (taxRate / 100)
  //             ),
  //           ],
  //           backgroundColor: [
  //             "rgb(255, 99, 132)",
  //             "rgb(54, 162, 235)",
  //             "rgb(255, 205, 86)",
  //           ],
  //           hoverOffset: 4,
  //         },
  //       ],
  //     },
  //   });
  //   progressionChartReference = new Chart(progressionChart, {
  //     type: "bar",
  //     data: {
  //       labels: returnsArray.map((investmentObject) => investmentObject.month),
  //       datasets: [
  //         {
  //           label: "total Investido",
  //           data: returnsArray.map(
  //             (investmentObject) => investmentObject.investedAmount
  //           ),
  //           backgroundColor: "rgb(255, 99, 132)",
  //         },
  //         {
  //           label: "Retorno do Investimento",
  //           backgroundColor: "rgb(54, 162, 235)",
  //           data: returnsArray.map(
  //             (investmentObject) => investmentObject.interestReturns
  //           ),
  //         },
  //       ],
  //     },
  //     options: {
  //       scales: {
  //         x: {
  //           stacked: true,
  //         },
  //         y: {
  //           stacked: true,
  //         },
  //       },
  //     },
  //   });
  // }
  // function resetCharts() {
  //   if (
  //     !isObjectEmpty(doughnutChartReference) &&
  //     !isObjectEmpty(progressionChartReference)
  //   ) {
  //     doughnutChartReference.destroy();
  //     progressionChartReference.destroy();
  //   }
  createTable(columnsArray, returnsArray, "results-table");
}

function clearForm() {
  form["starting-amount"].value = "";
  form["additional-contribuition"].value = "";
  form["time-amount"].value = "";
  form["return-rate"].value = "";
  form["tax-rate"].value = "";

  resetCharts();

  const errorInputsContainers = document.querySelectorAll(".error");
  for (const errorInputsContainer of errorInputsContainers) {
    errorInputsContainer.classList.remove("error");
    errorInputsContainer.parentElement.querySelector("p").remove();
  }
}

function validateInput(event) {
  if (event.target.value === "") {
    return;
  }
  const { parentElement } = event.target;
  const grandParentElement = event.target.parentElement.parentElement;
  const inputValue = event.target.value.replace(",", ".");

  if (
    !parentElement.classList.contains("error") &&
    (isNaN(inputValue) || Number(inputValue) <= 0)
  ) {
    const errorTextElement = document.createElement("p");
    errorTextElement.classList.add("text-red-500");
    errorTextElement.innerText = "Insira um valor numérico maior do que 0!";

    parentElement.classList.add("error");
    grandParentElement.appendChild(errorTextElement);
  } else if (
    parentElement.classList.contains("error") &&
    !isNaN(inputValue) &&
    Number(inputValue) > 0
  ) {
    parentElement.classList.remove("error");
    grandParentElement.querySelector("p").remove();
  }
}
for (const formElement of form) {
  if (formElement.tagName === "INPUT" && formElement.hasAttribute("name")) {
    formElement.addEventListener("blur", validateInput);
  }
}

form.addEventListener("submit", renderProgression);
calculateButton.addEventListener("click", renderProgression);
clearFormButton.addEventListener("click", clearForm);
