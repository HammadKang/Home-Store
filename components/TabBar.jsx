import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";

const TabBar = ({ state, descriptors, navigation }) => {
  const icons = {
    index: (props) => (
      <AntDesign name="home" size={26} color={"#737373"} {...props} />
    ),
    explore: (props) => (
      <Feather name="compass" size={26} color={"#737373"} {...props} />
    ),
    profile: (props) => (
      <AntDesign name="user" size={26} color={"#737373"} {...props} />
    ),
  };

  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title || route.name;

        if (["_sitemap", "+not-found"].includes(route.name)) {
          return null;
        }

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabButton}
          >
            {icons[route.name]({
              color: isFocused ? "#673AB7" : "#737373",
            })}
            <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = {
  tabBarContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    paddingTop: 10,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    position: "relative",
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#888",
    marginTop: 2,
  },
  tabLabelActive: {
    color: "#673AB7",
    fontWeight: "bold",
  },
  activeIndicator: {
    position: "absolute",
    bottom: -8,
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#673AB7",
  },
};

export default TabBar;
