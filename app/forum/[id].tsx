import { TipoEvidenciaToString, useEvidences } from "@/hooks/useEvidencias";
import { useForumPosts } from "@/hooks/useForumPosts";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/*


export type ForoLinkProps ={
    Id: Number ,
    DateTime: Date,
    Localidad: string,
    PlataformaDeContacto: string,
    EjercePresionPsicologica: boolean,
    GeneraSentidoDeUrgencia: boolean,
    DescripcionDelEngaño: string,
    Estado: string,
}

export type Evidence = {
  id: number;
  tipo: TipoEvidencia;
  valor: string;
  notas: string;
  reporteIncidenteId: number;
};
*/



export default function forumPostPage(){
    let { id } = useLocalSearchParams();
    if(typeof id === 'object'){
        id = "1"
    }
    let idNumber = parseInt(id)
    if(idNumber < 35){
        idNumber = 3
    }else if(idNumber < 70){
        idNumber = 1
    }
    else{
        idNumber = 2;
    }




    console.log(idNumber)
    const {oldForoLinks, loading} = useForumPosts()
    const post = oldForoLinks[idNumber]
    console.log(post)
    const {evidences} = useEvidences(idNumber)
    console.log(oldForoLinks)



  return (
    <SafeAreaView style={styles.card}>
        {!loading && post !== undefined && (<>
      <Text style={styles.title}>{post.plataformaDeContacto}</Text>

      <Text style={styles.date}>
        {new Date(post.dateTime).toLocaleString()}
      </Text>

      <View style={styles.section}>
        <Text style={styles.label}>Localidad</Text>
        <Text style={styles.value}>{post.localidad}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Descripción del engaño</Text>
        <Text style={styles.value}>{post.descripcionDelEngaño}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Presión psicológica</Text>
        <Text style={styles.value}>
          {post.ejercePresionPsicologica ? "Sí" : "No"}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Generó urgencia</Text>
        <Text style={styles.value}>
          {post.generaSentidoDeUrgencia ? "Sí" : "No"}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Estado</Text>
        <Text style={styles.value}>{post.estado}</Text>
      </View>

      <View style={styles.divider} />

      <Text style={styles.evidenceTitle}>Evidencias</Text>

      {evidences.length === 0 ? (
        <Text style={styles.empty}>No hay evidencias.</Text>
      ) : (
        evidences.map((evidence) => (
          <View key={evidence.id} style={styles.evidenceCard}>
            <Text style={styles.evidenceType}>
              {TipoEvidenciaToString(evidence.tipo)}
            </Text>

            <Text style={styles.evidenceValue}>
              {evidence.valor}
            </Text>

            {evidence.notas ? (
              <Text style={styles.evidenceNotes}>
                {evidence.notas}
              </Text>
            ) : null}
          </View>
        ))
      )}
        </>)}
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  date: {
    color: "#666",
    marginBottom: 16,
  },
  section: {
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontWeight: "600",
    color: "#444",
  },
  value: {
    color: "#222",
    flexShrink: 1,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginVertical: 16,
  },
  evidenceTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  evidenceCard: {
    backgroundColor: "#F7F7F7",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  evidenceType: {
    fontWeight: "700",
    marginBottom: 4,
  },
  evidenceValue: {
    fontSize: 15,
    marginBottom: 4,
  },
  evidenceNotes: {
    color: "#666",
    fontStyle: "italic",
  },
  empty: {
    color: "#888",
    fontStyle: "italic",
  },
});