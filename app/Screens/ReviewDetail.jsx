import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const ReviewDetail = () => {
  const { image, name, rating, review } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Client Review</Text>
        <Ionicons name="lock-closed-outline" size={20} color="black" />
      </View>
      <Image source={image} style={styles.image} />
      <View style={styles.reviewContainer}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.stars}>
          {[...Array(5)].map((_, i) => (
            <Ionicons
              key={i}
              name={i < rating ? "star" : "star-outline"}
              size={22}
              color="#E9A426"
            />
          ))}
        </View>
        <Text style={styles.review}>{review}</Text>
      </View>
    </View>
  );
};

export default ReviewDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F5F0",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  image: {
    width: "100%",
    height: 428,
    resizeMode: "stretch",
  },
  reviewContainer: {
    padding: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "black",
  },
  stars: {
    flexDirection: "row",
    marginBottom: 16,
  },
  review: {
    fontSize: 17,
    color: "#8F8888",
    fontWeight: "600",
  },
});
