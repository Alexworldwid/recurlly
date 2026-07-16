import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { clsx } from "clsx";
import dayjs from "dayjs";
import { icons } from "@/constants/icons";

type Frequency = "monthly" | "yearly";
type Category =
  | "entertainment"
  | "ai tools"
  | "developer tools"
  | "design"
  | "productivity"
  | "cloud"
  | "music"
  | "other";

const frequencyOptions: Array<{ label: string; value: Frequency }> = [
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];

const categoryOptions: Category[] = [
  "entertainment",
  "ai tools",
  "developer tools",
  "design",
  "productivity",
  "cloud",
  "music",
  "other",
];

const categoryColors: Record<Category, string> = {
  entertainment: "#f5c542",
  "ai tools": "#b8d4e3",
  "developer tools": "#e8def8",
  design: "#b8e8d0",
  productivity: "#f4c2c2",
  cloud: "#d7d3f5",
  music: "#f6c8d8",
  other: "#d9f0ff",
};

interface CreateSubscriptionModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (subscription: Subscription) => void;
}

export default function CreateSubscriptionModal({
  visible,
  onClose,
  onCreate,
}: CreateSubscriptionModalProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [frequency, setFrequency] = useState<Frequency>("monthly");
  const [category, setCategory] = useState<Category>("other");

  const isValid = name.trim().length > 0 && Number(price) > 0 && Number.isFinite(Number(price));

  const resetForm = () => {
    setName("");
    setPrice("");
    setFrequency("monthly");
    setCategory("other");
  };

  useEffect(() => {
    if (!visible) {
      resetForm();
    }
  }, [visible]);

  const handleSubmit = () => {
    const trimmedName = name.trim();
    const parsedPrice = Number(price);

    if (!trimmedName || !Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      return;
    }

    const now = dayjs();
    const renewalDate =
      frequency === "yearly"
        ? now.add(1, "year").toISOString()
        : now.add(1, "month").toISOString();

    const subscription: Subscription = {
      id: `${trimmedName.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
      icon: icons.wallet,
      name: trimmedName,
      price: parsedPrice,
      currency: "USD",
      billing: frequency,
      frequency,
      category,
      status: "active",
      startDate: now.toISOString(),
      renewalDate,
      color: categoryColors[category],
    };

    onCreate(subscription);
    resetForm();
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable className="modal-overlay" onPress={onClose}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="flex-1 justify-end"
        >
          <Pressable className="modal-container" onPress={(event) => event.stopPropagation()}>
            <View className="modal-header">
              <Text className="modal-title">New Subscription</Text>
              <Pressable className="modal-close" onPress={onClose}>
                <Text className="text-3xl">×</Text>
              </Pressable>
            </View>

            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerClassName="pb-6"
            >
              <View className="modal-body">
                <View className="gap-2">
                  <Text className="auth-label">Name</Text>
                  <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Netflix"
                    placeholderTextColor="#8e8e93"
                    className="auth-input"
                  />
                </View>

                <View className="gap-2">
                  <Text className="auth-label">Price</Text>
                  <TextInput
                    value={price}
                    onChangeText={setPrice}
                    placeholder="9.99"
                    placeholderTextColor="#8e8e93"
                    keyboardType="decimal-pad"
                    className="auth-input"
                  />
                </View>

                <View className="gap-2">
                  <Text className="auth-label">Frequency</Text>
                  <View className="picker-row">
                    {frequencyOptions.map((option) => {
                      const active = frequency === option.value;

                      return (
                        <Pressable
                          key={option.value}
                          className={clsx("picker-option", active && "picker-option-active")}
                          onPress={() => setFrequency(option.value)}
                        >
                          <Text
                            className={clsx(
                              "picker-option-text",
                              active && "picker-option-text-active",
                            )}
                          >
                            {option.label}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>

                <View className="gap-2">
                  <Text className="auth-label">Category</Text>
                  <View className="category-scroll">
                    {categoryOptions.map((option) => {
                      const active = category === option;

                      return (
                        <Pressable
                          key={option}
                          className={clsx("category-chip", active && "category-chip-active")}
                          onPress={() => setCategory(option)}
                        >
                          <Text
                            className={clsx(
                              "category-chip-text",
                              active && "category-chip-text-active",
                            )}
                          >
                            {option}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>

                <Pressable
                  className={clsx("auth-button", !isValid && "auth-button-disabled")}
                  onPress={handleSubmit}
                  disabled={!isValid}
                >
                  <Text className="auth-button-text">Create Subscription</Text>
                </Pressable>
              </View>
            </ScrollView>
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
}
