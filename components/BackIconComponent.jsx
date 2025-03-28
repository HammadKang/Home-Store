import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";

const BackIconComponent = ({ onPress }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => {
        if (onPress) {
          onPress();
        } else {
          router.back();
        }
      }}
      style={styles.backButton}
    >
      <Feather name="chevron-left" size={26} color="#7A6F64" />
    </TouchableOpacity>
  );
};

const styles = {
  backButton: {
    marginTop: 12,
  },
};

export default BackIconComponent;
