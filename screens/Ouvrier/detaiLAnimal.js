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

import conta from "../../assets/fermer.jpg";

export default function AnimalDétail2({ route, navigation }) {
  const { itemId, getAnimal } = route.params;
  const [animal, setAnimal] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [editAnimal, setEditAnimal] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (getAnimal) {
      setAnimal(getAnimal);
      setEditAnimal(getAnimal);
    }
  }, [getAnimal]);

  const handleEdit = async () => {
    try {
      const response = await axios.patch(
        `http://192.168.195.216:3000/api/updateAn/${animal._id}`,
        editAnimal
      );
      setMessage(response.data.message);
      setAnimal(response.data);
      setEditAnimal(response.data);
      setModalVisible(false);
    } catch (error) {
      setMessage("Error updating contact");
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{ height: HEIGHT, backgroundColor: "white" }}>
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../assets/back.png")}
            style={{ width: 40, height: 40, marginTop: 20 }}
          />
        </TouchableOpacity>

        {animal.image ? (
          <Image source={{ uri: animal.image }} style={styles.image} />
        ) : (
          <Image source={conta} style={styles.image} />
        )}

        <Text style={styles.title}>Informations de l'animal</Text>

        <View style={styles.contactCard}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              padding: 10,
              width: "81%",
            }}
          >
            <Text style={styles.contactHeader}>Animal:</Text>
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>Animal: </Text>
              <Text style={styles.contactValue}>{animal.animal}</Text>
            </View>
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>Race: </Text>
              <Text style={styles.contactValue}>{animal.race}</Text>
            </View>
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>Espece: </Text>
              <Text style={styles.contactValue}>{animal.espece}</Text>
            </View>
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>Age: </Text>
              <Text style={styles.contactValue}>{animal.age}</Text>
            </View>
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>Poid: </Text>
              <Text style={styles.contactValue}>{animal.poids}</Text>
            </View>
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>Numéro de puce: </Text>
              <Text style={styles.contactValue}>{animal.numeroPuce}</Text>
            </View>
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
  modalTitleee: {
    marginRight: 70,
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  modalTitlee: {
    marginRight: 150,
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
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
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
