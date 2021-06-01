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
import SegmentedControlTab from "react-native-segmented-control-tab";
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
import Info from "./Info";
import Order from "./Order";
import Return from "./Return";
import Cart from "./Cart";
import Transaction from "./Transaction";

export default function TabView(props) {
  const [selectedIndex, setselectedIndex] = useState(0);
  const [ev_AccountId, setev_AccountId] = useState(
    props.route.params.ev_AccountId
  );
  const [WareHouse, setWareHouse] = useState(props.route.params.WareHouse);
  // const [refresh, setrefresh] = useState(false);

  console.log("propsssssssssssssssssssssssssssssss", props.route.params);
  const handleIndexChange = (index) => {
    setselectedIndex(index);
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
        {/* <Image
          source={require('../../images/licon1.png')}
          style={{
            width: width,
            height: 20,
            marginTop: '2%',
          }}
          resizeMode={'center'}
        />
        <Image
          source={require('../../images/91logo.png')}
          style={{
            width: width,
            height: 50,
          }}
          resizeMode={'center'}
        /> */}

        <View
          style={{
            width: width * 0.97,
            justifyContent: "center",
            alignItems: "center",
            marginTop: "5%",
          }}
        >
          <SegmentedControlTab
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            tabTextStyle={styles.tabTextStyle}
            values={["info", "Order", "Return", "Cart", "Transaction"]}
            selectedIndex={selectedIndex}
            // selectedIndex={0}
            onTabPress={handleIndexChange}
          />
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {selectedIndex == 0 ? (
            <>
              <Info ev_AccountId={ev_AccountId} />
            </>
          ) : selectedIndex == 1 ? (
            <>
              <Order WareHouse={WareHouse} />
            </>
          ) : selectedIndex == 2 ? (
            <>
              <Return />
            </>
          ) : selectedIndex == 3 ? (
            <>
              <Cart ev_AccountId={ev_AccountId} />
            </>
          ) : (
            <>
              <Transaction />
            </>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    borderColor: "#d1ccc0",
    backgroundColor: "#ffffff",
    padding: 5,
    backgroundColor: "white",
    width: width * 0.9,
    padding: 20,
    borderRadius: 10,
    borderColor: "#222f3e",
    elevation: 2,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    // width: width * 0.6,
    fontFamily: FontFamily.bold1,
    color: "#fc1818",
  },
  LinearGradientStyle: {
    flexDirection: "row",
    width: width * 0.9,
    padding: 15,
    borderRadius: 40,
    marginBottom: 10,
    // alignSelf: 'center',
    // alignItems: 'center',
    // justifyContent: 'flex-start',
  },
  descStyle: {
    fontSize: 14,
    // width: width * 0.5,
    color: "#000",
    fontFamily: FontFamily.regular1,
  },
  tabStyle: {
    backgroundColor: "#FFF",
    borderColor: "#000",
  },
  activeTabStyle: {
    backgroundColor: "red",
  },
  tabTextStyle: {
    color: "red",
  },
});
