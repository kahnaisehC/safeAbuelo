import { fetchReporteById } from "@/api/getReporte";
import { Reporte } from "@/api/getReportes";
import { Evidencia } from "@/api/getReporteUser";
import { colors, globalStyles } from "@/styles/global";
import Ionicons from "@react-native-vector-icons/ionicons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";


/*
export interface Reporte {
  id: number;
  author: string;
  dateTime: Date;
  provincia: string;
  localidad: string;
  plataformaDeContacto: string;
  plataformaOtra: string;
  ejercePresionPsicologica: boolean;
  generaSentidoDeUrgencia: boolean;
  descripcionDelEngaño: string;
  estado: string;
}
  */


export function ForoLink(props: Reporte) {
    const [evidences, setEvidences] = useState<Evidencia[]>([])
    const [loadingEvidences, setLoading] = useState(true)

    useEffect(()=>{
        setLoading(true)
        fetchReporteById(Number(props.id))
        .then((reporte) => {
            setEvidences(() => {
                return reporte.evidencias
            })
        })
        .catch(console.error)
        .finally(()=>setLoading(false))
    },[])


return (
  <Link href={`./forum/${props.id}`} asChild>
    <Pressable>
      <View style={styles.card}>
            <View style={styles.headerContainer}>
                <View style={styles.iconText}>
                    <Ionicons name={"chatbubbles"} color={colors.mainBlue} size={32} />
                    <Text style={styles.metaText}>
                        {props.plataformaDeContacto}
                    </Text>
                </View>
                <View style={styles.iconText}>
                    <Ionicons name={"location"} color={colors.mainBlue} size={32} />
                    <Text style={styles.metaText}>
                        {props.localidad}
                    </Text>
                </View>
                <View style={styles.iconText}>
                    <Ionicons name={"calendar"} color={colors.mainBlue} size={32} />
                    <Text style={styles.metaText}>
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
      </View>
    </Pressable>
  </Link>
);
}
const styles = StyleSheet.create({
  card: {
    width: "100%",
    alignSelf: "stretch",

    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,

    borderWidth: 1,
    borderColor: "#E5E7EB",

    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  headerContainer: {
    marginBottom: 12,
  },

  iconText: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  metaText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#4B5563",
    flexWrap: "wrap",
  },

  bottomStyles: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
});