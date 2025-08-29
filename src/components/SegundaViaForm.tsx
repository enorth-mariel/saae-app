import axios from 'axios';
import React from 'react';
import Button from './Button';
import { Input } from './Input';
import Colors from '@/constants/Colors';
import * as Clipboard from "expo-clipboard";
import Ionicons from '@expo/vector-icons/Ionicons';
import { showMessage } from "react-native-flash-message";
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';



const BASE_API = "https://saae-back.e-north.com.br/api/"
const SEGUNDA_VIA_CONTAS = "gsan/fatura_matricula/"
const LOCAL_BASE_API = "http://10.0.2.2:8080/api/"
const SEGUNDA_VIA_BARCODE = "gsan/segunda_via/codigo_barras"

interface Conta {
    data: string,
    valor: string,
    idConta: string
}

function is_numeric(str:string){
    return /^\d+$/.test(str);
}

export const SegundaViaForm: React.FC = () => {
    const [ contas, setContas ] = React.useState<Conta[]>();
    const [ isDataLoaded, setDataLoaded ] = React.useState(false)
    const [ matricula, onMatriculaChange ] = React.useState<string>("") 
    

    const getContasAbertas = async () => {

        if ( matricula && is_numeric(matricula) ){

            axios.get(`${BASE_API}${SEGUNDA_VIA_CONTAS}${matricula}/`)
                .then(function(response){
                    //TODO handle pagination
                    let data:Conta[] = response.data.results

                    setContas(data)  
                    setDataLoaded(true)

                    showMessage({
                        message: "Carregado com sucesso!",
                        type: "success",
                    });

                })
                .catch(function(error){
                    setDataLoaded(false)

                    showMessage({
                        message: "Não encontrado",
                        description: "Não há faturas em aberto da matrícula digitada.",
                        duration: 5000,
                        type: "warning",
                    });
                })
        }
        else {
            setDataLoaded(false)

            showMessage({
                message: "Matrícula não válida",
                description: "Digite uma matrícula válida.",
                duration: 5000,
                type: "danger",
            });
        }        
    };

    return (
        <View style={ styles.container }>
            <View>
                <Text style={ styles.header_text }>Digite o Nº da matrícula</Text>

                <Input value={ matricula } onChangeText={onMatriculaChange} type='form' placeholder='Matricula'/>
                
                <View style={{ paddingHorizontal: 100 }}>
                    <Button type='primary' text='Buscar' onPress={getContasAbertas}/>
                </View>
            </View>

            <View style={{ marginTop: 50}}>
                {isDataLoaded && 
                    <FlatList 
                        data={ contas } 
                        ItemSeparatorComponent={ItemSeparator} 
                        renderItem={( { item } ) => <Item item={ item } matricula={ matricula }></Item> }/>
                }
            </View>
        </View>
    )
};


type ItemProps = {
  item: Conta;
  matricula: string;
}

const Item = ({ item, matricula }: ItemProps) => {
    const [ barCode, setBarCode ] = React.useState("")

    const getBarCode = async (matricula:string, id_conta:string ) => {
        axios({
            url: `${LOCAL_BASE_API}${SEGUNDA_VIA_BARCODE}`,
            method: "get",
            timeout: 5000,
            params: {
                matricula: matricula,
                id_conta: id_conta
            }
        })
        .then(function(response){
            setBarCode(response.data.data)
            copyBarCodeToClipboard()

        }).catch(function(e){
            showMessage({
                message: "Não foi possível copiaR código de barras.",
                duration: 5000,
                type: "warning",
            });  
        })
    }

    const copyBarCodeToClipboard = async () => {
        await Clipboard.setStringAsync(barCode);

        // showMessage({
        //     message: "Código de barras copiado com sucesso",
        //     duration: 5000,
        //     type: 'success',
        // });  
    };

return (
    <View style={ styles.item_container }>
        <View style={ styles.item_left }>
            <Text style={ styles.vencimento_text }>Vencimento: {item.data}</Text>
            <Text style={ styles.valor_text }>Valor: R$ {item.valor}</Text>
        
            <View style={ styles.item_btn_container }>
                <Button type='info' text='Código de barras' fullWidth={ true } onPress={()=>getBarCode(matricula, item.idConta)} />
                <Button type='default' text='PIX' fullWidth={ true } onPress={ ()=>console.log("TODO") } />
            </View>
        </View>
            
        {/* TODO - show the pdf on click here */}
        <TouchableOpacity style={ styles.item_right } onPress={() => ""} >
            <Ionicons name='chevron-forward' size={ 22 } color={ Colors.default }/>
        </TouchableOpacity>        
    </View>
);}

const ItemSeparator = () => {
    return <View style={ styles.item_separator } />;
};

const styles = StyleSheet.create({
    container: {
        // justifyContent:'',
        // alignItems:'center',
        // margin: 15,
        backgroundColor: Colors.light_grey_bg,
        flexDirection:'column',
        borderRadius: 6,
        paddingTop: 30,
        marginTop: 100,
        padding: 10,
        flex: 1,
    },
    textContainer: {
        alignItems: "center",
    },
    header_text: {
        // fontSize: 25,
        textTransform: 'uppercase',
        fontFamily: "OpenSans",
        color: "#8898AA",
        padding: 10,
    },
    roundIconContainer:{
        backgroundColor: "#EA4C89",
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        borderRadius: 20,
        height: 40,
        width: 40,
    },

    // item

    item_container: {
        // backgroundColor: Colors.success,
        flexDirection: "row", 
        alignItems: "center", 
        padding: 10,
        paddingBottom: 0,
        borderRadius: 4,
    },
    item_left: {
        flex: 4, 
        justifyContent: "center"
    },
    item_btn_container: {
        flexDirection: "row"
    },
    item_right: {
        flex: 1,  
        flexDirection: "row", 
        justifyContent: "flex-end"
    },
    item_separator: {
        backgroundColor:Colors.light_grey,
        marginVertical: 1, 
        height: 1
    },
    vencimento_text: {
        fontSize: 18, 
        fontFamily: "OpenSans",
        marginLeft: 10,
        color: Colors.default
    },
    valor_text: {
        color: Colors.medium_grey, 
        fontFamily: "OpenSans",
        marginTop: 8, 
        marginLeft: 10,
        fontSize: 17, 
    }
})
