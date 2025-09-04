import axios from 'axios';
import React from 'react';
import Button from './Button';
import { Input } from './Input';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';
import * as Clipboard from "expo-clipboard";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, View, Keyboard, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { BASE_API, Conta, ErrorMessage, is_numeric, LOCAL_BASE_API, SEGUNDA_VIA_BARCODE, SEGUNDA_VIA_CONTAS, SuccessMessage } from '../utils'



export const SegundaViaForm: React.FC = () => {
    const [ contas, setContas ] = React.useState<Conta[]>();
    const [ isDataLoaded, setDataLoaded ] = React.useState(false)
    const [ matricula, onMatriculaChange ] = React.useState<string>("") 
    const [ loading, onLoading ] = React.useState<boolean>(false)
    

    const getContasAbertas = async () => {

        if ( matricula && is_numeric(matricula) ){
            onLoading(true)
            setDataLoaded(false)

            axios.get(`${BASE_API}${SEGUNDA_VIA_CONTAS}${matricula}/`)
                .then(function(response){
                    //TODO handle pagination
                    let data:Conta[] = response.data.results

                    setContas(data)  
                    setDataLoaded(true)
                    onLoading(false)

                    Keyboard.dismiss()

                    SuccessMessage("Faturas carregadas")
                })
                .catch(function(error){
                    setDataLoaded(false)
                    onLoading(false)

                    ErrorMessage(
                        "Não encontrado",
                        "Não há faturas em aberto da matrícula digitada.",
                        "danger"
                    )
                })
        }
        else {
            setDataLoaded(false)
            onLoading(false)

            ErrorMessage(
                "Matrícula não válida",
                "Digite uma matrícula válida.",
                "warning"
            )
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

            {
                loading &&
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color="#007AFF" />
                </View>
            }

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

        }).catch(function(error){
            if (error.response) {
                ErrorMessage(
                    "Não foi possível copiar código de barras.",
                    `Erro ${error.response.status}`,
                    "danger"
                )
            } else if (error.request) {
                ErrorMessage(
                    "Não foi possível copiar código de barras.",
                    `Nenhuma resposta: ${error.request}`,
                    "danger"
                )
            } else {
                ErrorMessage(
                    "Não foi possível copiar código de barras.",
                    `${error.message}`,
                    "danger"
                )
            }
        })
    }

    const copyBarCodeToClipboard = async () => {
        await Clipboard.setStringAsync(barCode); 
    };

return (
    <>
        <Link href={{
            pathname:'/pdf',
            params: { matricula: matricula, idConta: item.idConta },
        }} asChild>               
            <TouchableOpacity style={ styles.item_container } >
                <View style={ styles.item_left }>
                    <Text style={ styles.vencimento_text }>Vencimento: {item.data}</Text>
                    <Text style={ styles.valor_text }>Valor: R$ {item.valor}</Text>
                </View>
                    
                <View style={ styles.item_right } >
                    <Ionicons name='chevron-forward' size={ 22 } color={ Colors.default }/>
                </View>        
                
            </TouchableOpacity>
        </Link>

        <View style={ styles.item_btn_container }>
            <Button type='info' text='Código de barras' fullWidth={ true } onPress={
                ()=>getBarCode(matricula, item.idConta)}/>

                {/* ()=> copyBarCodeToClipboard()} */}
            <Button type='default' text='PIX' fullWidth={ true } onPress={ ()=>ErrorMessage("Não implementado", "", 'danger') } />
        </View>
    </>
);}

const ItemSeparator = () => {
    return <View style={ styles.item_separator } />;
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.grey_bg,
        flexDirection:'column',
        paddingTop: 30,
        marginTop: 85,
        padding: 10,
        flex: 1,
    },
    textContainer: {
        alignItems: "center",
    },
    header_text: {
        textTransform: 'uppercase',
        fontFamily: "OpenSans",
        color: "#8898AA",
        padding: 10,
    },

    // item
    item_container: {
        flexDirection: "row", 
        margin:10,
        marginBottom:0,
        alignItems: "center", 
        padding: 10,
        borderRadius: 4,
        backgroundColor: Colors.test,
    },
    item_left: {
        flex: 4, 
        justifyContent: "center",
    },
    item_btn_container: {
        flexDirection: "row",
    },
    item_right: {
        flex: 1,  
        flexDirection: "row", 
        justifyContent: "flex-end",
        // backgroundColor:Colors.error,
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
