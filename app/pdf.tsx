import React from 'react'
import Pdf from 'react-native-pdf';
import RNFetchBlob from "react-native-blob-util";
import { useLocalSearchParams } from 'expo-router';
import { BASE_PROXY, ErrorMessage, SuccessMessage } from '@/src/utils';
import { View,StyleSheet, Dimensions, Text, ActivityIndicator } from 'react-native'




const PdfView = () => {
    const [pdfUri, setPdfUri] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(true);
    const { matricula, idConta } = useLocalSearchParams<{ matricula: string; idConta: string }>();


    React.useEffect(() => {
        const getPdfFile = async () => {

            try {
                const { dirs } = RNFetchBlob.fs;
                const path = `${dirs.DocumentDir}/temp.pdf`;
                const url = `${BASE_PROXY}segundaViaContaRelatorio?matricula=${matricula}&idConta=["${idConta}"]`

                const res = await RNFetchBlob.config({
                    fileCache: true,
                    path,
                }).fetch("GET", url);

                setPdfUri(res.path());
                SuccessMessage("PDF carregado")

                
            } catch (error) {
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

    return (
        <View style={styles.container}>
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
});
export default PdfView
