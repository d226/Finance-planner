import React, { useState } from "react";
import IncomeAndExpense from "./IncomeAndExpense";
import { Route, Routes } from "react-router-dom";
import DashboardComponent from "./DashboardComponent";
import { Link } from "react-router-dom";
import ReportAndAnalysis from "./ReportAndAnalysis";

function FeatureList(props) {
  return (
    <div className="feature">
      <div className="featureList">
        <ul>
          <li>
            <Link to="/IncomeAndExpense">Income And Expense</Link>
          </li>
          <li>
            <Link to="/Dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/ReportAndAnalysis">Report Analysis</Link>
          </li>
        </ul>
      </div>
      <div className="featureContent">
        <Routes>
          <Route
            path="/IncomeAndExpense"
            element={<IncomeAndExpense />}
          ></Route>
          <Route path="/Dashboard" element={<DashboardComponent />}></Route>
          <Route
            path="/ReportAndAnalysis"
            element={<ReportAndAnalysis />}
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default FeatureList;
