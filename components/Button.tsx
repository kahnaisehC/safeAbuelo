import { colors } from "@/styles/global";
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from "react-native";


type ButtonProps= {
    backgroundColor: string,
    icon: string,
    text: string,
    height: Number,
};

let buttonStyle = StyleSheet.create({

})

export default function Button(props: ButtonProps) {
  return (
    <View style={{
        display: "flex",
        backgroundColor: props.backgroundColor,
        alignItems:"center",
        justifyContent:"space-around",
        flexDirection: "row",
        padding: 16,
        minWidth: 320,
    }}>
    <Ionicons name='home' color={colors.darkGray} />
      <Text style={
        {
          color: colors.darkGray
        }
      }
      >{props.text}</Text>
    <Ionicons name={"arrow-with-circle-left"} />
    </View>
  );
}
