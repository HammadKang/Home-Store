import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const data = [
  {
    id: "1",
    name: "Stainless Titanium Mirror -2651MD",
    price: "PKR 8,000",
    image: require("./../../assets/images/MirrorsCategories1.png"),
  },
  {
    id: "2",
    name: "Natural Marble With Brushed Rosegold Floor -1198MD",
    price: "PKR 13,000",
    image: require("./../../assets/images/MirrorsCategories2.png"),
  },
  {
    id: "3",
    name: " Lova Dresser & Mirror -1312MD",
    price: "PKR 20,000",
    image: require("./../../assets/images/MirrorsCategories3.png"),
  },
  {
    id: "4",
    name: "VEGA DRAWERS Dresser -4612MD",
    price: "PKR 29,000",
    image: require("./../../assets/images/MirrorsCategories4.png"),
  },
  {
    id: "5",
    name: "Grey Dresser & Mirror -1761MD",
    price: "PKR 27,000",
    image: require("./../../assets/images/MirrorsCategories5.png"),
  },
  {
    id: "6",
    name: "Mid Century Mirror -5412MD",
    price: "PKR 9,000",
    image: require("./../../assets/images/MirrorsCategories6.png"),
  },
];

const MirrorsCategories = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [furnitureData, setfurnitureData] = useState(data);
  const [filteredData, setFilteredData] = useState(furnitureData);
  const [searchPress, setsearchPress] = useState(false);

  const handleSearch = (text) => {
    setSearchText(text);
    if (text.trim() === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dressers & Mirrors</Text>
        <TouchableOpacity onPress={() => setsearchPress(!searchPress)}>
          {!searchPress ? (
            <Ionicons name="search" size={24} color="black" />
          ) : (
            <Text
              style={{ color: "#8F8888", fontSize: 16, fontWeight: "bold" }}
            >
              Cancel
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {searchPress && (
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Furniture..."
            value={searchText}
            onChangeText={handleSearch}
          />
        </View>
      )}

      <FlatList
        data={filteredData}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            activeOpacity={0.7}
            onPress={() => {
              router.push({
                pathname: `/Screens/ProductDetails/${item.id}`,
                params: {
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  image: item.image,
                },
              });
            }}
          >
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No matching furniture found</Text>
        }
      />
    </View>
  );
};

export default MirrorsCategories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 12,
    height: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
  },
  itemContainer: {
    width: "48%",
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
  },
  image: {
    width: 170,
    height: 140,
    borderRadius: 8,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 5,
  },
  itemPrice: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
});
