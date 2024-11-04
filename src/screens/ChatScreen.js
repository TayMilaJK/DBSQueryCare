import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import user10 from "../../assets/images/user10.jpg";
import { chatData as initialChatData } from "../constant"; // Renamed for initial data

const android = Platform.OS === "ios";

export default function ChatScreen() {
  const navigation = useNavigation();
  const [chatData, setChatData] = useState(initialChatData); // State to manage chat list

  // Function to simulate creating a new chat
  const createNewChat = () => {
    const newChat = {
      id: chatData.length + 1,
      name: "New Support Agent",
      imgUrl: user10,
      age: null,
      isOnline: true,
      timeSent: "Just now",
      lastMessage: "Welcome to support! How can I assist you today?",
      chat: [
        {
          sender: "me",
          message: "Hi, I need some help.",
          timestamp: "10:00 AM",
        },
        {
          sender: "New Support Agent",
          message: "Welcome to support! How can I assist you today?",
          timestamp: "10:01 AM",
        },
      ],
    };
    setChatData([newChat, ...chatData]); // Add new chat to the beginning of the list
  };

  return (
    <SafeAreaView
      style={{
        paddingTop: android ? hp(3) : 0,
        backgroundColor: "#fff",
      }}
    >
      {/* Header */}
      <View className="px-4 mb-8 flex-row justify-between items-center">
        <Text className="uppercase font-semibold text-neutral-500 tracking-wider">
          Support Agents
        </Text>

        {/* Button to create a new chat */}
        <TouchableOpacity
          onPress={createNewChat}
          style={{
            backgroundColor: "#ff3333",
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>New Chat</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View className="mx-4 mt-6 flex-row items-center rounded-2xl bg-neutral-200 px-3 py-4">
        <TextInput
          placeholder="Search for support..."
          placeholderTextColor={"gray"}
          style={{
            fontSize: hp(1.7),
          }}
          className="flex-1 text-base mb-1 pl-1 tracking-widest"
        />
        <View>
          <MagnifyingGlassIcon size={hp(2.5)} color={"gray"} strokeWidth={3} />
        </View>
      </View>

      {/* Chat List */}
      <View className="px-4">
        <View className="border-b border-neutral-300 py-4">
          <Text className="uppercase font-semibold text-neutral-500 tracking-wider ">
            Chats
          </Text>
        </View>

        <FlatList
          data={chatData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="w-full py-3 items-center flex-row border-b border-neutral-300"
              onPress={() =>
                navigation.navigate("ChatDetails", {
                  chat: item.chat,      
                  imgUrl: item.imgUrl,   
                  name: item.name,               
                  isOnline: item.isOnline, 
                })
              }
            >
              {/* Avatar */}
              <View
                className="w-[17%] justify-center"
                style={{
                  width: hp(7),
                  height: hp(7),
                }}
              >
                <Image
                  source={item.imgUrl || user10} // Ensure fallback image if not available
                  style={{
                    width: "90%",
                    height: "90%",
                    resizeMode: "cover",
                  }}
                  className="rounded-full"
                />
              </View>

              {/* Chat Information */}
              <View
                className="w-[82%]"
                style={{
                  height: hp(6),
                }}
              >
                <View className="flex-row justify-between items-center">
                  <View className="flex-row">
                    <Text className="font-bold text-base">
                      {item.name}, {item.age}
                    </Text>
                    {item.isOnline && (
                      <View className="justify-center items-center ml-2">
                        <View className="w-2 h-2 bg-[#ff3333] rounded-full"></View>
                      </View>
                    )}
                  </View>
                  <Text className="text-sm text-neutral-500">
                    {item.timeSent}
                  </Text>
                </View>

                <Text className="font-semibold text-xs text-neutral-500 mt-1">
                  {item.lastMessage.length > 45
                    ? `${item.lastMessage.slice(0, 45)}...`
                    : item.lastMessage}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
