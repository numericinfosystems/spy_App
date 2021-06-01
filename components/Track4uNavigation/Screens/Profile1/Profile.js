import React, { Component } from "react";
import { Card, Icon } from "react-native-elements";
import {
  FlatList,
  Image,
  ImageBackground,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "react-native";
import { useSelector } from "react-redux";
import { BaseURL } from "../../FecthServerServices";

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFF",
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 45,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: "transparent",
    ...Platform.select({
      ios: {
        alignItems: "center",
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: "center",
      },
    }),
  },
  placeIcon: {
    color: "white",
    fontSize: 26,
  },
  scroll: {
    backgroundColor: "#FFF",
  },
  telContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  userCityRow: {
    backgroundColor: "transparent",
  },
  userCityText: {
    color: "#000",
    // color: "#A5A5A5",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  userImage: {
    borderColor: "#FFF",
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
    marginTop: StatusBar.currentHeight,
  },
  userNameText: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
    paddingBottom: 8,
    textAlign: "center",
  },
});

const stylesTel = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 25,
  },
  iconRow: {
    flex: 2,
    justifyContent: "center",
  },
  smsIcon: {
    color: "darkgray",
    fontSize: 30,
  },
  smsRow: {
    flex: 2,
    justifyContent: "flex-start",
  },
  telIcon: {
    color: "gray",
    fontSize: 30,
  },
  telNameColumn: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  telNameText: {
    color: "gray",
    fontSize: 14,
    fontWeight: "200",
  },
  telNumberColumn: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 5,
  },
  telNumberText: {
    fontSize: 16,
  },
  telRow: {
    flex: 6,
    flexDirection: "column",
    justifyContent: "center",
  },
});

const stylesSep = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  separatorOffset: {
    flex: 2,
    flexDirection: "row",
  },
  separator: {
    borderColor: "#EDEDED",
    borderWidth: 0.8,
    flex: 8,
    flexDirection: "row",
  },
});

const stylesEmail = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 25,
  },
  emailColumn: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 5,
  },
  emailIcon: {
    color: "gray",
    fontSize: 30,
  },
  emailNameColumn: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  emailNameText: {
    color: "gray",
    fontSize: 14,
    fontWeight: "200",
  },
  emailRow: {
    flex: 8,
    flexDirection: "column",
    justifyContent: "center",
  },
  emailText: {
    fontSize: 16,
  },
  iconRow: {
    flex: 2,
    justifyContent: "center",
  },
});

export default function Profile(props) {
  var userData = useSelector((state) => state.userData);
  var user = Object.values(userData)[0];
  console.log("VendorName", user);
  const onPressPlace = () => {
    console.log("place");
  };

  const onPressTel = (number) => {
    Linking.openURL(`tel://${number}`).catch((err) =>
      console.log("Error:", err)
    );
  };

  const onPressSms = () => {
    console.log("sms");
  };

  const onPressEmail = (email) => {
    Linking.openURL(`mailto://${email}?subject=subject&body=body`).catch(
      (err) => console.log("Error:", err)
    );
  };

  const renderHeader = () => {
    const {
      avatar,
      avatarBackground,
      name,
      // address: { city, country },
    } = props;

    return (
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={{
            uri: `${BaseURL}/images/${user.photograph}`,
            // "https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg",
          }}
        >
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={{ uri: `${BaseURL}/images/${user.photograph}` }}
            />
            <Text style={styles.userNameText}>{user.employeename}</Text>
            <View style={styles.userAddressRow}>
              <View>
                <Icon
                  name="place"
                  underlayColor="transparent"
                  iconStyle={styles.placeIcon}
                  // onPress={onPressPlace}
                />
              </View>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
                  {user.address}, {user.city}, {user.state}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  const renderVendor = () => {
    return (
      <TouchableOpacity style={styles.emailContainer}>
        <View style={[stylesEmail.container]}>
          <View style={stylesEmail.iconRow}>
            <Icon
              name="people-alt"
              underlayColor="transparent"
              iconStyle={stylesEmail.emailIcon}
              // onPress={() => onPressEmail()}
            />
          </View>
          <View style={stylesEmail.emailRow}>
            <View style={stylesEmail.emailColumn}>
              <Text style={stylesEmail.emailText}>{user.vendorname}</Text>
            </View>
            <View style={stylesTel.telNameColumn}>
              <Text style={stylesTel.telNameText}>{"Manager"}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderDesignation = () => {
    return (
      <TouchableOpacity style={styles.emailContainer}>
        <View style={[stylesEmail.container]}>
          <View style={stylesEmail.iconRow}>
            <Icon
              name="people-alt"
              underlayColor="transparent"
              iconStyle={stylesEmail.emailIcon}
              // onPress={() => onPressEmail()}
            />
          </View>
          <View style={stylesEmail.emailRow}>
            <View style={stylesEmail.emailColumn}>
              <Text style={stylesEmail.emailText}>{user.designation}</Text>
            </View>
            <View style={stylesTel.telNameColumn}>
              <Text style={stylesTel.telNameText}>{"Designation"}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderTel = () => {
    // <FlatList
    //   contentContainerStyle={styles.telContainer}
    //   data={props.tels}
    //   renderItem={(list) => {
    //     const { id, name, number } = list.item;

    return (
      <TouchableOpacity style={styles.telContainer}>
        <View style={[stylesTel.container]}>
          <View style={stylesTel.iconRow}>
            <Icon
              name="call"
              underlayColor="transparent"
              iconStyle={stylesTel.telIcon}
              onPress={() => onPressTel(user.mobileno)}
            />
          </View>
          <View style={stylesTel.telRow}>
            <View style={stylesTel.telNumberColumn}>
              <Text style={stylesTel.telNumberText}>{user.mobileno}</Text>
            </View>
            <View style={stylesTel.telNameColumn}>
              <Text style={stylesTel.telNameText}>{"Personal"}</Text>
            </View>
          </View>
          <View style={stylesTel.smsRow}>
            <Icon
              name="textsms"
              underlayColor="transparent"
              iconStyle={stylesTel.smsIcon}
              // onPress={() => onPressSms()}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmail = () => {
    return (
      <TouchableOpacity style={styles.emailContainer}>
        <View style={[stylesEmail.container]}>
          <View style={stylesEmail.iconRow}>
            <Icon
              name="email"
              underlayColor="transparent"
              iconStyle={stylesEmail.emailIcon}
              onPress={() => onPressEmail()}
            />
          </View>
          <View style={stylesEmail.emailRow}>
            <View style={stylesEmail.emailColumn}>
              <Text style={stylesEmail.emailText}>{user.email}</Text>
            </View>
            <View style={stylesEmail.emailNameColumn}>
              <Text style={stylesEmail.emailNameText}>{"Email id"}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.scroll}>
      {/* <StatusBar translucent backgroundColor={"transparent"} /> */}
      {/* <StatusBar translucent backgroundColor="#8B0000" /> */}
      <StatusBar translucent backgroundColor="#b5005d" />

      <View style={styles.container}>
        <Card containerStyle={styles.cardContainer}>
          {renderHeader()}
          {renderVendor()}
          <View style={stylesSep.container}>
            <View style={stylesSep.separatorOffset} />
            <View style={stylesSep.separator} />
          </View>
          {renderDesignation()}
          <View style={stylesSep.container}>
            <View style={stylesSep.separatorOffset} />
            <View style={stylesSep.separator} />
          </View>
          {renderTel()}
          <View style={stylesSep.container}>
            <View style={stylesSep.separatorOffset} />
            <View style={stylesSep.separator} />
          </View>
          {renderEmail()}
        </Card>
      </View>
    </ScrollView>
  );
}

// export default Contact;
