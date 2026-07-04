import { colors, fonts } from "@/styles/global";
import Ionicons, { IoniconsIconName } from "@react-native-vector-icons/ionicons";
import { Link, RelativePathString } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";


type MainLinkProps= {
    backgroundColor: string,
    icon: IoniconsIconName,
    text: string,
    link: RelativePathString,
};


export default function MainLink(props: MainLinkProps) {


let buttonStyle = StyleSheet.create({
  button:{
    display: "flex",
    backgroundColor: props.backgroundColor,
    alignItems:"center",
    justifyContent:"space-around",
    flexDirection: "row",
    paddingTop: 16,
    paddingBottom: 16,
    minWidth: 320,
    borderRadius: 12,
    borderWidth: 4,
    borderColor: colors.lightGray,
    fontFamily: fonts.text,


  },
})


  return (
    <Link href={props.link}>
    <View style={buttonStyle.button}>


      <Ionicons 
        name={props.icon} 
        color={colors.darkGray} 
        size={48} />
      <Text style={
        {
          color: colors.darkGray,
          fontFamily: fonts.text,
        }
      }
      >{props.text}</Text>
    <Ionicons 
    name={"arrow-forward-circle-outline"} 
    size={48} 
    />
    </View>
    </Link>
  );
}
