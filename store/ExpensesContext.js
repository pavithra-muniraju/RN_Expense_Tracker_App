import { createContext, useReducer } from "react";

export const Dummy_Expenses = [
    {
        id: 'e1',
        desc: 'pair of shoes',
        amount: 200,
        date: new Date('2025-11-23')
    },
    {
        id: 'e2',
        desc: 'pair of trouser',
        amount: 2000,
        date: new Date('2025-12-23')
    },
    {
        id: 'e3',
        desc: 'Groseries',
        amount: 600,
        date: new Date('2025-12-29')
    },
    {
        id: 'e4',
        desc: 'Book',
        amount: 780,
        date: new Date('2026-02-23')
    },
    {
        id: 'e5',
        desc: 'Household',
        amount: 780,
        date: new Date('2026-02-28')
    },
    {
        id: 'e6',
        desc: 'Bag',
        amount: 180,
        date: new Date('2026-03-04')
    },
    {
        id: 'e14',
        desc: 'Book',
        amount: 780,
        date: new Date('2026-02-23')
    },
    {
        id: 'e15',
        desc: 'Household',
        amount: 780,
        date: new Date('2026-02-28')
    },
    {
        id: 'e16',
        desc: 'Bag',
        amount: 180,
        date: new Date('2026-03-04')
    }
]

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ desc, amount, date }) => { },
    deleteExpense: (id) => { },
    updateExpense: (id, { desc, amount, date }) => { }
});

function expensesReducer(state, action) {
    switch (action.type) {

        case 'ADD':
            const id = new Date.toString() + Math.random().toString();
            return [{...action.payload, id: id}, ...state ]

        case 'UPDATE':
            const updateExpenseIndex = state.findIndex(
                (expense) => expense.id == action.payload.id 
            );

            const updatableExpense = state[updateExpenseIndex];
            const updatedExpenseItem = {...updatableExpense, ...action.payload.data};

            const updatedExpensesArray = [...state];

            updatedExpensesArray[updateExpenseIndex] = updatedExpenseItem; 
            return updatedExpensesArray;

        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload)
        default: 
            return state;
    }
}

export default function ExpensesContextProvider({ children }) {

    const [expensesState, dispatch] = useReducer(expensesReducer, Dummy_Expenses)

    function addExpense({expenseDate}) {
        dispatch({type: 'ADD', payload: expenseDate});
    }

    function deleteExpense(id) {
        dispatch({type: 'DELETE', payload: id})
    }

    function updateExpense(id, expenseDate) {
        dispatch({type: 'UPDATE', payload: { id: id, data: expenseDate}})
    }
    
    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    }
    return (
        <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
    )
}