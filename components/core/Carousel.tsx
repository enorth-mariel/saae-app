import React, {PureComponent} from "react";
import { TouchableOpacity, StyleSheet, Text, GestureResponderEvent } from "react-native";



interface Props {
    text: string,
    onPress?: (event: GestureResponderEvent) => void,

}
class Carousel extends PureComponent<Props> {
    render(): React.ReactNode {
        const { text, onPress } = this.props;

        return (
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 6,
        margin: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: .06,
        backgroundColor: "#21CFDB",
    },
    text: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold"
        
    }
})


// background color #2E60A3
export default Carousel