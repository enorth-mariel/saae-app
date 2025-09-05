import { View, Text, Image, TouchableOpacity,StyleSheet, Platform, PermissionsAndroid } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '@/src/components/Button'
import { Link, useRouter } from 'expo-router'
import * as Location from "expo-location";


const index = () => {
    const [location, setLocation] = React.useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
    const [address, setAddress] = React.useState<any>(null);

    const router = useRouter()

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== "granted") {
            setErrorMsg("Permission to access location was denied");
            return;
        }
        
        let loc = await Location.getCurrentPositionAsync({});
        
        let [addr] = await Location.reverseGeocodeAsync({
            latitude:loc.coords.latitude,
            longitude:loc.coords.longitude,
        });
        
        setAddress(addr)
        setLocation(loc);
        
        goHome()
    }
    
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
                        {/* <Text>
                            {errorMsg
                            ? errorMsg
                            : location
                            ? `Lat: ${location.coords.latitude}, Lng: ${location.coords.longitude} add: ${address.district}, ${address.city}, ${address.region}`
                            : "Fetching location..."}
                        </Text> */}
                    </View>

                    <View style={{height: 65, }}>
                        <Button type='primary' text='Entrar' fullWidth={true} onPress={goHome}/>
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