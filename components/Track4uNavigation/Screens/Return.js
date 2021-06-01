import React, { useEffect, useState } from "react";
import {
  StatusBar,
  TextInput,
  Dimensions,
  Alert,
  Button,
  SafeAreaView,
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
  TouchableHighlight,
  Text,
  Image,
  ScrollView,
} from "react-native";
// import SegmentedControlTab from 'react-native-segmented-control-tab';
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import FAIcon from "react-native-vector-icons/FontAwesome";
import MIcon from "react-native-vector-icons/MaterialIcons";
const { width, height } = Dimensions.get("window");
import { useSelector, useDispatch } from "react-redux";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { FontFamily } from "../config/FontFamily";
import { Picker } from "@react-native-picker/picker";
import { getData, postData } from "../FecthServerServices";
import { Linking } from "react-native";

export default function Return(props) {
  var ReturnProduct = useSelector((state) => state.productReturnData);
  var ReturnProductData = Object.values(ReturnProduct);
  // console.log("return Product.........", ReturnProductData);

  const productReturnItems = (item) => {
    return (
      <View
        style={{
          width: width * 0.98,
          height: height * 0.19,
          // backgroundColor: '#000',
          borderRadius: 5,
          marginBottom: 3,
          flexDirection: "row",
          alignSelf: "center",
          // borderColor: '#222f3e',
          elevation: 2,
        }}
      >
        <View
          style={{
            width: width * 0.3,
            justifyContent: "center",
            alignSelf: "center",
            padding: 5,
          }}
        >
          <Image
            source={require("../../images/apple.jpg")}
            style={{
              top: 0,
              width: width * 0.25,
              height: height * 0.15,
            }}
            resizeMode={"center"}
          />
        </View>
        <View
          style={{
            width: width * 0.7,
            padding: 5,
            justifyContent: "flex-start",
            padding: 20,
          }}
        >
          <Text style={{ color: "#000" }}>
            {item.item.Brand__c}
            {/* {item.item.Id} */}
          </Text>
          <Text style={{ color: "#000" }}>{item.item.Size__c}</Text>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: "red" }}>&#8377;{item.item.Price__c}</Text>

            <Text style={{ color: "#000", marginRight: 20 }}>
              {" "}
              QTY:-<Text style={{ color: "grey" }}>{item.item.qty}</Text>
            </Text>
          </View>

          <Text style={{ color: "grey" }}>
            Total:- {item.item.qty * item.item.Price__c}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <View
        style={{
          // justifyContent: 'center',
          alignItems: "center",
          backgroundColor: "#fff",
          flex: 1,
        }}
      >
        <View
          style={{
            width: width,
            justifyContent: "center",
            alignItems: "center",
            margin: "2%",
            flex: 1,
          }}
        >
          <FlatList
            data={ReturnProductData}
            renderItem={productReturnItems}
            keyExtractor={(item) => item.Id}
          />
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }} />
      </View>
    </>
  );
}
