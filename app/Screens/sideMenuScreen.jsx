import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCart } from "../context/AppContext";

const MenuButton = ({ title, iconName, iconFamily, onPress }) => {
  const IconComponent = iconFamily || FontAwesome;
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <IconComponent
        name={iconName}
        size={22}
        color="#8F8888"
        style={styles.icon}
      />
      <Text style={styles.menuText}>{title}</Text>
    </TouchableOpacity>
  );
};

const SideMenuScreen = () => {
  const router = useRouter();
  const { logIn } = useCart();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => router.back()}
      >
        <Ionicons name="close" size={24} color="#8F8888" />
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/Screens/BestSellingProducts")}
        >
          <Text style={styles.buttonText}>Best Sellers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/Screens/NewProducts")}
        >
          <Text style={styles.buttonText}>New Arrivals</Text>
        </TouchableOpacity>
      </View>

      <MenuButton
        title="Bedroom"
        iconName="bed"
        iconFamily={FontAwesome}
        onPress={() => router.push("/Screens/BedroomScreen")}
      />
      <MenuButton
        title="Living Room"
        iconName="couch"
        iconFamily={FontAwesome5}
        onPress={() => router.push("/Screens/LivingRoomScreen")}
      />
      <MenuButton
        title="Kids Room"
        iconName="child"
        iconFamily={FontAwesome}
        onPress={() => router.push("/Screens/KidRoomScreen")}
      />
      <MenuButton
        title="Kitchen"
        iconName="restaurant-menu"
        iconFamily={MaterialIcons}
        onPress={() => router.push("/Screens/KitchenScreen")}
      />
      <MenuButton
        title="Reviews"
        iconName="star"
        iconFamily={FontAwesome}
        onPress={() => router.push("/Screens/Reviews")}
      />

      {logIn ? (
        <></>
      ) : (
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => {
              router.push("/Screens/SignInScreen");
            }}
          >
            <Text style={styles.footerText}>LOGIN</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            onPress={() => {
              router.push("/Screens/SignUpScreen");
            }}
          >
            <Text style={styles.footerText}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F8F2",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  closeButton: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: "#A9A9A9",
    height: 46,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 14,
    color: "#666",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#8F888896",
    marginTop: 26,
  },
  icon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 20,
    color: "#8F8888",
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
  },
  footerText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "400",
  },
  divider: {
    height: 14,
    width: 1,
    backgroundColor: "#A9A9A9",
    marginHorizontal: 12,
  },
});

export default SideMenuScreen;
