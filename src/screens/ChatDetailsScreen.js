import React from "react";
import { View, Text, FlatList, Image, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native"; // To access passed data
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";

export default function ChatDetailsScreen() {
  const route = useRoute();
  const { chat, imgUrl, name, isOnline } = route.params; // Destructure passed data

  const [message, setMessage] = React.useState("");
  const [chatMessages, setChatMessages] = React.useState(chat); // Use state to manage chat

  // Logic to handle team routing based on the user's message
  const handleTeamEscalation = (userMessage) => {
    let teamResponse;
    if (userMessage.toLowerCase().includes("transaction")) {
      teamResponse = {
        sender: "General Support",
        message: "Hi, I'm from General Support. I can help with your transaction issue.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
    } else if (userMessage.toLowerCase().includes("fraud") || userMessage.toLowerCase().includes("suspicious")) {
      teamResponse = {
        sender: "Fraud Detection Team",
        message: "Hi, this is the Fraud Detection Team. We will investigate this suspicious activity. Please provide the card last 4 digits and transaction details",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
    } else if (userMessage.toLowerCase().includes("loan") || userMessage.toLowerCase().includes("apply")) {
      teamResponse = {
        sender: "Loan Assistance",
        message: "Hi, I'm from Loan Assistance. I can guide you through the loan application process.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
    } else {
      teamResponse = {
        sender: "General Support",
        message: "It seems like your query doesn't fit in one of our teams. I will assist you directly.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
    }

    // Simulate rerouting if needed
    setTimeout(() => {
      if (teamResponse.sender === "General Support" && userMessage.toLowerCase().includes("fraud")) {
        const reroutedMessage = {
          sender: "Fraud Detection Team",
          message: "This issue seems to be fraud-related. Let me reroute you to the Fraud Detection Team.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setChatMessages((prevChat) => [...prevChat, reroutedMessage]);
      }
    }, 2000);

    return teamResponse;
  };

  const handleSendMessage = () => {
    const newMessage = {
      sender: "me",
      message: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Add the user's message to the chat
    setChatMessages((prevChat) => [...prevChat, newMessage]);

    // Check if escalation is required before responding with a default message
    let escalationResponse = handleTeamEscalation(message);
    
    // If escalation is needed, set the team response, otherwise proceed with the default bot response
    if (escalationResponse) {
      setTimeout(() => {
        setChatMessages((prevChat) => [...prevChat, escalationResponse]);
      }, 3000);
    } else {
      setTimeout(() => {
        const botResponse = {
          sender: "AI Bot",
          message: "Let me check that for you...",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setChatMessages((prevChat) => [...prevChat, botResponse]);
      }, 1000);
    }

    setMessage(""); // Clear input after sending
  };

  const renderChatBubble = ({ item }) => {
    return (
      <View style={{ flexDirection: item.sender === "me" ? "row-reverse" : "row", marginBottom: 10 }}>
        {item.sender !== "me" && (
          <Image
            source={imgUrl}
            style={{ width: hp(4.5), height: hp(4.5), borderRadius: hp(2.25), marginRight: 10 }}
          />
        )}

        <View
          style={{
            backgroundColor: item.sender === "me" ? "#ff3333" : "#ECECEC", // User messages in pink, others in grey
            padding: 10,
            borderRadius: 10,
            maxWidth: "70%",
            alignSelf: item.sender === "me" ? "flex-end" : "flex-start",
          }}
        >
          <Text style={{ fontSize: 16, color: item.sender === "me" ? "#fff" : "#000" }}>{item.message}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View className="w-full flex-row justify-between items-center px-4 mb-8">
        <View className="rounded-full items-center justify-center">
          <Image
            source={imgUrl}
            style={{ width: hp(4.5), height: hp(4.5), resizeMode: "cover" }}
            className="rounded-full"
          />
        </View>

        <View>
          <Text className="text-xl font-semibold text-center uppercase">
            {name}
          </Text>
        </View>

        <View className="bg-black/10 p-2 rounded-full items-center justify-center">
          <Ionicons name="notifications-outline" size={25} color="black" />
        </View>
      </View>

      {/* Chat List */}
      <FlatList
        data={chatMessages} // Use the updated chatMessages state
        renderItem={renderChatBubble}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ padding: 20 }}
      />

      {/* Input Area */}
      <View style={{ flexDirection: "row", padding: 10, borderTopWidth: 1, borderColor: "#ccc", backgroundColor: "#fff" }}>
        <TextInput
          placeholder="Type your message..."
          value={message}
          onChangeText={setMessage}
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#ff3333",
            borderRadius: 20,
            padding: 10,
            marginRight: 10,
            color: "#000",
          }}
        />
        <TouchableOpacity onPress={handleSendMessage}>
          <Ionicons name="send" size={24} color="#ff3333" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
