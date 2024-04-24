import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import LoadingOverlay from "../components/ui/LoadingOverlay";

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(false);
  const expenseCtx = useContext(ExpensesContext);
  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      const expenses = await fetchExpenses();
      setIsFetching(false);
      expenseCtx.setExpenses(expenses);
    }

    getExpenses();
  }, []);

  const recentExpenses = expenseCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo;
  });

  // console.log("recent ", recentExpenses);
  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <ExpensesOutput expensesPeriod="Last 7 days" expenses={recentExpenses} />
  );
}

export default RecentExpenses;
