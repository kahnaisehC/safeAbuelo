import MetodologiaDeAtaqueLink from "@/components/MetodologiaDeAtaqueLink";
import { View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MetodologiaDeAtaqueLink
      date={new Date()}
      title={"im a title!"}
      author={"im the author!"}
      photo={"https://images.unsplash.com/photo-1773332611476-6ec2ba68049f?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
      replies={["im a reply!", "im another reply!"]}
      ></MetodologiaDeAtaqueLink>




    </View>
  );
}
