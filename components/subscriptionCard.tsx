import { formatCurrency, formatStatusLabel, formatSubscriptionDateTime } from "@/lib/utils";
import clsx from "clsx";
import { Text, View, Image, Pressable } from "react-native"

const SubscriptionCard = ({name, price, icon, billing, status, startDate, color, category, plan, renewalDate, paymentMethod, expanded, onPress}: SubscriptionCardProps) => {
    return (
        <Pressable onPress={onPress} className={clsx(`sub-card`, expanded ? `sub-card-expanded` : `bg-card` )} style={!expanded && color ? {backgroundColor: color}: undefined}>
            <View className="sub-head">
                <View className="sub-main">
                    <Image source={icon} className="sub-icon" />
                    <View className="sub-copy">
                        <Text className="sub-title" numberOfLines={1}>
                            {name}
                        </Text>
                        <Text className="sub-meta" numberOfLines={1} ellipsizeMode="tail">
                            {
                                category?.trim() || plan?.trim() || (renewalDate ? formatSubscriptionDateTime(renewalDate): "")
                            }
                        </Text>
                    </View>
                </View>

                <View className="sub-price-box">
                    <Text className="sub-price">{formatCurrency(price, "$")}</Text>
                    <Text className="sub-billing">{billing}</Text>
                </View>
            </View>

            {
                expanded && (
                    <View className="sub-bdy">
                        <View className="sub-details">
                            <View className="sub-row">
                                <View className="sub-row-copy">
                                    <Text className="sub-label">Payment:</Text>
                                    <Text className="sub-value" ellipsizeMode="tail" numberOfLines={1}>{paymentMethod?.trim()}</Text>
                                </View>
                            </View>

                            <View className="sub-row">
                                <View className="sub-row-copy">
                                    <Text className="sub-label">Category:</Text>
                                    <Text className="sub-value" ellipsizeMode="tail" numberOfLines={1}>{category?.trim()}</Text>
                                </View>
                            </View>

                            <View className="sub-row">
                                <View className="sub-row-copy">
                                    <Text className="sub-label">Started:</Text>
                                    <Text className="sub-value" ellipsizeMode="tail" numberOfLines={1}>{startDate ? formatSubscriptionDateTime(startDate) : ""}</Text>
                                </View>
                            </View>

                            <View className="sub-row">
                                <View className="sub-row-copy">
                                    <Text className="sub-label">RenewalDate:</Text>
                                    <Text className="sub-value" ellipsizeMode="tail" numberOfLines={1}>{renewalDate ? formatSubscriptionDateTime(renewalDate) : ""}</Text>
                                </View>
                            </View>

                            <View className="sub-row">
                                <View className="sub-row-copy">
                                    <Text className="sub-label">Status:</Text>
                                    <Text className="sub-value" ellipsizeMode="tail" numberOfLines={1}>{status ? formatStatusLabel(status) : "" }</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )
            }
        </Pressable>
    )
}

export default SubscriptionCard;