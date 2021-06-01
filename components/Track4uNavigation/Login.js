import React, { useEffect, useRef, useState } from "react";
import {
  TouchableOpacity,
  Dimensions,
  Image,
  View,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome";
const { width, height } = Dimensions.get("window");
import { FontFamily } from "./config/FontFamily";
import LinearGradient from "react-native-linear-gradient";
import RBSheet from "react-native-raw-bottom-sheet";
import { useForm, Controller } from "react-hook-form";
import { getData, postData } from "./FecthServerServices";
import AsyncStorage from "@react-native-community/async-storage";
import { USER_DATA } from "./reducer/types";
import { store } from "./reducer/store";

export default function Login({ navigation }) {
  // const refRBSheet = useRef(null);
  // const { handleSubmit, register, errors, reset, control } = useForm();
  const [getMobile, setMobile] = useState("");
  const [getPassword, setPassword] = useState("");

  const saveData = async (data) => {
    try {
      console.log("AsyncDtata", data);
      await AsyncStorage.setItem("LOGINKEY", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async () => {
    // alert("hiii");
    var body = {
      mobileno: getMobile,
      password: getPassword,
    };
    console.log("===========>>>>>>>>>>>>>>", body);
    var result = await postData("employee/checkLogin", body);
    if (result.RESULT) {
      console.log("resltdataaaaaaaaaaaaaaaaa", result.data);
      saveData(result.data);
      store.dispatch({
        type: USER_DATA,
        payload: [result.data.MobilePhone, result.data],
      });
      navigation.replace("RootNavigator");
    } else {
      // alert("user not found");
    }
  };

  // console.log({ errors })

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require("../images/logoplus91.png")}
          style={{
            width: width * 0.45,
            height: 80,
            top: 50,
            alignSelf: "center",
          }}
          resizeMode={"contain"}
        />
        <Image
          source={require("../images/map.png")}
          style={{
            width: width * 0.95,
            height: height * 0.5,
            alignSelf: "center",
          }}
          resizeMode={"center"}
        />
      </View>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          height={400}
          openDuration={250}
          customStyles={{
            container: {
              // justifyContent: 'center',
              // alignItems: 'center',
              padding: 10,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
          }}> */}
        <View
          style={{
            // justifyContent: 'center',
            // alignItems: 'center',
            padding: 10,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: height * 0.5,
            backgroundColor: "#fff",
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
            Login
          </Text>
          <View
            style={{
              borderBottomColor: "#f1f3f4",
              marginTop: 5,
              marginBottom: 20,
            }}
          />
          {/* <Controller
            control={control}
            name="mobileno"
            render={(
              { onChange, onBlur, value, name, ref },
              { invalid, isTouched, isDirty }
            ) => ( */}
          <View style={{ ...styles.textContainer, height: 55 }}>
            {/* <Icon style={styles.emailIcon} name="search" size={20} /> */}
            <View style={{}} title="Now">
              <FAIcon name="user" size={18} />
            </View>
            <TextInput
              value={getMobile}
              onChangeText={(text) => setMobile(text)}
              style={{
                ...styles.textStyleText,
                fontFamily: FontFamily.bold1,
              }}
              placeholderTextColor="#000"
              keyboardType={"number-pad"}
              placeholder="Mobile Number"
            />
            <View style={{}} title="Now">
              {/* <FAIcon name="eye" size={18} /> */}
            </View>
          </View>
          {/* )} */}
          {/* defaultValue=""
            rules={{
              required: { value: true, message: "Mobile Number is required" },
              minLength: { value: 10, message: "Number is to short" },
              maxLength: { value: 10, message: "Number is too long" },
              pattern: { value: /^[0-9]+/, message: "Input only numeric only" },
            }} */}
          {/* /> */}
          {/* <Text>{errors.mobileno && errors.mobileno.message}</Text> */}
          {/* <Controller
            control={control}
            name="password"
            render={(
              { onChange, onBlur, value, name, ref },
              { invalid, isTouched, isDirty }
            ) => ( */}
          <View style={{ ...styles.textContainer, height: 55 }}>
            {/* <Icon style={styles.emailIcon} name="search" size={20} /> */}
            <View style={{}} title="Now" style={{ marginLeft: 15 }}>
              <FAIcon name="lock" size={18} />
            </View>
            <TextInput
              secureTextEntry={true}
              style={{
                ...styles.textStyleText,
                fontFamily: FontFamily.bold1,
              }}
              // secureTextEntry={getPassword}
              value={getPassword}
              onChangeText={(t) => setPassword(t)}
              placeholderTextColor="#000"
              placeholder="Password"
            />
            <TouchableOpacity
              onPress={() => {
                setPassword(!getPassword);
              }}
            >
              <View style={{}} title="Now">
                <FAIcon name="eye" size={18} />
              </View>
            </TouchableOpacity>
          </View>
          {/* )}
            defaultValue=""
            rules={{
              required: { value: true, message: "Password is required" },
              minLength: {
                value: 8,
                message: "Minimum 8 character is required",
              },
            }}
          /> */}
          {/* <Text>{errors.password && errors.password.message}</Text> */}

          <View
            style={{ justifyContent: "center", alignItems: "center", top: 20 }}
          >
            <TouchableOpacity onPress={() => onSubmit()}>
              <LinearGradient
                colors={["#6633FF", "#FF0000"]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                style={[styles.LinearGradientStyle]}
              >
                <FAIcon name="arrow-right" size={30} color="#FFF" />
                <Text
                  style={{
                    ...styles.buttonText,
                    fontFamily: FontFamily.bold1,
                  }}
                >
                  {/* Login */}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
        {/* </RBSheet> */}
      </View>

      {/*  */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight,
  },
  HBoxes: {
    backgroundColor: "#FFF",
    width: width,
    height: 80,
    shadowColor: "#000",
    elevation: 8,
    padding: 10,
  },

  menuContainer: {
    flexDirection: "row",

    marginLeft: 15,
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
    backgroundColor: "#f1f3f4",
    width: width * 0.95,
    alignSelf: "center",
    borderRadius: 30,
  },

  emailIcon: {
    color: "#000",
  },
  textStyleText: {
    fontSize: 14,
    // fontWeight: 'bold',
    width: width * 0.75,
    marginLeft: 1,
    color: "#000",
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
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 80,
    paddingLeft: 0,
    paddingRight: 0,
    borderRadius: 40,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 14,
    color: "#fff",
  },
});
