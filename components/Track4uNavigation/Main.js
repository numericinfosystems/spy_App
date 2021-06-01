import React, { useState, useEffect } from "react";
import { Button, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { TextInput } from "react-native-paper";
import Dialog from "react-native-dialog";
import { postDataForSF } from "../../components/FetchNodeSFServices";
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
// import GetLatLng from '../GetLatLng';
// import MapViewTracker from "../MapViewTracker";
import { FontFamily } from "./config/FontFamily";
import Icon from "react-native-vector-icons/MaterialIcons";
import FAIcon from "react-native-vector-icons/FontAwesome";
import { PermissionsAndroid, Platform } from "react-native";
import RootNavigator from "./RootNavigator";
import { createStackNavigator } from "@react-navigation/stack";
// import { floor } from "react-native-reanimated";
import Login from "./Login";
import Profile from "./Screens/Profile1/Profile";
// import Profile from '../Screens/Profile';
import Expenses from "./Screens/Expenses";
import Leaves from "./Screens/Leaves";
import Task from "./Screens/Task";

import Splash from "./Screens/Splash";
import AddNumber from "./Screens/AddNumber";
// import CallLogs API
import CallLogs from "react-native-call-log";
//Import Call Detector
import CallDetectorManager from "react-native-call-detection";
// import BackgroundFetch from "react-native-background-fetch";
import { postData, getData } from "./FecthServerServices";
import { useSelector } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import { store } from "./reducer/store";
import AsyncStorage from "@react-native-community/async-storage";
import ExpensesList from "./Screens/ExpensesList";
// import Profile from '../Screens/Profile';
import { Dimensions } from "react-native";
import CheckIn from "./Screens/CheckIn";
import TabView from "./Screens/TabView";
import Orders from "./Screens/Orders";
import LeaveList from "./Screens/LeaveList";
import Clientele from "./Screens/Clientele";
import { flashSuccess } from "./config/helper";

const { width, height } = Dimensions.get("window");
const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
};

const CombinedDarkTheme = { ...PaperDarkTheme, ...NavigationDarkTheme };
// const StackApp = createStackNavigator();

export default function Main(props) {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [TextVisible, setTextVisible] = useState(false);
  const [getCDate, setCDate] = useState("");
  const [getSTime, setSTime] = useState("");
  const [getETime, setETime] = useState("");

  const [getEmpId, setEmpId] = useState("");
  const [getClientId, setClientId] = useState("");
  const [getClientname, setClinetname] = useState("");
  const [getMobileNo, setMobileNo] = useState("");
  const [getNote, setNote] = useState("");
  const [getDate, setDate] = useState("");
  const [getTime, setTime] = useState("");
  const [getMessage, setMessage] = useState("");

  const [getNewClientname, setNewClinetname] = useState("");
  const [getNewClientLastname, setNewClientLastname] = useState("");
  const [getClientAddress, setClientAddress] = useState("");
  const [getState, setState] = useState("");
  const [getCity, setCity] = useState("");
  const [getFirmName, setFirmName] = useState("");
  const [getEmail, setEmail] = useState("");
  const [getDesc, setDesc] = useState("");
  const [getcallType, setcallType] = useState("");
  const [getVendorId, setVendorId] = useState("");

  let callDetector = undefined;
  // var userData = store.getState(state => state.userData)
  var dataEmp;
  var user = Object.values(store.getState().userData)[0];
  // console.log({ userData: user });

  React.useEffect(() => {
    readData();
  }, []);

  const readData = async () => {
    try {
      const data = await AsyncStorage.getItem("LOGINKEY");
      if (data != null) {
        const jsonData = JSON.parse(data);
        // console.log("1235467891324566546", jsonData);
        // console.log("1235467891324566546", jsonData.Emp_ID_c);
        // console.log("1235467891324566546", jsonData.Id);
        dataEmp = jsonData;
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const StackApp = createStackNavigator();
  const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme; // Use Light/Dark theme based on a state

  function toggleTheme() {
    // We will pass this function to Drawer and invoke it on theme switch press
    setIsDarkTheme((isDark) => !isDark);
  }

  const saveToDB = async (body) => {
    // console.log({ dataEmp });
    let bdy = {
      employee_id: dataEmp.employeeid,
      vender_id: dataEmp.vendorid,
      name: body.name ? body.name : "NA",
      date: body.dateTime,
      time: body.dateTime,
      duration: body.duration,
      status: body.type,
      phone_no: body.phoneNumber,
      pick_status: body.rawType,
    };
    console.log({ bdy });
    const result = await postData("phonecall/addNewPhoneCall", bdy);
    if (result.status) {
      console.log(result);
    }
  };
  const handleAddData = async () => {
    // console.log('Dateeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec =
      new Date().getSeconds() < 10
        ? "0" + new Date().getSeconds()
        : new Date().getSeconds(); //Current Seconds
    // console.log("EMPIIDDDDDDDDDD", getEmpId);
    let body = {
      employeeid: user.employeeid,
      clientid: getClientId,
      clientname: getClientname,
      mobileno: getMobileNo,
      note: getNote,
      date: date + "/" + month + "/" + year,
      time: hours + ":" + min + ":" + sec,
    };
    // console.log("bodyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
    var n = getClientname.split(" ");
    var sbody = {
      notes: getNote,

      customerNumber: getMobileNo.substring(3),

      firstName: n[0],

      lastName: n[1],

      employeeId: user.employeeid,

      callType: getcallType,

      callDisposition: "Successful",

      startTime: getSTime,

      endTime: getETime,

      callDate: getCDate,

      battery: 57,

      signalStrength: "high",

      locationLatitude: 77.8578,

      locationLongitude: 16.8784,
    };

    console.log("xxxxxxxxxxxxxx", sbody);
    var sresult = await postDataForSF(
      "https://retaildemop91-dev-ed.my.salesforce.com//services/apexrest/v1/CallLogService",
      sbody
    );
    // alert(JSON.stringify(sresult));
    if (sresult.message == "Success") {
      // alert("Client Migrate  Successfully On SF....");
      // flashSuccess("Client Migrate  Successfully On SF....");
    }

    var result = await postData("clientnote/add", body);
    if (result.status) {
      // console.log('sucesssssssssssssssssssssssssssssssssss');
      //alert("Add Note Sucessfully");
      flashSuccess("Add note sucessfully");
      setVisible(false);
    }
    setNote("");
  };

  // const handleAddData = async () => {
  //   var date = new Date().getDate(); //Current Date
  //   var month = new Date().getMonth() + 1; //Current Month
  //   var year = new Date().getFullYear(); //Current Year
  //   var hours = new Date().getHours(); //Current Hours
  //   var min = new Date().getMinutes(); //Current Minutes
  //   var sec =
  //     new Date().getSeconds() < 10
  //       ? "0" + new Date().getSeconds()
  //       : new Date().getSeconds(); //Current Seconds

  //   let body = {
  //     employeeid: user.employeeid,
  //     clientid: getClientId,
  //     clientname: getClientname,
  //     mobileno: getMobileNo,
  //     note: getNote,
  //     date: date + "/" + month + "/" + year,
  //     time: hours + ":" + min + ":" + sec,
  //   };

  //   var result = await postData("clientnote/add", body);
  //   if (result.status) {

  //     flashSuccess("Add note sucessfully");
  //     setVisible(false);
  //   }
  //   setNote("");
  //   setClinetname("");
  // };

  const handleCancel = () => {
    setVisible(false);
    setOpen(false);
    setTextVisible(false);
  };

  /*---------call a page by using navigation-------*/
  const handleAddNumber = () => {
    // alert('Hello');
    setOpen(false);
    setTextVisible(true);
  };

  const fetchNumber = async (number) => {
    let body = { number: "+91" + number };
    console.log("aaaaaaaaaaaaaa", body);
    //await postData(`client/search/${number}`);
    var result = await postData("client/search", body);
    if (result.status) {
      // console.log("loggggggggggggggg", result.data);
      const rslt = result.data;
      setEmpId(rslt.employeeid);
      setClientId(rslt.clientid);
      setClinetname(rslt.clientname);
      setMobileNo(rslt.mobileno);
      setMessage("");
      setVisible(true);
    } else {
      setOpen(true);
      // alert("Number Not Exist");
      setMobileNo(number);
    }
  };

  const openDialog = () => {
    return (
      <View>
        <Dialog.Container visible={visible}>
          <Dialog.Title>Add Note</Dialog.Title>

          <Dialog.Description style={{ width: width * 0.8 }}>
            <View style={{ flex: 1 }}>
              <View style={{ padding: 5, width: width * 0.8 }}>
                <TextInput
                  placeholder="First name"
                  value={getClientname}
                  onChangeText={(text) => setClinetname(text)}
                />
              </View>
              {/* setNewClientLastname */}
              {/* <View style={{ padding: 5, width: width * 0.8 }}>
                <TextInput
                  placeholder="Last name"
                  value={getNewClientLastname}
                  onChangeText={(text) => setNewClientLastname(text)}
                />
              </View> */}
              <View style={{ padding: 5 }}>
                <TextInput
                  value={getMobileNo}
                  onChangeText={(text) => setMobileNo(text)}
                  placeholder="mobile no"
                  keyboardType="number-pad"
                />
              </View>
              <View style={{ padding: 5 }}>
                <TextInput
                  multiline
                  numberOfLines={4}
                  value={getNote}
                  onChangeText={(text) => setNote(text)}
                  placeholder="Note"
                />
              </View>
            </View>
          </Dialog.Description>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity onPress={() => handleCancel()}>
              <LinearGradient
                colors={["#e71a23", "#b5005d"]}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={[styles.LinearGradientStyle]}
              >
                <Icon name="close" size={22} style={{ color: "#FFF" }} />
                <Text style={{ ...styles.buttonText, marginLeft: 5 }}>
                  Cancel
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleAddData()}>
              <LinearGradient
                colors={["#e71a23", "#b5005d"]}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={[styles.LinearGradientStyle]}
              >
                <FAIcon name="save" size={22} style={{ color: "#FFF" }} />
                <Text style={{ ...styles.buttonText, marginLeft: 5 }}>
                  Save Note
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Dialog.Container>
      </View>
    );
  };

  const openAddNumberDialog = () => {
    return (
      <View>
        <Dialog.Container visible={open}>
          <Dialog.Title>{getMobileNo}</Dialog.Title>

          <Dialog.Description style={{ width: width * 0.8 }}>
            Do You Want to Add this Number
          </Dialog.Description>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity onPress={() => handleCancel()}>
              <LinearGradient
                colors={["#e71a23", "#b5005d"]}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={[styles.LinearGradientStyle]}
              >
                <Icon name="close" size={22} style={{ color: "#FFF" }} />
                <Text style={{ ...styles.buttonText, marginLeft: 5 }}>
                  Cancel
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleAddNumber()}>
              <LinearGradient
                colors={["#e71a23", "#b5005d"]}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={[styles.LinearGradientStyle]}
              >
                <FAIcon name="save" size={22} style={{ color: "#FFF" }} />
                <Text style={{ ...styles.buttonText, marginLeft: 5 }}>
                  Add Number
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Dialog.Container>
      </View>
    );
  };
  /*--------------------------------------------- */

  // const handleAddNewNumber = async () => {
  //   setTextVisible(false);
  //   let body = {
  //     clientname: getNewClientname,
  //     clientaddress: getClientAddress,
  //     state: getState,
  //     city: getCity,
  //     firmname: getFirmName,
  //     mobileno: getMobileNo,
  //     email: getEmail,
  //     description: getDesc,
  //     vendorid: user.vendorid,
  //   };

  //   let result = await postData("client/add", body);
  //   if (result.status) {
  //     flashSuccess("Add client successfully");
  //   }
  //   setNewClinetname("");
  //   setClinetname("");
  //   setClientAddress("");
  //   setState("");
  //   setCity("");
  //   setFirmName("");
  //   setEmail("");
  //   setDesc("");
  // };

  const handleAddNewNumber = async () => {
    setTextVisible(false);
    let body = {
      clientname: getNewClientname + " " + getNewClientLastname,
      clientaddress: getClientAddress,
      state: getState,
      city: getCity,
      firmname: getFirmName,
      mobileno: getMobileNo,
      email: getEmail,
      description: getDesc,
      vendorid: user.vendorid,
    };
    var sbody = {
      notes: getDesc,

      customerNumber: getMobileNo.substring(3),

      employeeId: user.employeeid,

      firstName: getNewClientname,

      lastName: getNewClientLastname,

      callType: getcallType,

      callDisposition: "Successful",

      startTime: getSTime,

      endTime: getETime,

      callDate: getCDate,

      battery: 57,

      signalStrength: "high",

      locationLatitude: 77.8578,

      locationLongitude: 16.8784,
    };

    console.log("xxxx", sbody);

    var sresult = await postDataForSF(
      "https://retaildemop91-dev-ed.my.salesforce.com//services/apexrest/v1/CallLogService",
      sbody
    );
    // alert(JSON.stringify(sresult));
    if (sresult.message == "Success") {
      // flashSuccess("Client Migrate  Successfully On SF....");
    }

    let result = await postData("client/add", body);
    if (result.status) {
      flashSuccess("Record Submitted Successfully");
    }
    setClinetname("");
    setNewClientLastname("");
    setClientAddress("");
    setState("");
    setCity("");
    setFirmName("");
    setEmail("");
    setDesc("");
  };

  /*---------------Add New Client---------------- */
  const AddNumberDialog = () => {
    return (
      <View>
        <Dialog.Container visible={TextVisible}>
          <Dialog.Title style={{ color: "#eb2f06" }}>
            Add New Number( {getMobileNo})
          </Dialog.Title>
          <Dialog.Description style={{ width: width * 0.8 }}>
            <View style={{ flex: 1 }}>
              <TextInput
                style={{ backgroundColor: "white", width: width * 0.8 }}
                label=" First Name"
                placeholder="First name"
                value={getNewClientname}
                onChangeText={(text) => setNewClinetname(text)}
                theme={{
                  colors: {
                    placeholder: "gray",
                    // text: '#245ef4',
                    // primary: '#245ef4',
                    underlineColor: "transparent",
                    background: "#FFF",
                  },
                }}
              />
              <TextInput
                style={{ backgroundColor: "white", width: width * 0.8 }}
                label="Last Name"
                placeholder="Last name"
                value={getNewClientLastname}
                onChangeText={(text) => setNewClientLastname(text)}
                theme={{
                  colors: {
                    placeholder: "gray",
                    // text: '#245ef4',
                    // primary: '#245ef4',
                    underlineColor: "transparent",
                    background: "#FFF",
                  },
                }}
              />
              <TextInput
                style={{
                  marginTop: 5,
                  backgroundColor: "white",
                  width: width * 0.8,
                }}
                label="Address"
                placeholder="Address"
                value={getClientAddress}
                onChangeText={(text) => setClientAddress(text)}
                theme={{
                  colors: {
                    placeholder: "gray",
                    // text: '#245ef4',
                    // primary: '#245ef4',
                    underlineColor: "transparent",
                    background: "#FFF",
                  },
                }}
              />
              <TextInput
                style={{
                  marginTop: 5,
                  backgroundColor: "white",
                  width: width * 0.8,
                }}
                label="State"
                placeholder="State"
                value={getState}
                onChangeText={(text) => setState(text)}
                theme={{
                  colors: {
                    placeholder: "gray",
                    // text: '#245ef4',
                    // primary: '#245ef4',
                    underlineColor: "transparent",
                    background: "#FFF",
                  },
                }}
              />
              <TextInput
                style={{
                  marginTop: 5,
                  backgroundColor: "white",
                  width: width * 0.8,
                }}
                label="City"
                placeholder="City"
                value={getCity}
                onChangeText={(text) => setCity(text)}
                theme={{
                  colors: {
                    placeholder: "gray",
                    // text: '#245ef4',
                    // primary: '#245ef4',
                    underlineColor: "transparent",
                    background: "#FFF",
                  },
                }}
              />
              <TextInput
                style={{
                  marginTop: 5,
                  backgroundColor: "white",
                  width: width * 0.8,
                }}
                label="Firm Name"
                placeholder="Firm Name"
                value={getFirmName}
                onChangeText={(text) => setFirmName(text)}
                theme={{
                  colors: {
                    placeholder: "gray",
                    // text: '#245ef4',
                    // primary: '#245ef4',
                    underlineColor: "transparent",
                    background: "#FFF",
                  },
                }}
              />
              <TextInput
                style={{
                  marginTop: 5,
                  backgroundColor: "white",
                  width: width * 0.8,
                }}
                label="Email Id"
                placeholder="Email Id"
                value={getEmail}
                onChangeText={(text) => setEmail(text)}
                theme={{
                  colors: {
                    placeholder: "gray",
                    // text: '#245ef4',
                    // primary: '#245ef4',
                    underlineColor: "transparent",
                    background: "#FFF",
                  },
                }}
              />
              <TextInput
                style={{
                  marginTop: 5,
                  backgroundColor: "white",
                  width: width * 0.8,
                }}
                label="Description"
                placeholder="Description"
                multiline
                numberOfLines={4}
                value={getDesc}
                onChangeText={(text) => setDesc(text)}
                theme={{
                  colors: {
                    placeholder: "gray",
                    // text: '#245ef4',
                    // primary: '#245ef4',
                    underlineColor: "transparent",
                    background: "#FFF",
                  },
                }}
              />
            </View>
          </Dialog.Description>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity onPress={() => handleCancel()}>
              <LinearGradient
                colors={["#e71a23", "#b5005d"]}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={[styles.LinearGradientStyle]}
              >
                <Icon name="close" size={22} style={{ color: "#FFF" }} />
                <Text style={{ ...styles.buttonText, marginLeft: 5 }}>
                  Cancel
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleAddNewNumber()}>
              <LinearGradient
                colors={["#e71a23", "#b5005d"]}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={[styles.LinearGradientStyle]}
              >
                <FAIcon name="save" size={22} style={{ color: "#FFF" }} />
                <Text style={{ ...styles.buttonText, marginLeft: 5 }}>
                  Save
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            {/* <Dialog.Button label="Add Number" onPress={() => handleCancel()} /> */}
            {/* <Dialog.Button label="Save Note" onPress={() => handleAddData()} /> */}
          </View>
        </Dialog.Container>
      </View>
    );
  };

  const startStopListener = () => {
    callDetector = new CallDetectorManager(
      (event, number) => {
        if (event === "Disconnected") {
          console.log("DISCONNECTED", number);
          CallLogs.load(1)
            .then((c) => {})
            .catch((err) => {});
          CallLogs.load(1)
            .then((c) => {
              // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxyyyyyyyyyyyyy");
              // After Disconnected Call open a Dialog Box
              // console.log("number", number);
              fetchNumber(number);
              // alert('Hello World');
              // console.log("c[0]", c[0]);
              saveToDB(c[0]);
            })
            .catch((err) => console.log(err));

          var hours = new Date().getHours(); //Current Hours
          var min = new Date().getMinutes(); //Current Minutes
          var sec =
            new Date().getSeconds() < 10
              ? "0" + new Date().getSeconds()
              : new Date().getSeconds();
          setETime(hours + ":" + min + ":" + sec);

          // Do something call got disconnected
        } else if (event === "Connected") {
          console.log("CONNECTED", number);
          // Do something call got connected
          // This clause will only be executed for iOS
        } else if (event === "Incoming") {
          console.log("Incoming", number);
          var date = new Date().getDate(); //Current Date
          var month = new Date().getMonth() + 1; //Current Month
          var year = new Date().getFullYear(); //Current Year
          var hours = new Date().getHours(); //Current Hours
          var min = new Date().getMinutes(); //Current Minutes
          var sec =
            new Date().getSeconds() < 10
              ? "0" + new Date().getSeconds()
              : new Date().getSeconds();
          setSTime(hours + ":" + min + ":" + sec);
          setCDate(month + "/" + date + "/" + year);
          setcallType("Inbound");
          // alert("Inbound");
          // Do something call got incoming
        } else if (event === "Dialing") {
          console.log("DIALING", number);
          // Do something call got dialing
          // This clause will only be executed for iOS
        } else if (event === "Offhook") {
          console.log("OFFHOOK", number);
          // console.log("Incoming", number);
          var date = new Date().getDate(); //Current Date
          var month = new Date().getMonth() + 1; //Current Month
          var year = new Date().getFullYear(); //Current Year
          var hours = new Date().getHours(); //Current Hours
          var min = new Date().getMinutes(); //Current Minutes
          var sec =
            new Date().getSeconds() < 10
              ? "0" + new Date().getSeconds()
              : new Date().getSeconds();
          setSTime(hours + ":" + min + ":" + sec);
          setCDate(month + "/" + date + "/" + year);
          setcallType("Outbound");
          // alert("Outbound");

          //Device call state: Off-hook.
          // At least one call exists that is dialing,
          // active, or on hold,
          // and no calls are ringing or waiting.
          // This clause will only be executed for Android
        } else if (event === "Missed") {
          console.log("MISSED", number);
          CallLogs.load(1)
            .then((c) => {
              console.log(c);
            })
            .catch((err) => {});
          CallLogs.load(1)
            .then((c) => {
              console.log(c);
              // console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
              // alert('xxxxxxx');
              saveToDB(c);
            })
            .catch((err) => console.log(err));
          // Do something call got missed
          // This clause will only be executed for Android
        }
      },
      true, // To detect incoming calls [ANDROID]
      () => {
        // If your permission got denied [ANDROID]
        // Only if you want to read incoming number
        // Default: console.error
        // console.log("Permission Denied by User");
      },
      {
        title: "Phone State Permission",
        message:
          "This app needs access to your phone state in order to react and/or to adapt to incoming calls.",
      }
    );
  };

  React.useEffect(() => {
    async function fetchData() {
      if (Platform.OS != "ios") {
        try {
          const userResponse = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
            PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
          ]).then(() => {
            startStopListener();
          });
          // console.log({userResponse});
        } catch (err) {
          alert(JSON.stringify(err));
        }
      } else {
        alert(
          "Sorry! You can’t get call logs in iOS devices because of the security concern"
        );
      }
    }
    fetchData();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        {/*<RootNavigator toggleTheme={toggleTheme}/>*/}
        <StackApp.Navigator initialRouteName="Splash">
          <StackApp.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}
          />
          {/* react-native-reanimated */}
          <StackApp.Screen
            name="RootNavigator"
            component={RootNavigator}
            toggleTheme={toggleTheme}
            options={{ headerShown: false }}
          />
          {/* <StackApp.Screen name="MapViewTracker" component={MapViewTracker} /> */}
          <StackApp.Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
          />
          {/* <StackApp.Screen name="GetLatLng" component={GetLatLng} /> */}
          {/* <StackApp.Screen name="Profile" component={ProfileScreen} /> */}
          <StackApp.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
          <StackApp.Screen name="Expenses" component={Expenses} />
          <StackApp.Screen
            name="ExpensesList"
            component={ExpensesList}
            options={{ headerShown: false }}
          />
          <StackApp.Screen name="Leaves" component={Leaves} />
          <StackApp.Screen
            name="Task"
            component={Task}
            options={{ headerShown: false }}
          />
          <StackApp.Screen name="CheckIn" component={CheckIn} />
          <StackApp.Screen name="TabView" component={TabView} />
          <StackApp.Screen name="AddNumber" component={AddNumber} />
          <StackApp.Screen
            name="Orders"
            component={Orders}
            options={{ headerShown: false }}
          />
          <StackApp.Screen
            name="LeaveList"
            component={LeaveList}
            options={{ headerShown: false }}
          />
          <StackApp.Screen
            name="Clientele"
            component={Clientele}
            options={{ headerShown: false }}
          />
        </StackApp.Navigator>
      </NavigationContainer>
      <View>{openDialog()}</View>
      {/* <View>{openExistNumDialog}</View> */}
      <View>{openAddNumberDialog()}</View>
      <View>{AddNumberDialog()}</View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  LinearGradientStyle: {
    flexDirection: "row",
    width: width * 0.35,
    padding: 7,
    borderRadius: 40,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  buttonText: {
    fontSize: 12,
    textAlign: "center",
    color: "#fff",
    backgroundColor: "transparent",
    fontFamily: FontFamily.regular1,
  },
});
