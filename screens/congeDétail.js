import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import axios from "axios";

const { width: WIDTH } = Dimensions.get("window");
const { height: HEIGHT } = Dimensions.get("window");

import conta from "../assets/cc-removebg-preview (1).png";

export default function CongeDétail({ route, navigation }) {
  const { itemId, getConge } = route.params;
  const [conge, setConge] = useState({});

  useEffect(() => {
    console.log(getConge);
    if (getConge) {
      setConge(getConge);
    }
  }, [getConge]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "En attente":
        return styles.pending;
      case "Accepter":
        return styles.accepted;
      case "Refuser":
        return styles.rejected;
      default:
        return styles.default;
    }
  };
  const handleAccept = async () => {
    try {
      const response = await axios.patch(
        `http://192.168.195.216:3000/conge/accepter/${getConge._id}`
      );
      if (response.status === 200) {
        setConge(response.data.conge);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Erreur lors de l'acceptation du congé.");
    }
  };

  const handleReject = async () => {
    try {
      const response = await axios.patch(
        `http://192.168.195.216:3000/conge/refuser/${getConge._id}`
      );
      if (response.status === 200) {
        setConge(response.data.conge);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Erreur lors du refus du congé.");
    }
  };

  return (
    <SafeAreaView style={{ height: HEIGHT, backgroundColor: "white" }}>
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/back.png")}
            style={{ width: 40, height: 40 }}
          />
        </TouchableOpacity>
        <Image source={conta} style={styles.image} />
        <Text style={styles.title}>Informations de la congé</Text>

        <View style={styles.contactCard}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              padding: 10,
              width: "81%",
            }}
          >
            <Text style={styles.contactHeader}>Congé:</Text>
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>Employé: </Text>
              <Text style={styles.contactValue}>
                {getConge.employeur.nom} {getConge.employeur.prenom}
              </Text>
            </View>
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>Cin: </Text>
              <Text style={styles.contactValue}>{getConge.employeur.cin}</Text>
            </View>
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>Date début : </Text>
              <Text> {new Date(conge.dateDébut).toLocaleDateString()}</Text>
            </View>
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>Date Fin: </Text>
              <Text style={styles.value}>
                {conge.dateFin
                  ? new Date(conge.dateFin).toLocaleDateString()
                  : "Non spécifiée"}
              </Text>
            </View>
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>Status: </Text>
              <Text style={getStatusStyle(conge.status)}>{conge.status}</Text>
            </View>
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>Raison: </Text>
              <Text style={styles.value}>{getConge.raison}</Text>
            </View>
            {getConge.status === "En attente" && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={handleAccept}
                >
                  <Text style={styles.buttonText}>Accepter</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.rejectButton}
                  onPress={handleReject}
                >
                  <Text style={styles.buttonText}>Refuser</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "80%",
    height: 241,
    alignSelf: "center",
    marginTop: 46,
  },
  title: {
    color: "black",
    fontWeight: "bold",
    fontSize: 19,
    alignSelf: "center",
    marginTop: 11,
    marginBottom: 35,
  },
  contactCard: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#CDE8E5",
    marginBottom: 80,
    marginTop: 10,
    borderRadius: 11,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    padding: 10,
    marginStart: 7,
    marginEnd: 8,
  },
  contactHeader: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 20,
    textDecorationLine: "underline",
  },
  contactRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  contactLabel: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    color: "#5C88C4",
  },
  contactValue: {
    fontSize: 16,
    color: "black",
  },
  pending: {
    color: "#009FBD",
  },
  accepted: {
    color: "green",
  },
  rejected: {
    color: "red",
  },
  default: {
    color: "black",
  },
  modalView: {
    margin: 20,
    marginTop: 80,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: "#3AA6B9",
    marginBottom: 50,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#0147A6",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: "#3AA6B9",
    borderRadius: 5,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  acceptButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  rejectButton: {
    backgroundColor: "#F44336",
    borderRadius: 5,
    padding: 10,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
