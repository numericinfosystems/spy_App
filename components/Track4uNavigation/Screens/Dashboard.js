import React, { useEffect, useRef, useState } from "react";
import {
  TouchableOpacity,
  Dimensions,
  StatusBar,
  View,
  StyleSheet,
  Text,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Heartbeat, getBatteryLevel } from "../../../Heartbeat.js";
import { ProgressBar, Colors } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import FAIcon from "react-native-vector-icons/FontAwesome";
const { width, height } = Dimensions.get("window");
import { FontFamily } from "../config/FontFamily";
import LinearGradient from "react-native-linear-gradient";
import RBSheet from "react-native-raw-bottom-sheet";
import { useSelector } from "react-redux";
import { getAccessToken, getData, postData } from "../FecthServerServices";
import RNViewShot, { captureScreen } from "react-native-view-shot";
import { usePosition } from "../usePosition";

export default function Dashboard({ navigation }, props) {
  var userData = useSelector((state) => state.userData);
  var user = Object.values(userData)[0];
  // console.log("======>>>>>>>", user.employeeid);
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();
  const [day] = useState(new Date());
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [task, setTask] = useState({});
  // const { latitude, longitude, angle } = usePosition();
  const [taskAssigned, settaskAssigned] = useState("");
  const [taskCompleted, settaskCompleted] = useState("");
  const [taskNotCompleted, settaskNotCompleted] = useState("");
  const [getStartAttendButton, setStartAttendButton] = useState(false);
  const [Attendance, setAttendance] = useState("Absent");
  const [AttendanceId, setAttendanceId] = useState("");
  const [getEndButton, setEndButton] = useState(true);

  const fetchDailylog = async () => {
    /*-------------fetch user.Id from reducer---------------*/
    // var body={}
    var result = await getData(`task/counttask/${user.employeeid}`);
    if (result.data) {
      settaskAssigned(result.data.Assigntask);
      settaskCompleted(result.data.Completedtask);
      settaskNotCompleted(result.data.NotCompletedtask);
    }
  };

  // const fetchAttendance = async () => {
  //   var date = new Date();
  //   let body = {
  //     vendorid: user.vendorid,
  //     employeeid: user.employeeid,
  //     currentdate: date,
  //   };

  //   let result = await postData("attendance/serchAttendance", body);

  //   if (result.status) {
  //     if (result.data[0].status == "Present") {
  //       setStartAttendButton(true);
  //       setAttendance(result.data[0].status);
  //       // Heartbeat.startService();
  //     }

  //   }
  // };

  useEffect(() => {
    fetchDailylog();
    // fetchAttendance();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchDailylog();
      // fetchAttendance();
    }, [])
  );

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec =
      new Date().getSeconds() < 10
        ? "0" + new Date().getSeconds()
        : new Date().getSeconds(); //Current Seconds
    setCurrentDate(date + "/" + month + "/" + year);
    setCurrentTime(hours + ":" + min + ":" + sec);
  }, []);

  useEffect(() => {
    var interval = setInterval(() => {
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      var sec =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds(); //Current Seconds
      setCurrentTime(hours + ":" + min + ":" + sec);
      return () => clearInterval(interval);
    });
  }, []);

  const StartAttendance = async () => {
    refRBSheet1.current.close();

    var body = {
      vendorid: user.vendorid,
      employeeid: user.employeeid,
      attendencedate: new Date(),
      attendencetime: new Date(),
      shiftid: "Day",
      status: "Present",
      outtime: "",
    };

    var result = await postData("attendance/takeAttendance", body);
    if (result.status) {
      Heartbeat.startService();
      setStartAttendButton(true);
      setAttendanceId(result.data.insertId);
    }
  };

  var week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
  ];

  const EndMyDay = async () => {
    Heartbeat.stopService();
    refRBSheet1.current.close();
    setEndButton(false);
    // alert("hhh");
    // let body = {
    //   outtime: new Date(),
    // };
    // console.log(body);
    // var result = await postData(
    //   `attendance/updateEndTime/${AttendanceId}`,
    //   body
    // );
    // if (result.status) {
    //   setEndButton(false);
    //   Heartbeat.stopService();
    // }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      {/* <StatusBar translucent backgroundColor="#8B0000" /> */}

      <View
        style={{
          ...styles.HBoxes,
          flexDirection: "row",
          paddingTop: StatusBar.currentHeight,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Icon name="menu" size={24} color="#000" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 24,
            textAlign: "center",
            color: "#000",
            fontFamily: FontFamily.regular,
          }}
        >
          Dashboard
        </Text>
        <TouchableOpacity
          onPress={() => {
            alert("You Notification!");
          }}
        >
          <FAIcon style={{ color: "#000" }} name="bell" size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.Boxes}>
        <View
          style={[{ flexDirection: "row", justifyContent: "space-between" }]}
        >
          <Text
            style={{
              color: "#000",
              fontSize: 18,
              fontFamily: FontFamily.bold1,
            }}
          >
            Tasks
          </Text>
          <Text
            style={{
              color: "#e71a23",
              fontWeight: "bold",
              fontSize: 14,
              marginLeft: 80,
            }}
          >
            {/* {task.ctask}/{task.ttask}*/}
          </Text>
        </View>
        <Text style={{ fontFamily: FontFamily.bold1, marginTop: 30 }}>
          Tasks Assigned
        </Text>
        <View
          style={[{ flexDirection: "row", justifyContent: "space-between" }]}
        >
          <View style={{ top: 5, width: "90%" }}>
            <ProgressBar
              progress={1}
              color={Colors.blue300}
              style={{ height: 10, borderRadius: 10 }}
            />
          </View>
          <View style={{ width: width * 0.3 }}>
            <Text
              style={{
                color: "#000",
                fontSize: 12,
                fontFamily: FontFamily.bold1,
                left: 10,
              }}
            >
              {taskAssigned}
            </Text>
          </View>
        </View>
        <Text style={{ fontFamily: FontFamily.bold1, marginTop: 20 }}>
          Tasks Completed
        </Text>
        <View
          style={[{ flexDirection: "row", justifyContent: "space-between" }]}
        >
          <View style={{ top: 5, width: "90%" }}>
            <ProgressBar
              progress={taskCompleted}
              color={Colors.green500}
              style={{ height: 10, borderRadius: 10 }}
            />
          </View>
          <View style={{ width: width * 0.3 }}>
            <Text
              style={{
                color: "#000",
                fontSize: 12,
                fontFamily: FontFamily.bold1,
                left: 10,
              }}
            >
              {taskCompleted}
              {/* {CompletedStatus} */}
            </Text>
          </View>
        </View>
        <Text style={{ fontFamily: FontFamily.bold1, marginTop: 20 }}>
          Tasks Not Completed
        </Text>
        <View
          style={[{ flexDirection: "row", justifyContent: "space-between" }]}
        >
          <View style={{ top: 5, width: "90%" }}>
            <ProgressBar
              progress={task.length - taskCompleted}
              color={Colors.red500}
              style={{ height: 10, borderRadius: 10 }}
            />
          </View>
          <View style={{ width: width * 0.3 }}>
            <Text
              style={{
                color: "#000",
                fontSize: 12,
                fontFamily: FontFamily.bold1,
                left: 10,
              }}
            >
              {taskNotCompleted}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.Boxes}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Clientele")}>
            <LinearGradient
              colors={["#e71a23", "#b5005d"]}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={[styles.LinearGradientStyle]}
            >
              <FAIcon
                name="address-card"
                size={22}
                style={{ color: "#FFF", marginLeft: 70 }}
              />
              <Text style={{ ...styles.buttonText, marginLeft: 5 }}>
                Clientele
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Task")}>
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
              <Text style={{ ...styles.buttonText, marginLeft: 5 }}>Task</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ExpensesList")}>
            <LinearGradient
              colors={["#e71a23", "#b5005d"]}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={[styles.LinearGradientStyle]}
            >
              <FAIcon
                name="money"
                size={22}
                style={{ color: "#FFF", marginLeft: 70 }}
              />
              <Text style={{ ...styles.buttonText, marginLeft: 5 }}>
                Expenses
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("LeaveList")}>
            <LinearGradient
              colors={["#e71a23", "#b5005d"]}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={[styles.LinearGradientStyle]}
            >
              <Icon
                name="people"
                size={22}
                style={{ color: "#FFF", marginLeft: 70 }}
              />
              <Text style={{ ...styles.buttonText, marginLeft: 5 }}>
                {" "}
                Apply Leave
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => refRBSheet1.current.open()}>
            <LinearGradient
              colors={["#e71a23", "#b5005d"]}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={[styles.LinearGradientStyle]}
            >
              <Icon
                name="verified"
                size={22}
                style={{ color: "#FFF", marginLeft: 70 }}
              />
              <Text style={{ ...styles.buttonText, marginLeft: 5 }}>
                Attendance
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          {/* )} */}
        </View>
      </View>

      <RBSheet
        ref={refRBSheet1}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={320}
        openDuration={250}
        customStyles={{
          container: {
            // justifyContent: 'center',
            // alignItems: 'center',
            padding: 10,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}
      >
        <Text
          style={{
            color: "#000",
            fontSize: 18,
            fontFamily: FontFamily.bold1,
            textAlign: "center",
          }}
        >
          Attendance
        </Text>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#f1f3f4",
            marginTop: 5,
            marginBottom: 20,
          }}
        />

        <View>
          <Text
            style={{
              color: "black",
              fontSize: 28,
              fontFamily: FontFamily.regular1,
              textAlign: "center",
              padding: 5,
            }}
          >
            {currentDate}
          </Text>
          <Text
            style={{
              color: "black",
              fontSize: 25,
              fontFamily: FontFamily.regular1,
              textAlign: "center",
              padding: 5,
            }}
          >
            {`${week[day.getDay()]}`}
          </Text>
          <Text
            style={{
              color: "black",
              fontSize: 25,
              fontFamily: FontFamily.regular1,
              textAlign: "center",
              padding: 5,
            }}
          >
            {currentTime}
          </Text>
        </View>
        {/* {console.log(Attendance == "Present")}  Attendance == "Present"  */}
        {getStartAttendButton ? (
          getEndButton ? (
            <>
              <TouchableOpacity onPress={() => EndMyDay()}>
                <LinearGradient
                  colors={["#e71a23", "#b5005d"]}
                  start={{ x: 1, y: 1 }}
                  end={{ x: 0, y: 0 }}
                  style={[styles.LinearGradientStyle]}
                >
                  <Icon
                    name="verified"
                    size={22}
                    style={{ color: "#FFF", marginLeft: 70 }}
                  />
                  <Text style={{ ...styles.buttonText, marginLeft: 5 }}>
                    End My Day
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {/* <TouchableOpacity onPress={() => EndMyDay()}> */}
              <LinearGradient
                colors={["#aaaaaa", "#cdc7be"]}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={[styles.LinearGradientStyle]}
              >
                <Icon
                  name="verified"
                  size={22}
                  style={{ color: "#FFF", marginLeft: 70 }}
                />
                <Text style={{ ...styles.buttonText, marginLeft: 5 }}>
                  End My Day
                </Text>
              </LinearGradient>
              {/* </TouchableOpacity> */}
            </>
          )
        ) : (
          <TouchableOpacity onPress={() => StartAttendance()}>
            <LinearGradient
              colors={["#e71a23", "#b5005d"]}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={[styles.LinearGradientStyle]}
            >
              <Icon
                name="verified"
                size={22}
                style={{ color: "#FFF", marginLeft: 70 }}
              />
              <Text style={{ ...styles.buttonText, marginLeft: 5 }}>
                Start My Day
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </RBSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  HBoxes: {
    backgroundColor: "#FFF",
    shadowColor: "#000",
    elevation: 8,
    padding: 10,
  },
  Boxes: {
    backgroundColor: "#FFF",
    width: "95%",
    borderRadius: 10,
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#dedede",
    shadowRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
    justifyContent: "center",
    alignSelf: "center",
  },
  loginContainer: {
    width: width * 0.5,
    // backgroundColor:'#fbc531',
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    // padding: 10,
  },
  texStyle: {
    fontSize: 16,
    // fontWeight: 'bold',
    color: "#000",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    letterSpacing: 5,
  },
  textContainer: {
    flexDirection: "row",
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#b07f4f",
    width: width * 0.95,
    alignSelf: "center",
    borderRadius: 10,
  },

  emailIcon: {
    color: "#FFF",
  },
  textStyleText: {
    fontSize: 14,
    // fontWeight: 'bold',
    width: width * 0.75,
    marginLeft: 1,
    color: "#FFF",
  },
  circle: {
    flexDirection: "row",
    borderRadius: 50,
    borderColor: "#b07f4f",

    borderWidth: 1,
    width: 25,
    height: 25,
    marginLeft: 5,
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
