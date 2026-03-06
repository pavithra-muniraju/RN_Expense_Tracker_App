import { Text, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

function ExpensesOutput({ expenses, expensesperiod }) {

    return (
        <View>
            <ExpensesSummary expenses={expenses} periodName={expensesperiod} />

            <ExpensesList data={expenses} />
        </View>
    )
}

export default ExpensesOutput;