import NetInfo from "@react-native-community/netinfo";
import React, { useEffect, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  Linking,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { store } from "../reducer/store";
import { NETWORK } from "../reducer/types";
const { width, height } = Dimensions.get("window");
const deviceWidth = width < height ? width : height;
const deviceHeight = width < height ? height : width;
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
let unsubscribe = "";

export default function NoInternetConnectionUI() {
  let [isConnected, closeModal] = useState(false);
  let [animation] = useState(new Animated.Value(0));

  const dispatch = useDispatch();

  useEffect(() => {
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("(((((((((((((((((((");
    Animated.timing(animation, {
      toValue: isConnected ? 1 : 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [isConnected]);

  const slideUp = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [1 * 900, -1 * 0],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  useEffect(() => {
    unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        // Constants.NETWORK_CHECK = true;
        dispatch({ type: NETWORK, payload: true });
        closeModal(false);
      } else {
        // Constants.NETWORK_CHECK = false;
        dispatch({ type: NETWORK, payload: false });
        closeModal(true);
      }
    });
  }, []);

  return (
    <Animated.View style={[styles.mainContainer, slideUp]}>
      <Text allowFontScaling={false} style={styles.offlineTextStyle}>
        {"Please check your internet connectivity"}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#fbfbf6",
    width: width,
    height: screenHeight,
    padding: deviceWidth / 30,
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    alignItems: "center",
  },
  offlineTextStyle: {
    // color: '#fff',
    fontSize: 16,
    fontFamily: "Lato-Regular",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
  },
});
