import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text } from "react-native";

export default function SubscriptionDetails () {
    const {id} = useLocalSearchParams()

    return (
        <View>
            <Text>Subscription Details: {id}</Text>
            <></>
        </View>
    )
}