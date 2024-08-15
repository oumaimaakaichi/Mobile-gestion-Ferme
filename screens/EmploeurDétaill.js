import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, Dimensions, TouchableOpacity, Modal, TextInput } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export default function EmploeDétail({ route, navigation }) {
  const { itemId, getConge, proprietaireId } = route.params;
  const [conge, setConge] = useState({});
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState('');
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddTaskModalVisible, setIsAddTaskModalVisible] = useState(false);

  useEffect(() => {
    if (getConge) {
      setConge(getConge);
    }
  }, [getConge]);

  useEffect(() => {
    if (proprietaireId) {
      axios.get(`http://192.168.195.216:3000/taches-by-proprietaire/${proprietaireId}`)
        .then(response => {
          setTasks(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [proprietaireId]);

  const handleAssignTask = () => {
    if (selectedTask) {
      axios.post('http://192.168.195.216:3000/assign-task', {
        userId: conge._id,
        taskId: selectedTask,
      })
      .then(response => {
        alert('Task assigned successfully');
        setIsModalVisible(false);
      })
      .catch(error => {
        console.error(error);
      });
    } else {
      alert('Please select a task');
    }
  };

  const handleAssignTasks = (taskId) => {
    if (taskId) {
      axios.post('http://192.168.195.216:3000/assign-task', {
        userId: conge._id,
        taskId: taskId,
      })
      .then(response => {
        alert('Task assigned successfully');
        setIsModalVisible(false);
      })
      .catch(error => {
        console.error(error);
      });
    } else {
      alert('Please select a task');
    }
  };

  const handleAddTask = () => {
    if (newTaskName && newTaskDescription) {
      axios.post('http://192.168.195.216:3000/add-tache', {
        tache: newTaskName,
        description: newTaskDescription,
        proprietaire: proprietaireId
      })
      .then(response => {
        alert('Task added successfully');
       console.log(response.data.Tache._id)
       handleAssignTasks(response.data.Tache._id)
        setNewTaskName('');
        setNewTaskDescription('');
        setIsAddTaskModalVisible(false);
        // Optionally fetch tasks again
        axios.get(`http://192.168.195.216:3000/taches-by-proprietaire/${proprietaireId}`)
          .then(response => {
            setTasks(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
    } else {
      alert('Please enter task name and description');
    }
  };

  return (
    <SafeAreaView style={{ height: HEIGHT, backgroundColor: 'white' }}>
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/back.png')}
            style={{ width: 40, height: 40 }}
          />
        </TouchableOpacity>
        <Image source={{ uri: getConge.avatar }} style={styles.image} resizeMode="contain" />
        <Text style={styles.title}>Informations l'ouvrier</Text>

        <View style={styles.contactCard}>
          <View style={styles.contactInfo}>
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>Ouvrier: </Text>
              <Text style={styles.contactValue}>{getConge.nom} {getConge.prenom}</Text>
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
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.acceptButton} onPress={() => setIsAddTaskModalVisible(true)}>
            <Text style={styles.buttonText}>Ajouter une tâche</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rejectButton} onPress={() => setIsModalVisible(true)}>
            <Text style={styles.buttonText}>Affecter une tâche</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rejectButton} onPress={() => {
            navigation.navigate("tacheEmpl", {
              itemId: conge._id,
              navigation: navigation,
            }) }} >
            <Text style={styles.buttonText}>Voir Taches</Text>
          </TouchableOpacity>
        </View>

        {/* Modal for Assigning Tasks */}
        <Modal
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Affecter une tâche</Text>
              <Picker
                selectedValue={selectedTask}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedTask(itemValue)}
              >
                <Picker.Item label="Select a task" value="" />
                {tasks.map(task => (
                  <Picker.Item key={task._id} label={task.tache} value={task._id} />
                ))}
              </Picker>
              <TouchableOpacity style={styles.assignButton} onPress={handleAssignTask}>
                <Text style={styles.buttonText}>Affecter</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
                <Text style={styles.buttonText}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal for Adding Tasks */}
        <Modal
          transparent={true}
          visible={isAddTaskModalVisible}
          onRequestClose={() => setIsAddTaskModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Ajouter une tâche</Text>
              <TextInput
                style={styles.input}
                placeholder="Nom de la tâche"
                value={newTaskName}
                onChangeText={setNewTaskName}
              />
              <TextInput
                style={styles.input}
                placeholder="Description de la tâche"
                value={newTaskDescription}
                onChangeText={setNewTaskDescription}
              />
              <TouchableOpacity style={styles.assignButton} onPress={handleAddTask}>
                <Text style={styles.buttonText}>Ajouter</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={() => setIsAddTaskModalVisible(false)}>
                <Text style={styles.buttonText}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 241,
    alignSelf: 'center',
    marginTop: 46,
    backgroundColor: "transparent",
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 19,
    alignSelf: 'center',
    marginTop: 11,
    marginBottom: 35,
  },
  contactCard: {
    flexDirection: 'row',
    backgroundColor: '#CDE8E5',
    marginBottom: 40,
    marginTop: 10,
    borderRadius: 11,
    shadowColor: '#000',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
    marginLeft: 10,
  },
  rejectButton: {
    backgroundColor: '#538392',
    borderRadius: 5,
    marginRight: 10,
    padding: 10,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  contactInfo: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    width: '81%',
  },
  contactRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  contactLabel: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#5C88C4',
  },
  contactValue: {
    fontSize: 16,
    color: 'black',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: WIDTH * 0.8,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  picker: {
    width: '100%',
    height: 50,
    marginBottom: 15,
  },
  assignButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    width: '100%',
  },
  closeButton: {
    backgroundColor: '#F44336',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    width: '100%',
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});
