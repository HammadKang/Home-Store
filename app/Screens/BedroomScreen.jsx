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
    name: "Bed Set -1179",
    price: "PKR 88,000",
    image: require("./../../assets/images/AllFurniture1.png"),
  },
  {
    id: "2",
    name: "Console -1171 AD",
    price: "PKR 72,500",
    image: require("./../../assets/images/AllFurniture2.png"),
  },
  {
    id: "3",
    name: "Ottoman -1190 AN",
    price: "PKR 63,000",
    image: require("./../../assets/images/AllFurniture3.png"),
  },
  {
    id: "4",
    name: "Cap Couches -4421 AS",
    price: "PKR 35,000",
    image: require("./../../assets/images/AllFurniture4.png"),
  },
  {
    id: "5",
    name: "Dining Table -4421",
    price: "PKR 74,000",
    image: require("./../../assets/images/AllFurniture5.png"),
  },
  {
    id: "6",
    name: "Corner Sofa Set -5521 AK",
    price: "PKR 40,000",
    image: require("./../../assets/images/AllFurniture6.png"),
  },
  {
    id: "7",
    name: "Wall Mirror -5252 AK",
    price: "PKR 33,000",
    image: require("./../../assets/images/AllFurniture7.png"),
  },
  {
    id: "8",
    name: "Wardrobe -2131 AM",
    price: "PKR 60,000",
    image: require("./../../assets/images/AllFurniture8.png"),
  },
  {
    id: "9",
    name: "Serving Trolley -6121AH",
    price: "PKR 25,000",
    image: require("./../../assets/images/AllFurniture9.png"),
  },
  {
    id: "10",
    name: "Side Rack -2233AY",
    price: "PKR 15,000",
    image: require("./../../assets/images/AllFurniture10.png"),
  },
  {
    id: "11",
    name: "T.V Console -4282AS",
    price: "PKR 50,000",
    image: require("./../../assets/images/AllFurniture11.png"),
  },
];

const BedroomScreen = () => {
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
        <Text style={styles.headerTitle}>All Furniture</Text>
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

export default BedroomScreen;

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
