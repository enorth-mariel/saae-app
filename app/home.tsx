import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Link } from 'expo-router';
import Button from '@/src/components/Button';
import Colors from '@/constants/Colors';

const Home = () => {

  return (
    <View>
          <View style={{height: 100, backgroundColor: Colors.error, margin:10, borderRadius:10}}>
      <Link href={'/'} asChild>
            {/* <Button type='default' text='TEst'></Button> */}

                    
            <TouchableOpacity >
              <MaterialIcons name="water-damage" size={25} color={Colors.default} style={{padding:5}}/>            
              <Text>home</Text>
            </TouchableOpacity>
      </Link>          
          </View>
    </View>
  )
}

export default Home