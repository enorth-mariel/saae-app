import { showMessage } from "react-native-flash-message";


export const BASE_API = "https://saae-back.e-north.com.br/api/"
export const BASE_PROXY = "https://saae.e-north.com.br/gsan/"
export const LOCAL_BASE_API = "http://10.0.2.2:8080/api/"

export const SEGUNDA_VIA_BARCODE = "gsan/segunda_via/codigo_barras"
export const SEGUNDA_VIA_CONTAS = "gsan/fatura_matricula/"

export interface Conta {
    data: string,
    valor: string,
    idConta: string
}

export function is_numeric(str:string){
    return /^\d+$/.test(str);
}

export const SuccessMessage = (message:string) => {
    showMessage({
        message: message,
        type: "default", 
        backgroundColor: "#4CAF50",
        color: "#fff", 
        floating: true, 
        style: {
            marginTop:20,
            borderRadius: 10,
            padding: 15,
        },
        titleStyle: {
            fontWeight: "bold",
            fontSize: 16,
        },
        textStyle: {
            fontSize: 14,
        },    
    });
}


export const ErrorMessage = (message:string, description:string, type:"warning" | "danger") => {
    showMessage({
        message: message,
        description: description,
        duration: 5000,
        type: type,
        color: "#fff", 
        floating: true, 
        style: {
            marginTop:20,
            borderRadius: 10,
            padding: 15,
        },
        titleStyle: {
            fontWeight: "bold",
            fontSize: 16,
        },
        textStyle: {
            fontSize: 14,
        },    
    });
}
