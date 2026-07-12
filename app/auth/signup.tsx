import { useAuth } from "@/context/AuthContext";
import { Link, Redirect } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Button,
    StyleSheet,
    TextInput,
    View,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {isAuthenticated, loading, signup} = useAuth()

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter your email, password and username.");
      return;
    }

    try {
      // Replace with your API call
      if(await signup(email, password)){
        console.log({ email, password });

        Alert.alert("Success", "Created account!");
        alert("Success!")
        Redirect({
            href: "/"
        })
      }else{
        throw new Error("fail to create account")
      }
    } catch (error) {
      Alert.alert("fail to create account", "Invalid email.");
      alert("fail!")
      alert(error)
    }
  };
  if(isAuthenticated){
    return (
        <Redirect
        href={"/"}
        >

        </Redirect>
    )
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button disabled={loading} title="Login" onPress={handleLogin} />


        <Link
        href="./login">
            ¿Ya tenés cuenta? ¡Inicia sesión!
        </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
});