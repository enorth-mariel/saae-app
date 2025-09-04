import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SegundaViaForm } from '@/src/components/SegundaViaForm';



export default function SegundaVia(){
    return (
        // <LinearGradient colors={["#1A2980", "#3A7BD5", "#00C6FB"]}
        //     start={{ x: 0, y: 0 }}
        //     end={{ x: 1, y: 1 }}
        //     style={{ flex: 1, }}
        // >   
        <SegundaViaForm/>
        // </LinearGradient>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    div: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: "transparent"
    }
})

