import { Ionicons } from "@react-native-vector-icons/ionicons";
import { StyleSheet, Text, View } from "react-native";

export default function ProfileSection() {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Ionicons name="person" size={42} color="#FFF" />
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>Alejandro Gonzalez</Text>
        <Text style={styles.email}>alejandrogonzalez@email.com</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF30",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "700",
  },
  email: {
    color: "#D1D5DB",
    fontSize: 14,
    marginTop: 4,
  },
});
