import {
  AppRegistry,
  NativeModules,
  PermissionsAndroid,
  Platform,
} from "react-native";
import React from "react";
import { Provider } from "react-redux";
import App from "./App";
import { name as appName } from "./app.json";
import { setHeartBeat, store, setLatLong } from "./store";
import LocationError from "./LocationError";
import AsyncStorage from "@react-native-community/async-storage";
import { createMessage } from "./BackgroundSocket";
import { useSelector } from "react-redux";
const { OS } = Platform;
const MyHeadlessTask = async () => {
  // console.log("Receiving HeartBeat!");
  // store.dispatch(setHeartBeat(true));
  // setTimeout(() => {
  //   store.dispatch(setHeartBeat(false));
  // }, 1000);
  try {
    const data = await AsyncStorage.getItem("LOGINKEY");
    const jsonData = JSON.parse(data);
    var emp_id = jsonData.employeeid;
    var vendorid = jsonData.vendorid;
  } catch (e) {
    console.log(e);
  }
  getCurrentPositions({
    enableHighAccuracy: true,
    timeout: 15000,
  })
    .then((location) => {
      store.dispatch(setLatLong(location));
      // alert(JSON.stringify(location));
      // console.log(
      //   "==============================>",
      //   location.latitude,
      //   location.longitude,
      //   `${emp_id}`,
      //   `${vendorid}`
      // );

      // createMessage(location.latitude, location.longitude, 1, 2);
      createMessage(
        location.latitude,
        location.longitude,
        `${emp_id}`,
        `${vendorid}`
      );
    })
    .catch((error) => {
      const { code, message } = error;
      // console.warn(code, message);
    });
};
const { ReactNativeGetLocation } = NativeModules;
// console.log("🚀 ~ file: index.js ~ line 17 ~ NativeModules", NativeModules);

async function requestAndroidPermission(enableHighAccuracy = false) {
  const { PERMISSIONS, RESULTS } = PermissionsAndroid;
  const granted = await PermissionsAndroid.request(
    enableHighAccuracy
      ? PERMISSIONS.ACCESS_FINE_LOCATION
      : PERMISSIONS.ACCESS_COARSE_LOCATION
  );
  if (granted !== RESULTS.GRANTED) {
    throw new LocationError("UNAUTHORIZED", "Authorization denied");
  }
  return true;
}
async function getCurrentPositions(
  options = {
    enableHighAccuracy: false,
    timeout: 0,
  }
) {
  if (OS === "android") {
    await requestAndroidPermission(options.enableHighAccuracy);
  }
  try {
    const location = await ReactNativeGetLocation.getCurrentPosition(options);
    return location;
  } catch (error) {
    const { code, message } = error;
    const locationError = new LocationError(code, message);
    locationError.stack = error.stack;
    throw locationError;
  }
}

// console.log(
//   "🚀 ~ file: App.js ~ line 42 ~ ReactNativeGetLocation",
//   ReactNativeGetLocation
// );
const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerHeadlessTask("Heartbeat", () => MyHeadlessTask);
AppRegistry.registerComponent(appName, () => RNRedux);
