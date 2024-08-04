import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from './Welcome';
import LoginC from "./screens/login";
import InscriC from "./screens/inscription";
import Dashboard from "./screens/dashboars";
import Profil from "./screens/profil";
import Animals from "./screens/animals";
import AddAnimal from "./screens/AddAnimal";
import AnimalDétail from "./screens/AnimalDétails";
import AddStock from "./screens/addStock";
import Stocks from "./screens/stock";
import Conge from "./screens/conge";
import CongeDétail from "./screens/congeDétail";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="LoginC" component={LoginC} />
        <Stack.Screen name="InscriC" component={InscriC} />
        <Stack.Screen name="dash" component={Dashboard} />
        <Stack.Screen name="update" component={Profil} />
        <Stack.Screen name="animal" component={Animals} />
        <Stack.Screen name="addAnimal" component={AddAnimal} />
        <Stack.Screen name="OneAnimal" component={AnimalDétail} />
        <Stack.Screen name="stock" component={Stocks} />
        <Stack.Screen name="addStock" component={AddStock} />
        <Stack.Screen name="conge" component={Conge} />
        <Stack.Screen name="OneCongé" component={CongeDétail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
