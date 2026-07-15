import BackHeader from "@/components/BackHeader";
import { useAuth } from "@/context/AuthContext";
import { colors } from "@/styles/global";
import { Link, Redirect } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUp() {
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

        Alert.alert("Success", "Created account!");
        alert("Success!")
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
<SafeAreaView style={{ flex: 1 }}>
  <BackHeader name="Crear cuenta" />

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
      placeholder="Contraseña"
      secureTextEntry
      autoCapitalize="none"
      value={password}
      onChangeText={setPassword}
      style={styles.input}
    />

    <Button
      disabled={loading}
      title="Crear cuenta"
      onPress={handleLogin}
    />

    {loading && (
      <ActivityIndicator
        style={styles.loading}
        size="large"
        color={colors.mainRed}
      />
    )}

    <Link href="./login">
      <Text style={styles.referenceText}>
        ¿Ya tenés cuenta? ¡Iniciá sesión!
      </Text>
    </Link>
  </View>
</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
    backgroundColor: "#F8F9FA",
  },

  input: {
    height: 54,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 18,
  },

  referenceText: {
    marginTop: 24,
    textAlign: "center",
    color: colors.mainRed,
    fontSize: 16,
    fontWeight: "600",
  },

  loading: {
    marginTop: 20,
  },
});