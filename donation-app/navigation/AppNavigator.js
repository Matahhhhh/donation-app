import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/login/LoginScreen";
import HomeScreen from "../screens/home/HomeScreen";
import CameraScreen from "../screens/camera/CameraScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="CameraScreen"
          component={CameraScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
