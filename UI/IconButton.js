import { Pressable, StyleSheet, View } from "react-native";
import {Ionicons} from "@expo/vector-icons";

function IconButton({name, size, color, onPress}) {
    return (
        <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
            <View style={styles.container}>
                <Ionicons name={name} size={size} color={color} s />
            </View>
        </Pressable>
    )
}

export default IconButton;

const styles = StyleSheet.create({
    container: {
        borderRadius: 24,
        padding: 6,
        margin: 8
    },
    pressed: {
        opacity: 0.75
    }
})