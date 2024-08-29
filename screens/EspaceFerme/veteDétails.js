import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import vet from "../../assets/v-removebg-preview.png"
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
import { REACT_APP_API_BASE_URL } from '@env';

export default function VeterinaireDétail({ route, navigation }) {
  const { itemId, getConge, proprietaireId } = route.params;
  const [conge, setConge] = useState({});
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState("");
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddTaskModalVisible, setIsAddTaskModalVisible] = useState(false);

  useEffect(() => {
    if (getConge) {
      setConge(getConge);
    }
  }, [getConge]);

  useEffect(() => {
    if (proprietaireId) {
      axios
        .get(
          `${REACT_APP_API_BASE_URL}/taches-by-proprietaire/${proprietaireId}`
        )
        .then((response) => {
          setTasks(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [proprietaireId]);



  const handleAssignTasks = (taskId) => {
    if (taskId) {
      axios
        .post(`${REACT_APP_API_BASE_URL}/assign-task`, {
          userId: conge._id,
          taskId: taskId,
        })
        .then((response) => {
          alert("Task assigned successfully");
          setIsModalVisible(false);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("Please select a task");
    }
  };

  const handleAddTask = () => {
    if (newTaskName && newTaskDescription) {
      axios
        .post(`${REACT_APP_API_BASE_URL}/add-tache`, {
          tache: newTaskName,
          description: newTaskDescription,
          proprietaire: proprietaireId,
        })
        .then((response) => {
          alert("Task added successfully");
          console.log(response.data.Tache._id);
          handleAssignTasks(response.data.Tache._id);
          setNewTaskName("");
          setNewTaskDescription("");
          setIsAddTaskModalVisible(false);

          axios
            .get(
              `${REACT_APP_API_BASE_URL}/taches-by-proprietaire/${proprietaireId}`
            )
            .then((response) => {
              setTasks(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("Please enter task name and description");
    }
  };

  return (
    <SafeAreaView style={{ height: HEIGHT, backgroundColor: "white" }}>
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../assets/back.png")}
            style={{ width: 40, height: 40 }}
          />
        </TouchableOpacity>
       


{getConge.avatar  ? (
          <Image source={{ uri: getConge.avatar  }} style={styles.image} />
        ) : (
          <Image source={vet} style={styles.image} />
        )}
        <Text style={styles.title}>Informations de la vétérinaire</Text>

        <View style={styles.contactCard}>
          <View style={styles.contactInfo}>
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>Vétérinaire: </Text>
              <Text style={styles.contactValue}>
                {getConge.nom} {getConge.prenom}
              </Text>
            </View>
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>Cin: </Text>
              <Text style={styles.contactValue}>{getConge.cin}</Text>
            </View>
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>Téléphone: </Text>
              <Text style={styles.contactValue}>{getConge.Num_tel}</Text>
            </View>
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>Etat: </Text>
              <Text style={styles.contactValue}>{getConge.etat}</Text>
            </View>
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>Email: </Text>
              <Text style={styles.contactValue}>{getConge.email}</Text>
            </View>
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>Adresse: </Text>
              <Text style={styles.contactValue}>{getConge.adresse}</Text>
            </View>
          </View>
        </View>

       
       
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 271,
    alignSelf: "center",
    marginTop: 36,
    backgroundColor: "transparent",
  },
  title: {
    color: "black",
    fontWeight: "bold",
    fontSize: 19,
    alignSelf: "center",
    marginTop: 11,
    marginBottom: 25,
  },
  contactCard: {
    flexDirection: "row",
    backgroundColor: "#CDE8E5",
    marginBottom: 40,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  acceptButton: {
    backgroundColor: "#B4D6CD",
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
    marginLeft: 10,
  },
  rejectButton: {
    backgroundColor: "#B4D6CD",
    borderRadius: 5,
    marginRight: 10,
    marginLeft: 10,

    padding: 10,
    flex: 1,
    alignItems: "center",
  },

  rejectButtons: {
    backgroundColor: "#B4D6CD",
    borderRadius: 5,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 40,
    padding: 10,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  contactInfo: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
    width: "81%",
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: WIDTH * 0.8,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  picker: {
    width: "100%",
    height: 50,
    marginBottom: 15,
  },
  assignButton: {
    backgroundColor: "#5B99C2",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    width: "100%",
  },
  closeButton: {
    backgroundColor: "#BC9F8B",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    width: "100%",
  },
  input: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});
