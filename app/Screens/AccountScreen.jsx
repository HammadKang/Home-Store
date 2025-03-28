import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import CustomTextInput from "./../../components/CustomTextInput";
import { useCart } from "../context/AppContext";

const ActionButton = ({ text, color, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const AccountScreen = () => {
  const router = useRouter();
  const { setlogIn } = useCart();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleDeleteAccount = () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setlogIn(false);
            router.push("/");
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.title}>Account</Text>
        <View
          style={{
            height: 1,
            width: 30,
          }}
        />
      </View>
      <View
        style={{
          marginTop: 40,
        }}
      />
      <Text
        style={{
          fontSize: 13,
          marginLeft: 4,
          fontWeight: "400",
          color: "black",
          paddingVertical: 3,
        }}
      >
        First Name
      </Text>
      <CustomTextInput
        placeholder="Enter your first name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <Text
        style={{
          fontSize: 13,
          marginLeft: 4,
          fontWeight: "400",
          color: "black",
          paddingVertical: 3,
        }}
      >
        Last Name
      </Text>
      <CustomTextInput
        placeholder="Enter your last name"
        value={lastName}
        onChangeText={setLastName}
      />
      <Text
        style={{
          fontSize: 13,
          marginLeft: 4,
          fontWeight: "400",
          color: "black",
          paddingVertical: 3,
        }}
      >
        Phone Number
      </Text>
      <CustomTextInput
        placeholder="Enter your phone e.g(923302538654)"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <Text
        style={{
          fontSize: 13,
          marginLeft: 4,
          fontWeight: "400",
          color: "black",
          paddingVertical: 3,
        }}
      >
        Email Address
      </Text>
      <CustomTextInput
        placeholder="Enter your email address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <View
        style={{
          marginTop: "auto",
          marginBottom: 12,
        }}
      >
        <ActionButton
          text="Log Out"
          color="#8F8888"
          onPress={() => {
            setlogIn(false);
            router.push("/");
          }}
        />
        <ActionButton
          text="Update"
          color="#8F8888"
          onPress={() => console.log("Update Pressed")}
        />
        <ActionButton
          text="Delete Account"
          color="#8F8888"
          onPress={handleDeleteAccount}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F7F2",
    padding: 20,
  },
  backButton: {},
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default AccountScreen;
