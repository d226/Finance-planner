import React, { useState, useContext } from "react";
import { IncomeData } from "../DataContext/Context";

function IncomeAndExpense() {
  const { expenseEntries, incomeEntries, setExpenseEntries, setIncomeEntries } =
    useContext(IncomeData);
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [entryType, setEntryType] = useState("expense");
  const [editIndex, setEditIndex] = useState(-1);

  const handleDateChange = (event) => {
    event.preventDefault();
    setDate(event.target.value);
  };

  const handleAmountChange = (event) => {
    event.preventDefault();
    setAmount(event.target.value);
  };

  const handleCategoryChange = (event) => {
    event.preventDefault();
    setCategory(event.target.value.trim());
  };

  const handleEntryTypeChange = (event) => {
    event.preventDefault();
    setEntryType(event.target.value);
  };

  const isValidDate = (date) => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!date.match(datePattern)) {
      return false;
    }
    const parsedDate = new Date(date);
    return !isNaN(parsedDate) && parsedDate <= new Date();
  };

  const isValidAmount = (amount) => {
    const parsedAmount = parseFloat(amount);
    return !isNaN(parsedAmount) && parsedAmount > 0;
  };

  const isValidCategory = (category) => {
    // Check if the category is not empty
    return category.trim() !== "";
  };

  const handleAddEntry = () => {
    if (
      !isValidDate(date) ||
      !isValidAmount(amount) ||
      !isValidCategory(category)
    ) {
      console.error("Invalid input");
      return;
    }
    const newEntry = { date, amount, category, type: entryType };
    if (editIndex !== -1) {
      const updatedEntries =
        entryType === "expense" ? [...expenseEntries] : [...incomeEntries];
      updatedEntries[editIndex] = newEntry;
      entryType === "expense"
        ? setExpenseEntries(() => updatedEntries)
        : setIncomeEntries(updatedEntries);
      setEditIndex(-1);
    } else {
      entryType === "expense"
        ? setExpenseEntries(() => [...expenseEntries, newEntry])
        : setIncomeEntries([...incomeEntries, newEntry]);
    }

    setDate("");
    setAmount("");
    setCategory("");
    setEntryType("expense");
  };

  const handleEditEntry = (index, type) => {
    const entryToEdit =
      type === "expense" ? expenseEntries[index] : incomeEntries[index];
    setDate(entryToEdit.date);
    setAmount(entryToEdit.amount);
    setCategory(entryToEdit.category);
    setEntryType(entryToEdit.type);
    setEditIndex(index);
  };

  const handleDeleteEntry = (index, type) => {
    const updatedEntries =
      type === "expense"
        ? expenseEntries.filter((item, i) => i !== index)
        : incomeEntries.filter((item, i) => i !== index);
    type === "expense"
      ? setExpenseEntries(updatedEntries)
      : setIncomeEntries(updatedEntries);
  };

  return (
    <div>
      <h2 className="expenseTitle">Expense Tracker</h2>
      <div className="expenseTracker">
        <label>Date:</label>
        <input type="date" value={date} onChange={handleDateChange} />

        <label>Amount:</label>
        <input
          type="text"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Amount"
        />
        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={handleCategoryChange}
          placeholder="Category"
        />

        <label>Entry Type:</label>
        <select value={entryType} onChange={handleEntryTypeChange}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <button onClick={handleAddEntry}>
          {editIndex !== -1 ? "Update Entry" : "Add Entry"}
        </button>
      </div>
      {!isValidDate(date) &&
        !isValidAmount(amount) &&
        !isValidCategory(category) && (
          <h3 className="error-message">
            Invalid input. Please check your values.
          </h3>
        )}
      <div className="expenseEntries">
        <h3>Expense Entries:</h3>
        <div>
          <table className="entries-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenseEntries.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.date}</td>
                  <td>{entry.amount}</td>
                  <td>{entry.category}</td>
                  <td>{entry.type}</td>
                  <td>
                    <button onClick={() => handleEditEntry(index, "expense")}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteEntry(index, "expense")}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="incomeEntries">
        <h3>Income Entries:</h3>

        <div>
          <table className="entries-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {incomeEntries.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.date}</td>
                  <td>{entry.amount}</td>
                  <td>{entry.category}</td>
                  <td>{entry.type}</td>
                  <td>
                    <button onClick={() => handleEditEntry(index, "income")}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteEntry(index, "income")}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default IncomeAndExpense;
