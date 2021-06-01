import axios from "axios";
const GKey = "AIzaSyCeL-_o98r7DE5H-BxKAYTSupPnio4M3Rs";

const BaseURL = "http://164.52.195.173:2000";
const SocketURL = "http://164.52.195.173:2000";

/*----------Local Server------------ */

// const BaseURL = "http://122.168.199.205:3001";
// const SocketURL = "http://122.168.199.205:3001";

// const SocketURL = "http://192.168.1.52:3001";
// const BaseURL = "http://192.168.1.52:3001";

// const SocketURL = "http://192.168.1.32:3001";
// const BaseURL = "http://192.168.1.32:3001";

// const SocketURL = "http://192.168.43.162:3001";
// const BaseURL = "http://192.168.43.162:3001";

//const SocketURL='http://10.0.2.2:8002'

const postData = async (url, body) => {
  try {
    console.log(`${BaseURL}/${url}`);

    var response = await fetch(`${BaseURL}/${url}`, {
      method: "post",
      mode: "cors",
      body: JSON.stringify(body),
      headers: { "content-type": "application/json;charset=utf-8" },
    });
    var result = await response.json();
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const getData = async (url) => {
  try {
    var response = await fetch(`${BaseURL}/${url}`, {
      method: "GET",
      mode: "cors",
      headers: { "content-type": "application/json;charset=utf-8" },
    });
    var result = await response.json();
    return result;
  } catch (e) {
    return false;
  }
};

const postDataAndImage = async (url, formData, config) => {
  try {
    const response = await axios.post(`${BaseURL}/${url}`, formData, config);
    var result = response.data;
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const postDataAxios = async (url, body, token) => {
  try {
    const config = {
      "content-type": "application/json;charset=utf-8",
      Authorization: token,
    };
    var response = await axios.post(`${BaseURL}/${url}`, body, config);
    var result = response.data;
    return result;
  } catch (error) {
    return false;
  }
};

const getAccessToken = async () => {
  const config = {
    "content-type": "application/json;charset=utf-8",
  };
  // try {
  //   console.log('1');
  //   var response = await axios.post(
  //     'https://login.salesforce.com/services/oauth2/token?grant_type=refresh_token&refresh_token=5Aep861ZBQbtA4s3JVAmJKwL4uR.k_XkU8fb5kVl.qjZZzB_ovDJ8uyZzvRITSxAh_8pmiV5hx9GoCoWvfaAXPm&client_id=3MVG9n_HvETGhr3CYINmRTSNMQ_Yk1IXTVdXo7uHOyCGYwgyHbFtOC03KTvy2mutE.RLlKodHsfxXCXi7PY9z&client_secret=F312B823ACF33E232C1D4F064C4DF60D8C84AA0D6366EE19621E0CFC1D13DAE6&redirect_uri=https://login.salesforce.com',
  //     {},
  //     config,
  //   );
  //   console.log('2');
  //   var result = response.data;
  //   console.log({result});
  //   return result;
  // } catch (error) {
  //   console.log({error});
  //   return false;
  // }

  try {
    var response = await fetch(
      `https://login.salesforce.com/services/oauth2/token?grant_type=refresh_token&refresh_token=5Aep861ZBQbtA4s3JVAmJKwL4uR.k_XkU8fb5kVl.qjZZzB_ovDJ8uyZzvRITSxAh_8pmiV5hx9GoCoWvfaAXPm&client_id=3MVG9n_HvETGhr3CYINmRTSNMQ_Yk1IXTVdXo7uHOyCGYwgyHbFtOC03KTvy2mutE.RLlKodHsfxXCXi7PY9z&client_secret=F312B823ACF33E232C1D4F064C4DF60D8C84AA0D6366EE19621E0CFC1D13DAE6&redirect_uri=https://login.salesforce.com`,
      {
        method: "post",
        // mode: 'cors',
        body: JSON.stringify({}),
        headers: { "content-type": "application/json;charset=utf-8" },
      }
    );
    var result = await response.json();
    console.log({ result });
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export {
  getData,
  BaseURL,
  postData,
  SocketURL,
  GKey,
  postDataAndImage,
  postDataAxios,
  getAccessToken,
};
