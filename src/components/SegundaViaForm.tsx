import React from 'react';
import Button from './Button';
import { Input } from './Input';
import { Link, useNavigation } from 'expo-router';
import Colors from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, View, Keyboard, StyleSheet, FlatList, ActivityIndicator,TouchableOpacity } from 'react-native';
import { Conta, ErrorMessage, is_numeric, RootNavigationProp, RootStackParamList, SuccessMessage } from '../utils'
import { useSegViaStore } from '../useStore';



export const SegundaViaForm: React.FC = () => {
    const { 
        loading, 
        contas, 
        has_contas,
        getContasAbertas,
    } = useSegViaStore();
    
    const [ matricula, onMatriculaChange ] = React.useState<string>("") 

    const buscarFaturas = async () => {
        Keyboard.dismiss()

        if ( matricula && is_numeric(matricula) ){
            await getContasAbertas(matricula)
        }
        else {
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
                    <Button type='primary' text='Buscar' onPress={buscarFaturas}/>
                </View>
            </View>

            {
                loading &&
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color="#007AFF" />
                </View>
            }

            <View style={{ marginTop: 50}}>{has_contas && 
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
    const navigation = useNavigation<RootNavigationProp>()
    const { getBarCode, setFaturaAtual } = useSegViaStore();

    const copiarBarCode = async (matricula:string, id_conta:string ) => {
        await getBarCode(matricula, id_conta)
    }

    const vizualizarPdf = (id_conta:string) => {
        setFaturaAtual(id_conta)
        navigation.navigate("pdf")
    }
    
return (
    <>
        <View style={ styles.item_container } >
            <View style={ styles.item_left }>
                <Text style={ styles.vencimento_text }>Vencimento: {item.data}</Text>
                <Text style={ styles.valor_text }>Valor: R$ {item.valor}</Text>
            </View>
        </View>
                
        <Link href={{
            pathname:'/pdf',
        }} asChild>       
          {/* <TouchableOpacity> */}
            <Button type='default' text='visualizar PDF' onPress={()=>vizualizarPdf(item.idConta)} />
        {/* </TouchableOpacity>         */}
        </Link>     

        <View style={ styles.item_btn_container }>
            <Button type='info' text='Código de barras' fullWidth={ true } onPress={
                ()=>copiarBarCode(matricula, item.idConta)}/>
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
