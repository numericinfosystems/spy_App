import React from "react";
import { Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./DrawerContent";
const Drawer = createDrawerNavigator();
import { useTheme } from "react-native-paper";
import { Appbar } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "./Screens/Dashboard";
const DashboardStack = createStackNavigator();

const DashboardScreen = () => (
  <DashboardStack.Navigator>
    <DashboardStack.Screen
      name="Dashboard"
      component={Dashboard}
      options={{ headerShown: false }}
    />
  </DashboardStack.Navigator>
);

function AppHeaderDrawer({ navigation }) {
  const { colors } = useTheme();
  return (
    <>
      <Appbar.Header style={{ backgroundColor: "#F5F5F5" }}>
        <Appbar.Action icon={"menu"} onPress={() => navigation.openDrawer()} />
      </Appbar.Header>
    </>
  );
}

export default function RootNavigator(props) {
  return (
    <Drawer.Navigator drawerContent={() => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={DashboardScreen} />
    </Drawer.Navigator>
  );
}
