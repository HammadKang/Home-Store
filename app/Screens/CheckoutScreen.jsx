import { AntDesign } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import CustomTextInput from "../../components/CustomTextInput";
import { useCart } from "../context/AppContext";

const CheckoutScreen = () => {
  const { amount } = useLocalSearchParams();
  const router = useRouter();
  const { cartData, setCartData } = useCart();
  const [deliveryRegion, setDeliveryRegion] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");

  const isValid =
    !deliveryRegion || !firstName || !lastName || !address || !city || !phone;

  return (
    <View style={{ flex: 1, backgroundColor: "#F9F7F2", padding: 20 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}></Text>
          <Text style={styles.headerTitle}>Home Store</Text>
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <AntDesign name="close" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 19,
            color: "black",
            fontWeight: "bold",
            marginTop: 20,
            marginBottom: 6,
          }}
        >
          Account
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "500",
            marginBottom: 30,
            color: "#8F8888",
          }}
        >
          xyz@gmail.com
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 4,
            color: "black",
          }}
        >
          Delivery
        </Text>
        <CustomTextInput
          placeholder="Country/Region"
          value={deliveryRegion}
          onChangeText={setDeliveryRegion}
        />
        <CustomTextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <CustomTextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <CustomTextInput
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
        <CustomTextInput
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />
        <CustomTextInput
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <Text style={styles.sectionTitle}>Shipping Method</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <TouchableOpacity
            style={[
              styles.paymentButton,
              {
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              },
            ]}
            disabled
          >
            <Text style={{ fontWeight: "500", fontSize: 15, color: "black" }}>
              Standard Shipping
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 16, color: "black" }}>
              Rs 2,000
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Payment</Text>
        <TouchableOpacity style={styles.paymentButton} disabled>
          <Text style={{ fontWeight: "500", fontSize: 16, color: "black" }}>
            Cash on Delivery (COD)
          </Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Order Summary</Text>

        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Subtotal</Text>
          <Text style={styles.priceValue}>Rs {amount}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Shipping</Text>
          <Text style={styles.priceValue}>Rs 2,000</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={[styles.priceLabel, { fontWeight: "bold" }]}>Total</Text>
          <Text style={[styles.priceValue, { fontWeight: "bold" }]}>
            Rs{" "}
            {(parseInt(amount.replace(/,/g, ""), 10) + 2000).toLocaleString()}
            .00
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.completeOrderButton,
            {
              backgroundColor: isValid ? "#8F8888" : "black",
            },
          ]}
          disabled={isValid}
          onPress={() => {
            router.push({
              pathname: "/Screens/successScreen",
              params: {
                amount: amount,
              },
            });
            setCartData([]);
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            Complete Order
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = {
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 16,
  },
  shippingButton: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  paymentButton: {
    backgroundColor: "#EAE6E3",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 15,
    color: "black",
  },
  priceValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  completeOrderButton: {
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 12,
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
};

export default CheckoutScreen;
