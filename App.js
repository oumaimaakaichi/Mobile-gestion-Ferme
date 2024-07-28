import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from './Welcome';
import LoginC from "./screens/login";
import InscriC from "./screens/inscription";
import Dashboard from "./screens/dashboars";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="LoginC" component={LoginC} />
        <Stack.Screen name="InscriC" component={InscriC} />
        <Stack.Screen name="dash" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
