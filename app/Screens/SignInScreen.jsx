import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useRouter } from "expo-router";
import BackIconComponent from "../../components/BackIconComponent";
import CustomTextInput from "../../components/CustomTextInput";
import { useCart } from "../context/AppContext";
import { CommonActions, useNavigation } from "@react-navigation/native";

const SignInScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const { setlogIn } = useCart();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (text) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(emailRegex.test(text) ? "" : "Invalid email address");
  };

  const isButtonDisabled = !!emailError || !email || password.length < 6;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <BackIconComponent
        onPress={() => {
          router.back();
        }}
      />
      <Text style={styles.heading}>Welcome Back!</Text>

      <CustomTextInput
        placeholder="Email Address"
        value={email}
        onChangeText={validateEmail}
        keyboardType="email-address"
      />
      {email.length > 0 && emailError ? (
        <Text style={styles.errorText}>{emailError}</Text>
      ) : null}

      <CustomTextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        isPassword
      />
      {password.length > 0 && password.length < 6 ? (
        <Text style={styles.errorText}>
          Password should be at least 6 characters
        </Text>
      ) : null}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { opacity: isButtonDisabled ? 0.5 : 1 }]}
          disabled={isButtonDisabled}
          onPress={() => {
            setlogIn(true);
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "(tabs)" }],
              })
            );
          }}
        >
          <Text style={styles.loginText}>login</Text>
        </TouchableOpacity>

        <Text style={styles.signupText}>
          Don't have an account?{" "}
          <TouchableOpacity
            onPress={() => {
              router.push("/Screens/SignUpScreen");
            }}
          >
            <Text style={styles.signupLink}>Sign up</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F3EE",
    padding: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#8F8888",
    textAlign: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 2,
    marginLeft: 5,
  },
  buttonContainer: {
    marginTop: "auto",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#7A6F64",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  loginText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  signupText: {
    marginTop: 16,
    color: "#7C726F",
    textAlign: "center",
  },
  signupLink: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default SignInScreen;
