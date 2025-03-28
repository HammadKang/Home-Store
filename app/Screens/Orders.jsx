import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCart } from "../context/AppContext";

const Orders = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const { logIn } = useCart();

  const orderSteps = [
    {
      time: "10:11 PM",
      status: "Order Placed",
      description: "Your order #4463 was placed for delivery.",
      completed: true,
    },
    {
      time: "10:30 PM",
      status: "Pending",
      description:
        "Your order is pending for confirmation. Will confirm within 3 days.",
      completed: true,
    },
    {
      time: "10:35 AM",
      status: "Confirmed",
      description: "Your order is confirmed. Will deliver soon.",
      completed: true,
    },
    {
      time: "",
      status: "Processing",
      description:
        "Your order is confirmed. Will deliver within 8-10 working days.",
      completed: false,
    },
    {
      time: "",
      status: "Delivered",
      description: "Your order is confirmed. Will deliver soon.",
      completed: false,
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#F9F7F2", padding: 20 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 10 }}>
          Manage Orders
        </Text>
        <View style={{ width: "10%" }} />
      </View>

      {logIn == false ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 16, color: "#666", marginBottom: 20 }}>
            Sign In to view your orders
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#A09792",
              paddingVertical: 12,
              paddingHorizontal: 40,
              borderRadius: 20,
            }}
            onPress={() => router.push("/Screens/SignInScreen")}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Sign In</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              marginVertical: 10,
              textAlign: "center",
              color: "black",
            }}
          >
            Order No: U9YLsj
          </Text>

          <ScrollView
            style={{ flex: 1, marginTop: 30 }}
            showsVerticalScrollIndicator={false}
          >
            {orderSteps.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    width: 60,
                    fontSize: 12,
                    color: "#666",
                    textAlign: "right",
                    marginRight: 10,
                  }}
                >
                  {item.time}
                </Text>

                <View style={{ alignItems: "center" }}>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: item.completed ? "green" : "#D3D3D3",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {item.completed && (
                      <Ionicons name="checkmark" size={14} color="white" />
                    )}
                  </View>

                  {index !== orderSteps.length - 1 && (
                    <View
                      style={{
                        width: 1,
                        height: 40,
                        backgroundColor: item.completed ? "green" : "#D3D3D3",
                      }}
                    />
                  )}
                </View>

                <View
                  style={{
                    marginLeft: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "#333" }}
                  >
                    {item.status}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#666",
                      marginTop: 2,
                      width: "90%",
                    }}
                  >
                    {item.description}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default Orders;
