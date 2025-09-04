import React, {PureComponent} from "react";
import { TouchableOpacity, StyleSheet, Text, GestureResponderEvent } from "react-native";
import * as Font from 'expo-font';
import Colors from "@/constants/Colors";


interface Props {
    
    type: "default" | "primary" | "secondary" | "info" | "success" | "warning" | "error" 
    text: string,
    onPress?: (event: GestureResponderEvent) => void,
    fullWidth?: boolean
}

class Button extends PureComponent<Props> {
    render(): React.ReactNode {
        const { text, onPress, type, fullWidth } = this.props;

        return (
            <TouchableOpacity style={[styles.button, getBgStyle(type), fullWidth && { flex: 1 }]} onPress={onPress}>
                <Text style={[styles.text, getTextStyle(type)]}>{text}</Text>
            </TouchableOpacity>
        )
    }
}

function getBgStyle(type: string) {
  switch(type) {
    case 'default': return { backgroundColor: Colors.default };
    case 'primary': return { backgroundColor: Colors.primary };
    case 'secondary': return { backgroundColor: Colors.secondary };
    case 'info': return { backgroundColor: Colors.info };
    case 'success': return { backgroundColor: Colors.success };
    case 'warning': return { backgroundColor: Colors.warning };
    case 'error': return { backgroundColor: Colors.error };
    default: return {};
  }
}

function getTextStyle(type: string) {
    switch(type) {
        case 'secondary': return { color: Colors.dark_txt}
        default: return { color: Colors.white_txt}
    }
}

const styles = StyleSheet.create({
    button: {

        // flex: 1,
        // alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        padding:8,
        // paddingVertical: 10,
        borderRadius: 4,
        margin: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: .06,
        backgroundColor: Colors.default,
    },
    text: {
        fontFamily: 'OpenSans',
        color: "#fff",
        fontSize: 15,
        textTransform: 'uppercase',
        fontWeight: "bold"
        
    }

})

// background color #2E60A3
export default Button