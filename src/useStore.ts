import { create } from 'zustand'
import axios from 'axios'
import { BASE_API, BASE_PROXY, Conta, ErrorMessage, Address, LOCAL_BASE_API, SEGUNDA_VIA_BARCODE, SEGUNDA_VIA_CONTAS, SuccessMessage, T_BAR_CODE, T_PIX_CODE, BAR_CODE, PIX_CODE } from './utils'
import * as Clipboard from "expo-clipboard";
import RNFetchBlob from "react-native-blob-util";
import * as Network from "expo-network";
// import Geolocation from 'react-native-geolocation-service';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform } from 'react-native';

type GeolocationState = {
    address: Address | null,
    locationPermsGranted: boolean,
    requestLocationPerms: ()=> Promise<boolean>
    getCurrentLocation: () => Promise<void>
}

export const useGeolocationStore = create<GeolocationState>((set, get)=> ({
    address: null,
    locationPermsGranted: false,
    requestLocationPerms: async () => {
        if (Platform.OS === 'android') {
            const alreadyGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)

            if (alreadyGranted) {
                console.log("location: true")
                set({locationPermsGranted:true})
                return true
            }

            const permissionResult = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );

            if (permissionResult === PermissionsAndroid.RESULTS.GRANTED){
                console.log("location: true")
                set({locationPermsGranted:true})
                return true
            }
            
            console.log("location: false")
            set({locationPermsGranted:false})
            return false
        }

        return false
    },
    getCurrentLocation: async () => {
        try {
            
            if (!get().locationPermsGranted) {
                return
            }

            // Add a timeout to prevent hanging
            const timeoutId = setTimeout(() => {
            }, 10000) // 10 second timeout
            
                // Try with minimal configuration
            Geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude
                    const long = position.coords.longitude

                    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`, {
                        headers: {
                            'User-Agent': 'MyReactNativeApp/1.0.0 (your-email@example.com)',
                            'Accept': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(json => {
                        let curr_address: Address = {
                            cep: json.address.postcode,
                            rua: json.address.road,
                            bairro: json.address.suburb,
                            cidade: json.address.city,
                            estado: json.address.state,
                            pais: json.address.country,
                            pais_codigo: json.address.country_code,
                            lat: json.lat,
                            long: json.lon
                        }

                        set({address: curr_address})

                        console.log("Address:", json)
                    })
                    .catch(err => console.error(err))
                    console.log("Got position:", position.coords.latitude)
                    
                },
                (error) => {
                    console.error("Location error code:", error.code, "message:", error.message)
                    
                },
                { 
                    enableHighAccuracy: false,
                    timeout: 30000,
                    maximumAge: 60000
                }
            )
        } catch (error) {
            console.log(error)
        }
    }
}))

type InternetAccessState = {
    hasInternetAccess: boolean | null;
    checkInternetAccess: () => Promise<void>
}

export const useInternetAccess = create<InternetAccessState>((set) => ({
    hasInternetAccess: true,
    checkInternetAccess: async () => {
        const state = await Network.getNetworkStateAsync();

    //   setStatus(state.isConnected ? "Online" : "Offline");
        // NetInfo.fetch().then(state => {
        //     console.log('Connection type', state.type);
        //     console.log('Is connected?', state.isConnected);
        console.log(state.isConnected )
            set({hasInternetAccess: state.isConnected })
        // });
    },
}))


interface PaginationStore {
    data: Conta[];
    count: string | null;
    total_pages: string | null;
    nextPage: string | null;
    loading: boolean;
    loading_next: boolean;
    error: string | null;
    SegundaViaNextPage: (matricula:string) => Promise<void>;
    resetPaginationStore: () => void;
}


export const usePaginationStore = create<PaginationStore>((set, get) => ({
    data: [],
    count: null,
    total_pages: null,
    nextPage: null,
    loading: false,
    loading_next: false,
    error: null,
    SegundaViaNextPage: async (matricula: string) => {
        const { nextPage, data, loading } = get();
        const setMatriculaAtual = useSegViaStore.getState().setMatriculaAtual;
        const resetMatriculaAtual = useSegViaStore.getState().resetMatriculaAtual

        let url: string | null = null;

        // First request
        if(data.length === 0) {
            url = `http://10.0.2.2:8080/api/${SEGUNDA_VIA_CONTAS}${matricula}/`;
            set({ loading: true });
        } 
        else if(!nextPage || loading) {
            return;
        } else {
            url = nextPage;
            set({ loading_next: true });
        }


        axios.get(url)
        .then(function(response){
            let novas_contas:Conta[] = response.data.results
            setMatriculaAtual(matricula)

            set({
                data: [...data, ...novas_contas],
                nextPage: response.data.next,
                count: response.data.count,
                total_pages: response.data.total_pages,
                loading: false,
                loading_next: false
            });
  
            if (data.length === 0){
                SuccessMessage('Faturas em aberto carregadas');
            }

        }).catch(function(e){
            resetMatriculaAtual()

            set({
                data: [],
                count: null,
                total_pages: null,
                nextPage: null,
                loading: false,
                loading_next: false
            });

            if (axios.isAxiosError(e) && e.response) {
                if (e.response.status == 404){
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
    resetPaginationStore: () => set({
        data: [],
        count: null,
        total_pages: null,
        nextPage: null,
        loading: false,
    })
}));

type SegundaViaState = {
    pix: string | null
    barcode: string | null;
    matricula: string | null;
    id_conta: string | null;
    reset_state: ()=> void,
    resetMatriculaAtual: ()=>void;
    resetFaturaAtual: ()=>void;
    setFaturaAtual: ( id_conta:string) => void
    setMatriculaAtual: (matricula:string) => void
    getFaturaCode: (matricula: string, id_conta:string, curr_address:Address|null, tipo_code: T_BAR_CODE | T_PIX_CODE) => Promise<void>
    downloadPdf: (matricula: string, id_conta:string) => Promise<void>
}

export const useSegViaStore = create<SegundaViaState>((set) => ({
    pix: null,
    barcode: null,
    matricula: null,
    id_conta: null,

    reset_state: ()=> {
        set({
            barcode: null,
            pix: null,
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
    setMatriculaAtual(matricula) {
        set({matricula: matricula})
    },
    getFaturaCode: async(matricula, id_conta, curr_address, tipo_code) => {
        set({barcode: null, pix:null})
        
        axios({
            url: `http://10.0.2.2:8080/api/${SEGUNDA_VIA_BARCODE}`,
            method: "get",
            timeout: 5000,
            params: {
                cod: tipo_code,
                matricula: matricula,
                id_conta: id_conta,
                metadata: JSON.stringify(curr_address)
            }
        }).then(function(response){
            
            if (tipo_code == BAR_CODE){                
                set({barcode: response.data.data})

                Clipboard.setStringAsync(response.data.data)
                SuccessMessage("Código de barras copiado para o clipboard.")
            }
            else if (tipo_code == PIX_CODE){
                set({pix: response.data.data})
                Clipboard.setStringAsync(response.data.data)
                SuccessMessage("Código PIX copiado para o clipboard.")
            }
            else{
                return
            }
            
            
        }).catch(function(e){
            set({barcode: null, pix: null})

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
