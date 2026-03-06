import { StyleSheet, Text, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { GlobalStyles } from "../constants/styles";

function AllExpenses() {
    return(
        <View style={styles.container}>
            <ExpensesOutput expensesperiod="Last 7 days" />
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