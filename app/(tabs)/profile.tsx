import { fetchUserReportes, UserReporte } from "@/api/getReporteUser";
import BackHeader from "@/components/BackHeader";
import { ForoLink } from "@/components/ForoLink";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileSection() {
  const {user, token } = useAuth()
  const [reportes, setReportes] = useState<UserReporte[]>([])
  const [loading, setLoading] = useState(true)


  useEffect(()=>{
    if(!user)return
    if(!token)return
    setLoading(false)

     fetchUserReportes(user?.uid, token)
    .then((data)=>{
      setReportes(data)
      console.log(data.toString())
    })
    .catch(console.error)
    .finally(() => setLoading(true))
  },[user])

  if(!user){
    return (
      <View></View>
    )
  }

  return (
    <SafeAreaView
    style={{ flex: 1 }}
    >
      <BackHeader
        name="Mi perfil"
      ></BackHeader>
      <View style={styles.container}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={96} color="#FFF" />
        </View>

        <View style={styles.info}>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
          <Text style={styles.title}>Tus reportes</Text>
      {loading && !reportes? (
        (
        <Text>
          keep loading
        </Text>)
        ) : (
            <ScrollView
            style={{flex:1}}
            >
            <FlatList
              data={reportes}
              keyExtractor={ item => item.id.toString()}
              renderItem={
              ({item:repoLinkProps}) => (
              <ForoLink
              {...repoLinkProps}
              />)}
              />
            </ScrollView>
            )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#F8F9FA",
  },

  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,

    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },

  info: {
    alignItems: "center",
  },

  email: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1F2937",
    textAlign: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1F2937",
    textAlign: "center",
  },
}); 
