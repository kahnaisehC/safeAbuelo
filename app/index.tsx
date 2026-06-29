import HomeHeader from "@/components/HomeHeader";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <HomeHeader txt={"perritos"}>
      </HomeHeader>
      <Text>hello world.</Text>
    </View>
  );
}
