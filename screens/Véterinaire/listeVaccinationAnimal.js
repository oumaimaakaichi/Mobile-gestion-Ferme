import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";
import add from "../../assets/add.png";
import { REACT_APP_API_BASE_URL } from '@env';

const VaccinationsScreen = ({ route, navigation }) => {
  const { itemId } = route.params;
  const [vaccinations, setVaccinations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [newVaccination, setNewVaccination] = useState({ nom: "", date: "" });
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [vaccinationNames, setVaccinationNames] = useState([
    "HL",
    "CL",
    
  ]);

  useEffect(() => {
    const fetchVaccinations = async () => {
      try {
        const response = await fetch(
          `${REACT_APP_API_BASE_URL}/getAllVaccinations/${itemId}`
        );
        const data = await response.json();
        if (response.ok) {
          setVaccinations(data.vaccinations);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching vaccinations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVaccinations();
  }, [itemId]);

  const handleAddVaccination = async () => {
    try {
      const response = await fetch(
        `${REACT_APP_API_BASE_URL}/addVaccination/${itemId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newVaccination),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setVaccinations([...vaccinations, newVaccination]);
        setModalVisible(false);
        setNewVaccination({ nom: "", date: "" });
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error adding vaccination:", error);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setNewVaccination({ ...newVaccination, date: date.toISOString() });
    hideDatePicker();
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require("../../assets/back.png")}
          style={{ width: 40, height: 40, marginTop: 20, marginBottom: 30 }}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.addButton}>
          <Image source={add} style={styles.addIcon} />
        </View>
      </TouchableOpacity>

      <FlatList
        data={vaccinations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>Vaccination: {item.nom}</Text>
              <Text style={styles.date}>
                Date: {new Date(item.date).toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.imageContainer}>
              <Image
                source={require("../../assets/covid-vaccination-fb-removebg-preview.png")}
                style={styles.image}
              />
            </View>
          </View>
        )}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Picker
              selectedValue={newVaccination.nom}
              onValueChange={(itemValue) =>
                setNewVaccination({ ...newVaccination, nom: itemValue })
              }
              style={styles.input} // Adjust styling if needed
            >
              {vaccinationNames.map((vaccination, index) => (
                <Picker.Item key={index} label={vaccination} value={vaccination} />
              ))}
            </Picker>

            <TouchableOpacity
              onPress={showDatePicker}
              style={styles.dateButton}
            >
              <Text style={styles.dateButtonText}>
                {newVaccination.date
                  ? new Date(newVaccination.date).toLocaleDateString()
                  : "Select Date"}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />

            <View style={styles.buttonContainer}>
              <Button title="Add Vaccination" onPress={handleAddVaccination} />
            </View>

            <View style={styles.buttonContainer}>
              <Button title="Fermer" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    backgroundColor: "transparent",
    paddingLeft: 250,
    paddingRight: 35,
    borderRadius: 8,
    marginBottom: 10,
  },
  addIcon: {
    width: 35,
    height: 35,
    tintColor: "#674188",
    marginRight:20
  },
  addText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 10,
    color: "#674188",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  infoContainer: {
    flex: 2,
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  image: {
    width: 70,
    height: 70,
    tintColor: "#674188",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "80%",
  },
  input: {
    marginBottom: 20,
  },
  dateButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "#179BAE",
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  dateButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default VaccinationsScreen;
