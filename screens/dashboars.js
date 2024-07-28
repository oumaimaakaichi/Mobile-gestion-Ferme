import React, { useRef, useState, useEffect } from "react";
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ImageBackground,
} from "react-native";
import profile from "../assets/prof.png";
import { getClientData } from "../utils/AsyncStorageClient";

import home from "../assets/home.png";

import logout from "../assets/logout.png";
import cland from "../assets/clandr.png";
import list from "../assets/hihi.png";

import Contact from "../assets/b.png";
import menu from "../assets/menu.png";
import enfant1 from "../assets/enfant.png";
import close from "../assets/close.png";
import medicament from "../assets/med.png";

import document from "../assets/doc.png";


import { Alert } from "react-native";

export default function Dashboard({ navigation }) {
 
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState("");
  const [rendezVous, setRendezVous] = useState([]);
  const [selectedRendezVous, setSelectedRendezVous] = useState(null);
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getClientData();
        setUser(userData);
        setUserId(userData.Data._id);
        console.log("UserData:", userData);
        console.log("User ID:", userData.Data._id);
      } catch (error) {
        console.error("Error fetching user dbata:", error);
      }
    };

    fetchData();
  }, []);



  const logoutUser = async () => {
         
      navigation.navigate("LoginC");
   
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.s}>
          <View
            style={{
              justifyContent: "flex-start",
              padding: 15,
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <TouchableOpacity style={styles.uploadBtnContainer}>
              <Image
                source={{ uri: user?.Data?.avatar }}
                style={{ width: "100%", height: "100%" }}
              />
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: "whitesmoke",
                marginTop: 20,
                marginRight: 70,
              }}
            >
              {user?.Data?.nom} {user?.Data?.prenom}
            </Text>

            <View style={{ flexGrow: 1, marginTop: 20  , marginRight:48}}>
              <TouchableOpacity
                onPress={() => {
                  if (title == "LogOut") {
                  } else {
                    setCurrentTab(title);
                  }
                }}
              >
                <TouchableOpacity onPress={() => {
                    navigation.navigate("dash");
                  }} >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 8,
                      backgroundColor: "white",
                      paddingLeft: 5,
                     
                      borderRadius: 8,
                      marginTop: 30,
                    }}
                  >
                    <Image
                      source={home}
                      style={{
                        width: 25,
                        height: 25,
                        tintColor: "#rgb(97, 172, 243)",
                      }}
                    ></Image>

                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        paddingLeft: 15,
                        color: "#rgb(97, 172, 243)",
                      }}
                    >
                      Acceuil
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("update");
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 8,
                      backgroundColor: "transparent",
                      paddingLeft: 5,
                      paddingRight: 35,
                      borderRadius: 8,
                      marginTop: 20,
                    }}
                  >
                    <Image
                      source={profile}
                      style={{
                        width: 25,
                        height: 25,
                        tintColor: "white",
                      }}
                    ></Image>

                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        paddingLeft: 15,
                        color: "white",
                      }}
                    >
                      Profile
                    </Text>
                  </View>
                </TouchableOpacity>

               

               
                

               

                <TouchableOpacity onPress={logoutUser}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 8,
                      backgroundColor: "transparent",
                      paddingLeft: 5,
                      paddingRight: 30,
                      borderRadius: 8,
                      marginTop: 20,
                    }}
                  >
                    <Image
                      source={logout}
                      style={{
                        width: 25,
                        height: 25,
                        tintColor: "white",
                      }}
                    ></Image>

                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        paddingLeft: 15,
                        color: "white",
                      }}
                    >
                      Déconnexion
                    </Text>
                  </View>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <Animated.View
          style={{
            flexGrow: 1,
            backgroundColor: "white",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            paddingHorizontal: 10,
            paddingVertical: 20,
            borderRadius: showMenu ? 15 : 0,
            // Transforming View...
            transform: [{ scale: scaleValue }, { translateX: offsetValue }],
          }}
        >
          {
            // Menu Button...
          }
          
            <ScrollView
              style={{ marginVertical: 0 }}
             
            >
              <Animated.View
                style={{
                  transform: [
                    {
                      translateY: closeButtonOffset,
                    },
                  ],
                }}
                source={require("../assets/4.jpg")}
              >
                <TouchableOpacity
                  onPress={() => {
                    Animated.timing(scaleValue, {
                      toValue: showMenu ? 1 : 0.88,
                      duration: 300,
                      useNativeDriver: true,
                    }).start();

                    Animated.timing(offsetValue, {
                      // YOur Random Value...
                      toValue: showMenu ? 0 : 230,
                      duration: 300,
                      useNativeDriver: true,
                    }).start();

                    Animated.timing(closeButtonOffset, {
                      // YOur Random Value...
                      toValue: !showMenu ? -30 : 0,
                      duration: 300,
                      useNativeDriver: true,
                    }).start();

                    setShowMenu(!showMenu);
                  }}
                  source={require("../assets/4.jpg")}
                >
                  <Image
                    source={showMenu ? close : menu}
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: "green",
                      marginTop: 40,
                      marginLeft: 20,
                    }}
                  ></Image>
                </TouchableOpacity>
                <View style={styles.content}>
                  {/* Affichage de l'image kk.png si des données sont récupérées */}
                  {rendezVous.length > 0 ? (
                    <TouchableOpacity
                      onPress={() => handleImageClick(rendezVous[0])}
                    >
                      <Image
                        source={require("../assets/rouge.png")}
                        style={{ width: 70, height: 70, marginLeft: 300 }}
                      />
                    </TouchableOpacity>
                  ) : (
                    <Image
                      source={require("../assets/blanc.png")}
                      style={{ width: 70, height: 70, marginLeft: 250 }}
                    />
                  )}
                  {/* Affichage des détails du rendez-vous sélectionné */}
                  {/*  {selectedRendezVous && (
                  <View style={styles.detailsContainer}>
                    <Text>Date: {selectedRendezVous.date}</Text>
                    <Text>Heure: {selectedRendezVous.heure}</Text>
                    <Text>
                      Nom du docteur: {selectedRendezVous.nom_docteur}
                    </Text>
                  
                  </View>
                )}*/}

                  {selectedRendezVous &&
                    Alert.alert(
                      "Détails du rendez-vous",
                      `Date: ${selectedRendezVous.date}\nHeure: ${selectedRendezVous.heure}\nNom du docteur: ${selectedRendezVous.nom_docteur}`,
                      [
                        {
                          text: "OK",
                          onPress: () => console.log("OK Pressed"),
                        },
                      ],
                      { cancelable: false, titleStyle: { color: "red" } }
                    )}
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    alignSelf: "center",
                    marginTop: 30,
                    color: "#427CA2",
                    marginBottom: 20,
                  }}
                ></Text>
                <ScrollView horizontal={true}></ScrollView>

                {/* <Image
                source={require("../assets/gg.jpg")}
                style={{ width: 400, height: 250 }}
              />*/}
              </Animated.View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  alignSelf: "center",
                  color: "#427CA2",
                  marginTop: 350, // Vous pouvez ajuster ou retirer ce marginTop si nécessaire
                  textShadowOffset: { width: -1, height: 1 },
                  textShadowRadius: 10,
                  padding: 10,
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: 10,
                }}
              >
                Bienvenue,
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  alignSelf: "center",

                  color: "#427CA2",

                  textShadowOffset: { width: -1, height: 1 },
                  textShadowRadius: 10,
                  padding: 10,
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: 10,
                }}
              >
                nous sommes à votre service
              </Text>
            </ScrollView>
      
        </Animated.View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#219C90",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  s: {
    color: "#rgb(97, 172, 243)",
    backgroundColor: "#219C90",
  },

  uploadBtnContainer: {
    height: 120,
    width: 120,
    borderRadius: 125 / 5,
 marginRight:40,

    borderWidth: 0,
    overflow: "hidden",
    marginTop: 50,
  },
});
