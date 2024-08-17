import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export default function ListTaskkk({ route, navigation , proprietaireId }) {

  const [conge, setConge] = useState({});
  const [tasks, setTasks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleMarkAsDone = async (taskId) => {
    try {
      await axios.put(`http://192.168.195.216:3000/utilisateur/${proprietaireId}/taches/${taskId}`);
     
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.tache._id === taskId ? { ...task, status: 'Terminé' } : task
        )
      );
    } catch (error) {
      console.error('Error marking task as done:', error);
    }
  };
  
  useEffect(() => {
    
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://192.168.195.216:3000/employeur/${proprietaireId}/taches`);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [ proprietaireId]);

  const getStatusColor = (status) => {
    return status === 'En attente' ? '#4A90E2' : '#4CAF50'; 
  };

  const renderTaskCard = ({ item }) => (
    <View style={[styles.contactCard]}>
      <View style={styles.taskDetails}>
        <View style={styles.row}>
        <Text style={styles.contactLabel}>Tâche:     </Text>
        <Text style={styles.contactValue}>{item.tache.tache}</Text>
        </View>
        <View style={styles.row}>
        <Text style={styles.contactLabel}>Status:    </Text>
        <Text style={{color:getStatusColor(item.status) , fontWeight:"bold" , marginBottom:10 , fontSize:16}} color={getStatusColor(item.status)}    >{item.status}</Text></View>
        <Text style={styles.contactLabel}>Description:</Text>
        <Text style={styles.contactValue}>{item.tache.description}</Text>
        
        
        {item.status !=="Terminé" &&(<TouchableOpacity style={styles.acceptButton}      onPress={() => handleMarkAsDone(item.tache._id)}>
                <Text style={styles.buttonText}>Marquer  comme Terminé</Text>
              </TouchableOpacity>)}
      </View>
      <View style={styles.taskImage}>
        <Image
          source={require('../assets/90dc71febd99aa453d06cfbb616d2739-removebg-preview.png')}
          style={styles.image}
        />
      </View>

    </View>
  );

  return (
    <SafeAreaView style={{ height: HEIGHT, backgroundColor: 'white' ,marginTop:20 }}>
      <ScrollView>
       
        
        <FlatList
          data={tasks}
          renderItem={renderTaskCard}
          keyExtractor={(item) => item.tache._id}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    contactCard: {
        flexDirection: 'row',
        backgroundColor: '#CDE8E5',
        
        marginTop: 10,
        borderRadius: 11,
        shadowColor: '#000',
        width:"160px",
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
      row: {
        flexDirection: 'row',
        alignItems: 'center',
      },
  taskDetails: {
    flex: 1,
    flexDirection: 'column',
  },
  taskImage: {
    width: 100,
    height: 100, 
    
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  contactLabel: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
    marginBottom:10
  },
  contactValue: {
    fontSize: 16,
    color: 'black',
    marginBottom:10
  },
  acceptButton: {
    backgroundColor: '#538392',
    borderRadius: 5,
    padding: 10,
    flex: 1,
   
    alignItems: 'center',
    
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
});
