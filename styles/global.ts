import { StyleSheet } from "react-native";


export const fonts = {
  text: "monospace",
}

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
    lightGray: "#E1E1E3",

    primary: "#1971C2",
    textPrimary: "#011125",
    textSecondary: "#6D6F74",
    background: "#95BBFC",
    surface: "#E1E1E3",

}


export const globalStyles = StyleSheet.create({
  container: {
    color: colors.mainRed,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lightParagraph: {
    fontFamily: "Nunito",
    color: colors.mainGray,
    padding: 2,
  },
  paragraph:{
    fontFamily: "Nunito",
    color: colors.darkGray,
    fontSize: 24,
    padding: 2,

  },

  title1:{
    fontFamily: "Nunito",
    fontWeight: 700,
    fontSize: 36,
    padding: 2,
    color: colors.darkBlue
  },
});