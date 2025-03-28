import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Profile = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("./../../assets/images/Profile.png")}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.overlay}>
          <Text style={styles.welcomeText}>Welcome!</Text>
          <Text style={styles.subText}>
            Sign in to create a free account to manage your orders!
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              router.push("/Screens/AccountScreen");
            }}
          >
            <Ionicons name="person-outline" size={24} color="black" />
            <Text style={styles.buttonText}>Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              router.push("/Screens/Orders");
            }}
          >
            <Ionicons name="document-text-outline" size={24} color="black" />
            <Text style={styles.buttonText}>Orders</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              router.push("/Screens/Favourites");
            }}
          >
            <Ionicons name="heart-outline" size={24} color="black" />
            <Text style={styles.buttonText}>Favorites</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              router.push("/Screens/RecentlyViewed");
            }}
          >
            <Ionicons name="time-outline" size={24} color="black" />
            <Text style={styles.buttonText}>Recently Viewed</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => {
              router.push("/Screens/ContactUsScreen");
            }}
          >
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={24}
              color="black"
            />
            <Text style={styles.buttonText}>Contact Us</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => {
              router.push("/Screens/NotificationScreen");
            }}
          >
            <Ionicons name="notifications-outline" size={24} color="black" />
            <Text style={styles.buttonText}>Notifications</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: 385,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 5,
  },
  welcomeText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  subText: {
    color: "#FFF",
    fontSize: 14,
  },
  buttonContainer: {
    marginTop: 20,
    width: "90%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  button: {
    width: "48%",
    height: 94,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    // elevation: 2,
    borderWidth: 1,
    borderColor: "#8F8888",
    backgroundColor: "#F5F5EF",
  },
  buttonText: {
    fontSize: 16,
    marginTop: 6,
    fontWeight: "500",
    color: "#8F8888",
  },
});
