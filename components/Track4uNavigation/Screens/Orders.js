import React, { useEffect, useState } from "react";
// import { StatusBar } from "react-native";
import {
  Dimensions,
  Alert,
  Button,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
  TouchableHighlight,
  Text,
  Image,
  ScrollView,
  PermissionsAndroid,
  Platform,
} from "react-native";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";

import { TextInput, List, Portal, Dialog, Paragraph } from "react-native-paper";
import FAIcon from "react-native-vector-icons/FontAwesome";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import LinearGradient from "react-native-linear-gradient";
import { Picker } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
import { useSelector, useDispatch } from "react-redux";
import { FontFamily } from "../config/FontFamily";
import { getData, postData, postDataAndImage } from "../FecthServerServices";
import RNFS from "react-native-fs";
import { flash, flashSuccess } from "../config/helper";

export default function Orders(props) {
  var userData = useSelector((state) => state.userData);
  var user = Object.values(userData)[0];

  const [FirmName, setFirmName] = useState(props.route.params.firmname);
  const [getCategory, setCategory] = useState("");
  const [getProduct, setProduct] = useState("");
  const [getRemark, setRemark] = useState("");
  const [getNumberQtyDemand, setNumberQtyDemand] = useState("");
  const [getQtyIssue, setQtyIssue] = useState("");
  const [getOrderTotal, setOrderTotal] = useState("");
  const [getCollectionAmt, setCollectionAmt] = useState("");
  const [getList, setList] = useState([]);
  // const [Desc, setDesc] = useState("");
  const [filePath, setFilePath] = useState({});
  const [OrderDate, setOrderDate] = useState(new Date());
  const [OrderTime, setOrderTime] = useState(new Date());
  const [getBase64, setBase64] = useState(null);

  /*---------------Upload Image Code With Permission----------------- */
  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Camera Permission",
            message: "App needs camera permission",
          }
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "External Storage Write Permission",
            message: "App needs write permission",
          }
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert("Write permission err", err);
      }
      return false;
    } else return true;
  };

  const captureImage = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: "low",
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        console.log("Response = ", response);

        if (response.didCancel) {
          alert("User cancelled camera picker");
          return;
        } else if (response.errorCode == "camera_unavailable") {
          alert("Camera not available on device");
          return;
        } else if (response.errorCode == "permission") {
          alert("Permission not satisfied");
          return;
        } else if (response.errorCode == "others") {
          alert(response.errorMessage);
          return;
        }
        console.log("base64 -> ", response.base64);
        RNFS.readFile(response.uri, "base64").then((res) => setBase64(res));
        console.log("uri -> ", response.uri);
        console.log("width -> ", response.width);
        console.log("height -> ", response.height);
        console.log("fileSize -> ", response.fileSize);
        console.log("type -> ", response.type);
        console.log("fileName -> ", response.fileName);
        setFilePath(response);
      });
    }
  };

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      console.log("Response = ", response);

      if (response.didCancel) {
        alert("User cancelled camera picker");
        return;
      } else if (response.errorCode == "camera_unavailable") {
        alert("Camera not available on device");
        return;
      } else if (response.errorCode == "permission") {
        alert("Permission not satisfied");
        return;
      } else if (response.errorCode == "others") {
        alert(response.errorMessage);
        return;
      }
      console.log("base64 -> ", response.base64);
      console.log("uri -> ", response.uri);
      console.log("width -> ", response.width);
      console.log("height -> ", response.height);
      console.log("fileSize -> ", response.fileSize);
      console.log("type -> ", response.type);
      console.log("fileName -> ", response.fileName);
      setFilePath(response);
    });
  };
  /*---------*****************************------------ */

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    let list = await getData("categories/displayall");
    list.status && setList(list.data);
  };

  const getCategoryItem = () => {
    return getList.map((item) => {
      return (
        <Picker.Item
          label={item.categoryname}
          value={item.categoryname}
          key={item.categoryid}
        />
      );
    });
  };

  const handleSubmit = async () => {
    if (getCategory == "") {
      flash("Select the category");
    } else {
      var body = {
        taskid: props.route.params.taskId,
        employeeid: props.route.params.empId,
        categoryid: getCategory,
        productid: getProduct,
        orderdate: new Date(),
        ordertime: new Date(),
        clientid: props.route.params.clientId,
        remark: getRemark,
        numberqtydemand: getNumberQtyDemand,
        qtyissue: getQtyIssue,
        ordertotal: getQtyIssue,
        collectionamount: getCollectionAmt,

        uploadorder: {
          name: filePath.fileName,
          type: filePath.type,
          uri: "data:image/jpeg;base64," + getBase64,
        },
      };
      console.log(body);
      var result = await postData("order/Add", body);

      if (result.status) {
        var newbody = {
          status: "Completed",
          taskid: props.route.params.taskId,
          assigntaskid: props.route.params.assigntaskid,
        };
        let newresult = await postData("task/editStatus", newbody);
        props.navigation.navigate("Dashboard");
        flashSuccess("Order upload Sucessfully");
        setRemark("");
        setFilePath("");
        setBase64("");
        props.navigation.navigate("Dashboard");
      }
    }
  };

  return (
    <>
      <View
        style={{
          // justifyContent: "center",
          // alignItems: "center",
          backgroundColor: "#fff",
          flex: 1,
        }}
      >
        {/* <StatusBar translucent backgroundColor="#b5005d" /> */}
        <StatusBar translucent backgroundColor="transparent" />

        <View
          style={{
            width: width,
          }}
        >
          <LinearGradient
            //   colors={['#e71a23', '#7c236d']}
            colors={["#e71a23", "#b5005d"]}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
          >
            <View
              style={{
                flexDirection: "row",
                // justifyContent: "space-between",
                // alignItems: "flex-end",
                padding: 10,
                marginTop: StatusBar.currentHeight,
                // marginTop: "1%",
              }}
            >
              <View>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => props.navigation.goBack()}
                  style={{
                    borderRadius: 50,
                    backgroundColor: "#FFF",
                    width: 36,
                    height: 36,
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MCIcon
                    name="arrow-left"
                    size={20}
                    style={{
                      paddingLeft: 0,
                      marginTop: 0,
                      color: "#e71a23",
                    }}
                    resizeMode={"contain"}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  justifyContent: "flex-start",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    marginLeft: 10,
                    color: "#FFF",
                    fontSize: 23,
                    fontFamily: FontFamily.bold1,
                  }}
                >
                  Order
                </Text>
              </View>

              <View
                style={{
                  position: "absolute",
                  right: 10,
                  alignSelf: "center",
                }}
              />
            </View>
          </LinearGradient>
        </View>
        <ScrollView>
          <View
            style={{
              alignSelf: "center",
              marginTop: 10,
            }}
          >
            <View style={{ alignSelf: "center" }}>
              <Picker
                selectedValue={getCategory}
                mode="dropdown"
                style={{
                  height: 50,
                  width: width * 0.9,
                }}
                onValueChange={(itemValue) => setCategory(itemValue)}
              >
                <Picker.Item
                  label="Choose Category"
                  value=""
                  style={{
                    color: "grey",
                  }}
                />
                {getCategoryItem()}
              </Picker>
              <View
                style={{
                  borderBottomColor: "#a3a3a3",
                  borderBottomWidth: 1,
                  width: width * 0.9,
                  borderBottomStyle: "dashed",
                }}
              />
              <View
                style={{
                  borderBottomColor: "#a3a3a3",
                  borderBottomWidth: 1,
                  width: width * 0.9,
                  borderBottomStyle: "dashed",
                }}
              />
              <View
                style={{
                  width: width * 0.9,
                  alignSelf: "center",
                }}
              >
                <TextInput
                  // mode="outlined"
                  label="Product Name"
                  placeholder="ProductName"
                  value={getProduct}
                  onChangeText={(t) => setProduct(t)}
                  theme={{
                    colors: {
                      placeholder: "gray",
                      text: "#245ef4",
                      primary: "#245ef4",
                      underlineColor: "transparent",
                      background: "#FFF",
                      size: 17,
                    },
                  }}
                  style={{ backgroundColor: "#FFF" }}
                />

                <View
                  style={{
                    borderBottomColor: "#a3a3a3",
                    borderBottomWidth: 1,
                    width: width * 0.9,
                    borderBottomStyle: "dashed",
                  }}
                />
              </View>
              <View
                style={{
                  width: width * 0.9,
                  alignSelf: "center",
                }}
              >
                <TextInput
                  // mode="outlined"
                  multiline
                  numberOfLines={4}
                  value={getRemark}
                  onChangeText={(text) => setRemark(text)}
                  placeholder="Remark"
                  theme={{
                    colors: {
                      placeholder: "gray",
                      text: "#245ef4",
                      primary: "#245ef4",
                      underlineColor: "transparent",
                      background: "#FFF",
                      size: 17,
                    },
                  }}
                  style={{ backgroundColor: "#FFF" }}
                />

                <View
                  style={{
                    borderBottomColor: "#a3a3a3",
                    borderBottomWidth: 1,
                    width: width * 0.9,
                    borderBottomStyle: "dashed",
                  }}
                />
              </View>
            </View>

            <View
              style={{
                width: width * 0.9,
                alignSelf: "center",
              }}
            >
              <TextInput
                keyboardType="numeric"
                value={getNumberQtyDemand}
                onChangeText={(text) => setNumberQtyDemand(text)}
                placeholder="Qty Demand"
                theme={{
                  colors: {
                    placeholder: "gray",
                    text: "#245ef4",
                    primary: "#245ef4",
                    underlineColor: "transparent",
                    background: "#FFF",
                    size: 17,
                  },
                }}
                style={{ backgroundColor: "#FFF" }}
              />

              <View
                style={{
                  borderBottomColor: "#a3a3a3",
                  borderBottomWidth: 1,
                  width: width * 0.9,
                  borderBottomStyle: "dashed",
                }}
              />
            </View>
            <View
              style={{
                width: width * 0.9,
                alignSelf: "center",
              }}
            >
              <TextInput
                // mode="outlined"
                keyboardType="numeric"
                value={getQtyIssue}
                onChangeText={(text) => setQtyIssue(text)}
                placeholder="Qty Issue"
                theme={{
                  colors: {
                    placeholder: "gray",
                    text: "#245ef4",
                    primary: "#245ef4",
                    underlineColor: "transparent",
                    background: "#FFF",
                    size: 17,
                  },
                }}
                style={{ backgroundColor: "#FFF" }}
              />

              <View
                style={{
                  borderBottomColor: "#a3a3a3",
                  borderBottomWidth: 1,
                  width: width * 0.9,
                  borderBottomStyle: "dashed",
                }}
              />
            </View>
            <View
              style={{
                width: width * 0.9,
                alignSelf: "center",
              }}
            >
              <TextInput
                keyboardType="numeric"
                value={getOrderTotal}
                onChangeText={(text) => setOrderTotal(text)}
                placeholder="Order Total"
                theme={{
                  colors: {
                    placeholder: "gray",
                    text: "#245ef4",
                    primary: "#245ef4",
                    underlineColor: "transparent",
                    background: "#FFF",
                    size: 17,
                  },
                }}
                style={{ backgroundColor: "#FFF" }}
              />

              <View
                style={{
                  borderBottomColor: "#a3a3a3",
                  borderBottomWidth: 1,
                  width: width * 0.9,
                  borderBottomStyle: "dashed",
                }}
              />
            </View>
            <View
              style={{
                width: width * 0.9,
                alignSelf: "center",
              }}
            >
              <TextInput
                // mode="outlined"
                keyboardType="numeric"
                value={getCollectionAmt}
                onChangeText={(text) => setCollectionAmt(text)}
                placeholder="Collection Amount"
                theme={{
                  colors: {
                    placeholder: "gray",
                    text: "#245ef4",
                    primary: "#245ef4",
                    underlineColor: "transparent",
                    background: "#FFF",
                    size: 17,
                  },
                }}
                style={{ backgroundColor: "#FFF" }}
              />

              <View
                style={{
                  borderBottomColor: "#a3a3a3",
                  borderBottomWidth: 1,
                  width: width * 0.9,
                  borderBottomStyle: "dashed",
                }}
              />
            </View>
            <View
              style={{
                width: width * 0.9,
                // alignSelf: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              {/* <Text
                style={{ padding: 10, color: "black", textAlign: "center" }}
              >
                Order image
              </Text> */}
              <View style={{ alignItems: "center", marginLeft: "10%" }}>
                <Image
                  source={{ uri: filePath.uri }}
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 100,
                    margin: 5,
                    borderWidth: 0.5,
                    borderColor: "#b5005d",
                    backgroundColor: "#eeeeee",

                    // borderColor: "#000",
                  }}
                />
              </View>

              <View style={{ alignSelf: "center", marginRight: "10%" }}>
                <TouchableOpacity
                  style={{
                    width: width * 0.3,
                    alignSelf: "center",
                  }}
                  onPress={() => captureImage("photo")}
                >
                  <LinearGradient
                    colors={["#e71a23", "#b5005d"]}
                    start={{ x: 1, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    style={{
                      borderRadius: 15,
                      paddingVertical: 5,
                      paddingHorizontal: 7,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: FontFamily.bold1,
                        color: "#ffff",
                        textAlign: "center",
                      }}
                    >
                      Upload Image
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ marginTop: 10, marginBottom: 20 }}>
              <TouchableOpacity
                style={{
                  width: width * 0.3,

                  alignSelf: "center",
                }}
                onPress={() => handleSubmit()}
              >
                <LinearGradient
                  colors={["#e71a23", "#b5005d"]}
                  start={{ x: 1, y: 1 }}
                  end={{ x: 0, y: 0 }}
                  style={{
                    borderRadius: 30,
                    paddingVertical: 10,
                    paddingHorizontal: 7,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: FontFamily.bold1,
                      color: "#ffff",
                      textAlign: "center",
                    }}
                  >
                    Submit
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            {/* <View style={{ marginTop: 10, marginBottom: 30 }}>
              <TouchableOpacity onPress={() => handleSubmit()}>
                <LinearGradient
                  colors={["#e71a23", "#b5005d"]}
                  start={{ x: 1, y: 1 }}
                  end={{ x: 0, y: 0 }}
                  style={[styles.LinearGradientStyle]}
                >
                   <FAIcon
                    name="tasks"
                    size={22}
                    style={{ color: "#FFF", marginLeft: 70 }}
                  /> 
                   <Text style={{ ...styles.buttonText, textAlign: "center" }}>
                    Submit
                  </Text>                </LinearGradient>
              </TouchableOpacity>
            </View> */}

            {/* <ScrollView>
            <View
              // style={{ paddingTop: 10 }}
              style={{
                marginTop: 20,
                borderWidth: 1,
                borderRadius: 5,
                width: width * 0.94,
                height: height * 0.08,
                alignItems: "center",
                alignSelf: "center",
                borderColor: "#8e9775",
              }}
            >
              <Picker
                selectedValue={getCategory}
                style={{ height: 50, width: width * 0.92, marginBottom: 20 }}
                onValueChange={(itemValue) => setCategory(itemValue)}
              >
                <Picker.Item
                  label="Choose Category"
                  value=""
                  style={{
                    color: "grey",
                  }}
                />
                {getCategoryItem()}
              </Picker>
            </View>
            <View>
              <TextInput
                mode="outlined"
                label="Product Name"
                placeholder="ProductName"
                value={getProduct}
                onChangeText={(t) => setProduct(t)}
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
            </View>
            <View style={{ paddingTop: 10 }}>
              <TextInput
                mode="outlined"
                multiline
                numberOfLines={4}
                value={getRemark}
                onChangeText={(text) => setRemark(text)}
                placeholder="Remark"
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
            </View>
            <View style={{ paddingTop: 10 }}>
              <TextInput
                mode="outlined"
                keyboardType="numeric"
                value={getNumberQtyDemand}
                onChangeText={(text) => setNumberQtyDemand(text)}
                placeholder="Qty Demand"
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
            </View>
            <View style={{ paddingTop: 10 }}>
              <TextInput
                mode="outlined"
                keyboardType="numeric"
                value={getQtyIssue}
                onChangeText={(text) => setQtyIssue(text)}
                placeholder="Qty Issue"
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
            </View>

            <View style={{ paddingTop: 10 }}>
              
            <TextInput
                mode="outlined"
                keyboardType="numeric"
                value={getOrderTotal}
                onChangeText={(text) => setOrderTotal(text)}
                placeholder="Order Total"
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
            </View>
            <View style={{ paddingTop: 10 }}>
              <TextInput
                mode="outlined"
                keyboardType="numeric"
                value={getCollectionAmt}
                onChangeText={(text) => setCollectionAmt(text)}
                placeholder="Collection Amount"
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
            </View>

            <View
              style={{
                marginTop: 10,
                alignSelf: "center",
                borderRadius: 10,
                borderWidth: 1,
              }}
            >
              <Image source={{ uri: filePath.uri }} style={styles.imageStyle} />
              
            </View>
            <View style={{ marginTop: 10 }}>
              <TouchableOpacity
                style={{
                  width: width * 0.3,
                  alignSelf: "center",
                }}
                onPress={() => captureImage("photo")}
              >
                <LinearGradient
                  colors={["#e71a23", "#b5005d"]}
                  start={{ x: 1, y: 1 }}
                  end={{ x: 0, y: 0 }}
                  style={{
                    borderRadius: 15,
                    paddingVertical: 5,
                    paddingHorizontal: 7,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: FontFamily.bold1,
                      color: "#ffff",
                    }}
                  >
                    Upload Image
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 10 }}>
              <TouchableOpacity onPress={() => handleSubmit()}>
                <LinearGradient
                  colors={["#e71a23", "#b5005d"]}
                  start={{ x: 1, y: 1 }}
                  end={{ x: 0, y: 0 }}
                  style={[styles.LinearGradientStyle]}
                >
                  <FAIcon
                    name="tasks"
                    size={22}
                    style={{ color: "#FFF", marginLeft: 70 }}
                  />
                  <Text style={{ ...styles.buttonText, marginLeft: 5 }}>
                    Submit
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView> */}
          </View>
        </ScrollView>
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
  descStyle: {
    fontSize: 14,
    // width: width * 0.5,
    color: "#000",
    fontFamily: FontFamily.regular1,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
  LinearGradientStyle: {
    flexDirection: "row",
    width: width * 0.7,
    padding: 15,
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
