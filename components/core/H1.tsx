import React, {PureComponent} from "react";
import { TouchableOpacity, StyleSheet, Text, GestureResponderEvent, TextStyle } from "react-native";



interface Props {
    text: string,
    textStyle?: TextStyle
}
class H1 extends PureComponent<Props> {
    render(): React.ReactNode {
        const { text, textStyle } = this.props;

        return (
            <Text style={[styles.text, textStyle]}>{text}</Text>
        )
    }
}


const styles = StyleSheet.create({
    text: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold"
        
    }
})


export default H1