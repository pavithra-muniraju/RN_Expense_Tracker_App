import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function ExpensesSummary({expenses, periodName}) {
    const expensesSum = expenses.reduce((sum, item) => {
        return sum + item.amount
    }, 0);
    return(
        <View style={styles.container}>
            <Text style={styles.periodName}>{periodName}</Text>
            <Text style={styles.amount}>${expensesSum.toFixed(2)}</Text>
        </View>
    )
}

export default ExpensesSummary;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        fontWeight: 18,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 18,
        height: 40  
    },
    periodName: {
        color: GlobalStyles.colors.primary400,
        fontSize: 16
    },
    amount: {
        fontWeight: '900',
        color: GlobalStyles.colors.primary500,
        fontSize: 16
    }
})