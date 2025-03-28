import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const reviews = [
  {
    id: "1",
    name: "Haris K.",
    rating: 5,
    review:
      "Good value for money. Nice design and good quality delivered as shown. Thanks",
    product: "3x1ft Leaf Acrylic Mirror",
    model: "RM-108",
    image: require("./../../assets/images/bestSelling2.png"),
    productImage: require("./../../assets/images/bestSelling1.png"),
  },
  {
    id: "2",
    name: "Amna",
    rating: 4,
    review:
      "Absolutely love this bedroom set! Great quality, stylish design, and very comfortable. Highly recommended!",
    product: "Custom Bedroom Set with Wall Panel",
    model: "CB-7645",
    image: require("./../../assets/images/bestSelling7.png"),
    productImage: require("./../../assets/images/bestSelling6.png"),
  },
  {
    id: "3",
    name: "Daniel",
    rating: 3,
    review:
      "Good value for money. Nice design and quality delivered as shown. Thanks",
    product: "Blue Velvet Ottoman",
    model: "OVB-8763",
    image: require("./../../assets/images/AllFurniture6.png"),
    productImage: require("./../../assets/images/AllFurniture2.png"),
  },
];

const ratings = [
  { stars: 5, count: 12 },
  { stars: 4, count: 5 },
  { stars: 3, count: 4 },
  { stars: 2, count: 2 },
  { stars: 1, count: 0 },
];

const Reviews = () => {
  const renderStars = (rating) => {
    return (
      <View style={{ flexDirection: "row", marginVertical: 5, marginLeft: 6 }}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Ionicons
            key={index}
            name={index < rating ? "star" : "star-outline"}
            size={16}
            color="gold"
          />
        ))}
      </View>
    );
  };

  const router = useRouter();

  return (
    <View
      style={{
        paddingTop: 20,
        backgroundColor: "#F8F5F0",
        flex: 1,
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            width: "20%",
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          CLIENT'S REVIEWS
        </Text>
        <View
          style={{
            height: 1,
            width: "20%",
          }}
        />
      </View>

      <View
        style={{ backgroundColor: "#F8F5F0", padding: 15, borderRadius: 10 }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
            alignSelf: "center",
          }}
        >
          <Text style={{ fontSize: 32, fontWeight: "bold", marginRight: 10 }}>
            4.3
          </Text>
          <View>
            <Text style={{ fontSize: 14, color: "gray" }}>23 ratings</Text>
          </View>
        </View>

        {ratings.map((item) => (
          <View
            key={item.stars}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 4,
              alignSelf: "center",
            }}
          >
            <View style={{ flexDirection: "row", width: 80 }}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Ionicons
                  key={index}
                  name={index < item.stars ? "star" : "star-outline"}
                  size={14}
                  color="gold"
                />
              ))}
            </View>

            <View
              style={{
                height: 8,
                backgroundColor: item.count > 0 ? "red" : "#ddd",
                width: item.count * 10,
                borderRadius: 4,
                marginLeft: 10,
              }}
            />

            <Text style={{ marginLeft: 10, fontSize: 14, fontWeight: "bold" }}>
              {item.count}
            </Text>
          </View>
        ))}
      </View>

      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 10,
        }}
        contentContainerStyle={{
          paddingTop: 10,
        }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                width: 182,
                paddingBottom: 16,
                borderRadius: 10,
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 5,
                shadowOffset: { width: 0, height: 2 },
                elevation: 2,
              }}
              activeOpacity={0.7}
              onPress={() => {
                router.push({
                  pathname: "/Screens/ReviewDetail",
                  params: {
                    image: item.image,
                    name: item.name,
                    rating: item.rating,
                    review: item.review,
                  },
                });
              }}
            >
              <Image
                source={item.image}
                style={{
                  width: "100%",
                  height: 120,
                  marginBottom: 10,
                  resizeMode: "cover",
                }}
              />

              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#8F8888",
                  paddingLeft: 6,
                }}
              >
                {item.name}
              </Text>

              {renderStars(item.rating)}

              <Text
                style={{
                  fontSize: 13,
                  color: "#555",
                  marginBottom: 10,
                  fontWeight: "400",
                  width: "92%",
                  alignSelf: "center",
                }}
              >
                {item.review}
              </Text>
              <View
                style={{
                  height: 0.5,
                  width: "100%",
                  backgroundColor: "black",
                  marginBottom: 12,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={item.productImage}
                  style={{
                    width: "30%",
                    height: 53,
                    marginRight: 10,
                    marginLeft: 6,
                  }}
                />
                <View
                  style={{
                    width: "50%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                      color: "#8F8888",
                    }}
                  >
                    {item.product}
                  </Text>
                  <Text style={{ fontSize: 12, color: "gray" }}>
                    {item.model}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Reviews;
