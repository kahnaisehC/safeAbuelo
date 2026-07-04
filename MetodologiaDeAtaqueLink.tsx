import { globalStyles } from "@/styles/global";
import Ionicons from "@react-native-vector-icons/ionicons";
import { Image, Text, View } from "react-native";

type MetodologiaDeAtaqueLinkProps = {
    date: Date,
    title: string,
    author: string,
    photo: string,
    replies: string[],
}


export default function MetodologiaDeAtaqueLink(props: MetodologiaDeAtaqueLinkProps) {
    return (
        <View
        style={{
            maxWidth: 368,
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            padding: 16,
            margin: 16,
            backgroundColor: "#E1E1E3",
            borderRadius: 8,
            borderWidth: 1,
        }}
        >
            <View style={{ 
                flexDirection: "column",
                alignItems: "center",
                flexGrow: 0.5,
                }}>
                <Image style={
                    {
                        height: 64,
                        width: 64,
                        borderRadius: 32,
                    }
                }
                source={{
                    uri: props.photo
                }} alt="photo" ></Image>
            </View>
            <View style={{
                flexGrow: 3,
                flexDirection: "column",
            }}>
                {/*
                author text
                */}
                <Text
                style={
                    globalStyles.paragraph
                }
                >
                    {props.author}
                </Text>

                {/*
                title text
                */}
                <Text
                style={
                    globalStyles.title1
                }
                >
                    {
                        props.title.length > 50 ? props.title.substring(0, 50) + "..." :
                        props.title
                    }
                </Text>
                <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
                >

                    <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                    >
                    <Text
                    style={{
                        ...globalStyles.paragraph,
                        padding: 4,
                    }}
                    >
                        {props.date.toLocaleDateString()}
                    </Text>
                    </View>
                    <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                    >
                        <Ionicons 
                        style={{
                            paddingRight: 4,
                        }}
                        name="chatbubble-ellipses-outline" size={20} color="black" />
                        <Text
                        style={
                            globalStyles.paragraph
                        }
                        >
                            {props.replies.length + " replies"}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}