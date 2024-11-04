import React from "react";
import { View, Text, Dimensions, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import user10 from "../../assets/images/user10.jpg";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { chatData } from "../constant"; // Importing chatData for balance info
import { Ionicons } from "@expo/vector-icons"; // For icons

const android = Platform.OS === "android";
const { width } = Dimensions.get("window");

export default function HomeScreen() {
  // Extract account balance from chatData
  const accountBalance = chatData.find(chat => chat.id === 1).lastMessage.match(/\$[\d,]+/)[0];

  return (
    <SafeAreaView
      style={{
        paddingTop: android ? hp(2) : 0,
        backgroundColor: "#fff",
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      {/* Header */}
      <View className="w-full flex-row justify-between items-center px-4 mb-8">
        <View >
          <Image
            source={user10}
            style={{
              width: hp(4.5),
              height: hp(4.5),
              resizeMode: "cover",
            }}
            className="rounded-full"
          />
        </View>

        <View>
          <Text className="text-xl font-semibold text-center uppercase">
            Banking App
          </Text>
        </View>

        {/* Notification Bell */}
        <View className="bg-black/10 p-2 rounded-full items-center justify-center">
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={25} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Account Overview */}
      <View style={{ paddingHorizontal: 20 }}>
        <Text className="text-lg font-semibold text-black">
          Your Account Balance
        </Text>
        <Text className="text-3xl font-bold text-black">
          {accountBalance} {/* Display the balance from chatData */}
        </Text>
      </View>

      {/* Quick Actions */}
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <Text className="text-lg font-semibold text-black">
          Quick Actions
        </Text>
        <View className="flex-row justify-between mt-4">
          <TouchableOpacity
            style={{
              width: width * 0.28,
              height: hp(10),
              backgroundColor: "#ff3333",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="swap-horizontal" size={30} color="#fff" />
            <Text style={{ color: "#fff", marginTop: 5 }}>Transfer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: width * 0.28,
              height: hp(10),
              backgroundColor: "#ff3333",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="wallet" size={30} color="#fff" />
            <Text style={{ color: "#fff", marginTop: 5 }}>Payments</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: width * 0.28,
              height: hp(10),
              backgroundColor: "#ff3333",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="card" size={30} color="#fff" />
            <Text style={{ color: "#fff", marginTop: 5 }}>Cards</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Transactions */}
      <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
        <Text className="text-lg font-semibold text-black">Recent Support Requests</Text>
        <View className="mt-4">
          {/* Sample Recent Transaction */}
          {chatData.slice(1, 4).map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 15,
              }}
            >
              <Text className="text-black">{item.name}</Text>
              <Text className="text-neutral-500">{item.timeSent} ago</Text>
            </View>
          ))}
        </View>
      </View>

    </SafeAreaView>
  );
}
