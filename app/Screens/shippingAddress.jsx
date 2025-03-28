import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ShippingAddress = () => {
  const [selectedOption, setSelectedOption] = useState("free");
  const [saveShippingInfo, setSaveShippingInfo] = useState(false);
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [area, setArea] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    street: "",
    postalCode: "",
    area: "",
  });

  const router = useRouter();
  const scrollViewRef = useRef(null);

  const validateField = (field, value) => {
    let error = "";
    if (field === "name" && value.length <= 4)
      error = "Name must be greater than 4 characters";
    if (field === "street" && value.length <= 4)
      error = "Street must be greater than 4 characters";
    if (field === "postalCode" && value.length <= 4)
      error = "Postal code must be greater than 4 characters";
    if (field === "area" && value.length <= 4)
      error = "Area must be greater than 4 characters";

    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
  };

  const isFormValid =
    name.length > 4 &&
    street.length > 4 &&
    postalCode.length >= 5 && // Adjusted condition
    area.length > 4;

  const shippingOptions = [
    {
      id: "free",
      title: "Free",
      price: "$0",
      description:
        "Free delivery to the pick-up point closest to you. 7 - 14 days.",
    },
    {
      id: "fast",
      title: "Fast",
      price: "$9.99",
      description:
        "Get your order in 1-3 days. Dropped off at your address or pick-up point.",
    },
    {
      id: "same_day",
      title: "Same-day delivery",
      price: "$34.99",
      description:
        "If you order before 14:00 we will deliver to your door before 22:00.",
    },
  ];

  const handleFocus = (inputRef) => {
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        y: inputRef,
        animated: true,
      });
    }, 300);
  };

  return (
    <ScrollView style={styles.container} ref={scrollViewRef}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Shipping</Text>
        <View style={{ width: 20, height: 20, backgroundColor: "#fff" }} />
      </View>

      {shippingOptions.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.optionContainer,
            selectedOption === option.id && styles.selectedOption,
          ]}
          onPress={() => setSelectedOption(option.id)}
        >
          <Ionicons
            name={
              selectedOption === option.id
                ? "radio-button-on"
                : "radio-button-off"
            }
            size={22}
            color={selectedOption === option.id ? "#5A67D8" : "#ccc"}
          />
          <View style={styles.optionText}>
            <View style={styles.optionHeader}>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionPrice}>{option.price}</Text>
            </View>
            <Text style={styles.optionDescription}>{option.description}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <Text style={styles.sectionTitle}>Shipping address</Text>

      <TextInput
        style={[styles.input, errors.name && styles.inputError]}
        placeholder="Name"
        value={name}
        onFocus={() => handleFocus(180)}
        onChangeText={(text) => {
          setName(text);
          validateField("name", text);
        }}
      />
      {errors.name ? (
        <Text style={styles.errorText}>{errors.name}</Text>
      ) : (
        <></>
      )}

      <TextInput
        style={[styles.input, errors.street && styles.inputError]}
        placeholder="Street address"
        value={street}
        onFocus={() => handleFocus(180)}
        onChangeText={(text) => {
          setStreet(text);
          validateField("street", text);
        }}
      />
      {errors.street ? (
        <Text style={styles.errorText}>{errors.street}</Text>
      ) : (
        <></>
      )}
      <View style={styles.row}>
        <TextInput
          style={[
            styles.input,
            styles.smallInput,
            errors.postalCode && styles.inputError,
          ]}
          placeholder="Postal code"
          value={postalCode}
          onFocus={() => handleFocus(180)}
          maxLength={6}
          keyboardType="number-pad"
          onChangeText={(text) => {
            setPostalCode(text);
            validateField("postalCode", text);
          }}
        />

        <TextInput
          style={[
            styles.input,
            styles.largeInput,
            errors.area && styles.inputError,
          ]}
          placeholder="Area"
          onFocus={() => handleFocus(180)}
          value={area}
          onChangeText={(text) => {
            setArea(text);
            validateField("area", text);
          }}
        />
      </View>
      {errors.postalCode ? (
        <Text style={styles.errorText}>{errors.postalCode}</Text>
      ) : (
        <></>
      )}
      {errors.area ? (
        <Text style={styles.errorText}>{errors.area}</Text>
      ) : (
        <></>
      )}
      <View style={styles.saveInfoContainer}>
        <Text style={styles.saveInfoText}>Save shipping information</Text>
        <Switch value={saveShippingInfo} onValueChange={setSaveShippingInfo} />
      </View>

      <TouchableOpacity
        style={[styles.saveButton, !isFormValid && styles.disabledButton]}
        disabled={!isFormValid}
        onPress={() => {
          router.push("/Screens/successScreen");
        }}
      >
        <Text style={styles.saveButtonText}>SAVE CHANGES</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FD", padding: 20 },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "black",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: "#EEF0FF",
  },
  selectedOption: {
    borderWidth: 1.5,
    borderColor: "#5A67D8",
    backgroundColor: "#EEF0FF",
  },
  optionText: { marginLeft: 10, flex: 1 },
  optionHeader: { flexDirection: "row", justifyContent: "space-between" },
  optionTitle: { fontSize: 16, fontWeight: "bold" },
  optionPrice: { fontSize: 16, fontWeight: "bold", color: "#000" },
  optionDescription: { fontSize: 12, color: "gray", marginTop: 4 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: "#EEF0FF",
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  smallInput: { width: "36%" },
  largeInput: { width: "60%" },
  saveInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  saveInfoText: { fontSize: 14, color: "#555" },
  saveButton: {
    backgroundColor: "#5A67D8",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 60,
  },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  disabledButton: { opacity: 0.6 },
  errorInput: { borderColor: "red" },
  errorText: { color: "red", fontSize: 12, bottom: 8, left: 8 },
});

export default ShippingAddress;
