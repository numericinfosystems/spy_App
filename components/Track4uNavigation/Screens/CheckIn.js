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

export default function CheckIn(props) {
  const [ev_AccountId, setev_AccountId] = useState(
    props.route.params.ev_AccountId
  );
  const [recordTypeId, setrecordTypeId] = useState("");
  const [parentid, setparentid] = useState("");
  const [dropDList, setdropDList] = useState([]);
  const [Distributor, setDistributor] = useState("");
  const [DistributorName, setDistributorName] = useState("");
  const [WareHouse, setWareHouse] = useState("");
  const [refresh, setrefresh] = useState(false);

  useEffect(() => {
    checkAccount();
  }, []);

  const checkAccount = async () => {
    // let body = { Id: props.route.params.ev_AccountId };
    console.log(
      "AccountiDdddddddddddddddddddddddd",
      props.route.params.ev_AccountId
    );
    let result = await postData(
      `account/displayByAccId/${props.route.params.ev_AccountId}`
    );
    if (result.status) {
      console.log(
        "Record Type Id.(Dstributor/Reatiler).",
        result.data[0].RecordTypeId
      );
      console.log("ParentId...............", result.data[0].parentid);
      console.log("ParentId...............", result.data[0]);

      setrecordTypeId(result.data[0].RecordTypeId);
      setparentid(result.data[0].parentid);
      if (result.data[0].RecordTypeId == "Retailer") {
        let rslt = await postData(
          `account/displayByParentId/${result.data[0].parentid}`
        );
        if (rslt.status) {
          // alert(rslt.data[0].wname);
          setDistributorName(rslt.data[0].wname);
        }
        if (
          result.data[0].Warehouse__c == "null" ||
          result.data[0].Warehouse__c == "0"
        ) {
          // alert(result.data[0].parentid);
          let list = await postData(
            `warehouse/displayByParentId/${result.data[0].parentid}`
          );
          console.log("*****************************", list.data);
          setdropDList(list.data);
        }
      } else {
        fetchWarehouse(result.data[0].parentid);
      }
    }
  };
  // 8770206043nis
  const fetchWarehouse = async (Account__c) => {
    // console.log("fetchAcccccccounttttttt_________cccccc", Account__c);
    let list = await postData(`warehouse/displayDropDown/${Account__c}`);
    if (list.status) {
      console.log("Drop Down Valueeeeeee......", list.data);
      setdropDList(list.data);
    }
    // alert(Account__c);
  };

  // const fetchDistributorItem = () => {
  //   return dropDList.map((item) => {
  //     return <Picker.Item label={item.Name__c} value={item.Id} />;
  //   });
  // };

  const fetchWareHouseItem = () => {
    return dropDList.map((item) => {
      return <Picker.Item label={item.Name__c} value={item.Id} />;
    });
  };

  const handleDistributor = (itemValue) => {
    setDistributor(itemValue);
  };

  const handleSubmit = () => {
    if (WareHouse == "") {
      alert("Select The Ware House");
    } else {
      props.navigation.navigate("TabView", {
        ev_AccountId: ev_AccountId,
        WareHouse: WareHouse,
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          // justifyContent: 'center',
          alignItems: "center",
          backgroundColor: "#fff",
          // height: height * 0.9,
          // flex: 1,
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
        <Text
          style={{
            marginTop: "2%",
            fontSize: 23,
            fontFamily: FontFamily.bold1,
          }}
        >
          Check In
        </Text>

        {/* <View
          style={{
            width: width * 0.9,
            marginTop: '2%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LinearGradient
            colors={['#e71a23', '#b5005d']}
            start={{x: 1, y: 1}}
            end={{x: 0, y: 0}}
            style={[styles.LinearGradientStyle]}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: width * 0.8,
                alignSelf: 'center',
              }}>
              <TouchableOpacity>
                <View>
                  <Text
                    style={{
                      ...styles.buttonText,
                      marginLeft: 5,
                      color: '#fff',
                    }}>
                    Info
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View>
                  <Text
                    style={{
                      ...styles.buttonText,
                      marginLeft: 5,
                      color: '#fff',
                    }}>
                    Order
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View>
                  <Text
                    style={{
                      ...styles.buttonText,
                      color: '#fff',
                      marginLeft: 5,
                    }}>
                    sale return
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text
                    style={{
                      ...styles.buttonText,
                      color: '#fff',
                      marginLeft: 5,
                    }}>
                    More
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
         */}
        <View
          style={{
            width: width * 0.9,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View>
            {recordTypeId == "Distributor" ? (
              <View>
                <Picker
                  selectedValue={WareHouse}
                  style={{ height: 50, width: width * 0.8 }}
                  onValueChange={(itemValue) => setWareHouse(itemValue)}
                >
                  <Picker.Item
                    label="--Warehouse--"
                    value=""
                    style={{
                      color: "grey",
                    }}
                  />
                  {fetchWareHouseItem()}
                </Picker>
              </View>
            ) : (
              <></>
            )}
            {recordTypeId == "Retailer" ? (
              <View>
                <TextInput
                  style={{ backgroundColor: "white" }}
                  label="DistibutorName"
                  value={DistributorName}
                  placeholder="Distributor Name"
                  theme={{
                    colors: {
                      placeholder: "gray",
                      text: "#245ef4",
                      primary: "#245ef4",
                      underlineColor: "transparent",
                      background: "#FFF",
                    },
                  }}
                />
                {/* <View></View>   */}
                {/* <Picker
                  selectedValue={Distributor}
                  style={{ height: 50, width: width * 0.8 }}
                  onValueChange={(itemValue) => handleDistributor(itemValue)}
                >
                  <Picker.Item
                    label="--Distributor--"
                    value=""
                    style={{ color: "grey" }}
                  />
                  {fetchWareHouseItem()}
                </Picker> */}
                <Picker
                  selectedValue={WareHouse}
                  style={{ height: 50, width: width * 0.8 }}
                  onValueChange={(itemValue) => setWareHouse(itemValue)}
                >
                  <Picker.Item
                    label="--Warehouse--"
                    value=""
                    style={{ color: "grey" }}
                  />
                  {fetchWareHouseItem()}
                </Picker>
              </View>
            ) : (
              <></>
            )}
          </View>
        </View>

        <View
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,

            // borderColor: '#222f3e',
          }}
        >
          <TouchableOpacity onPress={() => handleSubmit()}>
            <Text
              style={{
                elevation: 4,
                backgroundColor: "red",
                borderRadius: 20,
                paddingHorizontal: 15,
                paddingVertical: 7,
                color: "#FFF",
              }}
            >
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
});
