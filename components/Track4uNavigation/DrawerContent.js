import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";
import { BaseURL } from "../Track4uNavigation/FecthServerServices";

import { useSelector } from "react-redux";
// import Login from '../Login';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function DrawerContent(props) {
  var userData = useSelector((state) => state.userData);
  var user = Object.values(userData)[0];
  // console.log("111111111111111111111111111111111111111111", user);

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      // alert("Storage successfully cleared!");
      props.navigation.navigate("Login");
    } catch (e) {
      console.log(e);
      alert("Failed to clear the async storage.");
    }
  };
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <Avatar.Image
            source={{
              uri: `${BaseURL}/images/${user.photograph}`,
              // "https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg",
            }}
            size={70}
          />
          <Title style={styles.title}>{user.employeename}</Title>
          <Caption style={styles.caption}>{user.designation}</Caption>
          {/* <View style={styles.row}>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                202
              </Paragraph>
              <Caption style={styles.caption}>Following</Caption>
            </View>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                159
              </Paragraph>
              <Caption style={styles.caption}>Followers</Caption>
            </View>
          </View> */}
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="account-outline"
                color={color}
                size={size}
              />
            )}
            label="Profile"
            onPress={() => {
              props.navigation.navigate("Profile");
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="bookmark-outline"
                color={color}
                size={size}
              />
            )}
            label="Task"
            onPress={() => props.navigation.navigate("Task")}
            // onPress={() => navigation.navigate("Task")}
          />

          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="tune" color={color} size={size} />
            )}
            label="Expenses"
            onPress={() => props.navigation.navigate("ExpensesList")}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="bookmark-outline"
                color={color}
                size={size}
              />
            )}
            label="Leave"
            onPress={() => props.navigation.navigate("LeaveList")}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="power" color={color} size={size} />
            )}
            label="Logout"
            onPress={() => clearStorage()}
          />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    // flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
