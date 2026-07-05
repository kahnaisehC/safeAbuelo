import { ForoLink } from "@/components/_OldForoLink";
import { View } from "react-native";

export default function Profile() {
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
      title={"im the profiel!"}
      author={"im the profilator!"}
      photo={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2FJneBzwV.png&f=1&nofb=1&ipt=8482278b23f5a629ff5748ad8e26d1e39e7064937d144984193baf211a690416"}
      replies={["im a reply!", "im another reply!"]}
      ></ForoLink>




    </View>
  );
}
