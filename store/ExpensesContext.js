import { createContext, useReducer } from 'react';

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ desc, amount, date }) => { },
    setExpenses: () => { },
    deleteExpense: (id) => { },
    updateExpense: (id, { desc, amount, date }) => { },
});

function expensesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            // const id = new Date().toString() + Math.random().toString();
            // return [{ ...action.payload, id: id }, ...state];
            return [action.payload, ...state] // getting id dynamically from backend
        case 'SET':
            const reversed = action.payload.reverse()
            return reversed
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload.id
            );
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.data };
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;
    }
}

function ExpensesContextProvider({ children }) {
    const [expensesState, dispatch] = useReducer(expensesReducer, []);

    function addExpense(expenseData) {
        dispatch({ type: 'ADD', payload: expenseData });
    }

    function setExpenses(expenses) {
        dispatch({ type: 'SET', payload: expenses })
    }
    function deleteExpense(id) {
        dispatch({ type: 'DELETE', payload: id });
    }

    function updateExpense(id, expenseData) {
        dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        setExpenses: setExpenses,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    };

    return (
        <ExpensesContext.Provider value={value}>
            {children}
        </ExpensesContext.Provider>
    );
}

export default ExpensesContextProvider;