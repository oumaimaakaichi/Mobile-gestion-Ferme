import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  ScrollView,
  Alert,
  Image,
  Dimensions,
  LogBox,
  ImageBackground,
  Modal,
  Button,
} from "react-native";

import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";

import Feather from "react-native-vector-icons/Feather";

import { useTheme } from "react-native-paper";

import { storeClientData } from "../utils/AsyncStorageClient";
import axios from "axios";
import Icon from "react-native-vector-icons/Feather";
import Toast from "react-native-toast-message";
LogBox.ignoreAllLogs(true);
const LoginEmployeur = ({ navigation }) => {
  const [data, setData] = React.useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const { colors } = useTheme();

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };
  const [error, setError] = useState(false);
  const handlePasswordChange = (val) => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const loginHandle = () => {
    if (!data.email || !data.password) {
      setError(true);
      console.log("Champs obligatoires non remplis");
      return;
    }

    fetch("http://192.168.195.216:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })
      .then((response) => {
        console.log(response.data);
        console.log(data.role);
        if (!response.ok) {
          Toast.show({
            type: "error",
            text1: "Connexion éroner",
            text2: "vérifier votre champs",
            visibilityTime: 9000,
          });

          throw new Error("Identifiants invalides");
        }
        return response.json();
      })
      .then((res) => {
        console.log("Réponse de l'API :", res);
        storeClientData(res);
        if (res.Data.role === "Employeur") {
          Toast.show({
            position: "top",
            type: "success",

            text1: "Connexion",
            text2: "Connexion réussie",

            autoHide: true,
            visibilityTime: 1000,
            autoHide: true,
            onHide: () => {
              navigation.navigate("dashEmpl");
            },
            onShow: () => {},
          });
        } else if (res.Data.role == "vétérinaire") {
          Toast.show({
            position: "top",
            type: "success",

            text1: "Connexion",
            text2: "Connexion réussie",

            autoHide: true,
            visibilityTime: 1000,
            autoHide: true,
            onHide: () => {
              navigation.navigate("dashV");
            },
            onShow: () => {},
          });
        }
      })
      .catch((error) => {
        setError(true);
        console.error(error);
      });
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const sendPasswordReset = () => {
    fetch("http://192.168.195.216:3000/emailyni", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Une erreur s'est produite lors de l'envoi de l'e-mail de réinitialisation"
          );
        }
        Toast.show({
          position: "top",
          type: "success",

          text1: "Email",
          text2: "Votre mot de passe a été réinitialisé avec succès",

          autoHide: true,
          visibilityTime: 5000,
          autoHide: true,
          onHide: () => {
            navigation.navigate("signin");
          },
          onShow: () => {},
        });
        return response.json();
      })
      .then((data) => {
        setModalVisible(false);
      })
      .catch((error) => {});
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Toast />
        <StatusBar backgroundColor="white" />
        <></>

        <Animatable.View
          animation="fadeInUpBig"
          style={[
            styles.footer,
            {
              backgroundColor: colors.background,
              marginLeft: 10,
              marginRight: 10,
              textAlign: "center",
              marginTop: 160,
              borderRadius: 20,
            },
          ]}
        >
          {/*<Text style={styles.text_header}>aaa</Text>*/}
          <Text
            style={[
              styles.text_footer,
              {
                color: colors.text,
                fontSize: 15,
                marginLeft: 2,
              },
            ]}
          >
            Email
          </Text>
          <View style={styles.action}>
            <Icon name="user" color="#79C2BE" style={styles.icon} size={20} />

            <TextInput
              placeholder="Email"
              placeholderTextColor="#666666"
              style={[
                styles.textInput,
                {
                  color: colors.text,
                  marginTop: 5,
                },
              ]}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val)}
              onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          {error && !data.email && (
            <Text
              style={{
                color: "red",
                marginLeft: 10,
                fontSize: 10,
                fontWeight: "bold",
              }}
            >
              {" "}
              champ obligatoire *
            </Text>
          )}

          {data.isValidUser ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                email doit contenir minimum 3 caractéres
              </Text>
            </Animatable.View>
          )}

          <Text
            style={[
              styles.text_footer,
              {
                color: colors.text,
                marginTop: 35,
                fontSize: 15,
                marginLeft: 2,
              },
            ]}
          >
            Mot de passe
          </Text>
          <View style={styles.action}>
            <Feather
              name="lock"
              style={styles.icon}
              color="#79C2BE"
              size={20}
            />
            <TextInput
              placeholder="Mot de passe"
              placeholderTextColor="#666666"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={[
                styles.textInput,
                {
                  color: "#01BACF",
                  marginTop: 5,
                },
              ]}
              autoCapitalize="none"
              onChangeText={(val) => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          {error && !data.password && (
            <Text
              style={{
                color: "red",
                marginLeft: 10,
                fontSize: 10,
                fontWeight: "bold",
              }}
            >
              {" "}
              champ obligatoire *
            </Text>
          )}

          {data.isValidPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Password doit contenir minimum 6 caractéres
              </Text>
            </Animatable.View>
          )}

          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                loginHandle();
              }}
            >
              <LinearGradient
                colors={["#37B7C3", "#37B7C3"]}
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
                  Se connecter
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={{ color: "#79C2BE", marginTop: 40 }}>
                Mot de passe oublié?
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Saisissez votre e-mail:</Text>
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              onChangeText={setEmail}
              value={email}
            />

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#219C90",
                  padding: 10,
                  borderRadius: 5,
                  width: 100,
                  alignItems: "center",
                }}
                onPress={sendPasswordReset}
              >
                <Text style={{ color: "#FFFFFF", fontSize: 16 }}>Envoyer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#219C90",
                  padding: 10,
                  borderRadius: 5,
                  width: 100,
                  alignItems: "center",
                  marginLeft: 10,
                }}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: "#FFFFFF", fontSize: 16 }}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoginEmployeur;
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#37B7C3",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 100,
    paddingBottom: 40,
    marginTop: 10,
  },
  footer: {
    flex: 3,

    backgroundColor: "#FFFFFF",

    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  text_header: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    alignSelf: "center",
    marginBottom: 40,
    marginTop: 20,
  },
  text_footer: {
    color: "#12769E",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#79C2BE",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#01BACF",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#003C57",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 12,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
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
  icon: {
    marginTop: 5,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 5,
    width: "80%",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    color: "#333333",
  },
  input: {
    width: "100%",
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  sendButton: {
    backgroundColor: "#0147A6",
    borderRadius: 10,
    width: "100%",
    paddingVertical: 15,
    alignItems: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#0147A6",
  },
  closeButtonText: {
    color: "#666666",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
