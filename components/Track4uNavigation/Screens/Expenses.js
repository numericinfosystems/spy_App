import React, { useState } from "react";
import {
  TouchableOpacity,
  Dimensions,
  Text,
  StyleSheet,
  View,
  Image,
  StatusBar,
} from "react-native";
import { TextInput, List, Portal, Dialog, Paragraph } from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";
import { FontFamily } from "../config/FontFamily";
const { width, height } = Dimensions.get("window");
import { flash, flashSuccess } from "../config/helper";
import { Platform } from "react-native";
import { PermissionsAndroid } from "react-native";
import { Modal } from "react-native";
import { Button } from "react-native-paper";
import { Picker } from "react-native";
import { useDispatch, useSelector } from "react-redux";
/*------------------Upload Image Via a Camera---------------------------- */
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import RNFS from "react-native-fs";
import { postData } from "../FecthServerServices";
/*----------------------------------------------------------------------- */

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
    borderRadius: 30,
    marginBottom: 10,
    padding: 10,
  },

  buttonText: {
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    backgroundColor: "transparent",
    fontFamily: FontFamily.bold1,
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

  container: {
    // flex: 1,
    padding: 10,
    // backgroundColor: '#fff',
    alignItems: "center",
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: "black",
    textAlign: "center",
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 5,
    marginVertical: 10,
    width: 250,
  },
  imageStyle: {
    width: 120,
    height: 120,
    borderRadius: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "#000",
  },
});

export default function Expenses(props) {
  var userData = useSelector((state) => state.userData);
  var user = Object.values(userData)[0];
  // console.log("=====>>>>>", user.employeeid);

  const [getExpType, setExpType] = useState("");
  const [getShortDesc, setShortDesc] = useState("");
  const [getDate, setDate] = useState(new Date());
  const [getDesc, setDesc] = useState("");
  const [getAmount, setAmount] = useState("");
  const [getStatus, setStatus] = useState("");
  const [filePath, setFilePath] = useState({});
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
      flashSuccess("Expense Upload Successfully");
      props.navigation.navigate("ExpensesList");
      // }

      setExpType("");
      setShortDesc("");
      setDesc("");
      setAmount("");
      filePath({});
    }
  };

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      {/* <StatusBar translucent backgroundColor="transparent" /> */}
      <StatusBar translucent backgroundColor="#8B0000" />

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

      <View
        // style={{
        //   ...styles.questionv,
        //   marginTop: 20,
        //   padding: 10,
        //   backgroundColor: "#fff",
        // }}
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
          selectedValue={getExpType}
          style={{ height: 50, width: width * 0.91 }}
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
      </View>
      <View
        style={{
          padding: 10,
          // backgroundColor: "#fff",
        }}
      >
        <TextInput
          style={{ backgroundColor: "white" }}
          mode="outlined"
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
            },
          }}
        />
        <TextInput
          style={{ marginTop: 10, backgroundColor: "white" }}
          mode="outlined"
          multiline
          numberOfLines={4}
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
            },
          }}
        />
        <TextInput
          style={{ marginTop: 10, backgroundColor: "white" }}
          label="Amount"
          mode="outlined"
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
      </View>

      {/*  */}
      <Text style={styles.textStyle}>Bill Image</Text>
      <View style={styles.container}>
        <Image source={{ uri: filePath.uri }} style={styles.imageStyle} />
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
            style={[styles.LinearGradientStyle, { width: width * 0.6 }]}
          >
            <Text style={{ ...styles.buttonText }}>Choose Bill Picture</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={{ padding: 10 }} />

      <View
        style={{ justifyContent: "center", alignItems: "center", bottom: 0 }}
      >
        <TouchableOpacity onPress={() => handleSubmit()}>
          <LinearGradient
            // colors={["#6633FF", "#3eb1f0"]}
            colors={["#e71a23", "#b5005d"]}
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
