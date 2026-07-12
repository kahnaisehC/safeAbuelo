import { AuthProvider } from "@/context/AuthContext";
import { ConfigProvider } from "@/context/ConfigContext";
import { colors } from "@/styles/global";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {

  return (

    <ConfigProvider>
    <AuthProvider>
    <SafeAreaProvider>

        <Stack 
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.mainBlue }
        }}
        >
          <Stack.Screen name="auth" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="repository" />
          <Stack.Screen name="forum" />
          <Stack.Screen name="user" />
          <Stack.Screen name="account" />
          <Stack.Screen name="accessibility" />
        </Stack>

    </SafeAreaProvider>
    </AuthProvider>
    </ConfigProvider>
  )

}
