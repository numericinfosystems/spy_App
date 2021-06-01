import { NETWORK, USER_DATA } from "./types";

const initialState = {
  userData: {},
  network: true,
  productData: {},
  productReturnData: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA: {
      // console.log('CONSOLE USERDATA,,,', action.payload);
      state.userData[action.payload[0]] = action.payload[1];
      return { ...state, userData: state.userData };
    }
    case NETWORK: {
      // console.log(action.payload);
      state.network = action.payload;
      return { ...state, network: state.network };
    }

    case "ADD_PRODUCT": {
      // console.log("CONSOLE USERDATA,,,", action.payload);
      state.productData[action.payload[0]] = action.payload[1];
      return { ...state, productData: state.productData };
    }

    case "DELETE_PRODUCT": {
      console.log("========>>>>>>>>>>>", action.payload[0]);
      delete state.productData[action.payload[0]];
      return { ...state, productData: state.productData };
    }

    case "ADD_PRODUCT_RETURN": {
      state.productReturnData[action.payload[0]] = action.payload[1];
      console.log("========>>>>>>>>>>>*********", state.productReturnData);
      return { ...state, productRetrunData: state.productReturnData };
    }

    // case ADD_PRODUCT: {
    // console.log('CONSOLE USERDATA,,,', action.payload);
    // state.productData[action.payload[0]] = action.payload[1];
    // return {productData: state.productData};
    // }

    default:
      return state;
  }
};

export default rootReducer;
