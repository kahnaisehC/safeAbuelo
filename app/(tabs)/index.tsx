import HomeHeader from "@/components/HomeHeader";
import MainLink from "@/components/MainLink";
import { useAuth } from "@/context/AuthContext";
import { colors } from "@/styles/global";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Index() {
  const {user, isAuthenticated} = useAuth()
  return (
    <SafeAreaView
      style={styles.homeContainer}
    >
      <HomeHeader
        name={user ? user.email : "Anónimo"}
      />
      <View style={styles.mainLinkContainer}>
      <MainLink
        backgroundColor={colors.mainRed}
        icon={"warning-outline"}
        text={"Estoy en PELIGRO!"}
        link={"./danger"}
        />

      <MainLink
        backgroundColor={colors.mainBlue}
        icon={"document-text-outline"}
        text={"Repositorio"}
        link={"./repository"}
        />
        <MainLink
        backgroundColor={colors.mainYellow}
        icon={"chatbubbles-outline"}
        text={"Foro"}
        link={"./forum"}
        />
      {!!user && <MainLink
        backgroundColor={colors.mainYellow}
        icon={"document-attach-outline"}
        text={"Añadir caso"}
        link={"./forum/add"}
        />}
      <MainLink
        backgroundColor={colors.lightGray}
        icon={"settings-outline"}
        text={"Opciones"}
        link={"./configuration"}
        />
      </View>
      <Text>
        Sponsors +
      </Text>




    </SafeAreaView>
  );
}

let styles = StyleSheet.create({
  homeContainer:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  mainLinkContainer:{
    paddingTop: 16,
    paddingBottom: 16,
    gap: 16,
    display: "flex",
    flexDirection: "column",
    maxWidth: "80%",
  }
})
