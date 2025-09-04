import { View,StyleSheet, Dimensions, Text, Button, Platform, ActivityIndicator } from 'react-native'
import React from 'react'
import Pdf from 'react-native-pdf';
import axios from 'axios';
import { showMessage } from "react-native-flash-message";
import RNFetchBlob from "react-native-blob-util";
import { useLocalSearchParams } from 'expo-router';

const DOCUMENT = { uri: 'bundle-assets://file.pdf' }

interface Conta {
    data: string,
    valor: string,
    idConta: string
}

const BASE_PROXY = "https://saae.e-north.com.br/gsan/"



type InputProps = {
    matricula: string,
    idConta: string
};


const PdfView = () => {
    const [pdfUri, setPdfUri] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(true);
    const { matricula, idConta } = useLocalSearchParams<{
        matricula: string;
        idConta: string;
    }>();
    React.useEffect(() => {
        const getPdfFile = async () => {
            console.log(matricula)
            console.log(idConta)
            try {
                const { dirs } = RNFetchBlob.fs;
                const path = `${dirs.DocumentDir}/temp.pdf`;
                const url = `${BASE_PROXY}segundaViaContaRelatorio?matricula=${matricula}&idConta=["${idConta}"]`

                const res = await RNFetchBlob.config({
                    fileCache: true,
                    path,
                }).fetch("GET", url);

                setPdfUri(res.path());
                
            } catch (error) {
                showMessage({
                    message: "Não foi possível abrir arquivo. Tente Novamente mais tarde.",
                    duration: 5000,
                    type: "danger",
                });

                console.log("PDF download error:", error);
            } finally {
                setLoading(false);
            }
        }

        getPdfFile()
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

    // const getContasAbertas = async () => {

        // if ( matricula && is_numeric(matricula) ){
   

            // axios.get('')
            //     .then(function(response){
            //         let data:Conta[] = response.data.results

            //         // setContas(data)  
            //         // setDataLoaded(true)

            //     })
            //     .catch(function(error){
            //         // setDataLoaded(false)

            //         showMessage({
            //             message: "Não encontrado",
            //             description: "Não há faturas em aberto da matrícula digitada.",
            //             duration: 5000,
            //             type: "warning",
            //         });
            //     })
                
    // };







    return (
        <View style={styles.container}>
             <Pdf
                source={{ uri: pdfUri }}
                style={styles.pdf}
                onLoadComplete={(numberOfPages) => console.log(`PDF loaded, pages: ${numberOfPages}`)}
                onError={(error) => console.log("PDF load error:", error)}
                />
            {/* <Pdf source={DOCUMENT} style={styles.pdf} 
                enableDoubleTapZoom={true}
            /> */}
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
});
export default PdfView
