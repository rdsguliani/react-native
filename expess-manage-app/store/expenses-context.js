import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  // {
  //   id: "e1",
  //   description: "A pair of shoes",
  //   amount: 59.99,
  //   date: new Date("2021-12-19"),
  // },
  // {
  //   id: "e2",
  //   description: "A pair of shoes",
  //   amount: 89.99,
  //   date: new Date("2021-01-22"),
  // },
  // {
  //   id: "e3",
  //   description: "Some bananas",
  //   amount: 5.99,
  //   date: new Date("2021-12-01"),
  // },
  // {
  //   id: "e4",
  //   description: "Book",
  //   amount: 18.59,
  //   date: new Date("2024-03-22"),
  // },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [{ ...action.payload }, ...state];
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    case "UPDATE":
      const updateItemIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updateExpense = state[updateItemIndex];
      const udpateItem = { ...updateExpense, ...action.payload.data };
      const updateExpenses = [...state];
      updateExpenses[updateItemIndex] = udpateItem;
      return updateExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id != action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function setExpenses(expenses) {
    dispatch({ type: "SET", payload: expenses });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
    setExpenses,
  };

  // console.log(value);

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
