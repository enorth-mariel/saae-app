import { create } from 'zustand'
import axios from 'axios'
import { BASE_API, BASE_PROXY, Conta, ErrorMessage, is_numeric, LOCAL_BASE_API, SEGUNDA_VIA_BARCODE, SEGUNDA_VIA_CONTAS, SuccessMessage } from './utils'
import * as Clipboard from "expo-clipboard";
import RNFetchBlob from "react-native-blob-util";



type SegundaViaState = {
    loading: boolean;
    error: boolean;
    contas: Conta[] | [];
    has_contas: boolean,
    barcode: string | null;
    matricula: string | null;
    id_conta: string | null;
    reset_state: ()=> void,
    resetMatriculaAtual: ()=>void;
    resetFaturaAtual: ()=>void;
    setFaturaAtual: ( id_conta:string) => void
    getContasAbertas: (matricula: string) => Promise<void>
    getBarCode: (matricula: string, id_conta:string) => Promise<void>
    downloadPdf: (matricula: string, id_conta:string) => Promise<void>
}

export const useSegViaStore = create<SegundaViaState>((set) => ({
    loading: false,
    error: false,
    contas: [],
    has_contas: false,
    barcode: null,
    matricula: null,
    id_conta: null,
    reset_state: ()=> {
        set({
            loading: false,
            error: false,
            contas: [],
            has_contas: false,
            barcode: null,
            matricula: null,
            id_conta: null,
        })     
    },
    resetMatriculaAtual(){
        set({matricula:null})
    },
    resetFaturaAtual(){
        set({id_conta:null})
    },
    setFaturaAtual(id_conta) {
        set({id_conta: id_conta})
    },
    getContasAbertas: async (matricula:string) => {
        set({loading: true})

        axios.get(`${BASE_API}${SEGUNDA_VIA_CONTAS}${matricula}/`)
            .then(function(response){
                let data:Conta[] = response.data.results

                set({
                    matricula: matricula,
                    contas: data,
                    has_contas: true,
                    error: false,
                    loading: false,
                })

                SuccessMessage("Faturas em aberto carregadas")

            }).catch(function(e){
                set({
                    matricula: null,
                    loading:false,
                    error: true, 
                    has_contas: false,  
                    contas: []
                })

                if (axios.isAxiosError(e) && e.response) {
                    if (e.response.status == 404){
                        e.response.data.message
                        ErrorMessage(
                            "Não encontrado",
                            "Não há faturas em aberto da matrícula digitada.",
                            "danger"
                        )
                    }
                    else if (e.response.status == 500){
                        ErrorMessage("Erro", "Problema no servidor", "danger");
                    }
                }
                else {
                    ErrorMessage("Erro", "Falha de rede", "danger");
                }
            })
            
    },
    getBarCode: async(matricula, id_conta) => {
        set({barcode: null})
        
        axios({
            url: `${BASE_API}${SEGUNDA_VIA_BARCODE}`,
            method: "get",
            timeout: 5000,
            params: {
                matricula: matricula,
                id_conta: id_conta
            }
        }).then(function(response){
            set({
                error:false,
                barcode: response.data.data
            })
            Clipboard.setStringAsync(response.data.data)

            SuccessMessage(
                "Código de barras copiado para o clipboard.",
            )
        }).catch(function(e){
            set({
                error:true,
                barcode: null
            })

            if (axios.isAxiosError(e) && e.response) {
                if (e.response.status == 404){
                    ErrorMessage(
                        "Não encontrado",
                        "Código de barras não encontrado.",
                        "danger"
                    )
                }
                else if (e.response.status == 500){
                    ErrorMessage("Erro", "Problema no servidor. Tente novamente mais tarde.", "danger");
                }
            }
            else {
                ErrorMessage("Erro", "Falha de rede", "danger");
            }
        })
    },
    downloadPdf: async (matricula, id_conta) => {
        const url = `${BASE_PROXY}segundaViaContaRelatorio?matricula=${matricula}&idConta=["${id_conta}"]`
        const path = `${RNFetchBlob.fs.dirs.DownloadDir}/fatura_saae.pdf`

        const exists = await RNFetchBlob.fs.exists(path);
        if (exists) {
            await RNFetchBlob.fs.unlink(path);
        }
        try{
            const res = await RNFetchBlob.config({
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    path: path,
                    description: 'Baixando arquivo em PDF',
                    mediaScannable: true,
                },
            }).fetch("GET", url)
            // = RNFetchBlob.config({
            //     addAndroidDownloads: {
            //         useDownloadManager: true,
            //         notification: true,
            //         path: `${RNFetchBlob.fs.dirs.DownloadDir}/fatura.pdf`,
            //         title: 'FaturaSaae',
            //         description: 'PDF baixado',
            //         mime: 'application/pdf',
            //         mediaScannable: true,
            //     },
            // }).fetch('GET', url);

            // RNFetchBlob.fs.scanFile([{ path: res.path(), mime: 'application/pdf' }]);
            SuccessMessage(`PDF saved at:${res.path()}`, );
        }catch(e){
            console.log(e)
            ErrorMessage(
                "Erro ao salvar PDF",
                "Não foi possível copiar para a pasta Downloads.",
                "danger"
            )
        }
        
    },
}))


    const downloadFile = async ( ) => {
        
    }