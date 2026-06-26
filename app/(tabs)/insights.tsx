import React from "react";
import { Text } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import {styled} from "nativewind"
const SafeAreaView = styled(RNSafeAreaView)

export default function Insights () {
    return (
        <SafeAreaView className="bg-background flex-1 p-5">
            <Text>Insights Page</Text>
        </SafeAreaView>
    )
}
