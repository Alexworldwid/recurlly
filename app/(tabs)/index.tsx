import "@/global.css"
import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import {styled} from "nativewind"
const SafeAreaView = styled(RNSafeAreaView)
 
export default function App() {
  return (
    <SafeAreaView className="flex-1 p-5 bg-background">
      <Text className="text-xl font-bold text-success">
        Welcome to Nativewind!
      </Text>
      <Link href="/onboarding" className="mt-4 rounded bg-primary text-white py-2 px-8">Go to onboarding</Link>
      <Link href="/(auth)/sign-in" className="mt-4 rounded bg-primary text-white py-2 px-8">Sign In</Link>
      <Link href="/(auth)/sign-up" className="mt-4 rounded bg-primary text-white py-2 px-8">Sign Up</Link>

      <Link 
        href={{
          pathname: "/subscriptions/[id]",
          params: {id: "spotify"}
        }}
      >
        Spotify Subscription
      </Link>

    </SafeAreaView>
  );
}