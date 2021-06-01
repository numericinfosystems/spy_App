//var axios=require("axios")
const ServerURL = "http://10.0.2.2:5000";
//to read all data from node

const accessToken = async () => {
  try {
    const response = await fetch(
      `https://login.salesforce.com/services/oauth2/token?grant_type=refresh_token&client_id=3MVG9n_HvETGhr3AszZ6xT9Enw1D_aRo7NGbHhjVt5XLhYfcnJaz6uUC0cFCnKxRkoipWZI9n2F8.2VMuWNeo&client_secret=627530A1586C6847087D235E62555BAFF76D407C71B2CD275BC5C7850CECEDE7&refresh_token=5Aep861ZBQbtA4s3JWOinNYBp8KtAsDpcmn3EDjMF2qmz8e_StR18QjKJUprzZGfF0jeqpB8WJjunktl6.0XQTL`,
      {
        method: "GET",
        mode: "cors",
         headers: { "Content-Type": "application/json;charset=utf-8" },
      }
    );
    const result = await response.json();
    //const result=await response.json()
    console.error("TOKKKKKE", result.access_token);
    return result.access_token;
  } catch (e) {
    console.log("ERRRRRRor", e);
    return null;
  }
};

const getData = async (url) => {
  try {
    const response = await fetch(`${ServerURL}/${url}`);
    const result = await response.json();

    if (result == "Session Expired Pls Login Again") {
      alert(result);
      return [];
    } else {
      return result;
    }
  } catch (e) {
    console.log(e);

    return null;
  }
};

const postData = async (url, body) => {
  try {
    const response = await fetch(`${ServerURL}/${url}`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    if (result == "Session Expired Pls Login Again") {
      alert(result);
      return [];
    } else {
      //const result=await response.json()
      return result;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};
/*
const postDataAndImage=async(url,formData,config)=>{
    try{
       var response=await axios.post(`${ServerURL}/${url}`,formData,config)
       if(response.data=='Session Expired Pls Login Again') 
      { alert(response.data)
       return(false)
      }
      else{
      
       const result=await response.data.RESULT 
       return (result)
      }
    }
    catch(e){
      
      return null
    }}
*/

const postDataForSF = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      // mode: 'cors',
      headers: {
        Authorization: `Bearer ${await accessToken()}`,

        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    //console.log(result);

    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const getDataForSF = async (url) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      // mode: 'cors',
      headers: {
        Authorization: `Bearer ${await accessToken()}`,

        "Content-Type": "application/json;charset=utf-8",
      },
    });
    const result = await response.json();
    //console.log(result);

    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export { getData, postData, ServerURL, postDataForSF, getDataForSF };
