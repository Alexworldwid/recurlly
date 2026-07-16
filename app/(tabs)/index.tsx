import CreateSubscriptionModal from "@/components/CreateSubscriptionModal";
import ListHeading from "@/components/listHeading";
import SubscriptionCard from "@/components/subscriptionCard";
import UpcomingSubscriptionCard from "@/components/upcomingSubscriptionCard";
import {
  HOME_BALANCE,
  HOME_SUBSCRIPTIONS,
  HOME_USER,
  UPCOMING_SUBSCRIPTIONS,
} from "@/constants/data";
import { icons } from "@/constants/icons";
import images from "@/constants/image";
import "@/global.css";
import { formatCurrency } from "@/lib/utils";
import dayjs from "dayjs";
import { styled } from "nativewind";
import { useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

export default function App() {
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [subscriptions, setSubscriptions] = useState(HOME_SUBSCRIPTIONS);

  const handleCreateSubscription = (newSubscription: Subscription) => {
    setSubscriptions((current) => [newSubscription, ...current]);
  };

  return (
    <SafeAreaView className="flex-1 p-5 bg-background">
      <FlatList
        ListHeaderComponent={() => (
          <>
            <View className="home-header">
              <View className="home-user">
                <Image source={images.avatar} className="home-avatar" />
                <Text className="home-user-name">{HOME_USER.name}</Text>
              </View>

              <Pressable onPress={() => setIsCreateModalVisible(true)}>
                <Image source={icons.add} className="home-add-icon" />
              </Pressable>
            </View>

            <View className="home-balance-card">
              <Text className="home-balance-label">Balance</Text>

              <View className="home-balance-row">
                <Text className="home-balance-amount">
                  {formatCurrency(HOME_BALANCE.amount, "USD")}
                </Text>
                <Text className="home-balance-date">
                  {dayjs(HOME_BALANCE.nextRenewalDate).format("MM/DD")}
                </Text>
              </View>
            </View>

            <View>
              <ListHeading title="Upcoming" />

              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={UPCOMING_SUBSCRIPTIONS}
                renderItem={({ item }) => (
                  <UpcomingSubscriptionCard {...item} />
                )}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={
                  <Text className="home-empty-state">
                    no upcoming subscriptions
                  </Text>
                }
              />
            </View>

            <View className="mb-4">
              <ListHeading title="All Subscriptions" />
            </View>
          </>
        )}
        data={subscriptions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SubscriptionCard
            {...item}
            expanded={subscriptionId === item.id}
            onPress={() =>
              setSubscriptionId((current) =>
                current === item.id ? null : item.id,
              )
            }
          />
        )}
        extraData={subscriptionId}
        ItemSeparatorComponent={() => <View className="h-4" />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text className="home-empty-state">no subscriptions</Text>
        }
        contentContainerClassName="pb-30"
      />

      <CreateSubscriptionModal
        visible={isCreateModalVisible}
        onClose={() => setIsCreateModalVisible(false)}
        onCreate={handleCreateSubscription}
      />
    </SafeAreaView>
  );
}
