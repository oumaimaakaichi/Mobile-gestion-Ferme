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
import OnBoardScreenL from "./screens/homme2";
import LoginEmployeur from "./screens/LoginEmployeur";
import DashboardEmployeur from "./screens/dashEmployeur";
import DemandeConge from "./screens/demandeCongé";
import ListeC from "./screens/listeCongee";
import CongeE from "./screens/congeE";
import Animalss from "./screens/animalE";
import AnimalDétail2 from "./screens/detaiLAnimal";
import ProfilEmpl from "./screens/profilEmpl";
import StockEmplo from "./screens/stockEmpl";
import Ouvrier from "./screens/ouvries";
import EmploeDétail from "./screens/EmploeurDétaill";
import TachesE from "./screens/tachesEmpl";
import Taskss from "./screens/task";
const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="LoginC" component={LoginC} />
        <Stack.Screen name="InscriC" component={InscriC} />
        <Stack.Screen name="demandeConge" component={DemandeConge} />
        <Stack.Screen name="dash" component={Dashboard} />
        <Stack.Screen name="update" component={Profil} />
        <Stack.Screen name="animal" component={Animals} />
        <Stack.Screen name="addAnimal" component={AddAnimal} />
        <Stack.Screen name="OneAnimal" component={AnimalDétail} />
        <Stack.Screen name="OneAnimall" component={AnimalDétail2} />
        <Stack.Screen name="stock" component={Stocks} />
        <Stack.Screen name="addStock" component={AddStock} />
        <Stack.Screen name="conge" component={Conge} />
        <Stack.Screen name="OneCongé" component={CongeDétail} />
        <Stack.Screen name="home2" component={OnBoardScreenL} />
        <Stack.Screen name="loginE" component={LoginEmployeur} />
        <Stack.Screen name="dashEmpl" component={DashboardEmployeur} />
        <Stack.Screen name="listeC" component={CongeE} />
        <Stack.Screen name="animall" component={Animalss} />
        <Stack.Screen name="prof" component={ProfilEmpl} />
        <Stack.Screen name="stockE" component={StockEmplo} />
        <Stack.Screen name="ouv" component={Ouvrier} />
        <Stack.Screen name="détailEmplo" component={EmploeDétail} />
        <Stack.Screen name="tacheEmpl" component={TachesE} />
        <Stack.Screen name="mesTaches" component={Taskss} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
