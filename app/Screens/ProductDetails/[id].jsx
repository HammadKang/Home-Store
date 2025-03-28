import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useCart } from "../../context/AppContext";

const ProductDetails = () => {
  const { id, name, price, image } = useLocalSearchParams();
  const { addToCart, cartData } = useCart();
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => {
    setAdded(false);
    setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    setAdded(false);
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const data = [
    {
      id: "1",
      name: "Bed Set -1179LS",
      price: "PKR 88,000",
      image: require("./../../../assets/images/AllFurniture1.png"),
    },
    {
      id: "2",
      name: "Console -1171AD",
      price: "PKR 72,500",
      image: require("./../../../assets/images/AllFurniture2.png"),
    },
    {
      id: "3",
      name: "BLACKOUT FABRIC YLZ 3 Pass Flocking -1154CT",
      price: "PKR 88,000",
      image: require("./../../../assets/images/AllCurtainsCategory1.png"),
    },
    {
      id: "4",
      name: "ILANA Window Curtain -1181CT",
      price: "PKR 7,500",
      image: require("./../../../assets/images/AllCurtainsCategory3.png"),
    },
  ];

  const handleAddToCart = () => {
    const numericPrice = parseInt(price.replace(/[^0-9]/g, ""), 10);
    const cartItem = cartData.find((item) => item.id === id);

    if (cartItem) {
      addToCart({ ...cartItem, quantity });
    } else {
      addToCart({ id, name, price: numericPrice, image, quantity });
    }
    setAdded(true);
  };

  useEffect(() => {
    const cartItem = cartData.find((item) => item.id === id);
    if (cartItem) {
      setAdded(true);
      setQuantity(cartItem.quantity);
    }
  }, [cartData, id]);

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="arrow-back" size={22} color="black" />
        </TouchableOpacity>
        <Text style={styles.productTitle}>{name}</Text>
        <View style={{ width: 10 }} />
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.imageWrapper}>
          <Image source={image} style={styles.productImage} />
          <TouchableOpacity
            style={styles.heartIcon}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Icon
              name={isFavorite ? "heart" : "heart-o"}
              size={24}
              color={isFavorite ? "red" : "#666"}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            marginBottom: 20,
          }}
        >
          <Text style={styles.price}>{price}</Text>
          <Text style={styles.description}>
            Minimalist Platform bed is designed for elegance and comfort. It
            features a sleek, low-profile frame with an extended headboard that
            includes a built-in floating nightstand. The neutral tones and clean
            lines make it a perfect choice for contemporary interiors. The
            sturdy structure ensures durability, while the soft upholstery adds
            a luxurious touch.
          </Text>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>MATERIALS</Text>
          <Text style={styles.material}>
            • <Text style={styles.bold}>Bed Frame</Text>: High-quality wood with
            a durable veneer finish.
          </Text>
          <Text style={styles.material}>
            • <Text style={styles.bold}>Upholstery</Text>: Premium fabric blend
            with soft texture.
          </Text>
          <Text style={styles.material}>
            • <Text style={styles.bold}>Mattress Support</Text>: Sturdy wooden
            durability.
          </Text>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>SIZE</Text>
          <Text style={styles.material}>
            <Text style={styles.bold}>Length:</Text> 200 Centimeters
          </Text>
          <Text style={styles.material}>
            <Text style={styles.bold}>Width:</Text> 190 Centimeters
          </Text>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>NOTE</Text>
          <Text style={styles.material}>
            The mattress is 180×200 cm (not included).
          </Text>
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
            }}
            activeOpacity={0.7}
            onPress={() => {
              router.push("/Screens/WriteReview");
            }}
          >
            <Text style={styles.reviewText}>WRITE A REVIEW</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>You May Also Like</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
          >
            {data.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.horizontalProductItem}
                activeOpacity={0.7}
                onPress={() => {
                  router.push({
                    pathname: `/Screens/ProductDetails/${item.id}`,
                    params: {
                      name: item.name,
                      price: item.price,
                      image: item.image,
                    },
                  });
                }}
              >
                <Image
                  source={item.image}
                  style={styles.horizontalSuggestedImage}
                />
                <Text style={styles.horizontalProductName}>{item.name}</Text>
                <Text style={styles.horizontalProductPrice}>{item.price}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
      <View style={styles.cartContainer}>
        <View style={styles.quantitySelector}>
          <TouchableOpacity onPress={decreaseQuantity} style={styles.qtyBtn}>
            <MaterialIcons name="remove" size={15} color="black" />
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{quantity}</Text>
          <TouchableOpacity onPress={increaseQuantity} style={styles.qtyBtn}>
            <MaterialIcons name="add" size={15} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
          disabled={added}
        >
          <Text style={styles.addToCartText}>
            {added ? "Added to Cart" : "Add to Cart"}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    marginHorizontal: 16,
    paddingTop: 20,
  },
  productTitle: {
    fontSize: 19,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
  productSubTitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  imageWrapper: {
    position: "relative",
    alignItems: "center",
    marginBottom: 20,
  },
  productImage: {
    width: "100%",
    height: 250,
    // borderRadius: 10,
    resizeMode: "stretch",
  },
  heartIcon: {
    position: "absolute",
    top: 10,
    right: 22,
    borderRadius: 20,
    padding: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  material: {
    fontSize: 14,
    color: "#444",
    marginBottom: 5,
  },
  bold: {
    fontWeight: "bold",
  },
  cartContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 16,
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingVertical: 5,
    backgroundColor: "#D9D9D9",
    width: "30%",
    justifyContent: "space-around",
  },
  quantityButton: {
    paddingHorizontal: 10,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityValue: {
    fontSize: 16,
    marginHorizontal: 10,
    color: "black",
    fontWeight: "800",
  },
  addToCartButton: {
    backgroundColor: "#000",
    paddingVertical: 11,
    // paddingHorizontal: 20,
    borderRadius: 12,
    width: "66%",
  },
  addToCartText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "rgba(143, 136, 136, 0.58)",
    marginVertical: 18,
  },
  reviewText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#666",
    textTransform: "uppercase",
    textDecorationLine: "underline",
  },

  suggestedProducts: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  productItem: {
    alignItems: "center",
    width: "48%",
  },

  suggestedImage: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
    borderRadius: 8,
  },

  productName: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },

  productPrice: {
    fontSize: 14,
    color: "#444",
    textAlign: "center",
    marginTop: 2,
  },
  qtyBtn: { padding: 6, borderRadius: 4 },
  horizontalScroll: {
    marginTop: 10,
    marginBottom: 10,
  },
  horizontalProductItem: {
    width: 190,
    marginRight: 15,
  },
  horizontalSuggestedImage: {
    width: 190,
    height: 130,
    resizeMode: "cover",
    borderRadius: 8,
  },
  horizontalProductName: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },
  horizontalProductPrice: {
    fontSize: 14,
    color: "#444",
    marginTop: 2,
    textAlign: "center",
  },
});
