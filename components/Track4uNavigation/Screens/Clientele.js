import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FontFamily } from "../config/FontFamily";

import {
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image,
  StatusBar,
  SafeAreaView,
  Button,
  View,
  FlatList,
  StyleSheet,
  Text,
  Alert,
  ScrollView,
  TextInput,
  Animated,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import FAIcon from "react-native-vector-icons/FontAwesome";
import { getData } from "../FecthServerServices";
import EIcon from "react-native-vector-icons/Entypo";
import Aicon from "react-native-vector-icons/AntDesign";
import Micon from "react-native-vector-icons/MaterialIcons";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
// import {TextInput, List} from 'react-native-paper';
import SegmentedControlTab from "react-native-segmented-control-tab";
//import { FontFamily } from "./config/FontFamily";
import LinearGradient from "react-native-linear-gradient";
// import ActionButton from 'react-native-circular-action-menu';
//import ActionButton from "react-native-action-button";
// import {SocialIcon} from 'react-native-elements';
const { width, height } = Dimensions.get("window");
//const BannerWidth = Dimensions.get('window').width;
//const BannerHeight = 260;

const Horidata = [
  {
    hname: "Vikram Diwakar",
    pic: require("../../images/1.png"),
    kd: "Web & App Designer",
    mobileno: "8770206043",
  },
  {
    hname: "Vicky",
    pic: require("../../images/1.png"),
    kd: "UI Developer",
    mobileno: "9039649917",
  },
  {
    hname: "Vikram Diwakar",
    pic: require("../../images/1.png"),
    kd: "Web & App Designer",
    mobileno: "9933775522",
  },
  {
    hname: "Vicky",
    pic: require("../../images/1.png"),
    kd: "UI Developer",
    mobileno: "8770206043",
  },
  {
    hname: "Deepak Singh",
    pic: require("../../images/1.png"),
    kd: "Full Stack Developer",
    mobileno: "9911003377",
  },
  {
    hname: "Vishakha",
    pic: require("../../images/1.png"),
    kd: "Human Resource",
    mobileno: "8770206043",
  },
  {
    hname: "Sandhya",
    pic: require("../../images/1.png"),
    kd: "HR Manager",
    mobileno: "7788990077",
  },
  {
    hname: "Vikas Singh",
    pic: require("../../images/1.png"),
    kd: "Jr. Developer",
    mobileno: "0987654321",
  },
  {
    hname: "Krishna",
    pic: require("../../images/1.png"),
    kd: "Software Testing",
    mobileno: "1234567890",
  },
  {
    hname: "Deepak Kumar Singh",
    pic: require("../../images/1.png"),
    kd: "Sr. Developer",
    mobileno: "9039649917",
  },
];

function HorizontalList({ item }) {
  return (
    <View style={styles.item2}>
      <ImageBackground
        resizeMode={"cover"}
        source={require("../../images/bgbgred.png")}
        style={{
          flex: 1,
          // justifyContent: 'center',
          width: width * 0.97,
          // height: 80,
          padding: 0,
          justifyContent: "space-between",
          overflow: "hidden",
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              // justifyContent: 'space-between',
              // alignItems: 'center',
              // alignSelf: 'center',

              marginTop: 0,
              padding: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                // alignSelf: 'center',
              }}
            >
              <View>
                <Image
                  source={require("../../images/1.png")}
                  style={{
                    width: 60,
                    height: 60,
                    // marginLeft: 20,
                    // marginTop: 10,
                  }}
                  resizeMode={"contain"}
                />
              </View>

              <View
                style={{
                  width: width * 0.4,
                  // justifyContent: 'center',
                  // alignItems: 'center',
                  alignSelf: "center",
                }}
              >
                <View style={{ top: 0 }}>
                  <Text
                    style={{
                      color: "#e71a23",
                      fontSize: 13,
                      fontWeight: "bold",
                    }}
                  >
                    {item.clientname}
                  </Text>
                  <Text style={{ color: "#000", fontSize: 12 }}>
                    {item.firmname}
                  </Text>
                  <Text style={{ color: "#000", fontSize: 12 }}>
                    {item.mobileno}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  // width: width * 0.2,
                  // justifyContent: 'center',
                  // alignItems: 'center',
                  alignSelf: "center",
                }}
              >
                {/* <TouchableOpacity onPress={() => refRBSheet.current.open()}> */}
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(`tel:${item.mobileno}`);
                  }}
                >
                  <View
                    style={{
                      //   backgroundColor: '#FFF',
                      width: 28,
                      height: 28,
                      borderRadius: 30,
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                      // marginLeft: 30,
                    }}
                  >
                    <MCIcon
                      name="phone"
                      size={35}
                      style={{ color: "#e71a23" }}
                    />
                  </View>
                </TouchableOpacity>
                {/* <View
                    style={{
                      backgroundColor: '#505546',
                      width: 70,
                      height: 20,
                      borderRadius: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      // marginLeft: 30,
                      top: 1,
                    }}>
                    <Text
                      style={{fontSize: 10, color: '#FFF', fontWeight: 'bold'}}>
                      Package
                    </Text>
                  </View> */}
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
  item2: {
    width: width * 0.97,
    // padding: 10,
    borderRadius: 10,
    // borderColor: '#222f3e',
    borderColor: "#d3d3d3",
    elevation: 5,
    marginBottom: 8,
    borderWidth: 1,
    // height: 80,
    alignSelf: "center",
    backgroundColor: "white",
    overflow: "hidden",
  },
  item: {
    flex: 1,
    overflow: "hidden",
    // marginBottom: 0,
    borderRadius: 10,
    margin: 8,
    width: width * 0.8,
    // flexDirection: 'row',
    backgroundColor: "#FFF",
    // elevation: 2,
    // padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    // borderWidth: 0.5,
    // borderRadius: 10,
    // borderColor: '#666',
    elevation: 5,
    height: height * 0.17,
  },
  imagestyle: {
    borderRadius: 5,
    width: 32,
    height: 32,
    // resizeMode: 'center',
    // backgroundColor: 'red',
  },
  backgroundFlat: {
    // flex: 1,
    // justifyContent: 'center',
    // width: width * 0.92,
    // height: height * 1.1,
    height: height * 0.11,
    borderRadius: 10,
  },
  headStyle: {
    marginBottom: 5,
    flex: 1,
  },

  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginHorizontal: 16,
  },
  textContainer: {
    flexDirection: "row",
    // marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e71a23",
    width: width * 0.93,
    alignSelf: "center",
    borderRadius: 50,
  },
  minisearch: {
    // flexDirection: 'row',
    // marginBottom: 5,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#FFF',
    // width: width * 0.4,
    // alignSelf: 'center',
    borderRadius: 50,
    marginTop: 15,
    height: 35,
    marginLeft: 20,
  },
  minitextStyleText: {
    // fontSize: 12,
    // fontWeight: 'bold',
    width: width * 0.3,
    color: "#e71a23",
  },
  emailIcon: {
    color: "#e71a23",
  },
  textStyleText: {
    fontSize: 14,
    // fontWeight: 'bold',
    width: width * 0.75,
    marginLeft: 1,
    color: "#FFF",
  },

  LinearGradientStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    // width: width * 0.45,
    // borderBottomRightRadius: 15,
    // borderTopLeftRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    // shadowOffset: {
    //   width: width * 0.6,
    //   height: 60,
    // },
  },
  tag: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.45,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 10,

    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: width * 0.6,
      height: 60,
    },
  },
  buttonText: {
    fontSize: 14,
    textAlign: "center",
    color: "#e71a23",
    backgroundColor: "transparent",
    //fontFamily: FontFamily.bold1,
  },
  minisearch1: {
    flexDirection: "row",
    // marginBottom: 5,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#FFF",
    width: width * 0.89,
    // alignSelf: 'center',
    borderRadius: 50,
    // marginTop: 15,
    height: 36,
    borderColor: "#d3d3d3",
    borderWidth: 0.7,
  },
  minitextStyleText1: {
    // fontSize: 12,
    // fontWeight: 'bold',
    width: width * 0.8,
    // height: 32,
    // marginLeft: 1,
    color: "#535353",
  },
  emailIcon1: {
    color: "#535353",
    alignSelf: "center",
  },
  title: {
    fontSize: 13,
    // fontFamily: FontFamily.regular1,
    color: "#666",
    textAlign: "left",
  },
  descStyle: {
    fontSize: 14,
    width: width * 0.5,
    color: "#000",
    // fontFamily: FontFamily.regular1,
  },
  head: {
    height: 40,
    backgroundColor: "#f1f8ff",
    fontSize: 20,
    // fontFamily: FontFamily.regular,
  },

  backgroundImage: {
    flex: 1,
    // justifyContent: 'center',
    width: width,
    height: height * 1.1,
  },
});

export default function Clientele(props) {
  var userData = useSelector((state) => state.userData);
  var user = Object.values(userData)[0];

  const [getList, setList] = useState([]);
  const [getTempList, setTempList] = useState([]);
  const [getsearchtext, setsearchtext] = useState("");
  // const [getTempData, setTempData] = useState('')

  useEffect(() => {
    fetchClient();
  }, []);

  const fetchClient = async () => {
    var result = await getData(`client/searchByVenderId/${user.vendorid}`);
    console.log(user.vendorid + ",", result.data);
    setList(result.data);
    setTempList(result.data);
  };

  const handleSearch = (txt) => {
    var arr = [];
    getTempList.map((item) => {
      if (
        item.clientname.toLowerCase().includes(txt.toLowerCase()) ||
        item.mobileno.toLowerCase().includes(txt.toLowerCase()) ||
        item.firmname.toLowerCase().includes(txt.toLowerCase())
      ) {
        arr.push(item);
      }
      setList(arr);
    });
    // setTempData(arr);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* <ImageBackground
        source={require('/../../images/back.jpg')}
        style={styles.backgroundImage}> */}
      <View style={[styles.container]}>
        <StatusBar translucent backgroundColor="transparent" />
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
              {/* <Text
                style={{
                  alignSelf: "center",
                  marginLeft: 10,
                  color: "#FFF",
                  fontSize: 23,
                  fontFamily: FontFamily.bold1,
                }}
              >
                Leave List
              </Text> */}
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
      <View style={[styles.container]}>
        <View style={{ marginVertical: 5 }} />
        <View
          style={{
            width: width * 0.9,
            alignSelf: "center",
            marginTop: 5,
          }}
        >
          <Text
            style={{
              color: "#333",
              fontSize: 16,
              fontWeight: "bold",
              alignSelf: "center",
            }}
          >
            Client List
          </Text>
          <Image
            source={require("../../images/border.png")}
            style={[
              {
                width: "100%",
                height: 10,
                resizeMode: "center",
              },
            ]}
          />
        </View>
        <View style={{ marginVertical: 5 }} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignSelf: "center",
            // alignItems: 'center',
            // bottom: 10,
          }}
        >
          <View>
            <View style={{ width: width * 0.8 }}>
              <View style={styles.minisearch1}>
                <Icon
                  style={{ ...styles.emailIcon1 }}
                  name="search"
                  size={15}
                />
                <TextInput
                  onChangeText={(text) => {
                    setsearchtext(text);
                    handleSearch(text);
                  }}
                  style={{
                    ...styles.minitextStyleText1,
                    //fontFamily: FontFamily.regular,
                    fontSize: 12,
                  }}
                  placeholderTextColor="#535353"
                  placeholder="Search"
                />
              </View>
            </View>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View duration={500} animation="slideInLeft">
          <View>
            <View style={{ paddingTop: 10 }}>
              {/* <ScrollView showsVerticalScrollIndicator={false}> */}
              <FlatList
                data={getList}
                renderItem={({ item }) => <HorizontalList item={item} />}
                keyExtractor={(item) => item.id}
              />
              {/* </ScrollView> */}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* </View> */}
      {/* </ImageBackground> */}
    </View>
  );
}
