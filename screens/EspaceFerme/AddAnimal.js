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

import { REACT_APP_API_BASE_URL } from '@env';

import animals from "../../assets/caw-removebg-preview.png";
import home from "../../assets/home.png";
import stock from "../../assets/stocker.png";
import * as ImagePicker from "expo-image-picker";
import logout from "../../assets/logout.png";
import { AntDesign } from "@expo/vector-icons";
const { width: WIDTH } = Dimensions.get("window");

import animall from "../../assets/betail.png";
import menu from "../../assets/menu.png";

import cland from "../../assets/clandr.png";

import close from "../../assets/close.png";

import { useIsFocused } from "@react-navigation/native";
import vet from "../../assets/veterinaire (1).png"
import ouv from "../../assets/process_3516613.png"
import { Button } from "react-native-paper";
import Toast from "react-native-toast-message";
export default function AddAnimal({ navigation }) {
  const [currentTab, setCurrentTab] = useState("Home");

  const [showPopup, setShowPopup] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const [showMenu, setShowMenu] = useState(false);

  const [user, setUser] = useState("");
  const offsetValue = useRef(new Animated.Value(0)).current;

  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  const [animal, setAnimal] = useState("");
  const [Espece, setEspece] = useState("");
  const [race, setRace] = useState("");
  const [Age, setAge] = useState(null);
  const [poid, setPoid] = useState(null);
  const [NumPuce, setNumPuce] = useState("");

  const [error, setError] = useState(false);
  const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
  useEffect(() => {
   
    const fetchUserData = async () => {
      const userData = await getClientData();

      setUser(userData);
    };

    fetchUserData();
  }, []);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Erreur lors de la sélection de l'image :", error);
    }
  };

  const handleTakePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Erreur lors de la prise de la photo :", error);
    }
  };
  const addAnimals = async () => {
    const data = await getClientData();
    console.log("lllllll", animal);
  
    try {
      if (selectedImage) {
        const imageUri = selectedImage;
        const imageName = imageUri.split('/').pop(); 
  
        const formData = new FormData();
        formData.append('animal', animal);
        formData.append('espece', Espece);
        formData.append('race', race);
        formData.append('age', Age);
        formData.append('poids', poid);
        formData.append('numeroPuce', NumPuce);
        formData.append('proprietaire', data.Data._id);
        formData.append('image', {
          uri: imageUri,
          type: 'image/jpeg',
          name: imageName,
        });
  
        const response = await fetch(`http://192.168.177.216:3000/ajouter-animal`, {
          method: "POST",
          body: formData, 
        });
  
        if (response.ok) {
          Toast.show({
            position: "top",
            type: "success",
            text1: "Ajouter un Animal",
            text2: "Animal ajouté avec succès",
            autoHide: true,
            visibilityTime: 3000,
            onHide: () => {
              navigation.navigate("animal");
            },
          });
        } else {
          console.error("Échec de l'ajout de l'animal");
        }
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
                      backgroundColor: "white",
                      paddingLeft: 5,
                      paddingRight: 35,
                      borderRadius: 8,
                      marginTop: 20,
                    }}
                  >
                    <Image
                      source={animall}
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
                    source={animals}
                    style={{
                      width: 210,
                      height: 140,
                      alignSelf: "center",
                      marginTop: 5,
                    }}
                  />
                
                  <TouchableOpacity  onPress={handleImagePick}   style={styles.uploadButton}>
          <Image source={require('../../assets/pload.png')} style={styles.uploadIcon} />
          <Text style={styles.uploadText}>Télécharger une photo          </Text>
        </TouchableOpacity>

        <TouchableOpacity  onPress={handleTakePhoto} style={styles.uploadButton}>
          <Image source={require('../../assets/camera-to-take-photos.png')} style={styles.cameraIcon} />
          <Text style={styles.uploadText}>Prendre une nouvelle photo   </Text>
        </TouchableOpacity>
        {selectedImage && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: selectedImage }} style={styles.image} />
          </View>
        )}
                  <View style={styles.inputContainer}>
                    <Image
                      source={require("../../assets/betail.png")}
                      style={styles.icon}
                    />
                    <TextInput placeholder="Animal" style={styles.input}  onChangeText={(val) => setAnimal(val)}/>
                  </View>

                  <View style={styles.inputContainer}>
                    <Image
                      source={require("../../assets/betail.png")}
                      style={styles.icon}
                    />
                    <TextInput
                      placeholder="Espece d'animal"
                      style={styles.input}
                      onChangeText={(val) => setEspece(val)}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Image
                      source={require("../../assets/betail.png")} 
                      style={styles.icon}
                    />
                    <TextInput
                      placeholder="Race d'animal"
                      style={styles.input}
                      onChangeText={(val) => setRace(val)}
                    />
                  </View>

                 

                  <View style={styles.inputContainer}>
                    <Image
                      source={require("../../assets/age.png")}
                      style={styles.icon}
                    />
                    <TextInput
                      placeholder="Age"
                      style={styles.input}
                      onChangeText={(val) => setAge(val)}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Image
                      source={require("../../assets/poids.png")}
                      style={styles.icon}
                    />
                    <TextInput
                      placeholder="Poid"
                      style={styles.input}
                      onChangeText={(val) => setPoid(val)}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Image
                      source={require("../../assets/ascii_alphabet_numero_icon_259968.png")}
                      style={styles.icon}
                    />
                    <TextInput
                      placeholder="Numéro Puce"
                      style={styles.input}
                      onChangeText={(val) => setNumPuce(val)}
                    />
                  </View>

                  <View style={styles.button}>
                    <TouchableOpacity style={styles.signIn} onPress={addAnimals}>
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
    marginTop: 50,
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
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#7FA1C3",
  },
  uploadIcon: {
    width: 40,
    height: 40,
    tintColor: "#7FA1C3",
  },
  cameraIcon: {
    width: 37,
    height: 37,
    tintColor: "#7FA1C3",
  },
  uploadText: {
    fontSize: 16,
   
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
    marginTop: "30%",
    alignSelf: "center",
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
