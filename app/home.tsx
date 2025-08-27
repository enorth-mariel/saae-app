import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Link } from 'expo-router';

const Home = () => {

  return (
    <View>
      <Link href={'/'} asChild>
          <View style={{ backgroundColor: Colors.error}}>


                    
            <TouchableOpacity >
              <MaterialIcons name="water-damage" size={35} color={Colors.error} style={{padding:5}}/>            
              <Text>home</Text>
            </TouchableOpacity>
          </View>
      </Link>          
    </View>
  )
}

export default Home