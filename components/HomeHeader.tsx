import { colors } from "@/styles/global";
import { Text, View } from "react-native";
import Button from "./Button";


type HomeHeaderProps = {
  txt: string,
};

export default function HomeHeader(props: HomeHeaderProps) {

  return (
    <View >
      <Text style={
        {
          color: colors.mainRed
        }
      }
      >{props.txt}</Text>
      <Button
    backgroundColor={colors.lightBlue}
    icon={"home"}
    text={"im an icon ye"}
    height={1}
      ></Button>



    </View>
  );
}
