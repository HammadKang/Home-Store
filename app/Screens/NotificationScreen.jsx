import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCart } from "../context/AppContext";

const NotificationScreen = () => {
  const router = useRouter();
  const { logIn } = useCart();
  const notifications = [
    {
      id: "1",
      title: "New Collection Alert! ✨",
      description: "Explore our latest arrivals & refresh your space today!",
      image: require("./../../assets/images/AllFurniture4.png"),
      bgColor: "#F3E9E4",
      onPress: () => {
        router.push("/Screens/NewProducts");
      },
    },
    {
      id: "2",
      title: "Bestseller Pick! 🌟",
      description:
        "Discover what everyone is loving! Our most popular items await you.",
      image: require("./../../assets/images/AllFurniture2.png"),
      bgColor: "#EAE6E3",
      onPress: () => {
        router.push("/Screens/BestSellingProducts");
      },
    },
    {
      id: "3",
      title: "Bedroom Goals! 🛏️",
      description:
        "Create a cozy sanctuary check out our latest bedroom arrivals!",
      image: require("./../../assets/images/AllFurniture6.png"),
      bgColor: "#E2DAD5",
      onPress: () => {
        router.push("/Screens/BedroomScreen");
      },
    },
    {
      id: "4",
      title: "Order Placed Successfully! 📦",
      description:
        "Your order #U9YLsj has been confirmed. Track your delivery now!",
      image: require("./../../assets/images/AllFurniture8.png"),
      bgColor: "#EAE6E3",
      onPress: () => {
        router.push("/Screens/LivingRoomScreen");
      },
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}></Text>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <AntDesign name="close" size={20} color="black" />
        </TouchableOpacity>
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
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.card, { backgroundColor: item.bgColor }]}
              onPress={item.onPress}
            >
              <Image source={item.image} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 20,
    paddingTop: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  image: {
    width: 100,
    height: 90,
    borderRadius: 10,
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  description: {
    fontSize: 13,
    color: "#555",
    marginTop: 4,
  },
});
