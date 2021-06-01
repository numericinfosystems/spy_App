import AsyncStorage from "@react-native-community/async-storage";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StatusBar,
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Easing,
} from "react-native";
import { store } from "../reducer/store";
import { USER_DATA } from "../reducer/types";

const { width, height } = Dimensions.get("window");

export default function Splash(props) {
  const [animationValue, setanimationValue] = useState(new Animated.Value(0));

  startAnimation = () => {
    Animated.timing(animationValue, {
      toValue: 30,
      duration: 2000,
      easing: Easing.bounce,
      easing: Easing.back(5),
      easing: Easing.elastic(7),
      // easing: Easing.bezier(0.17, 1.5, 0.63, 0.15),
      // easing : Easing.ease(20)
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    setTimeout(() => {
      startAnimation();
    }, 500);
    readData();
  }, []);

  const readData = async () => {
    try {
      const data = await AsyncStorage.getItem("LOGINKEY");
      if (data != null) {
        const jsonData = JSON.parse(data);
        store.dispatch({
          type: USER_DATA,
          payload: [jsonData.mobileno, jsonData],
        });
        props.navigation.replace("RootNavigator");
      } else {
        props.navigation.replace("Login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const animatedStyle = {
    transform: [{ translateY: animationValue }],
  };
  return (
    <View style={styles.MainContainer}>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      <TouchableWithoutFeedback onPress={this.startAnimation}>
        <Animated.View style={[styles.animatedBox, animatedStyle]}>
          <Image
            source={require("../../images/licon1.png")}
            style={{
              width: width * 2,
              height: 50,
            }}
            resizeMode={"contain"}
          />
          <Image
            source={require("../../images/91logo.png")}
            style={{
              width: width * 2,
              height: 100,
            }}
            resizeMode={"contain"}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
    // <View style={styles.container}>
    //   <StatusBar barStyle="light-content" backgroundColor="#fff" />
    //   <Image source={require('../unoloimg/logoplus91.png')} />
    //   <TouchableWithoutFeedback onPress={this.startAnimation}>
    //     <Animated.View
    //       style={[styles.animatedBox, animatedStyle]}></Animated.View>
    //   </TouchableWithoutFeedback>
    // </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  },
  animatedBox: {
    // backgroundColor: '#0091EA',
  },
});
