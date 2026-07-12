import { useAuth } from "@/context/AuthContext"
import Ionicons from "@react-native-vector-icons/ionicons"
import { Link } from "expo-router"
import { Pressable, Text, View } from "react-native"


export default function Account(){


    const { user, isAuthenticated, logout } = useAuth() 

    let handleLogout= () => {
        logout()

    }

    if(!isAuthenticated){
        return (
            <View>
                <View>
                    <Ionicons name={"person"} size={32}></Ionicons>
                </View>
                <View>
                    <Text>
                    ¿No tenés cuenta? Creá una 
                        <Link
                        href={"/auth/signup"}
                        >
                                Aquí
                        </Link>
                    </Text>
                </View>
                <View>
                    <Text>
                    ¿Ya tenés cuenta? Inicia sesión
                        <Link
                        href={"/auth/login"}
                        >
                                Aquí
                        </Link>
                    </Text>
                </View>
            </View>
        )
    }
    return (
        <View>
            <Text>
                Que pasa {user?.displayName}
            </Text>
            <Text>
                Sos {user?.email}
            </Text>
            <Pressable
            onPress={handleLogout}

            >
                <Text>
                    Cerrar sesión
                </Text>
            </Pressable>
        </View>
    )

}