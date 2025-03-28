import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCart } from "../context/AppContext";

const Cart = () => {
  const { cartData, setCartData, logIn } = useCart();
  const [cart, setCart] = useState(
    cartData
    //   [
    //   {
    //     id: "1",
    //     category: "Wardrobe",
    //     title: "Rochester watches 4412-AK",
    //     price: 7986,
    //     quantity: 1,
    //     image: require("./../../assets/images/Product2.jpg"),
    //   },
    //   {
    //     id: "2",
    //     category: "Sofa",
    //     title: "Melaea watch 4412-BK",
    //     price: 10169,
    //     quantity: 1,
    //     image: require("./../../assets/images/Product4.jpg"),
    //   },
    //   {
    //     id: "3",
    //     category: "Camera",
    //     title: "Royale 1 Seater",
    //     price: 72169,
    //     quantity: 1,
    //     image: require("./../../assets/images/Product3.jpg"),
    //   },
    //   {
    //     id: "4",
    //     category: "Sofa",
    //     title: "Royale 1 Seater",
    //     price: 721,
    //     quantity: 1,
    //     image: require("./../../assets/images/Product1.jpg"),
    //   },
    // ]
  );

  const increaseQty = (id) => {
    setCartData((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartData((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : null
            : item
        )
        .filter(Boolean)
    );
  };

  const totalAmount = cartData.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const [openDropdowns, setOpenDropdowns] = useState({});
  const router = useRouter();

  const toggleDropdown = (id) => {
    setOpenDropdowns((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const price = totalAmount;
  const salesTax = 1500;
  const fbrCharges = 1;

  return logIn == false ? (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Shopping Cart
        </Text>
        <View
          style={{
            height: 1,
            width: 30,
          }}
        />
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 16, color: "#666", marginBottom: 20 }}>
          Sign In to make an order
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
    </View>
  ) : cartData.length > 0 ? (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Shopping Cart
          </Text>
          <View
            style={{
              height: 1,
              width: 30,
            }}
          />
        </View>

        <Text
          style={{
            textAlign: "left",
            fontSize: 16,
            fontWeight: "bold",
            marginTop: 22,
          }}
        >
          Your Items:
        </Text>

        {cartData.map((item, index) => (
          <View key={index} style={styles.cartItem}>
            <Image source={item.image} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.price}></Text>
              <Text
                style={[
                  styles.price,
                  {
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                  },
                ]}
              >
                PKR {item.price.toLocaleString()}
              </Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={() => decreaseQty(item.id)}
                  style={styles.qtyBtn}
                >
                  <MaterialIcons name="remove" size={14} color="black" />
                </TouchableOpacity>
                <Text style={styles.qtyText}>{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => increaseQty(item.id)}
                  style={styles.qtyBtn}
                >
                  <MaterialIcons name="add" size={14} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Price Incl. Tax</Text>
            <Text>PKR {price.toLocaleString()}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Sales Tax</Text>
            <Text>PKR {salesTax}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>FBR Service Charges</Text>
            <Text>PKR {fbrCharges}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalAmount}>
              PKR {(price + fbrCharges + salesTax).toLocaleString()}.00
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.continueShoppingButton}
          onPress={() => router.back()}
        >
          <Ionicons name="cart-outline" size={18} color="black" />
          <Text style={styles.continueShoppingText}>Continue Shopping</Text>
        </TouchableOpacity>

        <Text style={styles.shippingText}>
          Shipping/taxes calculated at checkout
        </Text>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() =>
            router.push({
              pathname: "/Screens/CheckoutScreen",
              params: {
                amount: `${(
                  price +
                  fbrCharges +
                  salesTax
                ).toLocaleString()}.00`,
                tax: `${salesTax.toLocaleString()}.00`,
              },
            })
          }
        >
          <Text style={styles.checkoutText}>
            Checkout - PKR {(price + fbrCharges + salesTax).toLocaleString()}.00
          </Text>
          <MaterialIcons name="arrow-forward" size={17} color="#fff" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  ) : (
    <View style={{ flex: 1, backgroundColor: "#F9F7F2", padding: 20 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Shopping Cart
        </Text>
        <View
          style={{
            height: 1,
            width: 30,
          }}
        />
      </View>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 24,
            color: "#8F8888",
            marginBottom: 20,
            fontWeight: "bold",
          }}
        >
          Your shopping cart is empty
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: "#8F8888",
            paddingVertical: 18,
            paddingHorizontal: 36,
            borderRadius: 20,
          }}
          onPress={() => router.back()}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
            Continue Shopping
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F7F2",
    padding: 15,
    paddingTop: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerIcons: { flexDirection: "row", width: "10%" },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  productImage: {
    width: 150,
    height: 140,
    borderRadius: 10,
    resizeMode: "cover",
  },
  productDetails: {
    flex: 1,
    marginLeft: 10,
    height: 130,
    justifyContent: "space-between",
  },
  category: { fontSize: 12, color: "gray" },
  title: { fontSize: 16, fontWeight: "bold", marginTop: 2 },
  price: { fontSize: 16, fontWeight: "bold", color: "#000", marginVertical: 5 },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff8f0",
    paddingVertical: 5,
    width: "36%",
    borderRadius: 5,
    alignSelf: "flex-start",
    justifyContent: "space-between",
  },
  qtyText: { fontSize: 14, marginRight: 8, color: "#f28500" },
  qtyBtn: { padding: 4, backgroundColor: "#D9D9D9", borderRadius: 4 },
  favouriteText: { color: "#f28500", fontSize: 14, marginTop: 5 },
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
  },
  summaryContainer: {
    backgroundColor: "#F5F5EF",
    paddingHorizontal: 14,
    borderRadius: 10,
    marginTop: 22,
    borderWidth: 1,
    borderColor: "#8F8888",
    paddingVertical: 14,
    width: "94%",
    alignSelf: "center",
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 16,
    color: "black",
    textAlign: "center",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  summaryText: { fontSize: 14, color: "gray" },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    borderTopWidth: 1,
    paddingTop: 8,
  },
  totalText: { fontSize: 16, fontWeight: "bold", color: "black" },
  totalAmount: { fontSize: 16, fontWeight: "bold", color: "black" },
  continueShoppingButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 19,
    borderWidth: 1,
    marginTop: 20,
    justifyContent: "center",
    width: "50%",
    alignSelf: "center",
  },
  continueShoppingText: { fontSize: 16, marginLeft: 5, color: "black" },
  shippingText: {
    textAlign: "center",
    marginTop: 16,
    marginBottom: 6,
    color: "gray",
  },
  checkoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    backgroundColor: "blue",
    borderRadius: 12,
    backgroundColor: "#B2761E",
  },

  checkoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
});

export default Cart;
