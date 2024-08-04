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
import profile from "../assets/prof.png";
import { getClientData } from "../utils/AsyncStorageClient";
import { LinearGradient } from "expo-linear-gradient";

// Tab ICons...
import animal from "../assets/betail.png";
import animals from "../assets/kl.jpg";
import home from "../assets/home.png";
import stock from "../assets/stocker.png";
import DatePicker from 'react-native-date-picker';
import logout from "../assets/logout.png";
import { AntDesign } from "@expo/vector-icons";
const { width: WIDTH } = Dimensions.get("window");
// Menu

import menu from "../assets/menu.png";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import cland from "../assets/clandr.png";

import close from "../assets/close.png";

import { useIsFocused } from "@react-navigation/native";

import { Button } from "react-native-paper";
import Toast from "react-native-toast-message";
export default function AddStock({ navigation }) {
  const [currentTab, setCurrentTab] = useState("Home");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [user, setUser] = useState("");
  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Intially must be One...
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  const [quantite, setQuantité] = useState("");
  const [date_peremption, setDatePremption] = useState("");
  const [produit, setProduitName] = useState("");
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleDateConfirm = (date) => {
    setDatePremption(date);
    hideDatePicker();
  };

  const [error, setError] = useState(false);
  const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
  useEffect(() => {
   
    const fetchUserData = async () => {
      const userData = await getClientData();

      setUser(userData);
    };

    fetchUserData();
  }, []);
  const addStock = async () => {
    const data = await getClientData();
    console.log("lllllll"+animal)
    try {
    
      const requestBody = JSON.stringify({
        nomProduit: produit,
        quantite: quantite,
        date_peremption: date_peremption,
       
        proprietaire: data.Data._id,
      });

      const response = await fetch(
        "http://192.168.148.216:3000/add-stock",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: requestBody,
        }
      );

      if (response.ok) {
        Toast.show({
          position: "top",
          type: "success",

          text1: "Ajouter un stock",
          text2: "Stock ajouté avec succès",
          

          autoHide: true,
          visibilityTime: 3000,
          autoHide: true,
          onHide: () => {
            navigation.navigate("stock");
          },
          onShow: () => {},
        });
       
      } else {
      
        console.error("Échec de l'ajout du médicament");
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
                    navigation.navigate("dash");
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
                    navigation.navigate("animal");
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 8,
                      backgroundColor: "white",
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
                      Animal
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
                    navigation.navigate("update");
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
                    navigation.navigate("LoginC");
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 8,
                      backgroundColor: "transparent",
                      paddingLeft: 13,
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
                    tintColor: "#79C2BE",
                    marginTop: 40,
                  }}
                ></Image>
              </TouchableOpacity>

              <ScrollView horizontal={true}>
                <Toast />
                <View style={styles.popupContainer}>
      <Image
        source={require('../assets/stocker.png')}
        style={{
          width: 110,
          height: 100,
          alignSelf: 'center',
          marginTop: 5,
          tintColor: '#7FA1C3',
        }}
      />
      <Text style={[styles.textSign, { color: 'grey' }]}>Nouveau Stock</Text>
      <View style={styles.inputContainer}>
        <Image
          source={require('../assets/stocker.png')}
          style={styles.icon}
        />
        <TextInput
          placeholder="Produit"
          style={styles.input}
          onChangeText={(val) => setProduitName(val)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Image
          source={require('../assets/des-boites.png')}
          style={styles.icon}
        />
        <TextInput
          placeholder="Quantité"
          style={styles.input}
          onChangeText={(val) => setQuantité(val)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Image
          source={require('../assets/calendrier.png')}
          style={styles.icon}
        />
        <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
          <TextInput
            placeholder="Date Peremption"
          style={{width:240}}
            value={date.toDateString()}
            editable={false}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <TouchableOpacity style={styles.signIn} onPress={addStock}>
          <LinearGradient
            colors={['#7FA1C3', '#7FA1C3']}
            style={styles.linearGradient}
          >
            <Text style={[styles.textSign, { color: '#fff' }]}>Ajouter</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date" // Utilisez "date" pour un sélecteur de date ou "time" pour un sélecteur d'heure
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
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
    backgroundColor: "#79C2BE",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  s: {
    color: "#rgb(97, 172, 243)",
    backgroundColor: "#79C2BE",
    marginTop: -100,
  },
  button: {
    alignItems: "center",
    marginTop: 70,
    borderRadius: 8,
    padding: 10,
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

  signIn: {
    backgroundColor: "#7FA1C3",
    width: WIDTH - 60,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 30,
    marginTop: -50,
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
    marginBottom:20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: "center",
    width: "90%",
    marginTop: "20%",
    alignSelf: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.6,
    borderColor: "#79C2BE",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 20,
    height: 50,
  },

  icon: {
    marginRight: 11,
    width: 25, // Ajustez la largeur selon vos besoins
    height: 25,
    color: "#79C2BE",
    tintColor: "#7FA1C3",
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
