import { useAuth } from "@/context/AuthContext";
import { colors } from "@/styles/global";
import { StyleSheet, Text, View } from "react-native";


type HomeHeaderProps = {
  name: string|null,
};

export default function HomeHeader(props: HomeHeaderProps) {
  const { user } = useAuth()

  return (
    <View style={styles.headerContainer}>
      <Text
       style={styles.greetings}>
        ¡Hola, {!user ? "anónimo" : !user.displayName ? "Ian" : user.displayName}!
      </Text>
      <View
      style={styles.iconsContainer}>
      </View>
    </View>
  );
}


let styles = StyleSheet.create({
  headerContainer:{
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft:16,
    paddingRight:16,
    
    backgroundColor: colors.mainBlue,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greetings:{
    color: colors.lightGray,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  iconsContainer:{
    display: "flex",
    flexDirection: "row",
    gap: 16,
  }
})
