import { colors } from "@/styles/global";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {

  return (
    <SafeAreaProvider>

        <Stack 
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.mainBlue }
        }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="repository" />
          <Stack.Screen name="forum" />
        </Stack>



    </SafeAreaProvider>
  )

}
