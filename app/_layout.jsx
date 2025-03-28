import { View, Text, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";
import TabBar from "../components/TabBar";
import { AppProvider } from "./context/AppContext";

const _layout = () => {
  return (
    // <Tabs
    //   screenOptions={{
    //     headerShown: false,
    //   }}
    //   tabBar={(props) => <TabBar {...props} />}
    // >
    //   <Tabs.Screen
    //     name="index"
    //     options={{
    //       title: "Home",
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="explore"
    //     options={{
    //       title: "Explore",
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="profile"
    //     options={{
    //       title: "Profile",
    //     }}
    //   />
    // </Tabs>
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={"#000"} />
      <AppProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </AppProvider>
    </SafeAreaView>
  );
};

export default _layout;
