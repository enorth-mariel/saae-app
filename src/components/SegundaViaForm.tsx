import React from 'react';
import Button from './Button';
import Colors from '@/constants/Colors';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from 'expo-router';
import { useGeolocationStore, usePaginationStore, useSegViaStore } from '../useStore';
import { BAR_CODE, Conta, ErrorMessage, is_numeric, PIX_CODE, RootNavigationProp } from '../utils'
import { Text, View, Keyboard, StyleSheet, FlatList, ActivityIndicator,TouchableOpacity, TextInput } from 'react-native';


export const SegundaViaForm: React.FC = () => {
	const { resetPaginationStore, SegundaViaNextPage, loading_next,	loading, count, data } = usePaginationStore()
    const { resetMatriculaAtual } = useSegViaStore();
    
	const [ matricula, onMatriculaChange ] = React.useState<string>("") 



    const buscarFaturas = async () => {
		Keyboard.dismiss()
		resetPaginationStore()
		
        if ( matricula && is_numeric(matricula) ){
          	await SegundaViaNextPage(matricula)
        }
        else {
			resetMatriculaAtual()
            ErrorMessage("Matrícula não válida", "Digite uma matrícula válida.", "warning")
        }        
    };

    return (
        <View style={ styles.container }>
            <View style={{paddingHorizontal:10}}>
                <Text style={ styles.header_text }>Digite sua matrícula</Text>

                <View style={styles.inputContainer}>
                    <FontAwesome6 name="magnifying-glass" size={18} color={"#000"} style={styles.icon} />
                        <TextInput
                            placeholder={"Pesquisar"}
                            placeholderTextColor={Colors.medium_grey}
                            style={styles.input}
                            onChangeText={onMatriculaChange}
                            value={matricula}
                        />
                </View>

                <View style={{ paddingHorizontal: 100 }}>
                    <Button type='primary' text='Buscar' onPress={buscarFaturas}/>
                </View>
            </View>

            {loading &&
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color="#007AFF" />
                </View>
            }

            <View style={{ marginTop: 50, marginBottom: 50,}}>
				{ data.length > 0 && 
					<>
						<View style={styles.summaryContainer}>
							{ data.length == 1 
								? 
								<Text style={styles.summaryText}>{count} conta em aberto</Text>
								:
								<Text style={styles.summaryText}>{count} contas em aberto</Text>
							}
						</View>
					
						<ItemSeparator></ItemSeparator>

						<FlatList 
							data={ data } 
							ItemSeparatorComponent={ItemSeparator} 
							contentContainerStyle={{ paddingBottom: 180 }}
							onEndReached={()=>SegundaViaNextPage(matricula)}
							ListFooterComponent={loading_next ? <ActivityIndicator size="large" /> : null}
							renderItem={( { item } ) => <Item item={ item } matricula={ matricula }></Item> }/>
					</> 
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
    const { getFaturaCode, setFaturaAtual } = useSegViaStore();
    const { address } = useGeolocationStore()

    const copiarCode = async (matricula:string, id_conta:string, tipo:1 | 2 ) => {
		console.log("copiando codigo de barras")
		console.log(address)
        await getFaturaCode(matricula, id_conta, address, tipo)
    }

    const vizualizarPdf = (id_conta:string) => {
        setFaturaAtual(id_conta)
        navigation.navigate("pdf")
    }
    
	return (
		<View style={styles.card}>
			<View style={styles.itemInfoRow}>
				<View style={styles.itemInfoLeft}>
					<Text style={styles.valor}>R$ {item.valor}</Text>
				</View>
				
				<View style={styles.itemInfoRight}>
					<Text style={styles.vencimento}>Vencimento: {item.data}</Text>
				</View>
			</View>
		
			<View style={{ flexDirection: "row", justifyContent: "space-around", paddingHorizontal: 20 }}>
				<TouchableOpacity  onPress={()=>copiarCode(matricula, item.idConta, PIX_CODE)} style={{paddingHorizontal:15, paddingVertical:0, borderRadius: 10, display: 'flex', flexDirection: 'row',justifyContent: 'center', alignItems: "center", backgroundColor: Colors.light_grey_bg }}>
					<FontAwesome6 name="pix" size={20} color="black" />
					<Text style={{ marginLeft: 5}}>Pix</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={()=>copiarCode(matricula, item.idConta, BAR_CODE)} style={{paddingHorizontal:15, paddingVertical:10, borderRadius: 10, display: 'flex', flexDirection: 'row',justifyContent: 'center', alignItems: "center", backgroundColor: Colors.light_grey_bg }}>
					<MaterialCommunityIcons name="barcode-scan" size={20} color="black" />
					<Text style={{ marginLeft: 5 }}>Boleto</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={()=>vizualizarPdf(item.idConta)} style={{paddingHorizontal:15, paddingVertical:10, borderRadius: 10, display: 'flex', flexDirection: 'row',justifyContent: 'center', alignItems: "center", backgroundColor: Colors.light_grey_bg }}>
					<FontAwesome6 name="file-pdf" size={20} color="black" />
					<Text style={{ marginLeft: 5 }}>PDF</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const ItemSeparator = () => {
    return <View style={ styles.item_separator } />;
};

const styles = StyleSheet.create({
    summaryContainer: {
		display:'flex',
		alignItems: 'flex-end'   ,
		paddingHorizontal: 20,
		borderRadius: 8,
		marginBottom: 5,
	},
	summaryText: {
		fontSize: 16,
		color: "#374151",
		marginBottom: 4,
	},
    card: {
		paddingVertical: 16,
		paddingHorizontal: 25,
	},
	itemInfo: {
		marginBottom: 16,
	},
	vencimento: {
		fontSize: 13,
		color: "#6b7280",
		marginBottom: 4,
	},
	valor: {
		fontSize: 20,
		fontWeight: "600",
		color: "#111827",
	},
	actions: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	actionBtn: {
		alignItems: "center",
		flex: 1,
	},
	actionText: {
		marginTop: 6,
		fontSize: 12,
		color: "#374151", 
	},
	referencia: {
		fontSize: 12,
		color: "#6b7280",
		marginTop: 2,
	},
	itemInfoRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 16,
	},
	itemInfoLeft: {
		flex: 1,
	},
	itemInfoRight: {
		flex: 1,
		alignItems: "flex-end",
	},
  	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: Colors.medium_grey,
		borderRadius: 18,
		paddingHorizontal: 12,
		margin: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		backgroundColor: "#fff",
	},
	icon: {
		marginRight: 8,
	},
	input: {
		flex: 1,
		paddingVertical: 8,
		fontFamily: "OpenSans",
		fontSize: 16,
	},
    container: {    
        backgroundColor: "#fff",
        flexDirection:'column',
        paddingTop: 30,
        marginTop: 85,
        flex: 1,
    },
    textContainer: {
        alignItems: "center",
    },
    header_text: {
        alignSelf:'center',
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
        backgroundColor:'#d1d2d6ff',
        marginHorizontal:20,
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
