import { FontSize, useConfig } from "@/context/ConfigContext";
import { colors } from "@/styles/global";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



let fontSizeToString = (f: FontSize) =>{
    switch(f){
        case FontSize.Small: {
            return "Small"
        }
        case FontSize.Medium: {
            return "Medium"
        }
        case FontSize.Big: {
            return "Big"
        }
        case FontSize.Huge: {
            return "Huge"
        }
        default:{
            return "Small"
        }
    }
}

const options = [
  FontSize.Small,
  FontSize.Medium,
  FontSize.Big,
  FontSize.Huge,
];
export function FontSizeSelector() {
  const { fontSize, setFontSize } = useConfig();

  return (
    <View>
      <Text style={styles.title}>Font Size</Text>

      {options.map((option) => (
        <Pressable
          key={option}
          style={styles.option}
          onPress={() => setFontSize(option)}
        >
          <View style={styles.radio}>
            {fontSize === option && <View style={styles.selected} />}
          </View>

          <Text style={{fontSize:option*16}}>{fontSizeToString(option)}</Text>
        </Pressable>
      ))}
    </View>
  );
}




export default function Accessibility(){
    return (
        <SafeAreaView>
            <FontSizeSelector></FontSizeSelector>
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  selected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.darkGray,
  },
});