import Colors from '@/constants/Colors';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { TextInput, Text, TextInputProps, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Input } from './Input';
import {LinearGradient} from 'expo-linear-gradient';
import Button from './Button';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, useNavigation, useRouter } from 'expo-router'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { showMessage, hideMessage } from "react-native-flash-message";

type InputProps = TextInputProps & {
  status?: 'success' | 'fail';
};

interface SegundaViaResponse {
    data: string,
    valor: string,
    idConta: string
}

function is_numeric(str:string){
    return /^\d+$/.test(str);
}

export const SegundaViaForm: React.FC<InputProps> = () => {
    const navigation = useNavigation()
    

//     useLayoutEffect(()=>{
//     // header
//         navigation.setOptions({
// //       headerTransparent:false,
//             headerTitle: 'Segunda via',
//             headerTintColor: Colors.gray_txt
// //     //   headerLeft: () => (
        
// //     headerRight: () => (
            
// //           )
//     })

// //     // handleFuncionarioData()

//     }, [])

    const [ matricula, onInputChange ] = React.useState('') 
    const [api_fetch_data, onApiData] = React.useState<SegundaViaResponse[]>();

    const [showList, onHideList] = React.useState(false)
    const [barcode, onBarcode] = React.useState("")
    

    const getContasData = async () => {

        if ( matricula && is_numeric(matricula) ){
            axios.get(`https://saae-back.e-north.com.br/api/gsan/fatura_matricula/${matricula}/`)
            .then(function(response){
                let data:SegundaViaResponse[] = response.data.results
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
                    duration: 5000,
                    type: "warning",
                });
            })
        }
        else {
            onHideList(false)
            showMessage({
                message: "Matrícula não válida",
                description: "Digite uma matrícula válida.",
                duration: 5000,
                type: "danger",
            });

        }

        
    };

        const getBarCode = async (matricula:string, id_conta:string ) => {
        axios({
            method: "get",
            url: "http://10.0.2.2:8080/api/gsan/segunda_via/codigo_barras",
            params: {
                matricula: matricula,
                id_conta: id_conta
            },
        }).then(function(response){
            onBarcode(response.data.data)
                 showMessage({
                    message: "Código de barras copiado com sucesso",
                    // description: "Não há faturas em aberto da matrícula digitada.",
                    duration: 5000,
                    type: 'success',
                });  

        }).catch(function(e){
                          showMessage({
                    message: e.message,
                    description: "Não há faturas em aberto da matrícula digitada.",
                    duration: 5000,
                    type: "warning",
                });  
        })
    }



    return (
        <View style={styles.container}>
            <View style={{}}>
                {/* <View style={styles.textContainer}>
                </View> */}


                <Text style={styles.text}>Digite o Nº da matrícula</Text>

                <Input value={matricula} onChangeText={onInputChange} type='form' placeholder='Matricula'/>
                
                <View style={{ paddingHorizontal: 100 }}>
                    <Button type='primary' text='Buscar' onPress={getContasData}/>
                </View>
            </View>

            <View style={{ marginTop: 50}}>
                {
                    showList && <FlatList
                        data={api_fetch_data}
                        renderItem={({item }) => <Item item={item} matricula={matricula} getBarCode={getBarCode}></Item>}
                        ItemSeparatorComponent={ItemSeparator}
                    />
                }
            </View>

            <Text>
                {barcode}
            </Text>

        </View>
    )
};


type ItemProps = {
  item: SegundaViaResponse;
  matricula: string;
  getBarCode: (matricula: string, id_conta: string) => void;
}

const Item = ({ item, matricula, getBarCode }: ItemProps) => (
<View>
    <View style={{ flexDirection: 'row', alignItems:'center', padding: 10, paddingBottom:0 }}>
        <View style={{flex: 3, justifyContent: 'center'}}>
            <Text style={{ fontSize: 18, fontFamily: "OpenSans", color: Colors.default }}>Vencimento: {item.data}</Text>
            <Text style={{color: Colors.medium_grey, fontSize: 17, marginTop:8, fontFamily: "OpenSans"}}>Valor: R$ {item.valor}</Text>
        </View>
        
        {/* TODO - show the pdf on click here */}
        <TouchableOpacity onPress={() => getBarCode(matricula, item.idConta)} style={{flexDirection: 'row', flex: 1,  justifyContent: 'flex-end'}}>
                <Ionicons name='chevron-forward' size={22} color={Colors.default}/>
            {/* </View> */}

        </TouchableOpacity>
    
    </View>

    <View style={{flexDirection:"row", marginTop:0 }}>
        {/* backgroundColor: Colors.success */}
        <Button type='info' text='Código de barras' onPress={()=>getBarCode(matricula, item.idConta)} fullWidth={true}/>
        <Button type='default' text='PIX' onPress={()=>console.log("TODO")} fullWidth={true}/>
    </View>

</View>
);

const ItemSeparator = () => {
    return <View style={{ marginVertical: 1, height:1, backgroundColor:Colors.light_grey}} />;
};

const styles = StyleSheet.create({
    container: {
        // justifyContent:'',
        // alignItems:'center',
        marginTop: 100,
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
        // fontSize: 25,
        padding: 10,
        textTransform: 'uppercase',
        color: "#8898AA"
    },

      roundIconContainer:{
    width:40,
    height:40,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: "#EA4C89",
    alignItems: 'center',
    justifyContent: 'center'
  },
})
