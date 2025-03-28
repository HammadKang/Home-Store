import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const CustomTextInput = ({
  placeholder,
  value,
  onChangeText,
  isPassword = false,
  keyboardType = "default",
}) => {
  const [showPassword, setShowPassword] = useState(!isPassword);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#A9A9A9"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPassword && !showPassword}
        keyboardType={keyboardType}
      />
      {isPassword && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Feather
            name={showPassword ? "eye" : "eye-off"}
            size={16}
            color="gray"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = {
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 8,
    height: 44,
    paddingHorizontal: 12,
    elevation: 0.6,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
};

export default CustomTextInput;
