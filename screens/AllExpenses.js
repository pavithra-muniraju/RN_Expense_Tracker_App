import { StyleSheet, Text, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { GlobalStyles } from "../constants/styles";
import { useContext } from "react";
import { ExpensesContext } from "../store/ExpensesContext";

function AllExpenses() {

    const expensesContext = useContext(ExpensesContext);

    const expenses = expensesContext.expenses;
    
    return(
        <View style={styles.container}>
            <ExpensesOutput expenses={expenses} expensesperiod="Last 7 days" />
        </View>
    )
}

export default AllExpenses;
const styles = StyleSheet.create({
    container: {
        backgroundColor: GlobalStyles.colors.primary800,
        height: '100%'
    }
})