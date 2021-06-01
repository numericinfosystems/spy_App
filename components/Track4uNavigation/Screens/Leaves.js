import React, { Component, useState, useEffect } from "react";
import {
  ImageBackground,
  CheckBox,
  ItemView,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Text,
  StyleSheet,
  View,
  Image,
  Button,
  Alert,
  StatusBar,
  FlatList,
} from "react-native";
import { flash, flashSuccess } from "../config/helper";
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import FAIcon from "react-native-vector-icons/FontAwesome";
import { Picker } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { FontFamily } from "../config/FontFamily";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSelector, useDispatch } from "react-redux";
import { BaseURL, getData, postData } from "../FecthServerServices";
const { width, height } = Dimensions.get("window");

const data = [
  {
    id: 1,
    name: "Medical",
    pic: require("../../images/mini.png"),
  },
  {
    id: 2,
    name: "Casual",
    pic: require("../../images/mini1.png"),
  },
  {
    id: 3,
    name: "Maternity",
    pic: require("../../images/mini2.png"),
  },
  {
    id: 4,
    name: "Others ",
    pic: require("../../images/mini3.png"),
  },
];

function Item({ item, props, getLeaveId, setLeaveId }) {
  return (
    <View
      style={[
        styles.item,
        {
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        },
      ]}
    >
      <TouchableOpacity onPress={() => setLeaveId(item.leaveid)}>
        <LinearGradient
          colors={["#e71a23", "#b5005d"]}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={[styles.LinearGradientStyle]}
        >
          <Image
            style={styles.imageStyle}
            source={{ uri: BaseURL + "/images/" + item.image }}
          />
          <Text style={{ ...styles.buttonText, marginLeft: 5 }}>
            {item.leavetype}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
  // });
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    flex: 1,
    borderRadius: 10,
    margin: 10,
    width: width,
  },
  imageStyle: {
    borderRadius: 10,
    width: 32,
    height: 32,
    resizeMode: "cover",
  },

  headStyle: {
    marginBottom: 5,
    flex: 1,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    padding: 5,
    fontFamily: FontFamily.bold1,
    // position:'absolute',
    // bottom:5,
    // alignSelf:'center',
  },
  LinearGradientStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.45,
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
  },

  buttonText: {
    fontSize: 18,
    textAlign: "center",
    color: "#fff",
    backgroundColor: "transparent",
    fontFamily: FontFamily.regular,
  },

  textStyle: {
    fontSize: 15,
    color: "#ecf0f1",
  },

  textbottom: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 12,
    color: "#000",
  },
  backgroundImage: {
    width: width,
    resizeMode: "cover",
    height: 120,
  },
  //   questionv: {
  //     backgroundColor: '#FFF',
  //     borderTopRightRadius: 30,
  //     borderTopLeftRadius: 30,
  //   },

  titleBar: {
    flexDirection: "row",
    marginHorizontal: 16,
    justifyContent: "space-between",
  },
});

export default function Leaves(props) {
  var userData = useSelector((state) => state.userData);
  var user = Object.values(userData)[0];
  // console.log("---->>>>>", user);

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

  useEffect(() => {
    fetchLeaveData(user.vendorid);
  }, []);

  const fetchLeaveData = async (v_id) => {
    let result = await getData(`leaves/displayByVid/${v_id}`);
    // console.log("====>>>>>>>", result.data);
    if (result.status) {
      setLeaveTypeList(result.data);
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
      // alert();
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
      let result = postData("leaveapproval/Add", body);
      props.navigation.navigate("LeaveList");

      flashSuccess("Apply Leave Successfully");

      setLeaveId("");
      setFromDate(new Date());
      setToDate(new Date());
      setDesc("");
    }
  };

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <StatusBar translucent backgroundColor="#8B0000" />
      {/* <View style={{height: 70}}>
        <ImageBackground
          source={require('../tusharimg/bg.png')}
          style={styles.backgroundImage}>
          <View
            style={[
              styles.titleBar,
              {
                marginTop: 40,
                marginBottom: 20,
                justifyContent: 'center',
                textAlign: 'center',
              },
            ]}>
            <Text
              style={{
                fontSize: 20,
                textAlign: 'center',
                color: '#FFF',
                fontFamily: FontFamily.regular,
              }}>
              Spy App
            </Text>
            <TouchableOpacity
              onPress={() => {
                alert('You list');
              }}></TouchableOpacity>
          </View>
        </ImageBackground>
      </View> */}
      {/* <Image
        source={require("../../images/licon1.png")}
        style={{
          width: width,
          top: 20,
          height: 30,
        }}
        resizeMode={"center"}
      />
      <Image
        source={require("../../images/91logo.png")}
        style={{
          width: width,
          height: 50,
          top: 20,
        }}
        resizeMode={"center"}
      /> */}
      {/* <View style={{ ...styles.questionv, marginTop: 10 }}>
        <FlatList
          data={getLeaveTypeList}
          contentContainerStyle={{ justifyContent: "space-between" }}
          horizontal={false}
          scrollEnabled={true}
          numColumns={2}
          renderItem={({ item }) => (
            <Item
              item={item}
              props={props}
              getLeaveId={getLeaveId}
              setLeaveId={setLeaveId}
            />
          )}
          keyExtractor={(item) => String(item.leaveid)}
        />
      </View> */}
      <View
        style={{
          marginTop: 20,
          borderWidth: 1,
          borderRadius: 5,
          width: width * 0.92,
          height: height * 0.08,
          alignItems: "center",
          alignSelf: "center",
          borderColor: "#8e9775",
        }}
      >
        <Picker
          // mode="outlined"
          selectedValue={getLeaveId}
          style={{ height: 50, width: width * 0.92, marginBottom: 20 }}
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
      </View>
      <View style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 10 }}>
        <TextInput
          mode="outlined"
          label="Description"
          multiline
          numberOfLines={6}
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
            },
          }}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <View style={{ padding: 5 }}>
          <TouchableOpacity onPress={showDatepicker}>
            <TextInput
              mode="outlined"
              style={{ width: width * 0.45 }}
              editable={false}
              value={getFromDate.toUTCString().substring(0, 16)}
              label="From Date"
              theme={{
                colors: {
                  placeholder: "gray",
                  // text: '#7a7a7a',
                  primary: "#e2231a",
                  underlineColor: "transparent",
                  background: "transparent",
                },
              }}
            />
          </TouchableOpacity>
        </View>
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
        <View style={{ padding: 5 }}>
          <TouchableOpacity onPress={showDatepicker1}>
            <TextInput
              mode="outlined"
              editable={false}
              value={getToDate.toUTCString().substring(0, 16)}
              label="From Date"
              style={{ width: width * 0.45 }}
              theme={{
                colors: {
                  placeholder: "gray",
                  // text: '#7a7a7a',
                  primary: "#e2231a",
                  underlineColor: "transparent",
                  background: "transparent",
                },
              }}
            />
          </TouchableOpacity>
        </View>
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

      <View
        style={{
          // justifyContent: "center",
          // alignItems: "center",
          position: "absolute",
          bottom: 10,
          alignSelf: "center",
        }}
      >
        <TouchableOpacity onPress={handleLeaveSubmit}>
          <LinearGradient
            colors={["#e71a23", "#b5005d"]}
            // colors={["#6633FF", "#3eb1f0"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={[styles.LinearGradientStyle]}
          >
            <Text style={{ ...styles.buttonText }}>Submit</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}
