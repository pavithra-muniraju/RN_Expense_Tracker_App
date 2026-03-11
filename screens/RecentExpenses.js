import { StyleSheet, Text, View } from "react-native";
import { ExpensesContext } from "../store/ExpensesContext";
import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { GlobalStyles } from "../constants/styles";
import { getDateMinusDate } from "../util/date";
import { getExpenses } from "../util/http";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverlay";

function RecentExpenses() {

    const expensesContext = useContext(ExpensesContext);

    const [isFetching, setISFetching] = useState(true);

    const [error, setError] = useState();

    // const [fetchExpenses, setFetchExpenses] = useState();
    useEffect(() => {
        async function fetchExpenses() { // created another funnction just to make a async call,
            setISFetching(true);
            try {
                const expenses = await getExpenses();
                expensesContext.setExpenses(expenses);
                // setFetchExpenses(expense);
            } catch (error) {
                setError('Could not fetch expenses')
            }

            setISFetching(false);
            

        }
        fetchExpenses();
    }, [])

    // const recentExpenses = fetchExpenses?.filter((expense) => {
    //     const today = new Date();
    //     const date7daysAgo = getDateMinusDate(today, 7);
    //     return expense.date > date7daysAgo;
    // });
    // console.log(expensesContext.expenses.filter(exp => exp.id))
    const recentExpenses = expensesContext.expenses?.filter((expense) => {
        const today = new Date();
        const date7daysAgo = getDateMinusDate(today, 7);
        return expense.date > date7daysAgo;
    });

    function errorHandler() {
        setError(null)
    }
    if (isFetching) {
        return <LoadingOverlay />
    }
    if(error && !isFetching) {
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }
    return (
        <View style={styles.container}>
            {recentExpenses.length === 0 ? <View>
                <Text style={styles.noRecent}>No recent expenses</Text>
            </View> : <ExpensesOutput expenses={recentExpenses} expensesperiod="Recent Expenses" />}

        </View>
    )
}

export default RecentExpenses;

const styles = StyleSheet.create({
    container: {
        backgroundColor: GlobalStyles.colors.primary800,
        height: '100%'
    },
    noRecent: {
        color: GlobalStyles.colors.primary50,
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
        margin: 24
    }
})