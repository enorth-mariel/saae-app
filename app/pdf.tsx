import React from 'react'
import Pdf from 'react-native-pdf';
import RNFetchBlob from "react-native-blob-util";
import { useLocalSearchParams } from 'expo-router';
import { BASE_PROXY, ErrorMessage, SuccessMessage } from '@/src/utils';
import { View,StyleSheet, Dimensions, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
// import FileViewer from "react-native-file-viewer";
import Feather from '@expo/vector-icons/Feather';

import { PermissionsAndroid } from 'react-native';
import Colors from '@/constants/Colors';
import { goBack } from 'expo-router/build/global-state/routing';
import { useSegViaStore } from '@/src/useStore';


const PdfView = () => {
    const [pdfUri, setPdfUri] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(true);
    const { matricula, id_conta } = useSegViaStore()
    const { resetFaturaAtual } = useSegViaStore();

    const getPdfFile = async () => {
        try {
            const url = `${BASE_PROXY}segundaViaContaRelatorio?matricula=${matricula}&idConta=["${id_conta}"]`
            const { dirs } = RNFetchBlob.fs;
            let path =`${dirs.DocumentDir}/temp.pdf`

            const res = await RNFetchBlob.config({
                fileCache: true,
                path: path,
            }).fetch("GET", url);

            setPdfUri(res.path());                
            SuccessMessage("PDF carregado")

        } catch (error) {
            resetFaturaAtual()
            goBack()
            ErrorMessage(
                "Não foi possível abrir arquivo. Tente Novamente mais tarde.",
                "",
                "danger",
            )

            console.log("PDF download error:", error);
        } finally {
            setLoading(false);
        }
    }
    

    React.useEffect(() => {
        if (!id_conta || !matricula) {
            goBack() 
            ErrorMessage(
                "Não foi possível abrir arquivo. Tente Novamente mais tarde.",
                "",
                "danger",
            )
        }
        else {   
            getPdfFile()
        }
    }, [])


    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    if (!pdfUri) {
        return (
            <View style={styles.center}>
                <Text>Error loading PDF</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
                  {/* <Ionicons name="camera-outline" size={24} color={Colors.secondary}  /> */}
                {/* <TouchableOpacity style={styles.roundIconContainer} onPress={downloadFile}>
                  <Feather name="download" size={24} color={Colors.secondary} />
                </TouchableOpacity> */}
            <Pdf
                source={{ uri: pdfUri }}
                style={styles.pdf}
                onLoadComplete={(numberOfPages) => console.log(`PDF loaded, pages: ${numberOfPages}`)}
                onError={(error) => console.log("PDF load error:", error)}
            />
            
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        marginTop: 80,
        flex:1, 
        justifyContent: "center",
    },
    pdf: {
        backgroundColor: "#000",
        height: Dimensions.get('window').height, 
        width: Dimensions.get('window').width,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
      roundIconContainer:{
    width:40,
    height:40,
    borderRadius: 20,
    marginHorizontal: 5,
    // backgroundColor: Colors.light_grey,
    alignItems: 'center',
    justifyContent: 'center'
  },

});
export default PdfView

