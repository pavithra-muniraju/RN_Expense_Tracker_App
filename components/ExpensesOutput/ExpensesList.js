import { FlatList, StyleSheet, View } from "react-native";
import ExpenseItem from "./ExpenseItem";

function ExpensesList({ data }) {
    function renderItemHandler(itemData) {
        return (
            <ExpenseItem itemData={itemData} />
        )
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItemHandler}
                keyExtractor={(item) => { item.id }} />

        </View>
    )
}

export default ExpensesList;

const styles = StyleSheet.create({
    container: {
        paddingBottom: 40
    }
})
