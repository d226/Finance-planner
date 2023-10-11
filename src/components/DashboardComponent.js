import React, { useContext } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import { IncomeData } from "../DataContext/Context";

function DashboardComponent() {
  const { expenseEntries, incomeEntries } = useContext(IncomeData);

  const incomeDataBarChart = {
    labels: incomeEntries.map((item) => item.category),
    datasets: [
      {
        indexAxis: "y",
        fill: false,
        label: "Total Income",
        data: incomeEntries.map((item) => item.amount),
        backgroundColor: ["#293462", "#1CD6CE", "#FEDB39", "#D61C4E"],
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        barThickness: 50,
      },
    ],
  };

  const expenseDataBarChart = {
    labels: expenseEntries.map((item) => item.category),

    datasets: [
      {
        indexAxis: "y",
        fill: false,
        label: "Total Income",
        data: expenseEntries.map((item) => item.amount),
        backgroundColor: ["#293462", "#1CD6CE", "#FEDB39", "#D61C4E"],
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        barThickness: 50,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        type: "linear",
        beginAtZero: true,
      },
    },
  };

  let totalSalaryPerMonth = incomeEntries.reduce((total, obj) => {
    return total + Number(obj.amount);
  }, 0);

  let totalExpensePerMonth = expenseEntries.reduce((acc, obj) => {
    return acc + Number(obj.amount);
  }, 0);

  let netBalance = totalSalaryPerMonth - totalExpensePerMonth;

  return (
    <div>
      <div className="showSalaryDetail">
        <div>
          <h4>
            Salary Per Month <br /> {totalSalaryPerMonth}
          </h4>
        </div>
        <div>
          <h4>
            Expense Per Month <br /> {totalExpensePerMonth}
          </h4>
        </div>
        <div>
          <h4>
            Net Balance <br /> {netBalance}
          </h4>
        </div>
      </div>
      <div className="BarGraph">
        <h1>----------Bar Graph----------</h1>
        <h3>Income Graph</h3>
        <div className="salaryBarGraph">
          <Bar data={incomeDataBarChart} />
        </div>
        <h3>Expense Graph</h3>
        <div className="expenseBarGraph">
          <Bar data={expenseDataBarChart} />
        </div>
      </div>
    </div>
  );
}

export default DashboardComponent;
