import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ContactUsScreen = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Contact Us</Text>
      </View>

      <Text style={styles.description}>
        Need an experienced and skilled hand with custom projects?
      </Text>

      <View
        style={{
          marginLeft: 6,
        }}
      >
        <Text style={styles.sectionTitle}>Offices:</Text>
        <Text style={styles.officeText}>Country: Pakistan</Text>
        <Text style={styles.officeAddress}>
          Building No. 36-C Badar Commercial Lane No. 13,{"\n"}
          D.H.A Phase 5, Karachi, 75500
        </Text>

        <Text style={styles.sectionTitle}>For Quick Inquiries</Text>
        <View style={styles.contactRow}>
          <FontAwesome
            name="phone"
            size={20}
            color="green"
            style={styles.icon}
          />
          <Text style={styles.contactText}>+92 (317) 2575674</Text>
        </View>

        <Text style={styles.sectionTitle}>For More Information Email Us</Text>
        <View style={styles.contactRow}>
          <FontAwesome
            name="envelope"
            size={20}
            color="#444"
            style={styles.icon}
          />
          <Text style={styles.contactText}>info@thehomestore.pk</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F2EB",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 15,
    padding: 10,
  },
  header: {
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#8F8888",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    textAlign: "center",
  },
  description: {
    // marginTop: 20,
    textAlign: "center",
    fontSize: 14,
    color: "#555",
  },
  sectionTitle: {
    marginTop: 60,
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
  },
  officeText: {
    fontSize: 14,
    color: "#444",
    marginTop: 5,
  },
  officeAddress: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
    lineHeight: 20,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  icon: {
    marginRight: 10,
  },
  contactText: {
    fontSize: 14,
    color: "#333",
  },
});

export default ContactUsScreen;
