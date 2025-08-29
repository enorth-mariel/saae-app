import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useRef } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { Link, useNavigation } from 'expo-router'
// import CustomBottomSheet from './BottomSheet'
// import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { SafeAreaView } from 'react-native-safe-area-context'
// import { useAuthStore } from '@/store/autoStore'


const SearchBar = () => (
  <View style={styles.searchContainer}>
    <View style={styles.searchContent}>
      <View style={styles.searchField}>
        <Ionicons style={styles.searchIcon} name='search-outline' size={20} color={Colors.medium_grey}/>
        <TextInput style={styles.searchInput} placeholder="Pesquisar" placeholderTextColor={Colors.medium_grey}>

        </TextInput>

      </View>

      {/* <Link href={'/(modal)/filter'} asChild>
        <TouchableOpacity style={styles.optionButton}>
          <Ionicons name='options-outline' size={20} color={Colors.primary}/>
        </TouchableOpacity>
      </Link> */}
    </View>

  </View>
)

const CustomHeader = () => {
  const navigation = useNavigation()
//   const {LogOut} = useAuthStore()

//   const bottomSheetRef = useRef<BottomSheetModal>(null)

  const openBottomModal = ()=>{
    // bottomSheetRef.current?.present(); 
  }
  
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* <CustomBottomSheet ref={bottomSheetRef}/> */}

      <View style={styles.container}>
        <TouchableOpacity>
          <Image style={styles.logo} source={require("@/assets/images/logo.png")}/>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.titleContainer} onPress={openBottomModal}>
          <Text style={styles.title}>SAAE</Text>
          <View style={styles.locationContainer}>
            <Text style={styles.subtitle}>Selecionar localização</Text>
            <Ionicons name='chevron-down-outline' size={20} color={Colors.primary}/>
          </View>
        </TouchableOpacity> */}


        {/* <TouchableOpacity onPress={()=>{}} style={styles.profileContainer}>
          <Ionicons name='person-outline' size={20} color={Colors.primary}/>
          
        </TouchableOpacity> */}
        
      </View>
      {/* <SearchBar/> */}
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    // flex:1,
    backgroundColor: Colors.white_txt,
    // flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    
    paddingHorizontal:20,
  },
  
  logo: {
    height:50,
    width:50
  },
  
  container: {
    flex:1,

    // gap: 20,
    // backgroundColor: 'red',
    // height:60,
  },

  titleContainer: {
    flex:1
  },

  title:{
    fontSize: 14,
    fontWeight:'bold'
  },

  subtitle: {
    fontSize:12,
    color: Colors.medium_grey
  },

  locationContainer:{
    flexDirection:'row',
    alignItems:'center'
  },

  profileContainer: {
    backgroundColor: Colors.light_grey,
    padding: 10,
    borderRadius:50
  },

  searchContainer: {
    height: 60,
    backgroundColor: "#fff"
  },

  searchContent: {
    flexDirection:'row',
    gap: 10,
    paddingHorizontal:20,
    alignItems: 'center'
  },
  searchField: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: Colors.light_grey
  },

  searchIcon:{
    paddingLeft:10

  },

  searchInput: {
    padding:8,
    color:Colors.medium_grey
  },
  optionButton: {
    padding:10
  }
  
});

export default CustomHeader