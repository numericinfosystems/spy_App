import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import {
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
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/FontAwesome";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Dialog from "react-native-dialog";

const { width, height } = Dimensions.get("window");
import { useSelector, useDispatch } from "react-redux";
import FAIcon from "react-native-vector-icons/FontAwesome";

import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { FontFamily } from "../config/FontFamily";
import { getData, postData } from "../FecthServerServices";
import LinearGradient from "react-native-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import { Input } from "react-native-elements";

import { Platform } from "react-native";
import { PermissionsAndroid } from "react-native";
import { Modal } from "react-native";
// import { Picker } from "react-native";
/*------------------Upload Image Via a Camera---------------------------- */
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import RNFS from "react-native-fs";
import { flash, flashSuccess } from "../config/helper";
/*----------------------------------------------------------------------- */

const arr = [
  {
    id: 1,
    clientname: "Food Expenses",
    firmname: "Food",
    address: "Jiwali Chowk, Maharaj Bada, Lashkar Gwalior",
    datefrom: new Date(),
    starttime: new Date(),
    endtime: new Date(),
    status: "Not Approved",
  },
  {
    id: 2,
    clientname: "Food Expenses",
    firmname: "Food",
    address: "Jiwali Chowk, Maharaj Bada, Lashkar Gwalior",
    datefrom: new Date(),
    starttime: new Date(),
    endtime: new Date(),
    status: "Not Approved",
  },
];

function Item2({ item, props }) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // calcDate(item.date);
  function calcDate(d) {
    d = new Date(d);
    var dd =
      d.getDate() + " " + monthNames[d.getMonth()] + " " + d.getFullYear();
    return dd;
  }

  // console.log(calcDate(item.date));

  function formatAMPM(date) {
    date = new Date(date);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  // return (
  //   <View
  //     style={{
  //       justifyContent: "center",
  //       alignItems: "center",
  //       // marginTop: "5%",
  //       backgroundColor: "#ffffff",
  //       width: width,
  //     }}
  //   >
  //     <TouchableOpacity onPress={() => alert("hello World")}>
  //       <View style={styles.item}>
  //         <View
  //           style={{
  //             flexDirection: "row",
  //             justifyContent: "space-between",
  //           }}
  //         >
  //           <Text style={[styles.title]}>{item.expenseson}</Text>

  //           <Text style={[styles.descStyle]}>{calcDate(item.date)}</Text>
  //         </View>

  //         <View
  //           style={{
  //             marginTop: "1%",
  //             borderBottomColor: "#d3d3d3",
  //             borderBottomWidth: 1,
  //           }}
  //         />

  //         <Text
  //           style={{
  //             color: "#000",
  //             fontSize: 12,
  //             marginTop: "1%",
  //             fontFamily: FontFamily.bold1,
  //           }}
  //         >
  //           Description:
  //         </Text>
  //         <Text
  //           style={{
  //             color: "black",
  //             fontSize: 12,
  //             fontFamily: FontFamily.regular1,
  //           }}
  //         >
  //           {item.description}
  //         </Text>

  //         <Text
  //           style={{
  //             color: "black",
  //             fontSize: 12,
  //             fontFamily: FontFamily.regular1,
  //           }}
  //         >
  //           {"\u20B9"}
  //           {item.amount}
  //         </Text>
  //         <View
  //           style={{
  //             marginTop: "1%",
  //             borderBottomColor: "#d3d3d3",
  //             borderBottomWidth: 1,
  //           }}
  //         />
  //         <View style={{ marginTop: "1%" }}>
  //           <Text
  //             style={{
  //               color: "#fc1818",

  //               fontSize: 12,
  //               fontFamily: FontFamily.bold1,
  //             }}
  //           >
  //             STATUS: {item.status}
  //           </Text>
  //         </View>
  //       </View>
  //     </TouchableOpacity>
  //   </View>
  // );
  return (
    <View
      style={{
        borderColor: "#d1ccc0",
        width: width * 0.95,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: "#b5005d",
        // elevation: 1,
        marginBottom: 10,
      }}
    >
      <ImageBackground
        resizeMode={"cover"}
        source={require("../../images/bgbg1.png")}
        style={{ width: width, borderRadius: 10 }}
      >
        <View
          style={{
            height: height * 0.1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: width / 2, padding: 10 }}>
            <View
              style={{
                backgroundColor:
                  item.status == "Submitted"
                    ? "#f9b208"
                    : item.status == "Not Approved"
                    ? "#e71a23"
                    : "green",
                width: 100,
                flexDirection: "row",
                justifyContent: "center",
                borderRadius: 50,
                height: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  color: "#FFF",
                  alignSelf: "center",
                }}
              >
                {item.status}
              </Text>
            </View>
            {/* <Text style={{ fontSize: 12, color: "#000", marginLeft: 10 }}>
              <FAIcon name="rupee" /> {item.amount}
            </Text> */}
            <Text
              style={{
                fontSize: 12,
                color: "#000",
                marginLeft: "10%",
                marginTop: 10,
              }}
            >
              {calcDate(item.date)}
            </Text>
          </View>
          <View style={{ width: width / 2, padding: 10 }}>
            <Text style={{ fontSize: 15, color: "#000" }}>
              {item.expenseson}{" "}
              <Text style={{ fontSize: 12, color: "#e71a23", marginLeft: 10 }}>
                (<FAIcon name="rupee" /> {item.amount})
              </Text>
            </Text>
            <Text style={{ fontSize: 12, color: "#000", marginTop: 10 }}>
              {item.shortdescription}
            </Text>
          </View>
          {/* <View
            style={{
              width: width * 0.99,
              padding: 6,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                width: width * 0.6,
              }}
            >
              <Text style={{fontSize: 18, color: '#e71a23'}}>
                      Subjects
                    </Text>
              <View
                style={{
                  backgroundColor:
                    item.status == "Pending" ? "#e71a23" : "green",
                  width: 100,
                  flexDirection: "row",
                  justifyContent: "center",
                  borderRadius: 50,
                  height: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    color: "#FFF",
                    alignSelf: "center",
                  }}
                >
                  {item.status}
                </Text>
              </View>
              <Text>{item.subject}</Text>
            </View>
            <View
              style={{
                width: width * 0.5,
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <Text style={{ fontSize: 13, color: "#e71a23" }}>Date</Text>
              <Text>{calcDate(item.date)}</Text>
            </View>
          </View>
          <View
            style={{
              width: width * 0.99,
              padding: 12,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                width: width * 0.6,
              }}
            >
              <Text style={{ fontSize: 18, color: "#e71a23" }}>
                {item.shortdescription}
              </Text>
            </View>
            <View
              style={{
                width: width * 0.5,
              }}
            >
              <Text style={{ fontSize: 12, color: "#e71a23" }}>Amount</Text>
              <Text>
                <FAIcon name="rupee" /> {item.amount}
              </Text>
            </View>
          </View>*/}
        </View>
      </ImageBackground>
    </View>
  );
}

export default function ExpensesList(props) {
  var userData = useSelector((state) => state.userData);
  var user = Object.values(userData)[0];
  console.log("=====>>>>>", user.employeeid);

  const [visible, setVisible] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);
  const [getExpensesList, setExpensesList] = useState([]);
  const [getExpType, setExpType] = useState("");
  const [getShortDesc, setShortDesc] = useState("");
  const [getDate, setDate] = useState(new Date());
  const [getDesc, setDesc] = useState("");
  const [getAmount, setAmount] = useState("");
  const [getStatus, setStatus] = useState("");
  const [filePath, setFilePath] = useState({});
  const [getBase64, setBase64] = useState(null);
  const [refresh, setRefresh] = useState(false);

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

  const handleSubmit = async () => {
    if (getExpType == "") {
      flash("Select expense type");
    } else {
      let body = {
        vendorid: user.vendorid,
        employeeid: user.employeeid,
        expenseson: getExpType,
        shortdescription: getShortDesc,
        date: new Date(),
        time: new Date(),
        description: getDesc,
        amount: getAmount,
        uploadorder: {
          name: filePath.fileName,
          type: filePath.type,
          uri: "data:image/jpeg;base64," + getBase64,
        },
        status: "Submitted",
      };
      let result = await postData("expenses/Add", body);
      // if (result.status) {
      setVisible(!visible);
      setRefresh(!refresh);
      flashSuccess("Expense Upload Successfully");

      // props.navigation.navigate("ExpensesList");s
      // }

      setExpType("");
      setShortDesc("");
      setDesc("");
      setAmount("");
      filePath({});
    }
  };

  const toggleModal = () => {
    // alert("hi");
    setVisible(!visible);
    // setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    fetchExpensesList();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchExpensesList();
    }, [refresh])
  );

  const fetchExpensesList = async () => {
    let body = {
      vendorid: user.vendorid,
      employeeid: user.employeeid,
    };
    // let list = await postData("expenses/displayByEmpId", body);
    let list = await postData(
      "expenses/displaycheckExpenses_Curentdate_To_Last_Date",
      body
    );
    if (list.status) {
      // console.log("========>>>>>>>>>>", list.data);
      setExpensesList(list.data);
    }
  };

  const handleFilter = async (status) => {
    let body = {
      status: status,
      vendorid: user.vendorid,
      employeeid: user.employeeid,
    };
    let list = await postData("expenses/displaycheckExpenses_Status", body);
    if (list.status) {
      // console.log("========>>>>>>>>>>", list.data);
      setExpensesList(list.data);
    }
  };

  const handleDateFilter = async () => {
    let body = {
      vendorid: user.vendorid,
      employeeid: user.employeeid,
    };
    let list = await postData("expenses/displaycheckExpenses_TodayDate", body);
    if (list.status) {
      // console.log("========>>>>>>>>>>", list.data);
      setExpensesList(list.data);
    }
  };

  function AddExpense() {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <Dialog.Container visible={visible}>
          <Dialog.Title>
            <Text
              style={{
                fontSize: 16,
                color: "#e71a23",
                fontFamily: FontFamily.bold1,
              }}
            >
              <FAIcon name="money" style={{ color: "#e71a23" }} size={20} />{" "}
              Apply Expense
            </Text>
          </Dialog.Title>
          <Dialog.Description style={{ width: width * 0.8 }}>
            <View style={{ alignSelf: "center" }}>
              <Picker
                selectedValue={getExpType}
                style={{ height: 50, width: width * 0.8 }}
                onValueChange={(itemValue) => setExpType(itemValue)}
                mode="dropdown"
                // style={{ marginTop: 10 }}
              >
                <Picker.Item
                  label="Choose expenses"
                  value=""
                  style={{
                    color: "grey",
                  }}
                />
                <Picker.Item label="Food" value="Food" />
                <Picker.Item label="Travel" value="Travel" />
                <Picker.Item label="Petrol" value="Petrol" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
              <View
                style={{
                  borderBottomColor: "#a3a3a3",
                  borderBottomWidth: 1,
                  width: width * 0.8,
                  borderBottomStyle: "dashed",
                }}
              />
            </View>
            <View
              style={{
                width: width * 0.85,
                alignSelf: "center",
              }}
            >
              <TextInput
                label="Text"
                placeholder="Text"
                values={getShortDesc}
                onChangeText={(t) => setShortDesc(t)}
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
              />
              <View
                style={{
                  borderBottomColor: "#a3a3a3",
                  borderBottomWidth: 1,
                  width: width * 0.8,
                  borderBottomStyle: "dashed",
                }}
              />
            </View>
            <View
              style={{
                width: width * 0.85,
                alignSelf: "center",
              }}
            >
              <TextInput
                multiline
                numberOfLines={3}
                label="Description"
                placeholder="Description"
                onChangeText={(t) => setDesc(t)}
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
              />

              <View
                style={{
                  borderBottomColor: "#a3a3a3",
                  borderBottomWidth: 1,
                  width: width * 0.8,
                  borderBottomStyle: "dashed",
                }}
              />
            </View>
            <View
              style={{
                width: width * 0.85,
                alignSelf: "center",
              }}
            >
              <TextInput
                label="Amount"
                // mode="outlined"
                placeholder="Amount"
                onChangeText={(t) => setAmount(t)}
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

              <View
                style={{
                  borderBottomColor: "#a3a3a3",
                  borderBottomWidth: 1,
                  width: width * 0.8,
                  borderBottomStyle: "dashed",
                }}
              />
            </View>

            <View
              style={{
                width: width * 0.85,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {/* <Text
                style={{ padding: 10, color: "black", textAlign: "center" }}
              >
                Bill Image
              </Text> */}
              <View style={{ alignItems: "center" }}>
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
                  }}
                />
              </View>

              <View
                style={{
                  alignSelf: "center",
                  marginRight: "10%",
                }}
              >
                <TouchableOpacity onPress={() => captureImage("photo")}>
                  <LinearGradient
                    colors={["#e71a23", "#b5005d"]}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{
                      // width: width * 0.5,
                      // flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      // alignSelf: "center",
                      width: width * 0.35,
                      height: 35,
                      borderRadius: 40,
                      elevation: 4,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: width * 0.6,
                        height: 60,
                      },
                      marginBottom: 10,
                    }}
                  >
                    <Text style={{ ...styles.buttonText }}>
                      Upload Bill Picture
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                width: width * 0.8,
                // marginTop: 20,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  // margin: 5,
                  padding: 8,
                }}
              >
                <TouchableOpacity onPress={toggleModal}>
                  <LinearGradient
                    colors={["#47544a", "#c0c0c0"]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.LinearGradientStyle]}
                  >
                    <FAIcon name="close" size={18} color="#FFF" />
                    <Text style={styles.buttonText}> Cancel </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  // margin: 5,
                  padding: 8,
                }}
              >
                <TouchableOpacity onPress={() => handleSubmit()}>
                  <LinearGradient
                    colors={["#e71a23", "#b5005d"]}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={[styles.LinearGradientStyle]}
                  >
                    <FAIcon name="save" size={18} color="#FFF" />
                    <Text style={styles.buttonText}> Save </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </Dialog.Description>
        </Dialog.Container>

        {/* <Modal isVisible={isModalVisible}> */}
        {/* <View
            style={{
              flex: 1,
              backgroundColor: "#fff",
              // height: height * 0.7,
              // width: width * 0.92,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              borderRadius: 10,
            }}
          >
            <View
              style={{
                marginBottom: 10,
                marginTop: 10,
                // width: width,
                // justifyContent: 'center',
                alignItems: "center",
                top: 5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                  justifyContent: "space-between",
                  width: "95%",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#e71a23",
                    fontFamily: FontFamily.bold1,
                    // borderBottomWidth: 0.5,
                    // borderColor: '#666',
                    // marginBottom: 20,
                  }}
                >
                  <FAIcon name="money" style={{ color: "#e71a23" }} size={20} />{" "}
                  Add Expenses
                </Text>
                <TouchableOpacity onPress={toggleModal}>
                  <View
                    style={{
                      alignSelf: "flex-end",
                      backgroundColor: "#e71a23",
                      width: 28,
                      height: 28,
                      borderRadius: 50,
                    }}
                  >
                    <FAIcon
                      name="close"
                      style={{
                        padding: 6,
                        justifyContent: "center",
                        alignSelf: "center",
                        color: "#FFF",
                      }}
                      size={15}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  borderBottomColor: "#a3a3a3",
                  borderBottomWidth: 0.5,
                  width: width * 0.9,
                  borderBottomStyle: "dashed",
                }}
              />
              <View style={[styles.Boxes]}>
                <ScrollView>
                  <View
                    style={{
                      width: width,
                      // justifyContent: 'center',
                      // alignItems: 'center',
                      marginBottom: 0,
                      marginTop: 0,
                    }}
                  >
                    <View
                      style={{
                        marginTop: 10,
                        // borderWidth: 1,
                        // borderRadius: 5,
                        // width: width * 0.85,
                        marginRight: 30,
                        height: height * 0.08,
                        // alignItems: "center",
                        // justifyContent: "center",
                        alignSelf: "center",
                        borderColor: "#8e9775",
                      }}
                    >
                      <Picker
                        selectedValue={getExpType}
                        style={{ height: 50, width: width * 0.85 }}
                        onValueChange={(itemValue) => setExpType(itemValue)}
                      >
                        <Picker.Item
                          label="Choose expenses"
                          value=""
                          style={{
                            color: "grey",
                          }}
                        />
                        <Picker.Item label="Food" value="Food" />
                        <Picker.Item label="Travel" value="Travel" />
                        <Picker.Item label="Petrol" value="Petrol" />
                        <Picker.Item label="Other" value="Other" />
                      </Picker>
                    </View>
                    <View style={{ width: width * 0.9 }}>
                      <Input
                        placeholderTextColor="#666"
                        placeholder="Description"
                        values={getShortDesc}
                        onChangeText={(t) => setShortDesc(t)}
                        style={{
                          borderColor: "#666",
                          color: "#666",
                          fontSize: 12,
                        }}
                        underlineColor={"#e71a23"}
                        leftIcon={
                          <FAIcon name="clipboard" size={16} color="#e71a23" />
                        }
                      />
                    </View>
                    <View style={{ width: width * 0.9 }}>
                      <Input
                        placeholderTextColor="#666"
                        placeholder="Description"
                        onChangeText={(t) => setDesc(t)}
                        style={{
                          borderColor: "#666",
                          color: "#666",
                          fontSize: 12,
                        }}
                        underlineColor={"#e71a23"}
                        leftIcon={
                          <FAIcon name="clipboard" size={16} color="#e71a23" />
                        }
                      />
                    </View>
                    <View style={{ width: width * 0.9 }}>
                      <Input
                        placeholderTextColor="#666"
                        placeholder="Amount"
                        onChangeText={(t) => setAmount(t)}
                        style={{
                          borderColor: "#666",
                          color: "#666",
                          fontSize: 12,
                        }}
                        underlineColor={"#e71a23"}
                        leftIcon={
                          <FAIcon name="clipboard" size={16} color="#e71a23" />
                        }
                      />
                    </View>
                    <Text style={styles.textStyle}>Bill Image</Text>
                    <View style={styles.container}>
                      <Image
                        source={{ uri: filePath.uri }}
                        style={styles.imageStyle}
                      />
                    </View>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        bottom: 0,
                        width,
                      }}
                    >
                      <TouchableOpacity onPress={() => captureImage("photo")}>
                        <LinearGradient
                          colors={["#e71a23", "#b5005d"]}
                          start={{ x: 1, y: 0 }}
                          end={{ x: 0, y: 1 }}
                          style={[
                            styles.LinearGradientStyle,
                            { width: width * 0.6 },
                          ]}
                        >
                          <Text style={{ ...styles.buttonText }}>
                            Choose Bill Picture
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                    {/* <View style={{ width: width * 0.9 }}>
                        <Input
                          placeholderTextColor="#666"
                          placeholder="Amount *"
                          style={{
                            borderColor: "#666",
                            color: "#666",
                            fontSize: 12,
                          }}
                          underlineColor={"#e71a23"}
                          leftIcon={
                            <FAIcon name="dollar" size={16} color="#e71a23" />
                          }
                        />
                      </View> */}
        {/* <View
                        style={{
                          justifyContent: "space-between",
                          flexDirection: "row",
                          // alignSelf: "center",
                          width: width * 0.9,
                        }}
                      >
                        <View style={{ width: width * 0.4 }}>
                          <TouchableOpacity onPress={showDatepicker}>
                            <View>
                              <Input
                                editable={false}
                                value={getFromDate
                                  .toUTCString()
                                  .substring(0, 16)}
                                label="From Date"
                                style={{
                                  borderColor: "#666",
                                  color: "#666",
                                  fontSize: 12,
                                }}
                                underlineColor={"#e71a23"}
                                labelStyle={{ fontSize: 12 }}
                                leftIcon={
                                  <FAIcon
                                    name="calendar"
                                    size={16}
                                    color="#e71a23"
                                  />
                                }
                              />
                            </View>
                          </TouchableOpacity>

                          {show && (
                            <DateTimePicker
                              testID="dateTimePicker"
                              value={getFromDate}
                              mode={mode}
                              minimumDate={new Date()}
                              is24Hour={true}
                              display="default"
                              onChange={onChange}
                            />
                          )}
                        </View>
                        <View style={{ width: width * 0.4 }}>
                          <TouchableOpacity onPress={showDatepicker1}>
                            <View>
                              <Input
                                editable={false}
                                value={getToDate.toUTCString().substring(0, 16)}
                                label="To Date"
                                style={{
                                  borderColor: "#666",
                                  color: "#666",
                                  fontSize: 12,
                                }}
                                underlineColor={"#e71a23"}
                                labelStyle={{ fontSize: 12 }}
                                leftIcon={
                                  <FAIcon
                                    name="calendar"
                                    size={16}
                                    color="#e71a23"
                                  />
                                }
                              />
                            </View>
                          </TouchableOpacity>

                          {show1 && (
                            <DateTimePicker
                              testID="dateTimePicker"
                              value={getToDate}
                              mode1={mode}
                              is24Hour={true}
                              display="default"
                              onChange={onChangeToDate}
                            />
                          )}
                        </View>
                      </View>

                       */}
        {/* <View
                      style={{
                        width: width * 0.9,
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{
                          // margin: 5,
                          padding: 8,
                        }}
                      >
                        <TouchableOpacity onPress={toggleModal}>
                          <LinearGradient
                            colors={["#47544a", "#c0c0c0"]}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 0 }}
                            style={[styles.LinearGradientStyle]}
                          >
                            <FAIcon name="close" size={18} color="#FFF" />
                            <Text style={styles.buttonText}> Cancel </Text>
                          </LinearGradient>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          // margin: 5,
                          padding: 8,
                        }}
                      >
                        <TouchableOpacity onPress={() => handleLeaveSubmit()}>
                          <LinearGradient
                            colors={["#e71a23", "#b5005d"]}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={[styles.LinearGradientStyle]}
                          >
                            <FAIcon name="save" size={18} color="#FFF" />
                            <Text style={styles.buttonText}> Save </Text>
                          </LinearGradient>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>

            {/* <Button title="Hide modal" onPress={toggleModal} /> */}
        {/* </View>
        </Modal> */}
      </View>
    );
  }

  return (
    <>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          flex: 1,
        }}
      >
        {/* <StatusBar translucent backgroundColor="#b5005d" /> */}
        <StatusBar translucent backgroundColor="transparent" />

        {/* <Image
          source={require("../../images/licon1.png")}
          style={{
            width: width,
            height: 20,
          }}
          resizeMode={"center"}
        /> */}
        {/* <Image
          source={require("../../images/91logo.png")}
          style={{
            width: width,
            height: 50,
          }}
          resizeMode={"center"}
        /> */}
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
                  Expense List
                </Text>
              </View>

              <View
                style={{
                  position: "absolute",
                  right: 10,
                  alignSelf: "center",
                }}
              >
                <TouchableOpacity
                  // onPress={() => props.navigation.navigate("Expenses")}
                  onPress={() => toggleModal()}
                >
                  <LinearGradient
                    // colors={["#e71a23", "#b5005d"]}
                    colors={["#faf1e6", "#e4efe7"]}
                    start={{ x: 1, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    style={[styles.LinearGradientStyle]}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "#b5005d",
                        backgroundColor: "transparent",
                        fontFamily: FontFamily.regular1,
                        marginLeft: 5,
                        fontWeight: "bold",
                      }}
                    >
                      Apply
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </View>
        <View
          style={{
            width: width,
            height: height * 0.08,
            backgroundColor: "#edeef7",
            // marginTop: "2%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{ alignSelf: "center" }}
            onPress={() => handleFilter("Approved")}
          >
            <View
              style={{
                width: width / 3,
                height: height,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 15 }}>
                Approved{" "}
                <FAIcon name="check" size={15} style={{ color: "green" }} />
              </Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              height: height * 0.07,
              width: 1,
              backgroundColor: "#909090",
              alignSelf: "center",
              borderRadius: 0.5,
            }}
          />
          <TouchableOpacity
            style={{ alignSelf: "center" }}
            onPress={() => handleFilter("Not Approved")}
          >
            <View
              style={{
                width: width / 3,
                height: height,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 15 }}>
                Not Approved{" "}
                <FAIcon name="close" size={15} style={{ color: "red" }} />
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              height: height * 0.07,
              width: 1,
              backgroundColor: "#909090",
              alignSelf: "center",
            }}
          />

          <TouchableOpacity
            onPress={() => handleDateFilter()}
            style={{ alignSelf: "center" }}
          >
            <View
              style={{
                width: width / 3,
                height: height,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 15 }}>
                Today{" "}
                <FAIcon name="table" size={15} style={{ color: "#000" }} />
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: "5%",
            alignItems: "center",
            width: width * 0.9,
          }}
        >
          <Text
            style={{
              fontSize: 23,
              fontFamily: FontFamily.bold1,
            }}
          >
            My {"&"} Expenses
          </Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Expenses")}
          >
            <LinearGradient
              colors={["#e71a23", "#b5005d"]}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={[styles.LinearGradientStyle]}
            >
              <Text style={{ ...styles.buttonText, marginLeft: 5 }}>
                Add Expenses
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
 */}
        <Text />
        <FlatList
          data={getExpensesList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <Item2 item={item} props={props} />}
          keyExtractor={(item) => String(item.expensesid)}
        />
        {AddExpense()}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    // borderColor: "#d1ccc0",
    // backgroundColor: "#ffffff",
    // padding: 5,
    // backgroundColor: "white",
    // width: width * 0.9,
    // padding: 20,
    // borderRadius: 10,
    // borderColor: "#222f3e",
    // elevation: 2,
    // marginBottom: 10,
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
  LinearGradientStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.25,
    height: 35,
    borderRadius: 40,

    // borderBottomRightRadius: 15,
    // borderTopLeftRadius: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: width * 0.6,
      height: 60,
    },
  },
  buttonText: {
    // fontSize: 18,
    textAlign: "center",
    color: "#fff",
    backgroundColor: "transparent",
    fontFamily: FontFamily.regular1,
  },
});
