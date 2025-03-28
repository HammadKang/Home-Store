import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  BackHandler,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ImageSlider from "./../../components/ImageSlider";

const Home = () => {
  const router = useRouter();

  const images = [
    require("./../../assets/images/HomeSlider1.png"),
    require("./../../assets/images/livingRoom2.png"),
    require("./../../assets/images/livingRoom3.png"),
    require("./../../assets/images/livingRoom5.png"),
  ];

  const NewArrivalsData = [
    {
      id: "1",
      name: "French Mirror -0112-CA",
      price: "PKR 20,000",
      image: require("./../../assets/images/Home1.png"),
    },
    {
      id: "2",
      name: "Character Sculpture -812-BA",
      price: "PKR 12,000",
      image: require("./../../assets/images/Home2.png"),
    },
    {
      id: "3",
      name: "Dining Chair -1109AE",
      price: "PKR 30,000",
      image: require("./../../assets/images/bestSelling7.png"),
    },
    {
      id: "4",
      name: "Karaca Serving -3361AG",
      price: "PKR 20,000",
      image: require("./../../assets/images/bestSelling8.png"),
    },
  ];

  const BestSellingData = [
    {
      id: "1",
      name: "Avenor Sofa -1122-AN",
      price: "PKR 20,000",
      image: require("./../../assets/images/Home3.png"),
    },
    {
      id: "2",
      name: "Odean Sofa -6011-AF",
      price: "PKR 12,000",
      image: require("./../../assets/images/Home4.png"),
    },
    {
      id: "3",
      name: "Capria Dining Table -4112AB",
      price: "PKR 70,000",
      image: require("./../../assets/images/bestSelling3.png"),
    },
    {
      id: "4",
      name: "Curved sofa set -1122AN",
      price: "PKR 85,000",
      image: require("./../../assets/images/bestSelling4.png"),
    },
  ];

  const ProductGrid = ({ products }) => (
    <View style={styles.gridContainer}>
      {products.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.productCard}
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
          <Image source={item.image} style={styles.productImage} />
          <Text style={styles.productTitle}>{item.name}</Text>
          <Text style={styles.productPrice}>{item.price}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const Button = ({ text, onPress }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );

  const AboutUs = () => (
    <View style={styles.aboutContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            marginBottom: 6,
          },
        ]}
      >
        About Us
      </Text>
      <Text style={styles.aboutText}>
        At Home Store, we bring you stylish, high-quality furniture to elevate
        your space. Find the perfect pieces to match your style and comfort!
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push("/Screens/sideMenuScreen")}
        >
          <Icon name="menu" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>The Home Store</Text>
        <View style={styles.rightIcons}>
          <TouchableOpacity>
            <Icon name="search" size={22} color="#FFFFFF" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="cart-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
      <ImageSlider images={images} />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>New Arrivals</Text>
        <ProductGrid products={NewArrivalsData} />
        <Button
          text="View more"
          onPress={() => router.push("/Screens/NewProducts")}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Best Sellers</Text>
        <ProductGrid products={BestSellingData} />
        <Button
          text="View more"
          onPress={() => router.push("/Screens/BestSellingProducts")}
        />
      </View>
      <AboutUs />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  header: {
    backgroundColor: "#8C827D",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    justifyContent: "space-between",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "500",
    flex: 1,
    marginLeft: 10,
    textAlign: "center",
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 16,
  },
  section: {
    marginTop: 30,
    paddingHorizontal: 12,
  },
  sectionTitle: {
    color: "#8F8888",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 20,
    textAlign: "center",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  productCard: {
    width: "48%",
    alignItems: "center",
    marginBottom: 16,
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
    width: "70%",
  },
  button: {
    backgroundColor: "#8F8888",
    padding: 12,
    alignItems: "center",
    borderRadius: 40,
    width: "36%",
    alignSelf: "center",
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "500" },
  aboutContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
  },
  aboutText: {
    fontSize: 14,
    color: "#8F8888",
    width: "80%",
    textAlign: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
});

export default Home;
