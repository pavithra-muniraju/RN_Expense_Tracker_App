import { Text, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

const Dummy_Expenses = [
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
function ExpensesOutput({ expensesperiod }) {

    return (
        <View>
            <ExpensesSummary expenses={Dummy_Expenses} periodName={expensesperiod} />

            <ExpensesList data={Dummy_Expenses} />
        </View>
    )
}

export default ExpensesOutput;