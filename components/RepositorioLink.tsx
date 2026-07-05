import { Text, View } from "react-native";



export type RepositorioLinkProps = {
    Nombre: string,
    Descripcion: string,
    PrincipalMotorPsicologico: string,
    SeñalesDeAlarma: string,
    AccionPreventiva: string,
    EstaActivo: boolean
}



export function RepositorioLink(props: RepositorioLinkProps) {
    return (
        <View>
        <Text>
            Nombre: {props.Nombre} {"\n"}
        </Text>
        <Text>
            Descripcion: {props.Descripcion} {"\n"}
        </Text>
        <Text>
            PrincipalMotorPsicologico: {props.PrincipalMotorPsicologico} {"\n"} 
        </Text>
        <Text>
            SeñalesDeAlarma: {props.SeñalesDeAlarma} {"\n"}
        </Text>
        <Text>
            AccionPreventiva: {props.AccionPreventiva} {"\n"}
        </Text>
        <Text>
            EstaActivo: {props.EstaActivo ? "true" : "false"} {"\n"}
        </Text>

        </View>
    )
}