import React, { useMemo, useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import { HOME_SUBSCRIPTIONS } from "@/constants/data";
import SubscriptionCard from "@/components/subscriptionCard";

const SafeAreaView = styled(RNSafeAreaView);

export default function Subscriptions() {
    const [query, setQuery] = useState("");
    const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<string | null>(null);

    const filteredSubscriptions = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        if (!normalizedQuery) {
            return HOME_SUBSCRIPTIONS;
        }

        return HOME_SUBSCRIPTIONS.filter((subscription) => {
            const valuesToSearch = [
                subscription.name,
                subscription.plan,
                subscription.category,
                subscription.paymentMethod,
                subscription.billing,
            ];

            return valuesToSearch.some((value) =>
                value?.toLowerCase().includes(normalizedQuery),
            );
        });
    }, [query]);

    return (
        <SafeAreaView className="flex-1 bg-background p-5">
            <Text className="mb-3 text-2xl font-semibold text-foreground">Subscriptions</Text>
            <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search subscriptions"
                placeholderTextColor="#8e8e93"
                className="mb-4 rounded-2xl border border-border bg-card px-4 py-3 text-foreground"
            />

            <FlatList
                data={filteredSubscriptions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <SubscriptionCard
                        {...item}
                        expanded={expandedSubscriptionId === item.id}
                        onPress={() =>
                            setExpandedSubscriptionId((current) =>
                                current === item.id ? null : item.id,
                            )
                        }
                    />
                )}
                ItemSeparatorComponent={() => <View className="h-4" />}
                showsVerticalScrollIndicator={false}
                extraData={expandedSubscriptionId}
                ListEmptyComponent={
                    <Text className="py-8 text-center text-muted-foreground">
                        No subscriptions found.
                    </Text>
                }
            />
        </SafeAreaView>
    );
}
