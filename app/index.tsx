import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import Button from "@/src/components/Button"
import H1 from '@/components/core/H1';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import { Input } from '@/src/components/Input';
import { SegundaViaForm } from '@/src/components/SegundaViaForm';


export default function TabOneScreen() {
  return (
    <SafeAreaView style={styles.container}>

      <SegundaViaForm/>
      {/* <Input status="success"></Input>
      <Input />
      <View style={styles.div}>
        <Button text='default' type="default"></Button>
        <Button text='default' type="default"></Button>
      </View> */}



    </SafeAreaView>
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
