import Colors from '@/constants/Colors';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { TextInput, Text, TextInputProps, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Input } from './Input';
import {LinearGradient} from 'expo-linear-gradient';
import Button from './Button';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, useNavigation, useRouter } from 'expo-router'

import { showMessage, hideMessage } from "react-native-flash-message";

type InputProps = TextInputProps & {
  status?: 'success' | 'fail';
};

interface segundaViaResponse {
    data: string,
    valor: string,
    idConta: string
}

function is_numeric(str:string){
    return /^\d+$/.test(str);
}

export const SegundaViaForm: React.FC<InputProps> = () => {
    const navigation = useNavigation()
    

    useLayoutEffect(()=>{
    // header
        navigation.setOptions({
//       headerTransparent:false,
            headerTitle: 'Segunda via',
            headerTintColor: Colors.gray_txt
//     //   headerLeft: () => (
        
//     headerRight: () => (
            
//           )
    })

//     // handleFuncionarioData()

    }, [])

    const [ inputValue, onInputChange ] = React.useState('') 
    const [api_fetch_data, onApiData] = React.useState<segundaViaResponse[]>();

    const [showList, onHideList] = React.useState(false)

    const getData = async () => {

        if ( inputValue && is_numeric(inputValue) ){
            axios.get(`https://saae-back.e-north.com.br/api/gsan/fatura_matricula/${inputValue}/`)
            .then(function(response){
                let data:segundaViaResponse[] = response.data.results
                onApiData(data)  
                onHideList(true)

                showMessage({
                    message: "Carregado com sucesso",
                    // description: "Não há faturas em aberto da matrícula digitada.",
                    type: "success",
                });

            })
            .catch(function(error){
                onHideList(false)
                showMessage({
                    message: "Não encontrado",
                    description: "Não há faturas em aberto da matrícula digitada.",
                    type: "warning",
                });
            })
        }
        else {
            onHideList(false)
            showMessage({
                message: "Matrícula não válida",
                description: "Digite uma matrícula válida.",
                type: "danger",
            });

        }

        
    };

    return (
        <LinearGradient
            colors={['#281483', '#5E72E4', '#8F6ED5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1, }}
        >
            <View style={styles.container}>
                <View style={{}}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Segunda Via</Text>
                    </View>

                    <Input value={inputValue} onChangeText={onInputChange} type='form' placeholder='Matricula'/>
                    
                    <View style={{ paddingHorizontal: 100 }}>
                        <Button type='primary' text='Buscar' onPress={getData}/>
                    </View>
                </View>

                <View style={{ marginTop: 50}}>
                    {
                        showList && <FlatList
                            data={api_fetch_data}
                            renderItem={({item }) => (
                                <TouchableOpacity style={{
                                    flexDirection: 'row',
                                    alignItems:'center',
                                    padding: 10
                                }}>
                                    <Ionicons name="cloud-download-outline" size={30} color={Colors.default} style={{padding:10, paddingLeft:0}} />

                                    <View style={{flex: 3, justifyContent: 'center'}}>
                                        <Text style={{ fontSize: 18, fontFamily: "OpenSans", color: Colors.default }}>Vencimento: {item.data}</Text>
                                        <Text style={{color: Colors.medium_grey, fontSize: 17, fontFamily: "OpenSans"}}>Valor: R$ {item.valor}</Text>
                                    </View>
                                    
                                    <View style={{flexDirection: 'row', flex: 1,  justifyContent: 'flex-end'}}>
                                        <Ionicons name='chevron-forward' size={22} color={Colors.default}/>
                                    </View>
                                </TouchableOpacity>
                            )}
                            ItemSeparatorComponent={ItemSeparator}
                        />
                    }
                </View>
            </View>
        </LinearGradient>
    )
};

const ItemSeparator = () => {
    return <View style={{ marginVertical: 1, height:1, backgroundColor:Colors.light_grey}} />;
};

const styles = StyleSheet.create({
    container: {
        // justifyContent:'',
        // alignItems:'center',
        flexDirection:'column',
        flex: 1,
        paddingTop: 30,
        margin: 20,
        backgroundColor: Colors.light_grey_bg,
        borderRadius: 6,
        padding: 10,
    },
    textContainer: {
        alignItems:"center",
        
    },
    text: {
        fontFamily: "OpenSans",
        fontSize: 25,
        color: Colors.gray_txt
    },

    //


})
