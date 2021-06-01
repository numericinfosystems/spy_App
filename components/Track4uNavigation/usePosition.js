import {useState, useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid} from 'react-native';
//import BackgroundTimer from 'react-native-background-timer';
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
export const usePosition = () => {
  const [position, setPosition] = useState({
    latitude: 26.2163,
    longitude: 78.2022,
    angle: 0,
  });
  const [error, setError] = useState(null);
  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Example App',
          message: 'Example App access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //console.log('You can use the location');
        // //alert("You can use the location");
      } else {
        //console.log('location permission denied');
        //alert('Location permission denied');
      }
    } catch (err) {
      //console.warn(err);
    }
  }

  const getPosition = () => {
    Geolocation.getCurrentPosition(
      (pos) => {
        setError('');
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          angle: 0,
        });
      },
      (e) => setError(e.message),
      options,
    );
  };

  /*BackgroundTimer.runBackgroundTimer(() => {
    getPosition();
    ////console.log(position);
  }, 3000);
*/
  const onChange = ({coords}) => {
    //alert(coords.latitude + ',' + coords.longitude);
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
      angle: coords.heading,
    });
  };
  const onError = (error) => {
    setError(error.message);
  };

  useEffect(() => {
    requestLocationPermission();
    // watcher = Geolocation.watchPosition(onChange, onError);
    //return () => Geolocation.clearWatch(watcher);
  }, []);
  return {...position, error};
};
