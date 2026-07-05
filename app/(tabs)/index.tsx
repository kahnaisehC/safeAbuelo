import HomeHeader from "@/components/HomeHeader";
import MainLink from "@/components/MainLink";
import { colors } from "@/styles/global";
import { StyleSheet, Text, View } from "react-native";

function useUser(){
  return "Alejandro!"
}

export default function Index() {
  let name = useUser()
  return (
    <View
      style={styles.homeContainer}
    >
      <HomeHeader
        name={name}
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
      <MainLink
        backgroundColor={colors.mainYellow}
        icon={"document-attach-outline"}
        text={"Añadir caso"}
        link={"./forum/add"}
        />
      <MainLink
        backgroundColor={colors.lightGray}
        icon={"settings-outline"}
        text={"Configuración"}
        link={"./configuration"}
        />
      </View>
      <Text>
        Sponsors +
      </Text>




    </View>
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
