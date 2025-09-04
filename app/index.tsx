import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, SafeAreaView } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Link } from 'expo-router';
import Button from '@/src/components/Button';
import Colors from '@/constants/Colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Home = () => {

  return (
    <View style={styles.container}>
        <Text style={styles.text}>Menu</Text>

            <Link href={'/segunda_via'} asChild>
        <TouchableOpacity>


            <ImageBackground style={styles.button} 
            source={require("../assets/images/bg1.jpg")} 
            resizeMode="cover"
            imageStyle={{ borderRadius: 12 }}>

                    <View style={{flex: 1,flexDirection:'row', alignItems: 'center'}}>      
                        <MaterialCommunityIcons name="file-document" size={25} color={Colors.white_txt} style={{padding:5}}/>
                        <Text style={styles.buttonText}>Segunda Via</Text>
                    </View>
            </ImageBackground>
            </TouchableOpacity>
        </Link>          

        {/* <ImageBackground style={styles.button} 
        source={require("../assets/images/bg1.jpg")} 
        resizeMode="cover"
        imageStyle={{ borderRadius: 12 }}
        
        >
            <Link href={'/pdf'} asChild>
              <TouchableOpacity style={{flex: 1,flexDirection:'row', alignItems: 'center'}}>
                  <MaterialIcons name="water-damage" size={25} color={Colors.white_txt} style={{padding:5}}/>            
                  <Text style={styles.buttonText}>PDF</Text>
              </TouchableOpacity>
              </Link>          
          </ImageBackground> */}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding:10,
        paddingTop: 15,
        backgroundColor: Colors.grey_bg 
    },
    button: {
        height: 75, 
        backgroundColor: "#fff", 
        margin:10, 
        borderRadius:10,
        padding:10,
    },
    buttonText: {
        marginHorizontal: 5,
        color: "#fff",
        fontSize: 18,
        fontFamily: "OpenSans",
        fontWeight:"bold",
    },
    text: {
        fontSize: 18,
        marginHorizontal: 25,
        fontFamily: "OpenSans",
        fontWeight:"bold",
        color: Colors.grey_txt
    },
})

export default Home