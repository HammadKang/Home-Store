import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import CustomTextInput from "../../components/CustomTextInput";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const WriteReview = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [rating, setRating] = useState(0);
  const [quality, setQuality] = useState("");
  const [comments, setComments] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", orderId: "" });
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  useEffect(() => {
    let newErrors = { name: "", email: "", orderId: "" };
    if (name.length > 0 && name.length < 5)
      newErrors.name = "Name must be at least 5 characters long.";
    if (email.length > 0 && !validateEmail(email))
      newErrors.email = "Enter a valid email address.";
    if (orderId.length > 0 && orderId.length < 5)
      newErrors.orderId = "Order ID must be at least 5 characters long.";

    setErrors(newErrors);
    setIsValid(!newErrors.name && !newErrors.email && !newErrors.orderId);
  }, [name, email, orderId]);

  const handleSubmit = () => {
    if (!isValid) return;
    router.back();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Write a Review!</Text>
        <View style={{ width: 10 }} />
      </View>

      <CustomTextInput placeholder="Name" value={name} onChangeText={setName} />
      {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

      <CustomTextInput
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      {errors.email ? (
        <Text style={styles.errorText}>{errors.email}</Text>
      ) : null}

      <CustomTextInput
        placeholder="Order ID#"
        value={orderId}
        onChangeText={setOrderId}
      />
      {errors.orderId ? (
        <Text style={styles.errorText}>{errors.orderId}</Text>
      ) : null}

      <Text style={styles.label}>How would you rate the product?</Text>
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((num) => (
          <TouchableOpacity key={num} onPress={() => setRating(num)}>
            <Text
              style={[styles.star, rating >= num ? styles.filledStar : null]}
            >
              ★
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>How's the quality?</Text>
      <View style={styles.qualityContainer}>
        {[
          "Super High Quality",
          "Good Quality",
          "It's Ok",
          "Not Bad",
          "Not Recommendable",
        ].map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.qualityButton,
              quality === option ? styles.selectedQuality : null,
            ]}
            onPress={() => setQuality(option)}
          >
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Tell us more!</Text>
      <TextInput
        style={[styles.input, styles.commentBox]}
        placeholder="Add your comments..."
        value={comments}
        onChangeText={setComments}
        multiline
        numberOfLines={8}
      />

      <TouchableOpacity
        style={[
          styles.submitButton,
          (!isValid ||
            name.length == 0 ||
            orderId.length == 0 ||
            email.length == 0 ||
            rating == 0 ||
            quality.length == 0) &&
            styles.disabledButton,
        ]}
        onPress={handleSubmit}
        disabled={
          !isValid ||
          name.length == 0 ||
          orderId.length == 0 ||
          email.length == 0 ||
          rating == 0 ||
          quality.length == 0
        }
      >
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F5F3EC" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    marginTop: 5,
  },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center" },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  label: { fontSize: 16, marginBottom: 6, marginTop: 22 },
  errorText: { color: "red", fontSize: 14, marginBottom: 10 },
  starContainer: { flexDirection: "row", marginBottom: 10 },
  star: { fontSize: 30, color: "#ccc", marginRight: 5 },
  filledStar: { color: "#FFD700" },
  qualityContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  qualityButton: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  selectedQuality: { backgroundColor: "#D3C3A3" },
  commentBox: { height: 120, textAlignVertical: "top", borderRadius: 12 },
  submitButton: {
    backgroundColor: "#7C6A5C",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 42,
    marginBottom: 32,
  },
  disabledButton: { backgroundColor: "#ccc" },
  submitText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

export default WriteReview;
