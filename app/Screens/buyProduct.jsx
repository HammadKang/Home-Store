import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const BuyProduct = () => {
  const [cart, setCart] = useState([
    {
      id: "1",
      category: "Wardrobe",
      title: "2 Door cabinet",
      price: 7986,
      quantity: 1,
      image: require("./../../assets/images/Product2.jpg"),
    },
    {
      id: "2",
      category: "Sofa",
      title: "Royale 1 Seater",
      price: 10169,
      quantity: 1,
      image: require("./../../assets/images/Product4.jpg"),
    },
    // {
    //   id: "3",
    //   category: "Camera",
    //   title: "Royale 1 Seater",
    //   price: 72169,
    //   quantity: 1,
    //   image: require("./../../assets/images/Product3.jpg"),
    // },
    // {
    //   id: "4",
    //   category: "Sofa",
    //   title: "Royale 1 Seater",
    //   price: 721,
    //   quantity: 1,
    //   image: require("./../../assets/images/Product1.jpg"),
    // },
  ]);

  const increaseQty = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const [openDropdowns, setOpenDropdowns] = useState({});
  const router = useRouter();

  const toggleDropdown = (id) => {
    setOpenDropdowns((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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
        <View style={styles.headerIcons}>
          <Ionicons name="cart" size={24} color="black" />
          <Ionicons
            name="share-social"
            size={24}
            color="black"
            style={{ marginLeft: 10 }}
          />
        </View>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
            <View style={styles.cartItem}>
              <Image source={item.image} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.category}>{item.category}</Text>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>₹{item.price.toLocaleString()}</Text>

                {/* Quantity Selector */}
                {openDropdowns[item.id] ? (
                  <View style={styles.quantityContainer}>
                    <Text style={styles.qtyText}>Qty: {item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() => decreaseQty(item.id)}
                      style={styles.qtyBtn}
                    >
                      <MaterialIcons name="remove" size={14} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => increaseQty(item.id)}
                      style={styles.qtyBtn}
                    >
                      <MaterialIcons name="add" size={14} color="black" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.qtyContainer}
                    onPress={() => toggleDropdown(item.id)}
                  >
                    <Text style={styles.qtyText}>Qty: {item.quantity}</Text>
                    <AntDesign name="caretdown" size={9} color="brown" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={styles.actionRow}>
              <TouchableOpacity>
                <Text style={styles.favouriteText}>★ Move To Favourites</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => removeItem(item.id)}>
                <Ionicons name="remove-circle-outline" size={22} color="gray" />
              </TouchableOpacity>
            </View>
          </>
        )}
      />

      <View style={styles.line} />

      <View style={styles.summaryContainer}>
        {cart.map((item) => (
          <View key={item.id} style={styles.summaryRow}>
            <Text style={styles.summaryText}>{item.title}</Text>
            <Text style={styles.summaryPrice}>
              ₹{(item.price * item.quantity).toLocaleString()}.00
            </Text>
          </View>
        ))}
        <View style={styles.totalRow}>
          <Text style={styles.totalText}>TOTAL</Text>
          <Text style={styles.totalAmount}>
            ₹{totalAmount.toLocaleString()}.00
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.buyButton}
        onPress={() => {
          router.push("/Screens/shippingAddress");
        }}
      >
        <Text style={styles.buyButtonText}>BUY</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerIcons: { flexDirection: "row" },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    alignItems: "center",
    marginTop: 20,
  },
  productImage: {
    width: 80,
    height: 100,
    borderRadius: 10,
    resizeMode: "stretch",
  },
  productDetails: { flex: 1, marginLeft: 10 },
  category: { fontSize: 12, color: "gray" },
  title: { fontSize: 16, fontWeight: "bold", marginTop: 2 },
  price: { fontSize: 14, fontWeight: "bold", color: "#000", marginVertical: 5 },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff8f0",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#f28500",
  },
  qtyText: { fontSize: 14, marginRight: 8, color: "#f28500" },
  qtyBtn: { padding: 4 },
  favouriteText: { color: "#f28500", fontSize: 14, marginTop: 5 },
  summaryContainer: {
    paddingVertical: 15,
    width: "95%",
    alignSelf: "center",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  summaryText: { fontSize: 16, color: "#000" },
  summaryPrice: { fontSize: 16, fontWeight: "bold", color: "#f28500" },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  totalText: { fontSize: 17, fontWeight: "bold", color: "#000" },
  totalAmount: { fontSize: 17, fontWeight: "bold", color: "#f28500" },
  buyButton: {
    backgroundColor: "#b2751c",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    width: "96%",
    alignSelf: "center",
  },
  buyButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "96%",
    alignSelf: "center",
  },
  line: {
    height: 0.8,
    backgroundColor: "gray",
    marginTop: 16,
    width: "96%",
    alignSelf: "center",
  },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "brown",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: "30%",
    justifyContent: "space-between",
  },
  qtyText: {
    color: "brown",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
});

export default BuyProduct;
