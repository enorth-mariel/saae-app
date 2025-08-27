import Colors from '@/constants/Colors';
import React from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';

type InputProps = TextInputProps & {
  type?: 'default' | 'success' | 'fail' | 'form';
  placeholder: string,
  value: string,
  onChangeText: React.Dispatch<React.SetStateAction<string>>
};

export const Input: React.FC<InputProps> = ({ type, placeholder, value, onChangeText, ...props }) => {
    // const [value, onChangeText] = React.useState("");

    const dynamicStyle =
        type === 'success' ? styles.success
        : type === 'fail' ? styles.fail 
        : type === 'form' ? styles.form
        : {};

    return <TextInput
        placeholder={placeholder} 
        placeholderTextColor={Colors.light_grey}
        style={[styles.input, dynamicStyle]}
        onChangeText={text => onChangeText(text)}
        value={value}
    />;
};


const styles = StyleSheet.create({
    input: {
        margin: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: Colors.light_grey,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4
        },
        fontFamily: 'OpenSans',
        padding: 15,
        color: Colors.medium_grey
    },
    success: {
        margin: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: Colors.success,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4
        },
        fontFamily: 'OpenSans',
        padding: 15,      
    },
    fail: {

    },
    form: {
        backgroundColor: "#fff",
        
        margin: 10,
        borderRadius: 4,
        borderWidth: 0,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2, 
        shadowRadius: 4,
        elevation: 3,
        fontFamily: 'OpenSans',
        padding: 15,        
    }
})