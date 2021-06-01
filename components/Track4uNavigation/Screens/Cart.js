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
  Portal,
  ScrollView,
  Modal,
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
import Dialog from "react-native-dialog";

const ProductItems = (item, index, setRefresh, getRefresh) => {
  const dispatch = useDispatch();
  const removeProduct = async (Id, item) => {
    // alert(Id);
    // console.log("product Data Particularrrrrrrrrrrrrrrrrrrrr", Id, item.item);
    dispatch({ type: "ADD_PRODUCT_RETURN", payload: [Id, item.item] });
    dispatch({ type: "DELETE_PRODUCT", payload: [Id] });
    setRefresh(!getRefresh);
  };

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

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: "red" }}>&#8377;{item.item.Price__c}</Text>

          <Text style={{ color: "#000", marginRight: 20 }}>
            {" "}
            QTY:-<Text style={{ color: "grey" }}>{item.item.qty}</Text>
          </Text>
        </View>

        <Text style={{ color: "grey" }}>
          Total:- {item.item.qty * item.item.Price__c}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              // width: width * 0.26,
              // height: height * 0.045,
              // backgroundColor: "red",
              // borderRadius: 50,
            }}
          >
            {/* <Text style={{ color: "#FFF" }}>Add To Bag</Text> */}
          </View>
          <TouchableOpacity onPress={() => removeProduct(item.item.Id, item)}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: width * 0.26,
                height: height * 0.045,
                backgroundColor: "red",
                borderRadius: 50,
              }}
            >
              <Text style={{ color: "#FFF" }}>Remove Item </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default function Cart(props) {
  // const dispatch = useDispatch();
  var product = useSelector((state) => state.productData);
  var productData = Object.values(product);
  var userData = useSelector((state) => state.userData);
  var user = Object.values(userData)[0];
  console.log("Prrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", productData);
  const [productTotal, setproductTotal] = useState("");
  const [getRefresh, setRefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [WareHouse, setWareHouse] = useState("");
  const [WareHouseList, setWareHouseList] = useState([]);

  // var Total = '';
  useEffect(() => {
    fetchTotalAmount();
    // console.log("===========>>>>>>>>>>>>>>>>>", user.Address);
    // console.log(props.ev_AccountId);
  }, []);

  const fetchTotalAmount = () => {
    var T = 0;
    productData.map((item) => {
      var total = parseInt(item.qty) * parseInt(item.Price__c);
      T = parseInt(T) + parseInt(total);
    });

    setproductTotal(T);
  };

  const handleOrderPlaced = async () => {
    setModalVisible(true);
    // alert(props.ev_AccountId);
    // console.log(props.ev_AccountId);
    let list = await postData(
      `warehouse/displayByAccountId/${props.ev_AccountId}`
    );
    setWareHouseList(list.data);
  };

  const fetchWarehouseList = () => {
    return WareHouseList.map((item) => {
      return <Picker.Item label={item.Name} value={item.Id} />;
    });
  };

  const handleSubmit = async () => {
    if (WareHouse == "") {
      alert("Select The Warehouse");
    } else {
      alert("WareHouse");
      var body = {
        Bank_Account_Number__c,
        Bank_Name__c,
        Bill_from_Address__c,
        Billing_Address__c: user.Address,
        Billing_City1__c,
        Billing_City__c: user.city,
        Billing_Country1__c,
        Billing_Country__c: user.Country,
        Billing_State_Province1__C,
        Billing_State_Province__C,
        Billing_Street1__c,
        Billing_Street__c,
        Billing_Zip_Postal_Code1__c,
        Billing_Zip_Postal_Code__c,
        Branch_Name__c,
        CGST_Amount__c,
        Challan_No__c,
        Cheque_RTGS_NEFT__c,
        CIN_ERP__c,
        Comment__c,
        Contact_Id__c,
        Contract_End_Date__c,
        Customer__c,
        Delivered_Date__c,
        Delivery_Date__c,
        Dispatched_Date__c,
        Division__c,
        Due_date__c,
        Enquiry_Date__c,
        Enquiry_Number__c,
        Freight_Amount__c,
        Full_Fill_By__c,
        Grand_Total_Excluding_GST__c,
        Grand_Total_Including_GST__c,
        IFSC_Code__c,
        IGST_Amount__c,
        Logistic_Partner_Detail__c,
        Logistic_Type__c,
        LR_Tracking_No__c,
        Name,
        Order_Date__c,
        Order_Status__c,
        Order_Sub_Status__c,
        Order_Type__c,
        Partner__c,
        PO_Date__c,
        PO_Number__c,
        Quote__c,
        Reason_For_Pending__c,
        RecordTypeId,
        Sales_Order_Number__c,
        Sales_User__c,
        SGST_Amount__c,
        Ship_From_Address__c,
        Ship_to__c,
        Shipping_Address__c,
        Shipping_City__c,
        Shipping_Country__c,
        Shipping_State_Province__c,
        Shipping_Street__c,
        Shipping_Zip_Postal_Code__c,
        SOLI_Invoice_Qty__c,
        SOLI_Qty__c,
        Source__c,
        Taxable_Amount__c,
        Total_Amount__c,
        Total_Boxes__c,
        Total_Cess__c,
        Total_Discount__c,
        Total_GST__c,
        Total_GST_Amount__c,
        Total_Lines__c,
        Total_VAT__c,
        VAN_No__c,
        Warehouse__c,
        Weight_in_kg__c,
        SFID,
      };

      setModalVisible(false);
    }
  };

  const handleDialogOrder = () => {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 22,
            }}
          >
            <View
              style={{
                // flexDirection: "row",
                backgroundColor: "white",
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                width: width * 0.9,
                height: height * 0.25,
                elevation: 5,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 10,
                }}
              >
                <Text style={{ justifyContent: "center", fontSize: 18 }}>
                  Select WareHouse
                </Text>
              </View>
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
                  {fetchWarehouseList()}
                </Picker>
              </View>
              <View>
                <TouchableOpacity onPress={() => handleSubmit()}>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: width * 0.26,
                      height: height * 0.045,
                      backgroundColor: "red",
                      borderRadius: 50,
                    }}
                  >
                    <Text style={{ color: "#FFF" }}>Submit </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
          <View
            style={{
              width: width * 0.98,
              height: height * 0.06,
              backgroundColor: "#e7e6e1",
              borderRadius: 5,
              marginBottom: 3,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ alignSelf: "center", marginLeft: 30 }} />
            <Text
              style={{ alignSelf: "center", marginRight: 30, color: "red" }}
            >
              Total : {productTotal}
            </Text>
          </View>

          <FlatList
            data={productData}
            renderItem={({ item, index }) => (
              <ProductItems
                item={item}
                index={index}
                props={props}
                setRefresh={setRefresh}
                getRefresh={getRefresh}
              />
            )}
            keyExtractor={(item) => item.Id}
          />

          <View
            style={{
              justifyContent: "center",
              alignSelf: "center",
              position: "absolute",
              bottom: 0,
            }}
          >
            <TouchableOpacity onPress={() => handleOrderPlaced()}>
              <LinearGradient
                colors={["#e71a23", "#b5005d"]}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={[styles.LinearGradientStyle]}
              >
                <Icon
                  name="add-shopping-cart"
                  size={20}
                  style={{ color: "#FFF", marginLeft: 50 }}
                />
                <Text style={{ ...styles.buttonText, marginLeft: 5 }}>
                  Order placed
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          {handleDialogOrder()}
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  LinearGradientStyle: {
    flexDirection: "row",
    width: width * 0.6,
    padding: 10,
    borderRadius: 40,
    marginBottom: 10,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    color: "#fff",
    backgroundColor: "transparent",
    fontFamily: FontFamily.regular1,
  },
});
