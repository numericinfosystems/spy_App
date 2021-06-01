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
import { showMessage, hideMessage } from "react-native-flash-message";
import { flash, flashSuccess } from "../config/helper";
import LinearGradient from "react-native-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
// import AsyncStorage from '@react-native-community/async-storage'
import Icon from "react-native-vector-icons/FontAwesome";
import MIcon from "react-native-vector-icons/MaterialIcons";
// import {getData, postData, BaseURL} from './FetchService';
const { width, height } = Dimensions.get("window");
import { useSelector, useDispatch } from "react-redux";
// import {NavigationEvents} from 'react-navigation';
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { FontFamily } from "../config/FontFamily";
import { getData, postData } from "../FecthServerServices";
import { Linking } from "react-native";
import { usePosition } from "../usePosition";

// import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FAIcon from "react-native-vector-icons/FontAwesome";
// const arr = [
//   {
//     id: 1,
//     firmname: "Tanishq Showroom",
//     address: "Jiwali Chowk, Maharaj Bada, Lashkar Gwalior",
//     meetingtime: "11.30 AM",
//     orderdate: new Date(),
//     deliverstatus: "Not Completed",
//   },
//   {
//     id: 2,
//     firmname: "LNIPE",
//     address:
//       "Racecourse Rd, LNUPE Campus, Shakti Nagar, Gwalior, Madhya Pradesh 474002",
//     meetingtime: "11.30 AM",
//     orderdate: new Date(),
//     deliverstatus: "Not Completed",
//   },
// ];

const TodayTask = ({ item, index, Present, props }) => {
  // console.log("item", Present);

  const handleCompleteTask = async (item) => {
    // alert(item.taskid);
    props.navigation.navigate("Orders", {
      empId: item.employeeid,
      clientId: item.clientid,
      taskId: item.taskid,
      firmname: item.firmname,
      assigntaskid: item.assigntaskid,
    });
    // var body = {
    //   status: "Completed",
    //   taskid: item.taskid,
    //   assigntaskid: item.assigntaskid,
    // };
    // let result = await postData("task/editStatus", body);
    // console.log(result.status);
  };

  function calcDate(d) {
    d = new Date(d);
    var dd = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
    return dd;
  }

  return (
    <TouchableOpacity
      onPress={
        Present == false
          ? item.status == "Not Completed"
            ? () => flash("Mark attendance first")
            : () => flash("You have already Completed Task ")
          : item.status == "Not Completed"
          ? () => handleCompleteTask(item)
          : () => flash("You have already Completed Task ")
      }
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1%",
          backgroundColor: "#ffffff",
          width: width,
        }}
      >
        {/* <View> */}
        <View style={styles.item}>
          <View
            style={{
              marginTop: "1%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ display: "flex", flexDirection: "column" }}>
              <Text style={[styles.descStyle]}>{item.clientname}, </Text>
              <Text style={[styles.descStyle]}>{item.firmname}</Text>
              {/* <Text style={[styles.descStyle]}>
                {item.clientaddress}, {item.city},
              </Text> */}
            </View>
            <View>
              <Text style={[styles.descStyle]}>
                Date: {calcDate(item.datefrom)}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: "1%",
              borderBottomColor: "#d3d3d3",
              borderBottomWidth: 1,
            }}
          />
          {/* <Text
            style={{
              color: "#000",
              // fontWeight: 'bold',
              fontSize: 12,
              marginTop: "0.8%",
              fontFamily: FontFamily.bold1,
            }}
          >
            DATE & TIME
          </Text> */}
          {/* <Text
            style={{
              color: "#000",
              fontSize: 12,
              fontFamily: FontFamily.regular12,
            }}
          >
            {calcDate(item.datefrom)}
          </Text> */}
          <Text style={[styles.descStyle]}>{item.description}</Text>
          <Text style={[styles.descStyle]}>{item.clientaddress}</Text>
          <Text style={[styles.descStyle]}>{item.city}</Text>

          <View
            style={{
              marginTop: "1%",
              borderBottomColor: "#d3d3d3",
              borderBottomWidth: 1,
            }}
          />
          <View
            style={{
              marginTop: "1.5%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <LinearGradient
              colors={
                item.status == "Not Completed"
                  ? ["#e71a23", "#b5005d"]
                  : ["#4aa96c", "#4aa96c"]
              }
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={{
                borderRadius: 15,
                width: width * 0.25,
                height: height * 0.03,
              }}
            >
              <Text
                style={{
                  // width: width * 0.2,
                  color: "#FFF",
                  fontSize: 12,
                  fontFamily: FontFamily.bold1,
                  alignSelf: "center",
                  padding: "3%",
                }}
              >
                {item.taskstatus}
              </Text>
            </LinearGradient>

            <TouchableOpacity
              style={{
                top: 0,
                position: "absolute",
                right: 0,
              }}
              onPress={() => Linking.openURL(`tel:${item.mobileno}`)}
            >
              <MIcon
                name="call"
                size={25}
                color="#2ecc71"
                style={{ alignSelf: "center" }}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* </View> */}
      </View>
    </TouchableOpacity>
  );
};

export default function Task(props) {
  var userData = useSelector((state) => state.userData);
  var user = Object.values(userData)[0];
  // console.log('User Data', user);
  const [getList, setList] = useState([]);
  const [Dailylog, setDailylog] = useState({});
  const [Checkin, setCheckin] = useState(true);
  const { latitude, longitude, angle } = usePosition();
  const [currentTime, setCurrentTime] = useState("");
  const [Present, setPresent] = useState(false);

  useEffect(() => {
    fetchAttendance();
    fetchTask();
  }, []);

  const fetchTask = async () => {
    var result = await getData(`task/listoftask/${user.employeeid}`);
    console.log("========>>>>>>>>>>", result.data);
    setList(result.data);
  };

  const handleFilter = async (status) => {
    setList([]);
    let body = {
      employeeid: user.employeeid,
      vendorid: user.vendorid,
      status: status,
    };
    let list = await postData("task/displayByStatus", body);
    if (list.status) {
      console.log("========>>>>>>>>>>", list.data);
      setList(list.data);
    }
  };

  const handleByTodayDate = async () => {
    setList([]);
    let body = {
      employeeid: user.employeeid,
      vendorid: user.vendorid,
      // status: "Not Completed",
    };
    let list = await postData("task/displayByTodayDate", body);
    if (list.status) {
      // console.log("========>>>>>>>>>>", list.data);
      setList(list.data);
    }
  };

  const fetchAttendance = async () => {
    var date = new Date();
    let body = {
      vendorid: user.vendorid,
      employeeid: user.employeeid,
      currentdate: date,
    };

    let result = await postData("attendance/serchAttendance", body);
    if (result.status) {
      if (
        result.data[0].status == "Present" &&
        result.data[0].outtime == "00:00:00"
      ) {
        setPresent(true);
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchTask();
      fetchAttendance();
    }, [])
  );

  // useEffect(() => {
  //   var interval = setInterval(() => {
  //     var hours = new Date().getHours(); //Current Hours
  //     var min = new Date().getMinutes(); //Current Minutes
  //     var sec =
  //       new Date().getSeconds() < 10
  //         ? "0" + new Date().getSeconds()
  //         : new Date().getSeconds(); //Current Seconds
  //     setCurrentTime(hours + ":" + min + ":" + sec);
  //     return () => clearInterval(interval);
  //   });
  // }, []);
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

        <View
          style={{
            width: width,
            // height: height * 0.08,
            // backgroundColor: '#e71a23',
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
                  Task List
                </Text>
              </View>
              <View>{/* <Text>Bell icon</Text> */}</View>
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
            onPress={() => handleFilter("Completed")}
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
                Completed{" "}
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
            onPress={() => handleFilter("Not Completed")}
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
                Not Completed{" "}
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
            onPress={() => handleByTodayDate()}
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

        <Text />
        <FlatList
          data={getList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TodayTask item={item} Present={Present} props={props} />
          )}
          keyExtractor={(item) => String(item.assigntaskid)}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    borderColor: "#d1ccc0",
    backgroundColor: "#ffffff",
    padding: 5,
    // backgroundColor: "white",
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
});
