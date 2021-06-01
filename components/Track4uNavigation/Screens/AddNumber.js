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
const { width } = Dimensions.get("window");
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { Platform } from "react-native";
import { PermissionsAndroid } from "react-native";
import { Modal } from "react-native";
import { Button } from "react-native-paper";

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
    width: 100,
    height: 100,
    margin: 5,
    borderWidth: 1,
    borderColor: "#000",
  },
});

export default function AddNumber(props) {
  console.log("propsssssssssssssssssssssssssssssssssssssssss", props);
  var mobileno = props.route.params.number;

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <View>
        <Text>{Mobileno}</Text>
      </View>
      <View
        style={{
          ...styles.questionv,
          marginTop: 5,
          padding: 10,
          backgroundColor: "#fff",
        }}
      >
        <TextInput
          style={{ backgroundColor: "white" }}
          label="Name"
          placeholder="Name"
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
          style={{ marginTop: 5, backgroundColor: "white" }}
          label="Address"
          placeholder="Address"
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
          style={{ marginTop: 5, backgroundColor: "white" }}
          label="State"
          placeholder="State"
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
          style={{ marginTop: 5, backgroundColor: "white" }}
          label="City"
          placeholder="City"
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
          style={{ marginTop: 5, backgroundColor: "white" }}
          label="Firm Name"
          placeholder="Firm Name"
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
          style={{ marginTop: 5, backgroundColor: "white" }}
          label="Email Id"
          placeholder="Email Id"
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
          style={{ marginTop: 5, backgroundColor: "white" }}
          label="Description"
          placeholder="Description"
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
        style={{ justifyContent: "center", alignItems: "center", bottom: 0 }}
      >
        <TouchableOpacity
          onPress={() => {
            alert("Submit Record");
          }}
        >
          <LinearGradient
            colors={["#6633FF", "#3eb1f0"]}
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
