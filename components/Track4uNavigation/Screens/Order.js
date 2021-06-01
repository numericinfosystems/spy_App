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
  Modal,
} from "react-native";
import InputSpinner from "react-native-input-spinner";
// import SegmentedControlTab from 'react-native-segmented-control-tab';
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import FAIcon from "react-native-vector-icons/FontAwesome";
import MIcon from "react-native-vector-icons/MaterialIcons";
// import {TextInput} from 'react-native-paper';
const { width, height } = Dimensions.get("window");
import { useSelector, useDispatch } from "react-redux";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { FontFamily } from "../config/FontFamily";
import { Picker } from "@react-native-picker/picker";
import { getData, postData } from "../FecthServerServices";
import { Linking } from "react-native";

const FetchProductView = ({ item, index, props }) => {
  const dispatch = useDispatch();

  const [qty, setqty] = useState("");
  const [Id, setId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setId(item.Id);
  }, []);

  const handleAddToCart = () => {
    const body = {
      qty: qty,
      Brand__c: item.Brand__c,
      Category_1__c: item.Category_1__c,
      Category_2__c: item.Category_2__c,
      Category__c: item.Category__c,
      Cess__c: item.Cess__c,
      CGST__c: item.CGST__c,
      Color__c: item.Color__c,
      Company_Name__c: item.Company_Name__c,
      Currency__c: item.Currency__c,
      GST__c: item.GST__c,
      HSNSAC_Code__c: item.HSNSAC_Code__c,
      Id: Id,
      IGST__c: item.IGST__c,
      Image__c: item.Image__c,
      Is_Active__c: item.Is_Active__c,
      Is_Focused__c: item.Is_Focused__c,
      Is_Public__c: item.Is_Public__c,
      MinSales_Price__c: item.MinSales_Price__c,
      MOQ__c: item.MOQ__c,
      MRP__c: item.MRP__c,
      Name: item.Name,
      OQM__c: item.OQM__c,
      Packing__c: item.Packing__c,
      Price__c: item.Price__c,
      Print_Name__c: item.Print_Name__c,
      Product_Code__c: item.Product_Code__c,
      Product_Specifications__c: item.Product_Specifications__c,
      Searchable__c: item.Searchable__c,
      SGST__c: item.SGST__c,
      Short_description__c: item.Short_description__c,
      Size__c: item.Size__c,
      SKU__c: item.SKU__c,
      Stock_Status__c: item.Stock_Status__c,
      Tag__c: item.Tag__c,
      Unit_Price__c: item.Unit_Price__c,
      UOM__c: item.UOM__c,
      VAT__c: item.VAT__c,
    };
    // console.log("aaaaaaaaaaaaaaaaaaaaaaa", JSON.stringify(body));
    dispatch({ type: "ADD_PRODUCT", payload: [body.Id, body] });
    setModalVisible(!modalVisible);
  };

  const fetchModal = () => {
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
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View>
                <View
                  style={{
                    width: width * 0.5,
                    height: height * 0.25,
                    justifyContent: "center",
                    alignItems: "center",

                    // backgroundColor: '#000',
                  }}
                >
                  <Image
                    source={require("../../images/apple.jpg")}
                    style={{
                      top: 0,
                      width: width * 0.5,
                      height: height * 0.24,
                    }}
                    // resizeMode={'center'}
                  />
                </View>
              </View>
              <View>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {item.Name}
                </Text>
                <Text style={{ fontSize: 15 }}>{item.Brand__c}</Text>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{ fontSize: 14, fontWeight: "bold", color: "red" }}
                  >
                    &#8377; &#8377;{item.Price__c}
                    {"   "}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      textDecorationLine: "line-through",
                      color: "grey",
                    }}
                  >
                    &#8377;{item.MRP__c}
                  </Text>
                </View>
                <View style={{ marginTop: 10 }}>
                  <InputSpinner
                    min={0}
                    initialValue={0}
                    step={1}
                    // skin={'c'}
                    height={35}
                    colorMax={"red"}
                    colorMin={"red"}
                    value={qty}
                    onChange={(num) => {
                      setqty(num);
                    }}
                  />
                </View>
                <View
                  style={{
                    marginTop: "20%",
                    width: width * 0.25,
                    height: height * 0.05,
                    backgroundColor: "red",
                    justifyContent: "center",
                    alignSelf: "center",
                    borderRadius: 20,
                  }}
                >
                  <TouchableOpacity onPress={() => handleAddToCart()}>
                    <Text
                      style={{
                        justifyContent: "center",
                        alignSelf: "center",
                        color: "#FFF",
                      }}
                    >
                      Add To Cart
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View />
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <View
      style={{
        borderColor: "#e8eae6",
        borderWidth: StyleSheet.hairlineWidth,
        // backgroundColor: '#000',
      }}
    >
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View
          style={{
            width: width * 0.5,
            height: height * 0.25,
            justifyContent: "center",
            alignItems: "center",

            // backgroundColor: '#000',
          }}
        >
          <Image
            source={require("../../images/apple.jpg")}
            style={{
              top: 0,
              width: width * 0.5,
              height: height * 0.24,
            }}
            // resizeMode={'center'}
          />
        </View>
        <View style={{ paddingLeft: 10, bottom: 5 }}>
          <Text style={{ fontSize: 11, fontWeight: "bold" }}>{item.Name}</Text>
          <Text style={{ fontSize: 10 }}>{item.Brand__c}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 9, fontWeight: "bold", color: "red" }}>
              &#8377;{item.Price__c}
              {"   "}
            </Text>
            <Text
              style={{
                fontSize: 9,
                textDecorationLine: "line-through",
                color: "grey",
              }}
            >
              &#8377;{item.MRP__c}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View>{fetchModal()}</View>
    </View>
  );
};

export default function Order(props) {
  const [getProductList, setProductList] = useState([]);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    let result = await getData(`product/displayProduct/${props.WareHouse}`);
    if (result.status) {
      // console.log('Product Data', result.data);
      setProductList(result.data);
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
        <View
          style={{
            // flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: "3%",

            width: width,
            // height: height * 0.9,
            // backgroundColor: 'red',
          }}
        >
          <ScrollView>
            <FlatList
              data={getProductList}
              showsVerticalScrollIndicator={false}
              // renderItem={fetchProductView}

              renderItem={({ item, index }) => (
                <FetchProductView item={item} index={index} props={props} />
              )}
              keyExtractor={(item) => String(item.Id)}
              numColumns={2}
            />
          </ScrollView>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    flexDirection: "row",
    // margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    // borderTopLeftRadius: 30,
    // borderBottomRightRadius: 30,
    // padding: 35,
    alignItems: "center",
    // justifyContent: 'space-between',
    // shadowColor: '#000',
    width: width * 0.9,
    height: height * 0.35,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
