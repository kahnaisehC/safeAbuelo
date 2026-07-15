import BackHeader from "@/components/BackHeader";
import { FontSize, useConfig } from "@/context/ConfigContext";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



let fontSizeToString = (f: FontSize) =>{
    switch(f){
        case FontSize.Small: {
            return "Pequeño"
        }
        case FontSize.Medium: {
            return "Mediano"
        }
        case FontSize.Big: {
            return "Grande"
        }
        case FontSize.Huge: {
            return "Gigante"
        }
        default:{
            return "Pequeño"
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
    <View style={styles.container}>
      <Text style={styles.title}>Tamaño de fuente</Text>

      {options.map((option) => (
        <Pressable
          key={option}
          style={styles.option}
          onPress={() => setFontSize(option)}
        >
          <View style={styles.radio}>
            {fontSize === option && <View style={styles.selected} />}
          </View>

          <Text style={{ fontSize: option * 16 }}>
            {fontSizeToString(option)}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

export default function Accessibility() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BackHeader
      name="accessibility"
      >

      </BackHeader>
      <FontSizeSelector />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
    color: "#222",
    textAlign: "center",
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 16,
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  radio: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  selected: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#007AFF",
  },
});