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
import profile from "../../assets/prof.png";
import { getClientData } from "../../utils/AsyncStorageClient";
import stock from "../../assets/stocker.png";
import home from "../../assets/home.png";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import logout from "../../assets/logout.png";
import cland from "../../assets/clandr.png";
import { REACT_APP_API_BASE_URL } from '@env';

import axios from "axios";

import menu from "../../assets/menu.png";

import close from "../../assets/close.png";

import animal from "../../assets/betail.png";

import backg from "../../assets/lopp-removebg-preview.png";
import { Alert } from "react-native";
import ouv from "../../assets/process_3516613.png";
import vet from "../../assets/veterinaire (1).png"
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
export default function Dashboard({ navigation }) {
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState("");
  const [hasNotification, setHasNotification] = useState(false);
  const [rendezVous, setRendezVous] = useState([]);
  const [selectedRendezVous, setSelectedRendezVous] = useState(null);
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  async function registerForPushNotificationsAsync() {
    let token;
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
        sound: "default",
      });
    }

    if (Platform.OS === "ios") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        sound: "default",
      });

      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== "granted") {
        alert("Failed to get permission for push notifications!");
        return;
      }
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);

    return token;
  }
  const getNotificationPermission = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    return finalStatus === "granted";
  };

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {
        console.log("token: ", token);
      })
      .catch((err) => console.log(err));
  }, []);
  const fetchDataa = async () => {
    try {
      const clientData = await getClientData();
      setIsLoading(true);
      const response = await axios.get(
        `http://192.168.177.216:3000/conges/${clientData?.Data?._id}`
      );
      setData(response.data);
      setIsLoading(false);
      scheduleNotifications(response.data);
    } catch (error) {
      console.error("Error fetching rendez-vous data: ", error);
      setIsLoading(false);
    }
  };
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
    fetchDataa();
    getNotificationPermission();
  }, []);
  const scheduleNotifications = async (conges) => {
    try {
      for (const item of conges) {
        const congeS = item.status;
        if (congeS === "En attente") {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "Rappel de Congé",
              body: `Vous avez une demande de congé en attente de l'employé ${item.employeur.nom} ${item.employeur.prenom}`,
              data: { item },
              sound: "default",
            },
            trigger: {
              hour: 10,
              minute: 2,
              repeats: true,
            },
          });

          setRendezVous((prevRendezVous) => [...prevRendezVous, item]);
        }
      }
      setHasNotification(true);
    } catch (error) {
      console.error("Error scheduling notifications: ", error);
    }
  };

  const handleImageClick = () => {
    if (rendezVous.length === 0) {
      Alert.alert("Pas de notifications", "Aucun rendez-vous disponible.");
      return;
    }

    const details = rendezVous
      .map(
        (item) =>
          `demande: \nDate Début: ${new Date(
            item.dateDébut
          ).toLocaleDateString()}\nDate Fin: ${new Date(
            item.dateFin
          ).toLocaleDateString()}\nNom de l'employeur: ${item.employeur.nom} ${
            item.employeur.prenom
          }`
      )
      .join("\n\n");

    Alert.alert(
      "Détails des Congés",
      details,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false, titleStyle: { color: "red" } }
    );

    setHasNotification(false);
    setRendezVous([]);
  };

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

            <View style={{ flexGrow: 1, marginTop: 20, marginRight: 48 }}>
              <TouchableOpacity
                onPress={() => {
                  if (title == "LogOut") {
                  } else {
                    setCurrentTab(title);
                  }
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("dash");
                  }}
                >
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
                        tintColor: "#79C2BE",
                      }}
                    ></Image>

                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        paddingLeft: 15,
                        color: "#79C2BE",
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
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ouv");
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
                      source={ouv}
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
                      Ouvriers
                    </Text>
                  </View>
                </TouchableOpacity>


                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("vet");
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
                      source={vet}
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
                      vétérinaires
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("animal");
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
                      source={animal}
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
                      Animal
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("conge");
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 8,
                      backgroundColor: "transparent",

                      paddingRight: 48,
                      borderRadius: 8,
                      marginTop: 20,
                    }}
                  >
                    <Image
                      source={cland}
                      style={{
                        width: 40,
                        height: 40,
                        tintColor: "white",
                      }}
                    ></Image>

                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        paddingLeft: 5,
                        color: "white",
                      }}
                    >
                      Congés
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("stock");
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 8,
                      backgroundColor: "transparent",
                      marginLeft: 5,
                      paddingRight: 48,
                      borderRadius: 8,
                      marginTop: 20,
                    }}
                  >
                    <Image
                      source={stock}
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
                      Stock
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
                      paddingLeft: 8,
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

            transform: [{ scale: scaleValue }, { translateX: offsetValue }],
          }}
        >
          {
            // Menu Button...
          }

          <ScrollView style={{ marginVertical: 0 }}>
            <Animated.View
              style={{
                transform: [
                  {
                    translateY: closeButtonOffset,
                  },
                ],
              }}
              source={require("../../assets/4.jpg")}
            >
              <TouchableOpacity
                onPress={() => {
                  Animated.timing(scaleValue, {
                    toValue: showMenu ? 1 : 0.88,
                    duration: 300,
                    useNativeDriver: true,
                  }).start();

                  Animated.timing(offsetValue, {
                    toValue: showMenu ? 0 : 230,
                    duration: 300,
                    useNativeDriver: true,
                  }).start();

                  Animated.timing(closeButtonOffset, {
                    toValue: !showMenu ? -30 : 0,
                    duration: 300,
                    useNativeDriver: true,
                  }).start();

                  setShowMenu(!showMenu);
                }}
                source={require("../../assets/4.jpg")}
              >
                <Image
                  source={showMenu ? close : menu}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: "#219C90",
                    marginTop: 40,
                    marginLeft: 20,
                  }}
                ></Image>
              </TouchableOpacity>
              <View style={styles.content}>
                {hasNotification ? (
                  <TouchableOpacity onPress={handleImageClick}>
                    <Image
                      source={require("../../assets/rouge.png")}
                      style={{ width: 70, height: 70, marginLeft: 250 }}
                    />
                  </TouchableOpacity>
                ) : (
                  <Image
                    source={require("../../assets/blanc.png")}
                    style={{ width: 70, height: 70, marginLeft: 250 }}
                  />
                )}
              </View>

              <ScrollView horizontal={true}></ScrollView>
            </Animated.View>
            <Image
              source={backg}
              style={{
                width: 300,
                height: 330,

                marginTop: 40,
                marginLeft: 20,
              }}
            ></Image>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                alignSelf: "center",
                color: "#427CA2",
                marginTop: 70,
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
              Nous sommes à votre service
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
    backgroundColor: "#79C2BE",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  s: {
    color: "#rgb(97, 172, 243)",
    backgroundColor: "#79C2BE",
  },

  uploadBtnContainer: {
    height: 120,
    width: 120,
    borderRadius: 125 / 5,
    marginRight: 40,

    borderWidth: 0,
    overflow: "hidden",
    marginTop: 50,
  },
});
