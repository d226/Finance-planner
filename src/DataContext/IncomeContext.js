import { useState } from "react";
import { IncomeData } from "./Context";

function GetIncomeData(props) {
  const [expenseEntries, setExpenseEntries] = useState([]);
  const [incomeEntries, setIncomeEntries] = useState([]);
  const data = {
    expenseEntries,
    incomeEntries,
    setExpenseEntries,
    setIncomeEntries,
  };
  return (
    <IncomeData.Provider value={data}>{props.children}</IncomeData.Provider>
  );
}

export default GetIncomeData;
