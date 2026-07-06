import { Metodologia } from "@/hooks/useMetodologias";
import { colors, globalStyles } from "@/styles/global";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const url = "http://192.168.1.178:42069/api/repository"




export function RepositorioLink(props: Metodologia) {
    return (
        <Link href={`./repository/${props.id}`}
        style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <Text style={globalStyles.title1}>
                    {props.nombre} {"\n"}
                </Text>
            </View>
        <Text style={globalStyles.paragraph}>
            {props.descripcion} {"\n"}
        </Text>
        <View style={styles.motorPsicologicoContainer}>
            <Text style={styles.motorPsicologico}>
                {props.principalMotorPsicologico} {"\n"} 
            </Text>

        </View>

        </Link>
    )
}

const styles = StyleSheet.create({
    mainContainer:{
        gap: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        borderColor: colors.lightGray,
        borderWidth: 1,
        margin: 16,
        borderRadius: 8,
    },
    motorPsicologico:{
        padding: 2,
        borderRadius: 16,
        borderColor: colors.mainRed,
        borderWidth: 1,
        color: colors.darkRed,

    },
    motorPsicologicoContainer:{
        width: "100%",
        display: "flex",
        alignItems: "center",
        padding: 2,
        backgroundColor: colors.lightRed,
    },
    titleContainer:{
        display: "flex",
        alignItems: "center",
        width: "100%",
        borderBottomWidth: 1,
        borderColor: colors.darkBlue


    }
})
