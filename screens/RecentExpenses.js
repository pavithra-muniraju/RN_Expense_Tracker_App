import { StyleSheet, Text, View } from "react-native";
import { ExpensesContext } from "../store/ExpensesContext";
import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { GlobalStyles } from "../constants/styles";
import { getDateMinusDate } from "../util/date";

function RecentExpenses() {

    const expensesContext = useContext(ExpensesContext);
    console.log(expensesContext.expenses.filter(exp => exp.id))
    const recentExpenses = expensesContext.expenses?.filter((expense) => {
        const today = new Date();
        const date7daysAgo = getDateMinusDate(today, 7);
        return expense.date > date7daysAgo;
    });
    
    return(
        <View style={styles.container}>
            <ExpensesOutput expenses={recentExpenses} expensesperiod="Recent Expenses" />
        </View>
    )
}

export default RecentExpenses;

const styles = StyleSheet.create({
    container: {
        backgroundColor: GlobalStyles.colors.primary800,
        height: '100%'
    }
})