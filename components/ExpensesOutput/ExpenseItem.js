import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormatedDate } from "../../util/date";

function ExpenseItem({ itemData }) {
    
    return (
        <Pressable>
            <View style={styles.container}>
                <View>
                    <Text style={[styles.itemDesc, styles.itemDate]}>{itemData.item.desc}</Text>
                    <Text style={styles.itemDate}>{getFormatedDate(itemData.item.date)}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>{itemData.item.amount.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default ExpenseItem;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        fontWeight: 18,
        backgroundColor: GlobalStyles.colors.primary500,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 18,
        elevation: 3,
        shadowColor: GlobalStyles.colors.primary400,
        shadowOffset: { height: 1, width: 1 },
        shadowRadius: 4
    },
    itemDesc: {
        fontWeight: '700',
        fontSize: 18,
        marginBottom: 4
    },
    itemDate: {
        color: GlobalStyles.colors.primary50
    },
    amountContainer: {
        backgroundColor: 'white',
        color: 'black',
        padding: 16,
        borderRadius: 8,
        minWidth: '80',
        justifyContent: 'center',
        alignItems: 'center'
    },
    amount: {
        color: GlobalStyles.colors.primary500,
        
        fontWeight: 'bold',
    }
})