import { globalStyles } from "@/styles/global";
import { Text, View } from "react-native";


export default function HomeHeader() {
  return (
    <View style={globalStyles.headerContainer}>
      <Text style={globalStyles.headerText}>SafeAbuelo</Text>
    </View>
  );
}
