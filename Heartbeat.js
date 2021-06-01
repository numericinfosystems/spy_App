import { NativeModules } from "react-native";

export const { Heartbeat } = NativeModules;

export const getBatteryLevel = (callback) => {
  NativeModules.BatteryStatus.getBatteryStatus(callback);
};
