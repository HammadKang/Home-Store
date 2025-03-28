import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const HomeLayout = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const products = [
    {
      id: "1",
      image: require("./../../assets/images/Product1.jpg"),
      title: "Star double bed",
      price: "Rs. 75,000",
    },
    {
      id: "2",
      image: require("./../../assets/images/Product2.jpg"),
      title: "1 Pcs / Set of 3 Round Coffee Table",
      price: "Rs. 1,249",
    },
    {
      id: "3",
      image: require("./../../assets/images/Product3.jpg"),
      title: "Wall mounted decoration shelf",
      price: "Rs. 599",
    },
    {
      id: "4",
      image: require("./../../assets/images/Product4.jpg"),
      title: "Newtons ottoman Pouf",
      price: "Rs. 2,699",
    },
    {
      id: "5",
      image: require("./../../assets/images/Product1.jpg"),
      title: "Star double bed",
      price: "Rs. 75,000",
    },
    {
      id: "6",
      image: require("./../../assets/images/Product2.jpg"),
      title: "1 Pcs / Set of 3 Round Coffee Table",
      price: "Rs. 1,249",
    },
    {
      id: "7",
      image: require("./../../assets/images/Product3.jpg"),
      title: "Wall mounted decoration shelf",
      price: "Rs. 599",
    },
    {
      id: "8",
      image: require("./../../assets/images/Product4.jpg"),
      title: "Newtons ottoman Pouf",
      price: "Rs. 2,699",
    },
  ];

  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
        />
        <Ionicons name="search" size={22} color="gray" />
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerText}>ORDER NOW - UP TO 60% OFF</Text>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productGrid}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productCard}>
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.noResults}>No products found</Text>
        }
      />

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => {
          router.push("/Screens/productDescription");
        }}
      >
        <Ionicons name="home" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    paddingHorizontal: 10,
    borderRadius: 5,
    margin: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
  },
  banner: {
    width: "100%",
    height: 60,
    backgroundColor: "purple",
    justifyContent: "center",
    alignItems: "center",
  },
  bannerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  productGrid: {
    padding: 10,
  },
  productCard: {
    flex: 1,
    margin: 10,
    alignItems: "flex-start",
  },
  productImage: {
    width: 180,
    height: 150,
    resizeMode: "cover",
    alignSelf: "center",
  },
  productTitle: {
    textAlign: "left",
    fontSize: 14,
    marginVertical: 5,
  },
  productPrice: {
    color: "red",
    fontWeight: "bold",
  },
  homeButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "purple",
    padding: 15,
    borderRadius: 50,
  },
  noResults: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
});

export default HomeLayout;
