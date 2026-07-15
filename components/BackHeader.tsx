import { colors } from "@/styles/global";
import Ionicons from "@react-native-vector-icons/ionicons";
import { Pressable, StyleSheet, Text, View } from "react-native";


type BackHeaderProps = {
  name: string|null,
};

export default function BackHeader(props: BackHeaderProps) {

    let handlePress = () => {
        navigation.back()
    }
  return (
    <View style={styles.headerContainer}>
      <Pressable
      onPress={handlePress}
      style={styles.iconsContainer}>
        <Ionicons size={32} name={"arrow-back"} color={colors.lightGray}></Ionicons>
      </Pressable>
      <Text
       style={styles.greetings}>
        {props.name}
      </Text>
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
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 16,
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
