import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { CameraIcon, SettingsIcon } from "react-native-heroicons/outline";
import { profileData } from "../constant";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const data = profileData[0]; // Assuming profileData contains user's profile information
  return (
    <ScrollView
      className="relative bg-white flex-1"
      contentContainerStyle={{
        paddingBottom: hp(5),
      }}
    >
      {/* Profile Header Section */}
      <View style={{ backgroundColor: "#ff3333", paddingBottom: hp(3) }}>
        {/* Profile Picture */}
        <View style={{ alignItems: "center", marginTop: hp(4) }}>
          <Image
            source={data.imgUrl}
            style={{
              width: hp(12),
              height: hp(12),
              borderRadius: hp(6),
              borderWidth: 2,
              borderColor: "#fff",
            }}
          />
        </View>

        {/* Name and Account Info */}
        <View style={{ alignItems: "center", marginTop: hp(2) }}>
          <Text className="text-white text-xl font-semibold">{data.name}</Text>
          <Text className="text-white text-sm">Account Number: {data.accountNumber}</Text>
        </View>
      </View>

      {/* Options Section */}
      <View style={{ paddingHorizontal: wp(6), marginTop: hp(2) }}>
        {/* Personal Information */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: hp(2),
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="person-outline" size={24} color="#000" />
            <Text className="ml-4 text-base text-black">Personal Information</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color="#000" />
        </TouchableOpacity>

        {/* Transaction History */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: hp(2),
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="cash-outline" size={24} color="#000" />
            <Text className="ml-4 text-base text-black">Transaction History</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color="#000" />
        </TouchableOpacity>

        {/* Card Management */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: hp(2),
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="card-outline" size={24} color="#000" />
            <Text className="ml-4 text-base text-black">Card Management</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color="#000" />
        </TouchableOpacity>

        {/* Settings */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: hp(2),
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="settings-outline" size={24} color="#000" />
            <Text className="ml-4 text-base text-black">Settings</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color="#000" />
        </TouchableOpacity>

        {/* Help & Support */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: hp(2),
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="help-circle-outline" size={24} color="#000" />
            <Text className="ml-4 text-base text-black">Help & Support</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
