// import {SocketURL} from './components/FecthServerServices';

var DeviceInfo = require("react-native-device-info");

// var socket = require("socket.io-client")("http://122.168.199.205:3000");
var socket = require("socket.io-client")("http://164.52.195.173:2000");

export const createMessage = async (
  latitude,
  longitude,
  employeeid,
  vendorid
) => {
  const blevel = await DeviceInfo.getBatteryLevel();
  // console.log({ blevel });

  let message = {
    position: { latitude: latitude, longitude: longitude },
    date: `${new Date()}`,
    battery: blevel * 100,
  };
  const data = {
    latitude: message.position.latitude,
    longitude: message.position.longitude,
    date: message.date,
    time: message.date,
    battery: message.battery,
    employee_id: employeeid,
    vendor_id: vendorid,
  };
  // console.log("===========", data);
  socket.emit("message", data);
};
