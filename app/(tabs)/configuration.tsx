
import BackHeader from "@/components/BackHeader";
import { useAuth } from "@/context/AuthContext";
import { colors, globalStyles } from "@/styles/global";
import Ionicons from "@react-native-vector-icons/ionicons";
import { Href, Link } from "expo-router";
import { User } from "firebase/auth";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


interface IniciarSesionConfigProps {
  user: User | null

}

function IniciarSesionConfig( props: IniciarSesionConfigProps){
  if(!(props.user)){
    return <ConfigurationLink
    link={"/auth/login"}
    name={"Iniciar sesión"}
    ></ConfigurationLink>
  }

  return (
    <LogoutLink
    name={"Cerrar sesión"}
    link={"/"}
    >
    </LogoutLink>
  )
}

export default function Configuration() {
  const {user} = useAuth()
  return (
    <SafeAreaView
    style={{
      flex:1,

    }}
    >
      <BackHeader
      name={"Configuración"}
      ></BackHeader>
      
      <View 
      style={styles.scrollView}
      >
        <ConfigurationLink
        link={"/profile"}
        name={"Cuenta"}
        >
        </ConfigurationLink>
        <ConfigurationLink
        link={"/accessibility"}
        name={"Accesibilidad"}
        >
        </ConfigurationLink>

        <IniciarSesionConfig
          user={user}
        >
        </IniciarSesionConfig>

        <ConfigurationButton
          name={"Modo simple"}
          >
        </ConfigurationButton>
      </View>

    </SafeAreaView>
  );
}

type ConfigurationLinkProps = {
  link: Href,
  name: string

}

function LogoutLink(props: ConfigurationLinkProps){{
  const {logout} = useAuth()
  return (

    <Pressable onPress={logout} style={styles.linkContainer}>
      <View style={styles.leftContainer}>
        <Ionicons color="white" name="star" size={16} />
        <Text style={{...globalStyles.paragraph, color:"white"}} >{props.name}</Text>
      </View>
    </Pressable>
  )

}}

function ConfigurationLink(props: ConfigurationLinkProps){

  return(
    <Link href={props.link} style={styles.linkContainer}>
      <View style={styles.leftContainer}>
        <Ionicons color="white" name="star" size={16} />
        <Text style={{...globalStyles.paragraph, color:"white"}} >{props.name}</Text>
      </View>
    </Link>
  )
}

type ConfigurationLinkButton = {
  name: string
}
function ConfigurationButton(props: ConfigurationLinkButton){
  const [isOn, setIsOn] = useState(true)
  return (
    <View style={styles.linkContainer}>
      <View style={styles.leftContainer}>
        <Ionicons color="white" name="star" size={16} />
        <Text style={{...globalStyles.paragraph, color:"white"}} >{props.name}</Text>
      </View>
      <Pressable
        onPress={() => setIsOn(!isOn)}
        style={{
          backgroundColor: isOn ? colors.lightBlue: colors.lightRed,
          padding: 16,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "#fff" }}>
          {isOn ? "ON" : "OFF"}
        </Text>
      </Pressable>
    </View>

  )
}


const styles = StyleSheet.create({
  linkContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: colors.mainBlue,


    paddingVertical: 14,
    paddingHorizontal: 16,

    borderBottomWidth: 1,
    borderBottomColor: "#FFF",
  },

  leftContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8, // If this doesn't work on your RN version, use marginRight instead.
  },

  linkText: {
    color: "#FFF",
    fontSize: 16,
  },
  scrollView:{

        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
      }

});