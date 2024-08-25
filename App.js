import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from './Welcome';
import LoginC from "./screens/EspaceFerme/login";
import InscriC from "./screens/EspaceFerme/inscription";
import Dashboard from "./screens/EspaceFerme/dashboars";
import Profil from "./screens/EspaceFerme/profil";
import Animals from "./screens/EspaceFerme/animalsDashboardFerme";
import AddAnimal from "./screens/EspaceFerme/AddAnimal";
import AnimalDétail from "./screens/EspaceFerme/AnimalDétails";
import AddStock from "./screens/EspaceFerme/addStock";
import Stocks from "./screens/EspaceFerme/stock";
import Conge from "./screens/EspaceFerme/conge";
import CongeDétail from "./screens/EspaceFerme/congeDétail";
import OnBoardScreenL from "./screens/homme2";
import LoginEmployeur from "./screens/LoginEmployeur";
import DashboardEmployeur from "./screens/Ouvrier/dashboardEmployeur";
import DemandeConge from "./screens/Ouvrier/demandeCongé";
import ListeC from "./screens/Ouvrier/listeCongee";
import CongeE from "./screens/Ouvrier/congeEmployeur";
import Animalss from "./screens/Ouvrier/animalDashboardEmployeur";
import AnimalDétail2 from "./screens/Ouvrier/detaiLAnimal";
import ProfilEmpl from "./screens/profilEmpl";
import StockEmplo from "./screens/Ouvrier/stockEmpl";
import Ouvrier from "./screens/EspaceFerme/ouvries";
import EmploeDétail from "./screens/EspaceFerme/EmploeurDétaill";
import TachesE from "./screens/Ouvrier/tachesEmpl";
import Taskss from "./screens/Ouvrier/task";
import DashboardVét from "./screens/Véterinaire/dashboardVéterinaire";
import AddVeterinaire from "./screens/EspaceFerme/addVeterinaire";
import AnimalVét from "./screens/Véterinaire/AnimalVét";
import AnimalDétailV from "./screens/Véterinaire/AnimalDétailsPourVéterinaire";
import VaccinationsScreen from "./screens/Véterinaire/listeVaccinationAnimal";
import VaccinationsScreenP from "./screens/EspaceFerme/listeVaccProp";
import AddOuv from "./screens/EspaceFerme/addOuvrier";
import Veterinaire from "./screens/EspaceFerme/veterinaires";
import VeterinaireDétail from "./screens/EspaceFerme/veteDétails";
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
        <Stack.Screen name="OneAnimalV" component={AnimalDétailV} />
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
        <Stack.Screen name="détailvet" component={VeterinaireDétail} />
        <Stack.Screen name="AddVeterinaire" component={AddVeterinaire} />
        <Stack.Screen name="tacheEmpl" component={TachesE} />
        <Stack.Screen name="mesTaches" component={Taskss} />
        <Stack.Screen name="dashV" component={DashboardVét} />
        <Stack.Screen name="animalVé" component={AnimalVét} />
        <Stack.Screen name="VaccinationsScreen" component={VaccinationsScreen} />
        <Stack.Screen name="VaccinationsScreenP" component={VaccinationsScreenP} />
        <Stack.Screen name="addOuv" component={AddOuv} />
        <Stack.Screen name="vet" component={Veterinaire} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
