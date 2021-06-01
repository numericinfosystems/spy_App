import { showMessage, hideMessage } from "react-native-flash-message";

const flash = (msg) => {
  showMessage({
    message: "Warning",
    description: msg,
    icon: "warning",
    statusBarHeight: 30,
  });
};

const flashSuccess = (msg) => {
  showMessage({
    message: "Sucess",
    description: msg,
    icon: "success",
    statusBarHeight: 30,
    type: "success",
  });
};

export { flash, flashSuccess };
