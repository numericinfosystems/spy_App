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

export default function Info(props) {
  // const [ev_AccountId, setev_AccountId] = useState(props.ev_AccountId);
  const [Name, setName] = useState("");
  const [Mobile, setMobile] = useState("");
  const [GSTIN, setGSTIN] = useState("");
  const [Address, setAddress] = useState("");
  const [DealerType, setDealertype] = useState("");
  const [LedgerType, setLedgertype] = useState("");

  useEffect(() => {
    // console.log("Info", props.ev_AccountId);
    fetchAccountDetail(props.ev_AccountId);
  }, []);

  const fetchAccountDetail = async (Id) => {
    let result = await postData(`account/displayByAccId/${Id}`);
    if (result.status) {
      console.log("============================>>>>", result.data[0]);
      let data = result.data[0];
      setName(data.Name);
      setMobile(data.Phone);
      setGSTIN(data.GSTIN__c);
      setAddress(data.BillingAddress);
      setDealertype(data.Dealer_Type__c);
      setLedgertype(data.Ledger_Type);
    }
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
        <Image
          source={require("../../images/licon1.png")}
          style={{
            width: width,
            height: 20,
            marginTop: "2%",
          }}
          resizeMode={"center"}
        />
        <Image
          source={require("../../images/91logo.png")}
          style={{
            width: width,
            height: 50,
          }}
          resizeMode={"center"}
        />
        <View
          style={{
            width: width * 0.9,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: width * 0.7,
              flexDirection: "row",
              justifyContent: "space-between",
              alignSelf: "center",
            }}
          >
            <Text>Name</Text>
            <Text>{Name}</Text>
          </View>
          <View
            style={{
              width: width * 0.7,
              flexDirection: "row",
              justifyContent: "space-between",
              alignSelf: "center",
            }}
          >
            <Text>Mobile</Text>
            <Text>{Mobile}</Text>
          </View>
          <View
            style={{
              width: width * 0.7,
              flexDirection: "row",
              justifyContent: "space-between",
              alignSelf: "center",
            }}
          >
            <Text>GSTIN</Text>
            <Text>{GSTIN}</Text>
          </View>
          <View
            style={{
              width: width * 0.7,
              flexDirection: "row",
              justifyContent: "space-between",
              alignSelf: "center",
            }}
          >
            <Text>Address</Text>
            <Text>{Address}</Text>
          </View>
          <View
            style={{
              width: width * 0.7,
              flexDirection: "row",
              justifyContent: "space-between",
              alignSelf: "center",
            }}
          >
            <Text>Dealer Type</Text>
            <Text>{DealerType}</Text>
          </View>
          <View
            style={{
              width: width * 0.7,
              flexDirection: "row",
              justifyContent: "space-between",
              alignSelf: "center",
            }}
          >
            <Text>Ledger Type</Text>
            <Text>{LedgerType}</Text>
          </View>
        </View>
        {/* <View style={{justifyContent: 'center', alignItems: 'center'}}></View> */}
      </View>
    </>
  );
}
