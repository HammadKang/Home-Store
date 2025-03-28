import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import BackIconComponent from "../../components/BackIconComponent";
import CustomTextInput from "../../components/CustomTextInput";
import { useCart } from "../context/AppContext";
import { useNavigation, CommonActions } from "@react-navigation/native";

const SignUpScreen = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const router = useRouter();
  const navigation = useNavigation();
  const { setlogIn } = useCart();

  const validateInput = (field, value) => {
    let errorMsg = "";
    if (value == "") {
      errorMsg = "";
    } else if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errorMsg = "Invalid email address";
    } else if (field === "password" && value.length < 6) {
      errorMsg = "Password must be at least 6 characters";
    } else if (field === "confirmPassword" && value !== form.password) {
      errorMsg = "Passwords do not match";
    }
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
    validateInput(field, value);
  };

  const isFormValid =
    form.name.trim() &&
    form.email.trim() &&
    form.password.trim() &&
    form.confirmPassword.trim() &&
    Object.values(errors).every((err) => !err);

  const handleSignUp = () => {
    setlogIn(true);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "(tabs)" }],
      })
    );
  };

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

      <Text style={styles.title}>Create{"\n"}An Account!</Text>

      <CustomTextInput
        placeholder="User Name"
        value={form.name}
        onChangeText={(text) => handleInputChange("name", text)}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <CustomTextInput
        placeholder="Email Address"
        value={form.email}
        onChangeText={(text) => handleInputChange("email", text)}
        keyboardType="email-address"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <CustomTextInput
        placeholder="Password"
        value={form.password}
        onChangeText={(text) => handleInputChange("password", text)}
        isPassword
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

      <CustomTextInput
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChangeText={(text) => handleInputChange("confirmPassword", text)}
        isPassword
      />
      {errors.confirmPassword && (
        <Text style={styles.errorText}>{errors.confirmPassword}</Text>
      )}

      <View
        style={{
          marginTop: "auto",
          marginBottom: 24,
        }}
      >
        <TouchableOpacity
          style={[styles.button, { opacity: isFormValid ? 1 : 0.5 }]}
          onPress={handleSignUp}
          disabled={!isFormValid}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.signInText}>
          Already have an account?{" "}
          <TouchableOpacity
            onPress={() => {
              router.push("/Screens/SignInScreen");
            }}
          >
            <Text style={styles.signInLink}>Sign in</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8F6F2",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#8F8888",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#7A6F64",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  signInText: {
    textAlign: "center",
    marginTop: 10,
    color: "#7A6F64",
  },
  signInLink: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
};

export default SignUpScreen;
