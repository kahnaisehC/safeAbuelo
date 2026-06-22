import { StyleSheet } from "react-native";


export const colors = {
    mainBlue: "#1971C2",
    mainRed: "#C2191C",
    mainYellow: "#C2BF19",
    mainGray: "#6D6F74",

    darkBlue: "#011125",
    darkRed: "#4A0405",
    darkYellow: "#121200",
    darkGray: "#101112",

    lightBlue: "#95BBFC",
    lightRed: "#FCC6C6",
    lightYellow: "#EBE821",
    lightGray: "E1E1E3",

}


export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});