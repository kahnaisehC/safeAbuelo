import { ForoLinkProps } from "@/hooks/useForumPosts";
import { colors, globalStyles } from "@/styles/global";
import Ionicons from "@react-native-vector-icons/ionicons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";


export type Evidence = {
    Id: Number
}



export function ForoLink(props: ForoLinkProps) {
    const [evidences, setEvidences] = useState<Evidence[]>([])
    const [loadingEvidences, setLoading] = useState(true)

    useEffect(()=>{
        console.log("loading evidences")
        // loadEvidences of Id
    },[])

    return (
        <Link href={`./forum/${props.id}`} style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.iconText}>
                    <Ionicons name={"chatbubbles"} color={colors.mainBlue} size={32} />
                    <Text>
                        {props.plataformaDeContacto}
                    </Text>
                </View>
                <View style={styles.iconText}>
                    <Ionicons name={"location"} color={colors.mainBlue} size={32} />
                    <Text>
                        {props.localidad}
                    </Text>
                </View>
                <View style={styles.iconText}>
                    <Ionicons name={"calendar"} color={colors.mainBlue} size={32} />
                    <Text>
                        {props.dateTime.toDateString()}
                    </Text>
                </View>
            </View>
            <Text style={globalStyles.paragraph}>
                {props.descripcionDelEngaño}
            </Text>
            <View
            style={styles.bottomStyles}>
                {props.ejercePresionPsicologica &&
                    (<Ionicons name="hammer" color={colors.mainRed} size={32}></Ionicons>)
                }
                {props.generaSentidoDeUrgencia && 
                    (<Ionicons name="timer" color={colors.mainRed} size={32}></Ionicons>)}

                    <Ionicons name="documents" color={colors.mainYellow} size={32}></Ionicons>
                    <Text style={globalStyles.paragraph}>
                        {evidences.length} evidencias
                    </Text>
            </View>
        </Link>
    )
}

const styles = StyleSheet.create({
    bottomStyles:{
        paddingLeft: 16,
        paddingRight: 16,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundColor: colors.lightGray,
        width: "100%",
        gap: 8,
    },
    mainContainer:{
        gap: 16,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        borderColor: colors.lightGray,
        borderWidth: 1,
        margin: 16,
        borderRadius: 8,
    },

    headerContainer:{
        paddingLeft: 16,
        paddingRight: 16,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: colors.lightGray,
        width: "100%",
        gap: 8,
    },

    iconText:{
        gap: 4,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    }

})