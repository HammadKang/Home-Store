import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

const SuccessScreen = () => {
  const { amount } = useLocalSearchParams();
  const router = useRouter();
  const formattedGrandTotal = (
    parseFloat(amount.replace(/,/g, "")) + 2000
  ).toLocaleString();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.orderStatus}>Your Order is</Text>
        <Text style={styles.statusBadge}>{"Under Review"}</Text>
      </View>
      <Text style={styles.orderNumber}>Order No: {"U9YLsj"}</Text>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <FontAwesome5 name="clipboard-list" size={20} color="#444" />
          <Text style={[styles.sectionTitle, { marginLeft: 12 }]}>
            ORDER INFORMATION
          </Text>
        </View>

        {[
          { label: "Customer Name", value: "Maaz Khan" },
          { label: "Delivery Address", value: "H-2, P.E.C.H.S Block 2, Khi." },
          { label: "Order Type", value: "Customize Order" },
          { label: "Mobile Number", value: "+92-3172126514" },
          { label: "Order Date", value: "January 24, 2025 11:50 PM" },
          { label: "Delivery Date", value: "January 29, 2025 2:00 PM" },
        ].map((item, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.infoLabel}>{item.label}:</Text>
            <Text style={styles.infoText}>{item.value}</Text>
          </View>
        ))}
      </View>

      <View
        style={[
          styles.section,
          {
            marginVertical: 0,
          },
        ]}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>PAYMENT INFO</Text>
        </View>

        {[
          { label: "Total (including tax)", value: `PKR ${amount}` },
          { label: "Delivery Fee", value: "PKR 2,000" },
          { label: "Grand Total", value: `PKR ${formattedGrandTotal}.00` },
          { label: "Payment Type", value: "Cash on Delivery" },
        ].map((item, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.infoLabel}>{item.label}</Text>
            <Text style={styles.infoText}>{item.value}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "black",
          padding: 12,
          borderRadius: 12,
          alignItems: "center",
          marginBottom: 10,
          marginTop: 40,
        }}
        onPress={() => {
          router.push("/");
        }}
      >
        <Text style={{ fontWeight: "500", fontSize: 18, color: "white" }}>
          Back to home
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9", padding: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  orderStatus: { fontSize: 16, fontWeight: "bold", color: "black" },
  statusBadge: {
    backgroundColor: "#FFC107",
    padding: 8,
    borderRadius: 8,
    fontWeight: "bold",
    color: "black",
    fontSize: 12,
  },
  orderNumber: {
    fontSize: 26,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  section: {
    padding: 12,
    borderRadius: 10,
    marginVertical: 25,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#000" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    marginTop: 10,
  },
  infoLabel: { fontSize: 14, color: "#555", fontWeight: "bold" },
  infoText: { fontSize: 14, color: "#000" },
});

export default SuccessScreen;
