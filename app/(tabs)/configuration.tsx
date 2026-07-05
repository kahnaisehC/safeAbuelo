
import { ForoLink } from "@/components/ForoLink";
import { View } from "react-native";

export default function Configuration() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ForoLink
      date={new Date()}
      title={"im a configuration!"}
      author={"im the configurator!"}
      photo={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.iqsdirectory.com%2Farticles%2Fgear%2Fplanetary-gears%2Fplanetary-gear-system.jpg&f=1&nofb=1&ipt=4ac4b992cf8371e54fccdbca75f8b8ed4f314e107adb566dccd807c223e605bf"}
      replies={["im a reply!", "im another reply!"]}
      ></ForoLink>

    </View>
  );
}
