import { colors } from "@/styles/global";
import Ionicons from "@react-native-vector-icons/ionicons";
import { StyleSheet, Text, View } from "react-native";


type HomeHeaderProps = {
  name: string|null,
  txt: string,
};

export default function HomeHeader(props: HomeHeaderProps) {





  return (
    <View style={styles.headerContainer}>
      <Text
       style={styles.greetings}>
        Hello! {props.name === null ? "guest" : props.name} 
      </Text>
      <View
      style={styles.iconsContainer}>
        <Ionicons name="notifications" size={32} color={colors.lightGray} />
        <Ionicons name="settings" size={32} color={colors.lightGray} />
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
