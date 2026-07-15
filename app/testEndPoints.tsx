import { fetchReportes } from "@/api/getReportes";
import { fetchUserReportes } from "@/api/getReporteUser";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TestEndPoints() {
  const [str, setStr] = useState<string[]>([])
  const { user, loading, isAuthenticated, token} = useAuth()


  useEffect(()=>{
    console.log("useeffect")
    if(user === null)return
    if(token === null)return

    fetchUserReportes(user.uid, token)
    .then((data) => 
      setStr((str) => {
        str.push(data.toString())
        return str
      })
    )
    .catch(console.error)



    fetchReportes()
    .then((data)=>{
        setStr((str) => {
          str.push(data.toString())
          return str
        })
    })
    .catch(console.error)

  },[user, loading, isAuthenticated, token])

  if(!user){
    return (
      <View></View>
    )
  }

  return (
    <View style={styles.container}>
      {str.map((it, idx) => (
        <View style={{
          backgroundColor:"red",
          display: "flex",
        }}>
          <Text>
            {"item: " + it}
          </Text>
        </View>
      ))}

      <Text>
        {str}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF30",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "700",
  },
  email: {
    color: "#D1D5DB",
    fontSize: 14,
    marginTop: 4,
  },
});
