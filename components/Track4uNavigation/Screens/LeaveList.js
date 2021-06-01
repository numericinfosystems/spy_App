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
import { List } from "react-native-paper";
import Dialog from "react-native-dialog";

import Icon from "react-native-vector-icons/FontAwesome";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
const { width, height } = Dimensions.get("window");
import { useSelector, useDispatch } from "react-redux";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { FontFamily } from "../config/FontFamily";
// import { postData } from "../FecthServerServices";
import LinearGradient from "react-native-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import { Input } from "react-native-elements";

import FAIcon from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal";

// import { Picker } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { BaseURL, getData, postData } from "../FecthServerServices";
import { flash, flashSuccess } from "../config/helper";

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

  function calcDate(d) {
    d = new Date(d);
    var dd =
      d.getDate() + " " + monthNames[d.getMonth()] + " " + d.getFullYear();
    return dd;
  }

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

  // var fromDate = item.datefrom;

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
  //         {/* <Text style={[styles.title]}>{item.employeeid}</Text> */}
  //         <View
  //           style={{
  //             flexDirection: "row",
  //             // alignSelf: "center",
  //             justifyContent: "space-between",
  //           }}
  //         >
  //           <Text style={[styles.title]}>{item.leaveid}</Text>

  //           <Text style={[styles.descStyle]}>{item.date}</Text>
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
  //             // fontWeight: 'bold',
  //             fontSize: 12,
  //             marginTop: "1%",
  //             fontFamily: FontFamily.bold1,
  //             // textDecorationLine: "underline",
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
  //         {/* <Text
  //           style={{
  //             color: '#000',
  //             // fontWeight: 'bold',
  //             fontFamily: FontFamily.bold1,
  //             fontSize: 12,
  //             marginTop: '1%',
  //           }}>
  //           Total Amount
  //         </Text>
  //          */}
  //         <View
  //           style={{ flexDirection: "row", justifyContent: "space-between" }}
  //         >
  //           <Text
  //             style={{
  //               color: "black",
  //               fontSize: 12,
  //               fontFamily: FontFamily.regular1,
  //             }}
  //           >
  //             {/* {"\u20B9"} */}
  //             {calcDate(item.datefrom)}
  //           </Text>
  //           <Text
  //             style={{
  //               color: "black",
  //               fontSize: 12,
  //               fontFamily: FontFamily.regular1,
  //             }}
  //           >
  //             {/* {"\u20B9"} */}
  //             {calcDate(item.dateto)}
  //           </Text>
  //         </View>
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
  //               // color: "#fc1818",
  //               color: item.status == "Approved" ? "#54e346" : "#fc1818",

  //               // fontWeight: 'bold',
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
            <Text
              style={{
                fontSize: 12,
                color: "#000",
                marginTop: 10,
                marginLeft: "10%",
              }}
            >
              {calcDate(item.datefrom)}
            </Text>
          </View>
          <View style={{ width: width / 2, padding: 10 }}>
            <Text style={{ fontSize: 15, color: "#000" }}>{item.leaveid}</Text>
            <Text style={{ fontSize: 12, color: "#000", marginTop: 10 }}>
              {item.description}
            </Text>
          </View>
        </View>
        {/* <View
          style={{
            height: 100,
            flex: 1,
            // alignItems: 'center',
          }}
        >
          <View
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
              
              <View
                style={{
                  backgroundColor:
                    item.status == "Pending"
                      ? "#f9b208"
                      : item.status == "Not Approved"
                      ? "#e71a23"
                      : "green",
                  width: 100,
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
            </View>
            <View
              style={{
                width: width * 0.5,
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <Text style={{ fontSize: 13, color: "#000" }}>
                {item.description}
              </Text>
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
                {item.leaveid}
              </Text>
            </View>
            <View
              style={{
                width: width * 0.5,
              }}
            >
              <Text style={{ fontSize: 12, color: "#e71a23" }}>Date From</Text>
              <Text>
                {calcDate(item.datefrom)}
              </Text>
            </View>
          </View>
        </View> */}
      </ImageBackground>
    </View>
  );
}

export default function LeaveList(props) {
  var userData = useSelector((state) => state.userData);
  var user = Object.values(userData)[0];
  // console.log("=====>>>>>", user.employeeid);
  // console.log("=====>>>>>", user.vendorid);
  const [getLeaveList, setLeaveList] = useState([]);
  const [getExpensesList, setExpensesList] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [getsearchtext, setsearchtext] = useState("");
  // const [date, setdate] = useState(new Date());
  const [visible, setVisible] = useState(false);

  const [getVendorId, setVendorId] = useState(user.vendorid);
  const [getLeaveTypeList, setLeaveTypeList] = useState([]);
  const [getLeaveId, setLeaveId] = useState("");
  const [getDesc, setDesc] = useState("");
  const [getFromDate, setFromDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [getToDate, setToDate] = useState(new Date());
  const [mode1, setMode1] = useState("date");
  const [show1, setShow1] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const toggleModal = () => {
    // setModalVisible(!isModalVisible);
    setVisible(!visible);
  };

  useEffect(() => {
    fetchLeaveList();
    fetchLeaveData(user.vendorid);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchLeaveList();
      fetchLeaveData(user.vendorid);
    }, [refresh])
  );

  const fetchLeaveData = async (v_id) => {
    let result = await getData(`leaves/displayByVid/${v_id}`);
    // console.log("====>>>>>>>", result.data);
    if (result.status) {
      setLeaveTypeList(result.data);
    }
  };

  const fetchLeaveList = async () => {
    let body = {
      vendorid: user.vendorid,
      employeeid: user.employeeid,
    };
    // let list = await postData("leaveapproval/displayByEmpId", body);
    let list = await postData("leaveapproval/displayRecordByDate", body);
    // let list = await postData("leaveapproval/displayLast15Days", body);

    if (list.status) {
      // console.log("========>>>>>>>>>>", list.data);
      setLeaveList(list.data);
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setFromDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const onChangeToDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow1(Platform.OS === "ios");
    setToDate(currentDate);
  };

  const showMode1 = (currentMode) => {
    setShow1(true);
    setMode1(currentMode);
  };

  const showDatepicker1 = () => {
    showMode1("date");
  };

  const handleLeaveSubmit = async () => {
    if (getLeaveId == "") {
      flash("Select leave type");
    } else {
      let body = {
        vendorid: user.vendorid,
        employeeid: user.employeeid,
        leaveid: getLeaveId,
        datefrom: getFromDate,
        dateto: getToDate,
        description: getDesc,
        status: "Submitted",
      };
      console.log("Leave Body", body);
      let result = await postData("leaveapproval/Add", body);
      if (result.status) {
        flashSuccess("Apply Leave Successfully");
        setVisible(!visible);
        setRefresh(!refresh);
        // props.navigation.navigate("Dashboard");
      }
      setLeaveId("");
      setFromDate(new Date());
      setToDate(new Date());
      setDesc("");
    }
  };

  const handleFilter = async (status) => {
    let body = {
      status: status,
      vendorid: user.vendorid,
      employeeid: user.employeeid,
    };
    let list = await postData(
      "leaveapproval/displaycheckLeaveapproval_Status",
      body
    );
    if (list.status) {
      // console.log("========>>>>>>>>>>", list.data);
      setLeaveList(list.data);
    }
  };

  const handleDateFilter = async () => {
    let body = {
      vendorid: user.vendorid,
      employeeid: user.employeeid,
    };
    let list = await postData(
      "leaveapproval/displaycheckLeaveapproval_TodayDate",
      body
    );
    if (list.status) {
      // console.log("========>>>>>>>>>>", list.data);
      setLeaveList(list.data);
    }
  };

  function AddLeave() {
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
              Apply Leave
            </Text>
          </Dialog.Title>

          <Dialog.Description style={{ width: width * 0.8 }}>
            <View style={{ alignSelf: "center" }}>
              <Picker
                mode="dropdown"
                selectedValue={getLeaveId}
                style={{
                  height: 50,
                  width: width * 0.8,
                }}
                onValueChange={(itemValue) => setLeaveId(itemValue)}
              >
                <Picker.Item
                  label="Choose Leave Type"
                  value=""
                  style={{
                    color: "grey",
                  }}
                />
                <Picker.Item label="Medical" value="Medical" />
                <Picker.Item label="Casual" value="Casual" />
                <Picker.Item label="Materinity" value="Materinity" />
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
                // mode="outlined"
                label="Description"
                multiline
                numberOfLines={4}
                placeholder="Description"
                value={getDesc}
                onChangeText={(text) => setDesc(text)}
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
                justifyContent: "space-between",
                flexDirection: "row",
                width: width * 0.83,
              }}
            >
              <View style={{ width: width * 0.4, marginTop: 10 }}>
                <TouchableOpacity onPress={showDatepicker}>
                  <View>
                    <Input
                      editable={false}
                      value={getFromDate.toUTCString().substring(0, 16)}
                      label="From Date"
                      style={{
                        borderColor: "#666",
                        color: "#666",
                        fontSize: 12,
                      }}
                      underlineColor={"#e71a23"}
                      labelStyle={{ fontSize: 12 }}
                      leftIcon={
                        <FAIcon name="calendar" size={16} color="#e71a23" />
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
              <View style={{ width: width * 0.4, marginTop: 10 }}>
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
                        <FAIcon name="calendar" size={16} color="#e71a23" />
                      }
                    />
                  </View>
                </TouchableOpacity>

                {show1 && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={getToDate}
                    mode1={mode}
                    minimumDate={new Date()}
                    is24Hour={true}
                    display="default"
                    onChange={onChangeToDate}
                  />
                )}
              </View>
            </View>

            <View
              style={{
                width: width * 0.8,
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
          </Dialog.Description>
        </Dialog.Container>
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
        <StatusBar translucent backgroundColor="transparent" />
        {/* <StatusBar translucent backgroundColor="#b5005d" /> */}

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
                  Leave List
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
                  // onPress={() => props.navigation.navigate("Leaves")}
                  onPress={toggleModal}
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
            onPress={() => props.navigation.navigate("Leaves")}
          >
            <LinearGradient
              colors={["#e71a23", "#b5005d"]}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={[styles.LinearGradientStyle]}
            >
              <Text style={{ ...styles.buttonText, marginLeft: 5 }}>
                Apply Leave
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View> */}
        <Text />
        <FlatList
          data={getLeaveList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <Item2 item={item} props={props} />}
          keyExtractor={(item) => String(item.leaveapprovalid)}
        />
        {AddLeave()}
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
