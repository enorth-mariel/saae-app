import { View, Text, Image, TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '@/src/components/Button'
import { Link, useRouter } from 'expo-router'

const index = () => {
    const router = useRouter()

    
    const goHome = ()=>{
        router.replace('/home');
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.top_container}>
                <Image style={styles.img} resizeMode="contain"
                    source={require("../assets/images/logo_colorida.png")}/>
            </View>


        

            <View style={styles.bottom_container}>

                    <View style={{alignItems: 'center', justifyContent:'center'}}>

                        {/* <Text style={[styles.text, {fontSize: 35}]}>Bem Vindo!</Text> */}
                        {/* 
                        <Text style={styles.text}>SAAE há 57 anos</Text>
                        <Text style={styles.text}>Presente no futuro da gente</Text>
                         */}
                    </View>

                    <View style={{height: 65, }}>
                        {/* <Link href={'/'}> */}
                            <Button type='primary' text='Entrar' fullWidth={true} onPress={goHome}/>
                        {/* </Link> */}

                    </View>
            </View>

    </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        padding:15,
        alignItems: "center", 
        justifyContent:"space-around", 
        backgroundColor: Colors.white_txt,
    },
    top_container: {
        width: 400, 
        height: 300,
    },
    bottom_container:{
        flex:1, 
        width: "100%",
        justifyContent: "flex-end", 
    },
    text:{
        color: Colors.primary,
        fontFamily: "OpenSans",
        marginTop: 8, 
        marginLeft: 10,
        fontSize: 20, 
    },
    img: {
        width: "100%",
        height: "100%",
    },
})

export default index