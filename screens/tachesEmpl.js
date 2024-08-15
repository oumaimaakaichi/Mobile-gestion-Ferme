import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export default function TachesE({ route, navigation }) {
  const { itemId, getConge, proprietaireId } = route.params;
  const [conge, setConge] = useState({});
  const [tasks, setTasks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (getConge) {
      setConge(getConge);
    }

   
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://192.168.195.216:3000/employeur/${itemId}/taches`);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [getConge, proprietaireId]);

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
        <Text style={{color:getStatusColor(item.status) , fontWeight:"bold"}} color={getStatusColor(item.status)}    >{item.status}</Text></View>
        <Text style={styles.contactLabel}>Description:</Text>
        <Text style={styles.contactValue}>{item.tache.description}</Text>
       
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
    <SafeAreaView style={{ height: HEIGHT, backgroundColor: 'white' }}>
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{marginTop:30 , marginBottom:20}}>
          <Image
            source={require('../assets/back.png')}
            style={{ width: 40, height: 40 }}
          />
        </TouchableOpacity>
        
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
       
        marginTop: 15,
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
    justifyContent: 'center',
    alignItems: 'center',
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
    color: '#5C88C4',
  },
  contactValue: {
    fontSize: 16,
    color: 'black',
  },
});
