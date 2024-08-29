import React, { useRef, useState, useEffect } from "react";
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  ScrollView,
  TextInput,
  ImageBackground,
} from "react-native";
import profile from "../assets/prof.png";
import { LinearGradient } from "expo-linear-gradient";
import { getClientData } from "../utils/AsyncStorageClient";
import { useTheme } from "react-native-paper";
import home from "../assets/home.png";
import stock from "../assets/stocker.png";
import * as ImagePicker from "expo-image-picker";
import logout from "../assets/logout.png";
import cland from "../assets/clandr.png";
import list from "../assets/hihi.png";
import Icon from "react-native-vector-icons/Feather";
import Contact from "../assets/b.png";
import menu from "../assets/menu.png";
import animal from "../assets/betail.png";
import enfant1 from "../assets/enfant.png";
import close from "../assets/close.png";
import medicament from "../assets/med.png";
import task from "../assets/task_8089604.png";
import document from "../assets/doc.png";
import cd from "../assets/cd4bd9b0ea2807611ba3a67c331bff0b-removebg-preview.png"
import { Alert } from "react-native";
import { REACT_APP_API_BASE_URL } from '@env';

export default function ProfilEmpl({ navigation }) {
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState("");
  const [rendezVous, setRendezVous] = useState([]);
  const [selectedRendezVous, setSelectedRendezVous] = useState(null);
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  const { colors } = useTheme();

  const [Num_tel, setNum_tel] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getClientData();
        setUser(userData);
        setUserId(userData.Data._id);
        console.log("UserData:", userData);
        console.log("User ID:", userData.Data._id);
        setEmail(userData.Data.email);
        console.log(userData.Data.Num_tel);
        setNum_tel(userData.Data.Num_tel);
        console.log(userData.Data.avatar);
        setAvatar(userData.Data.avatar);

        console.log(Num_tel);
      } catch (error) {
        console.error("Error fetching user dbata:", error);
      }
    };

    fetchData();
  }, [Num_tel]);
  const [email, setEmail] = useState(user?.Data?.email);
  const [avatar, setAvatar] = useState("");
  const [avatarr, setAvatarr] = useState("");
  const [avatarFile, setAvatarFile] = useState();
  const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;

  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      if (!response.cancelled) {
        setAvatar(response.assets[0].uri);
        try {
          const uploadResult = await FileSystem.uploadAsync(
            `${REACT_APP_API_BASE_URL}/upload-image`,
            response.assets[0].uri,
            {
              fieldName: "avatar",
              uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            }
          );
          setAvatarFile(uploadResult.body);  // Ensure correct handling
          console.log("Upload success:", uploadResult.body);
        } catch (error) {
          console.error("Image upload failed:", error);
        }
      }
    }
  };

  const Update = async () => {
    if (!avatarFile) {
      Alert.alert("Erreur", "Veuillez sélectionner une image d'abord.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("Num_tel", Num_tel);
      formData.append("avatar", {
        uri: avatarFile,
        name: "avatar.jpg", // or appropriate file name
        type: "image/jpeg", // or appropriate file type
      });

      const response = await fetch(
        `${REACT_APP_API_BASE_URL}/modifier/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Succès", "Profil mis à jour avec succès.");
        navigation.navigate("Profil");
      } else {
        Alert.alert("Erreur", "Échec de la mise à jour du profil.");
      }
    } catch (error) {
      console.log("Update error:", error);
    }
  };
  const logoutUser = async () => {
    navigation.navigate("loginE");
  };
  useEffect(() => {
    console.log("Num_tel in useEffect:", Num_tel);
  }, [Num_tel]);

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
                    navigation.navigate("dashEmpl");
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 8,
                      backgroundColor: "transparent",
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
                      backgroundColor: "white",
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
                source={require("../assets/4.jpg")}
              >
                <Image
                  source={showMenu ? close : menu}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: "#37B7C3",
                    marginTop: 40,
                    marginLeft: 20,
                  }}
                ></Image>
              </TouchableOpacity>

              <ScrollView horizontal={true}></ScrollView>
            </Animated.View>

            <View
              style={{
                justifyContent: "flex-start",
                padding: 15,
                alignItems: "center",
                marginBottom: 20,
              }}
            >
             
              <TouchableOpacity
                onPress={openImageLibrary}
                style={styles.uploadBtnContainer}
              >
                 {avatar ?(<Image
                source={{uri:avatar }}
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
                  color: "black",
                  marginTop: 20,
                  marginRight: 70,
                }}
              >
                &nbsp;&nbsp; &nbsp;&nbsp;{user?.Data?.nom} {user?.Data?.prenom}
              </Text>
            </View>

            <Text
              style={[
                styles.text_footer,
                {
                  color: colors.text,
                  fontSize: 15,
                  marginTop: 35,
                  marginBottom: 15,
                },
              ]}
            >
              Email
            </Text>
            <View style={styles.action}>
              <Icon
                name="mail"
                color="#219C90"
                size={20}
                style={{
                  marginTop: -10,
                }}
              />
              <TextInput
                placeholder="Email"
                placeholderTextColor="#666666"
                value={email}
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
                onChangeText={(val) => setEmail(val)}
              />
            </View>

            <Text
              style={[
                styles.text_footer,
                {
                  color: colors.text,
                  fontSize: 15,
                  marginTop: 35,
                  marginBottom: 15,
                },
              ]}
            >
              Phone
            </Text>
            <View style={styles.action}>
              <Icon
                name="phone"
                color="#219C90"
                size={20}
                style={{
                  marginTop: -10,
                }}
              />
              <TextInput
                placeholder="Phone"
                placeholderTextColor="#666666"
                value={Num_tel}
                onChangeText={(val) => setNum_tel(val)}
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
              />
            </View>

            <View style={styles.button}>
              <TouchableOpacity
                style={styles.signIn}
                onPress={() => {
                  Update()
                }}
              >
                <LinearGradient
                  colors={["#79C2BE", "#79C2BE"]}
                  style={styles.signIn}
                >
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: "#fff",
                      },
                    ]}
                  >
                    S'Update
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
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
  },

  uploadBtnContainer: {
    height: 120,
    width: 120,
    borderRadius: 125 / 5,
    marginRight: 40,

    borderWidth: 0,
    overflow: "hidden",
    marginTop: 30,
  },
  uploadBtnContainers: {
    height: 125,
    width: 125,
    borderRadius: 125 / 2,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    borderColor: "#01BACF",
    borderWidth: 1,
    alignSelf: "center",
    overflow: "hidden",
  },
  uploadBtns: {
    textAlign: "center",
    fontSize: 16,
    opacity: 0.3,
    fontWeight: "bold",
    color: "#219C90",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#4A919E",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#4A919E",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 12,
  },
  button: {
    alignItems: "center",
    marginTop: 40,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
