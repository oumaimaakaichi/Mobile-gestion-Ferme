import React, { useRef, useState, useEffect } from "react";
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import profile from "../../assets/prof.png";
import { getClientData } from "../../utils/AsyncStorageClient";
import { LinearGradient } from "expo-linear-gradient";
// Tab ICons...
import DateTimePickerModal from "react-native-modal-datetime-picker";
import animal from "../../assets/betail.png";
import conge from "../../assets/dema-removebg-preview.png";
import home from "../../assets/home.png";
import stock from "../../assets/stocker.png";
import * as ImagePicker from "expo-image-picker";
import logout from "../../assets/logout.png";
import { AntDesign } from "@expo/vector-icons";
const { width: WIDTH } = Dimensions.get("window");
// Menu
import task from "../../assets/task_8089604.png";
import menu from "../../assets/menu.png";
import cd from "../../assets/cd4bd9b0ea2807611ba3a67c331bff0b-removebg-preview.png"
import cland from "../../assets/clandr.png";

import close from "../../assets/close.png";

import { useIsFocused } from "@react-navigation/native";

import { Button } from "react-native-paper";
import Toast from "react-native-toast-message";
export default function DemandeConge({ navigation }) {
  const [currentTab, setCurrentTab] = useState("Home");

  const [showPopup, setShowPopup] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const [showMenu, setShowMenu] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisiblee, setDatePickerVisibilityy] = useState(false);
  const [user, setUser] = useState("");
  const offsetValue = useRef(new Animated.Value(0)).current;

  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  const [dateD, setDateD] = useState("");
  const [dateFin, setDateF] = useState("");
  const [raison, setRaison] = useState(null);
  const [date, setDate] = useState(new Date());
  const [datee, setDatee] = useState(new Date());
  const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getClientData();
      console.log(userData.Data._id);
      setUser(userData);
    };

    fetchUserData();
  }, []);
  const [selectedImage, setSelectedImage] = useState(null);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleDateConfirm = (date) => {
    setDate(date);
    hideDatePicker();
    setDateD(dateFin);
  };

  const showDatePickerr = () => setDatePickerVisibilityy(true);
  const hideDatePickerr = () => setDatePickerVisibilityy(false);
  const handleDateConfirmm = (date) => {
    setDatee(date);
    setDateF(date);
    hideDatePicker();
  };

  const addConge = async () => {
    const data = await getClientData();

    try {
      const requestBody = JSON.stringify({
        dateDébut: date,
        dateFin: datee,

        raison: raison,
        employeur: data.Data._id,
      });

      const response = await fetch("http://192.168.195.216:3000/add-conge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      if (response.ok) {
        Toast.show({
          position: "top",
          type: "success",

          text1: "Ajouter un demande de congé",
          text2: "demande ajouté avec succès",

          autoHide: true,
          visibilityTime: 3000,
          autoHide: true,
          onHide: () => {
            navigation.navigate("dashEmpl");
          },
          onShow: () => {},
        });
      } else {
        console.error("Échec de l'ajout du demande");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du contact:", error);
    }
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.s}>
          <View
            style={{
              justifyContent: "flex-start",
              padding: 14,
              alignItems: "center",
              marginBottom: 21,
              marginTop: 100,
            }}
          >
           <TouchableOpacity style={styles.uploadBtnContainer}>
           { user?.Data?.avatar ?(<Image
                source={{ uri: user?.Data?.avatar }}
                style={{ width: "100%", height: "100%" }}
              />):(
<Image
                source={cd}
                style={{ width: "100%", height: "100%" }}
              />
              )}
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

            <View style={{ flexGrow: 1, marginRight: 40 }}>
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
                    navigation.navigate("dashEmpl");
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 8,
                      backgroundColor: "transparent",
                      paddingLeft: 13,
                      paddingRight: 35,
                      borderRadius: 8,
                      marginTop: 30,
                    }}
                  >
                    <Image
                      source={home}
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
                      Acceuil
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("prof");
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
                    navigation.navigate("animall");
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
                    navigation.navigate("mesTaches");
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
                      source={task}
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
                      Taches
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("demandeConge");
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 8,
                      backgroundColor: "white",

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
                        tintColor: "#79C2BE",
                      }}
                    ></Image>

                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        paddingLeft: 5,
                        color: "#79C2BE",
                      }}
                    >
                      Demande Congé
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("listeC");
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
                      Mes demandes
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("stockE");
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

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("loginE");
                  }}
                >
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
            paddingHorizontal: 15,
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
              >
                <Image
                  source={showMenu ? close : menu}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: "#37B7C3",
                    marginTop: 40,
                  }}
                ></Image>
              </TouchableOpacity>

              <ScrollView horizontal={true}>
                <Toast />
                <View style={styles.popupContainer}>
                  <Image
                    source={conge}
                    style={{
                      width: 210,
                      height: 180,
                      alignSelf: "center",
                      marginTop: 5,
                    }}
                  />

                  <Text style={styles.contactLabel}>Date début:           </Text>
                  <TouchableOpacity
                    onPress={() => setDatePickerVisibility(true)}
                  >
                    <View style={styles.inputContainer}>
                      <Image
                        source={require("../../assets/calendrier.png")}
                        style={styles.icon}
                      />
                      <TextInput
                        placeholder="Date début"
                        style={{ width: 240 }}
                        value={date.toDateString()}
                        editable={false}
                      />
                    </View>
                  </TouchableOpacity>

                  <Text style={styles.contactLabel}>Date Fin:                </Text>
                  <TouchableOpacity
                    onPress={() => setDatePickerVisibilityy(true)}
                  >
                    <View style={styles.inputContainer}>
                      <Image
                        source={require("../../assets/calendrier.png")}
                        style={styles.icon}
                      />
                      <TextInput
                        placeholder="Date Fin"
                        style={{ width: 240 }}
                        value={datee.toDateString()}
                        editable={false}
                      />
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.contactLabel}>Raison:                   </Text>

                  <View style={styles.inputContainer}>
                    <Image
                      source={require("../../assets/ask_14791674.png")}
                      style={styles.iconn}
                    />
                    <TextInput
                      placeholder="raison"
                      style={{ width: 240 }}
                      onChangeText={(val) => setRaison(val)}
                    />
                  </View>

                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleDateConfirm}
                    onCancel={hideDatePicker}
                  />
                  <DateTimePickerModal
                    isVisible={isDatePickerVisiblee}
                    mode="date"
                    onConfirm={handleDateConfirmm}
                    onCancel={hideDatePickerr}
                  />

                  <View style={styles.button}>
                    <TouchableOpacity style={styles.signIn} onPress={addConge}>
                      <LinearGradient
                        colors={["#7FA1C3", "#7FA1C3"]}
                        style={styles.linearGradient}
                      >
                        <Text style={[styles.textSign, { color: "#fff" }]}>
                          Ajouter
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </Animated.View>
          </ScrollView>
        </Animated.View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#37B7C3",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  s: {
    color: "#rgb(97, 172, 243)",
    backgroundColor: "#37B7C3",
    marginTop: -100,
  },
  contactRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  contactLabel: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 150,

    marginTop: 10,
  },
  button: {
    alignItems: "center",
    marginTop: 70,
    borderRadius: 8,
    padding: 5,
    paddingHorizontal: 10,
  },

  uploadBtnContainer: {
    height: 120,
    width: 120,
    borderRadius: 125 / 5,
    marginRight: 40,

    borderWidth: 0,
    overflow: "hidden",
    marginTop: 30,
    marginBottom: 40,
  },
  imageContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  image: {
    width: WIDTH - 40,
    height: 200,
    borderRadius: 10,
    resizeMode: "cover",
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#e0f0ff",
  },
  uploadIcon: {
    width: 40,
    height: 40,
  },
  cameraIcon: {
    width: 37,
    height: 37,
    tintColor: "blue",
  },
  uploadText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
  },
  signIn: {
    backgroundColor: "#7FA1C3",
    width: WIDTH - 60,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 30,
    marginTop: -50,
    paddingHorizontal: 20,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  loginFormTextInput: {
    width: WIDTH - 55,
    height: 45,
    borderBottomWidth: 1,
    borderColor: "#rgb(97, 172, 243)",
    fontSize: 16,
    paddingLeft: 45,
    marginHorizontal: 25,
    marginTop: 25,
  },
  popupContainer: {
    backgroundColor: "white",
    padding: 10,
    marginLeft: 10,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: "center",
    width: "90%",
    marginTop: "10%",
    alignSelf: "center",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.6,
    borderColor: "#7FA1C3",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 20,
    height: 50,
  },

  icon: {
    marginRight: 11,
    width: 25,
    height: 25,
    color: "#79C2BE",
    tintColor: "#7FA1C3",
  },
  iconn: {
    marginRight: 11,
    width: 25,
    height: 25,
    color: "#79C2BE",
  },
  input: {
    flex: 1,
    height: 70,
    marginLeft: 10,
    borderWidth: 0,
    borderColor: "rgb(70, 143, 183)",
    borderRadius: 8,
    paddingHorizontal: 0,
  },
  buttons: {
    backgroundColor: "#0147A6",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
