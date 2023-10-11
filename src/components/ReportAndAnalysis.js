import React, { useState, useContext } from "react";
import { IncomeData } from "../DataContext/Context";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
function ReportAndAnalysis() {
  const { expenseEntries, incomeEntries } = useContext(IncomeData);
  let totalIncomePerMonth = incomeEntries.reduce((total, obj) => {
    return total + Number(obj.amount);
  }, 0);

  let totalExpensePerMonth = expenseEntries.reduce((acc, obj) => {
    return acc + Number(obj.amount);
  }, 0);
  const incomeVsExpense = {
    labels: ["Monthly Income", "Monthly Expense"],
    datasets: [
      {
        indexAxis: "y",
        fill: false,
        label: "Income Vs Expense",
        data: [totalIncomePerMonth, totalExpensePerMonth],
        backgroundColor: ["#293462", "#1CD6CE"],
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        barThickness: 50,
      },
    ],
  };
  let netBalance = totalIncomePerMonth - totalExpensePerMonth;

  let incomeVsExpensePercentage =
    (totalExpensePerMonth / totalIncomePerMonth) * 100;
  return (
    <div>
      <h1 className="titleIvE">Income Vs Expense Graph</h1>
      <div className="income-expense">
        <Bar data={incomeVsExpense} />
      </div>
      <div className="showIncVsExpPer">
        <h1>
          Expense used from your income : {incomeVsExpensePercentage.toFixed(2)}{" "}
          %
        </h1>
      </div>
    </div>
  );
}

export default ReportAndAnalysis;
