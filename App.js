import React, { useEffect, useRef, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";
import { Heartbeat, getBatteryLevel } from "./Heartbeat";
import { Provider } from "react-redux";
// import NoInternetConnectionUI from "./components/config/AppNetwork";
import NoInternetConnectionUI from "./components/Track4uNavigation/config/AppNetwork";
import { store } from "./components/Track4uNavigation/reducer/store";
import Main from "./components/Track4uNavigation/Main";
import { LogBox } from "react-native";
import FlashMessage from "react-native-flash-message";
// import MapView, { Marker } from "react-native-maps";
// import { PROVIDER_GOOGLE } from "react-native-maps";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  view: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "gray",
    padding: 10,
    margin: 10,
  },
  text: {
    fontSize: 20,
    color: "white",
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    // ...StyleSheet.absoluteFillObject,
    position: "absolute",
    left: 0,
    right: 0,
    top: 300,
    bottom: -700,
    marginTop: 300,
  },
});

const App = ({ mapData, heartBeat }) => {
  // console.log("🚀 ~ file: App.js ~ line 49 ~ App ~ heartBeat", heartBeat);
  // console.log("🚀 ~ file: App.js ~ line 59 ~ App ~ mapData", mapData);
  const [location, setLocation] = useState({
    latitude: 22.7196,
    longitude: 75.8577,
    latitudeDelta: 0.012,
    longitudeDelta: 0.01,
  });
  const mapRef = useRef(null);
  const imageSize = heartBeat ? 150 : 100;
  getBatteryLevel((batteryLevel) => {
    // console.log("batteryLevel--->", batteryLevel);
  });

  useEffect(() => {
    // Heartbeat.startService();
  }, []);

  LogBox.ignoreAllLogs(true);

  // useEffect(() => {
  //   console.log("useEffect");
  //   let region = {
  //     latitude: mapData.latitude,
  //     longitude: mapData.longitude,
  //     latitudeDelta: 0.012,
  //     longitudeDelta: 0.01,
  //   };
  //   setLocation(region);
  //   mapRef.current.animateToRegion(region, 500);
  // }, [mapData]);
  useLayoutEffect(() => {
    // console.log("useLayoutEffect");

    // alert('dfgd')
    if (mapRef.current) {
      let region = {
        latitude: mapData.latitude,
        longitude: mapData.longitude,
        latitudeDelta: 0.012,
        longitudeDelta: 0.01,
      };
      setLocation(region);
      mapRef.current.animateToRegion(region, 500);
      // getCurrentLatLong().then((result) => {
      //   // console.log('LOCATION:---', result);
      //   let region = {
      //     latitude: 22.7196,
      //     longitude: 75.8577,
      //     latitudeDelta: 0.012,
      //     longitudeDelta: 0.01,
      //   };
      //   setLocation(region);
      //   mapRef.current.animateToRegion(region, 500);
      // });
    }
    return () => {};
  }, [mapData]);
  const origin = { latitude: 22.7196, longitude: 75.8577 };
  const destination = { latitude: 21.6417, longitude: 69.6293 };
  return (
    // <View style={styles.container}>
    //   <View style={styles.view}>
    //     {/* <Image
    //       source={heart}
    //       style={{ width: imageSize, height: imageSize }}
    //       resizeMode="contain"
    //     /> */}
    //   </View>
    //   <View style={styles.view}>
    //     <TouchableOpacity
    //       style={styles.button}
    //       onPress={() => Heartbeat.startService()}
    //     >
    //       <Text style={styles.instructions}>Start</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       style={styles.button}
    //       onPress={() => Heartbeat.stopService()}
    //     >
    //       <Text style={styles.instructions}>Stop</Text>
    //     </TouchableOpacity>
    //   </View>
    //   <View style={styles.container}>
    //     <MapView
    //       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
    //       style={styles.map}
    //       ref={mapRef}
    //       // region={location}
    //       // showsUserLocation={true}
    //     >
    //       <Marker
    //         draggable={false}
    //         coordinate={{
    //           latitude: location.latitude ? location.latitude : 21.6417,
    //           longitude: location.longitude ? location.longitude : 69.6293,
    //         }}
    //         title={"Strings.franchiseAddress"}
    //         description={"XXXXXX XXXXXX XXXXXX"}
    //       >
    //         {/* <Image
    //           source={Images.ic_marker_icon}
    //           style={styles.markerImage}
    //           resizeMode="contain"
    //         /> */}
    //       </Marker>
    //     </MapView>
    //   </View>
    //   {/* <MapView
    //     ref={mapRef}
    //     style={{ flex: 1 }}
    //     //  initialRegion={origin}
    //     // provider={PROVIDER_GOOGLE}
    //     showsUserLocation={true}
    //   > */}
    //   {/* <Marker
    //       draggable={false}
    //       coordinate={origin}
    //       title={"Strings.franchiseAddress"}
    //       description={"XXXXXX XXXXXX XXXXXX"}
    //     >
    //       <Image
    //         source={Images.ic_marker_icon}
    //         style={{width: 40, height: 40}}
    //         resizeMode="contain"
    //       />
    //     </Marker> */}
    //   {/* <Marker
    //       draggable={false}
    //       coordinate={destination}
    //       title={"Strings.franchiseAddress"}
    //       description={"XXXXXX XXXXXX XXXXXX"}
    //     >
    //       <Image
    //         source={Images.ic_marker_icon}
    //         style={{width: 40, height: 40}}
    //         resizeMode="contain"
    //       />
    //     </Marker> */}
    //   {/* </MapView> */}
    // </View>

    <Provider store={store}>
      <Main />
      <FlashMessage position="top" />
      <NoInternetConnectionUI />
    </Provider>
  );
};

const mapStateToProps = (store) => ({
  heartBeat: store.App.heartBeat,
  mapData: store.Map.mapData,
});

export default connect(mapStateToProps)(App);
