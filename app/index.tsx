// import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, } from '@/components/Themed';
import Button from "@/src/components/Button"
import H1 from '@/components/core/H1';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import { Input } from '@/src/components/Input';
import { SegundaViaForm } from '@/src/components/SegundaViaForm';
// import LinearGradient from 'react-native-linear-gradient';



import React from 'react';
import {StyleSheet, Dimensions, View, Platform} from 'react-native';
import Pdf from 'react-native-pdf';

import {LinearGradient} from 'expo-linear-gradient';

  const source = { uri: 'http://www.africau.edu/images/default/sample.pdf', cache: true };

export default function TabOneScreen() {
  return (
    // <SafeAreaView style={styles.container}>
      <LinearGradient
            colors={['#281483', '#5E72E4', '#8F6ED5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1, }}
        >
          
<Pdf
  source={require('../assets/file.pdf')}
  style={{
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }}
/>
    {/* <Pdf
      source={source}
      style={{ flex: 1, width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
    /> */}
      {/* <SegundaViaForm/> */}
          
      {/* <Input status="success"></Input>
      <Input />
      <View style={styles.div}>
        <Button text='default' type="default"></Button>
        <Button text='default' type="default"></Button>
      </View> */}



    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding:0
    // backgroundColor: "#1A174D",
  },
  
  //  horizontal space
  div: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: "transparent"
  }
});
