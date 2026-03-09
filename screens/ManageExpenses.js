import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from '../UI/IconButton'
import { GlobalStyles } from "../constants/styles";
import Button from "../UI/Button";
import { ExpensesContext } from "../store/ExpensesContext";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
function ManageExpenses({ route, navigation }) {

    const expenseId = route.params?.expenseId;
    const isEditing = !!expenseId;

    const expensesContext = useContext(ExpensesContext);
    
    const selectedExpense = expensesContext.expenses.find(expense => expense.id == expenseId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expenses' : 'Add Expenses'
        })
    }, [navigation, isEditing])

    function deleteExpenseHandler() {
        expensesContext.deleteExpense(expenseId);
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }

    function confirmHandler(expenseData) {
        if (isEditing) {
            expensesContext.updateExpense(expenseId,expenseData )
        } else {
            expensesContext.addExpense(expenseData)
        }
        navigation.goBack();
    }

    return (
        <View style={styles.constainer}>
            <ExpenseForm isEditing={isEditing} onCancel={cancelHandler} onSubmit={confirmHandler}
            defaultValues={selectedExpense} />
            
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton name="trash"
                        color={GlobalStyles.colors.error500}
                        size={36} onPress={deleteExpenseHandler} />
                </View>
            )}

        </View>
    )
}

export default ManageExpenses;

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        padding: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary50,
        alignItems: 'center'
    },
    backButton: {
        minWidth: 120,
        marginHorizontal: 8
    },
    buttonStyles: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})