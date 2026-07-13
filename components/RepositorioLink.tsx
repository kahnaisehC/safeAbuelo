import { Metodologia } from "@/hooks/useMetodologias";
import { globalStyles } from "@/styles/global";
import { StyleSheet, Text, View } from "react-native";

const url = "???"

export function RepositorioLink(props: Metodologia) {
    return (
        <View
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

        </View>
    )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 16,

    // Shadow (iOS)
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    // Shadow (Android)
    elevation: 3,
  },

  titleContainer: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    paddingBottom: 8,
  },

  motorPsicologicoContainer: {
    marginTop: 16,
    backgroundColor: "#F5F7FA",
    borderLeftWidth: 4,
    borderLeftColor: "#4F46E5",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  motorPsicologico: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
    lineHeight: 22,
  },
});