import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const tabImages = {
  Furniture: require("./../../assets/images/categories1.png"),
  Kitchen: require("./../../assets/images/categories2.png"),
  Decor: require("./../../assets/images/categories3.png"),
  Curtains: require("./../../assets/images/categories4.png"),
};

const Explore = () => {
  const router = useRouter();
  const [searchPress, setSearchPress] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedTab, setSelectedTab] = useState("Furniture");

  const categories = {
    Furniture: [
      {
        id: "1",
        name: "All furniture",
        image: require("./../../assets/images/FurnitureCategory1.png"),
        onPress: () => {
          router.push("/Screens/BedroomScreen");
        },
      },
      {
        id: "2",
        name: "Sofas",
        image: require("./../../assets/images/FurnitureCategory2.png"),
        onPress: () => {
          router.push("/Screens/SofasCategory");
        },
      },
      {
        id: "3",
        name: "Bedroom Sets",
        image: require("./../../assets/images/FurnitureCategory3.png"),
        onPress: () => {
          router.push("/Screens/BedroomCategory");
        },
      },
      {
        id: "4",
        name: "Closet / Wardrobe",
        image: require("./../../assets/images/FurnitureCategory4.png"),
        onPress: () => {
          router.push("/Screens/ClosetCategory");
        },
      },
      {
        id: "5",
        name: "Beside Tables",
        image: require("./../../assets/images/FurnitureCategory5.png"),
        onPress: () => {
          router.push("/Screens/TablesCategory");
        },
      },
      {
        id: "6",
        name: "Dressers & Mirrors",
        image: require("./../../assets/images/FurnitureCategory6.png"),
        onPress: () => {
          router.push("/Screens/MirrorsCategories");
        },
      },
      {
        id: "7",
        name: "Cushions / Pillows",
        image: require("./../../assets/images/FurnitureCategory7.jpg"),
        onPress: () => {
          router.push("/Screens/CushionsCategory");
        },
      },
      {
        id: "8",
        name: "Mattress",
        image: require("./../../assets/images/FurnitureCategory8.jpg"),
        onPress: () => {
          router.push("/Screens/MattressCategory");
        },
      },
    ],
    Kitchen: [
      {
        id: "1",
        name: "All Homeware",
        image: require("./../../assets/images/KitchenCategory1.png"),
        onPress: () => {
          router.push("/Screens/AllHomewareCategory");
        },
      },
      {
        id: "2",
        name: "Dining Sets",
        image: require("./../../assets/images/KitchenCategory2.png"),
        onPress: () => {
          router.push("/Screens/DiningSetCategory");
        },
      },
      {
        id: "3",
        name: "Plates",
        image: require("./../../assets/images/KitchenCategory3.png"),
        onPress: () => {
          router.push("/Screens/PlatesCategory");
        },
      },
      {
        id: "4",
        name: "Tea / Coffee Sets",
        image: require("./../../assets/images/KitchenCategory4.png"),
        onPress: () => {
          router.push("/Screens/TeaSetsCategory");
        },
      },
      {
        id: "5",
        name: "Cutlery Sets",
        image: require("./../../assets/images/KitchenCategory5.png"),
        onPress: () => {
          router.push("/Screens/CutleryCategory");
        },
      },
    ],
    Decor: [
      {
        id: "1",
        name: "All Decor",
        image: require("./../../assets/images/DecorCategory1.png"),
        onPress: () => {
          router.push("/Screens/AllDecorCategory");
        },
      },
      {
        id: "2",
        name: "Vases",
        image: require("./../../assets/images/DecorCategory2.png"),
        onPress: () => {
          router.push("/Screens/VasesCategory");
        },
      },
      {
        id: "3",
        name: "Clocks",
        image: require("./../../assets/images/DecorCategory3.png"),
        onPress: () => {
          router.push("/Screens/ClocksCategory");
        },
      },
      {
        id: "4",
        name: "Mirrors",
        image: require("./../../assets/images/DecorCategory4.png"),
        onPress: () => {
          router.push("/Screens/MirrorsCategory");
        },
      },
      {
        id: "5",
        name: "Dining Tables",
        image: require("./../../assets/images/DecorCategory5.png"),
        onPress: () => {
          router.push("/Screens/DiningTableCategory");
        },
      },
    ],
    Curtains: [
      {
        id: "1",
        name: "All Curtains",
        image: require("./../../assets/images/CurtainCategory1.png"),
        onPress: () => {
          router.push("/Screens/AllCurtainsCategory");
        },
      },
      {
        id: "2",
        name: "Polyester Curtains",
        image: require("./../../assets/images/CurtainCategory2.png"),
        onPress: () => {
          router.push("/Screens/PolyesterCategory");
        },
      },
      {
        id: "3",
        name: "Linen Curtains",
        image: require("./../../assets/images/CurtainCategory3.png"),
        onPress: () => {
          router.push("/Screens/LinenCategory");
        },
      },
      {
        id: "4",
        name: "Blackout Curtains",
        image: require("./../../assets/images/CurtainCategory4.png"),
        onPress: () => {
          router.push("/Screens/BlackoutCategory");
        },
      },
      {
        id: "5",
        name: "Sheer Curtains",
        image: require("./../../assets/images/CurtainCategory5.png"),
        onPress: () => {
          router.push("/Screens/SheerCategory");
        },
      },
    ],
  };

  const filteredCategories = categories[selectedTab].filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Categories</Text>
        <TouchableOpacity onPress={() => setSearchPress(!searchPress)}>
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
            placeholder="Search Categories..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      )}

      <View style={styles.tabContainer}>
        <FlatList
          data={Object.keys(categories)}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.tabsWrapper}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedTab(item)}
              style={[styles.tabItem, selectedTab === item && styles.activeTab]}
            >
              <View style={styles.tabImageContainer}>
                <Image source={tabImages[item]} style={styles.tabImage} />
              </View>
              <Text
                style={[
                  styles.tabText,
                  selectedTab === item && styles.activeTabText,
                ]}
              >
                {item}
              </Text>
              {selectedTab === item && <View style={styles.underline} />}
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        data={filteredCategories}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const isLastOdd =
            filteredCategories.length % 2 !== 0 &&
            index === filteredCategories.length - 1;

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.productCard,
                isLastOdd && { width: "100%", alignItems: "center" },
              ]}
              activeOpacity={0.7}
              onPress={item.onPress}
            >
              <Image source={item.image} style={styles.productImage} />
              <Text style={styles.productTitle}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <Text
            style={{
              textAlign: "center",
              marginTop: 20,
              fontSize: 16,
              color: "#8F8888",
            }}
          >
            No categories found
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 10,
    paddingTop: 14,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 12,
    height: 40,
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
  tabContainer: {
    height: 126,
    justifyContent: "center",
    marginTop: 10,
  },
  tabsWrapper: {},
  tabItem: {
    alignItems: "center",
    marginHorizontal: 8,
    paddingVertical: 5,
    marginRight: 10,
  },
  activeTab: {
    borderRadius: 8,
  },
  tabImageContainer: {
    height: 80,
    width: 80,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  tabImage: {
    width: 78,
    height: 78,
    resizeMode: "contain",
  },
  tabText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#8F8888",
    marginTop: 2,
  },
  activeTabText: {
    color: "black",
  },
  underline: {
    height: 1,
    width: "100%",
    backgroundColor: "black",
    marginTop: 2,
  },
  gridContainer: {
    paddingVertical: 10,
  },
  row: {
    justifyContent: "space-between",
  },
  categoryItem: {
    alignItems: "center",
    width: "48%",
    marginBottom: 20,
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },
  categoryImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  categoryText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  productCard: {
    alignItems: "center",
    width: "50%",
    marginBottom: 20,
  },
  productImage: {
    width: 180,
    height: 150,
    resizeMode: "cover",
    borderRadius: 12,
  },
  productTitle: {
    marginTop: 6,
    textAlign: "center",
    fontSize: 14,
    color: "black",
    width: "80%",
  },
});

export default Explore;
