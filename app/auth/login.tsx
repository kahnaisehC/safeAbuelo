import { useAuth } from "@/context/AuthContext";
import { Link } from "expo-router";
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

  const {user, loading, login} = useAuth()

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter your email and password.");
      return;
    }

    try {
      // Replace with your API call
      if(await login(email, password)){
        console.log({ email, password });

        Alert.alert("Success", "Logged in!");
        alert("Success!")
      }else{
        throw new Error("fail login in")
      }
    } catch (error) {
      Alert.alert("Login Failed", "Invalid email or password.");
      alert("fail!")
      alert(error)
    }
  };

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
        href="./auth/signup">
            ¿No tenés cuenta? ¡Creala!
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