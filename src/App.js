import React, { useState } from "react";
import IncomeAndExpense from "./components/IncomeAndExpense";
import FeatureList from "./components/FeatureList";
import GetIncomeData from "./DataContext/IncomeContext";
function App() {
  return (
    <GetIncomeData>
      <div className="App">
        <div className="showFeature">
          <FeatureList />
        </div>
      </div>
    </GetIncomeData>
  );
}

export default App;
