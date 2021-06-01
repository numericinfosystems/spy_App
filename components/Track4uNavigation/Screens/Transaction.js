import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  TextInput,
  Dimensions,
  Alert,
  Button,
  SafeAreaView,
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
  TouchableHighlight,
  Text,
  Image,
  ScrollView,
} from 'react-native';
// import SegmentedControlTab from 'react-native-segmented-control-tab';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialIcons';
const {width, height} = Dimensions.get('window');
import {useSelector, useDispatch} from 'react-redux';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {FontFamily} from '../config/FontFamily';
import {Picker} from '@react-native-picker/picker';
import {getData, postData} from '../FecthServerServices';
import {Linking} from 'react-native';

export default function Transaction() {
  return (
    <>
      <View
        style={{
          // justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          flex: 1,
        }}>
        <Image
          source={require('../../images/licon1.png')}
          style={{
            width: width,
            height: 20,
            marginTop: '2%',
          }}
          resizeMode={'center'}
        />
        <Image
          source={require('../../images/91logo.png')}
          style={{
            width: width,
            height: 50,
          }}
          resizeMode={'center'}
        />
        <View
          style={{
            width: width * 0.9,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Transaction</Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}></View>
      </View>
    </>
  );
}
