import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  TextInput,
  Image,
  Modal
} from "react-native";
import { getClientData } from "../utils/AsyncStorageClient";
import axios from "axios";
import { useFocusEffect } from '@react-navigation/native';

const { width: WIDTH } = Dimensions.get('window');

export default function ListStock({ navigation }) {
  const [data, setData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [editStock, setEditStock] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const fetchData = async () => {
    const userData = await getClientData();
    const response = await fetch(
      `http://192.168.195.216:3000/stocks-by-owner/${userData?.Data?._id}`
    );
    const jsonData = await response.json();
    setData(jsonData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const handleEdit = async () => {
    try {
      const response = await axios.patch(`http://192.168.195.216:3000/update-stock/${editStock._id}`, editStock);
      setData(prevData => prevData.map(item => item._id === editStock._id ? response.data : item));
      setModalVisible(false);
      fetchData()
    } catch (error) {
      console.error(error);
    }
  };

  const edit = (item) => {
    setEditStock(item);
    setModalVisible(true);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const renderItem = ({ item }) => {
    return (
      <>
        <View style={styles.itemContainer}>
          <View style={styles.itemContent}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.contactText}>Stock:</Text>

              <TouchableOpacity
                onPress={() => edit(item)}
                style={{ marginLeft: 180 }}
              >
                <Image
                  source={require('../assets/settings_reload_update_icon_188616.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold", marginStart: 10 }}>Produit: </Text>
              <Text style={styles.WrapText}>{item.nomProduit} </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.marginText}>Stock: </Text>
              <Text style={{ color: item.quantite <= 20 ? 'red' : 'green', marginTop: 7, fontWeight: "bold", fontSize: 18 }}>
                {item.quantite}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.marginText}>Date Peremption: {formatDate(item.date_peremption)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.separator}></View>
      </>
    );
  };

  const filteredData = data
    ? data.filter(
        (item) => item.nomProduit && item.nomProduit.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Image
          source={require('../assets/search.png')}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
          placeholder="Rechercher"
        />
      </View>
      <View style={styles.listContainer}>
        {data == null ? (
          <Text>Loading</Text>
        ) : (
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item) => item._id.toString()}
          />
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Modifier les informations de produit</Text>
          <Text style={styles.modalTitlee}>Quantité:</Text>
          <TextInput
            style={styles.inputs}
            placeholder="quantité"
            keyboardType="numeric"
            defaultValue={editStock.quantite?.toString()}
            onChangeText={(text) => setEditStock({ ...editStock, quantite: parseInt(text) })}
          />
           <Text style={styles.modalTitleee}>Date Peremption:</Text>
          <TextInput
            style={styles.inputs}
            placeholder="Date Peremption:"
            defaultValue={formatDate(editStock.date_peremption)}
            onChangeText={(text) => setEditStock({ ...editStock, date_peremption: text })}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={handleEdit} style={styles.saveButton}>
              <Text style={styles.buttonText}>Enregistrer</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(237, 243, 247)",
    width: WIDTH - 30,
    alignSelf: 'center',
    borderRadius: 7
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.6,
    borderColor: '#79C2BE',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 20,
    height: 50,
    marginLeft: 5,
    width: "95%",
    padding: 10
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: "#79C2BE"
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    borderWidth: 0,
  },
  listContainer: {
    flex: 1,
    marginTop: 10,
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 11,
    marginTop: 10,
    borderRadius: 10,
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
  itemContent: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
  },
  contactText: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#7FA1C3"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  boldText: {
    fontWeight: "bold",
    marginStart: 10,
  },
  marginText: {
    marginStart: 10,
    marginTop: 7
  },
  WrapText: {
    marginStart: 2,
    fontSize: 13,
    marginBottom: 7,
  },
  icon: {
    width: 35,
    height: 35,
    marginStart: 20,
    tintColor: "#50B498"
  },
  separator: {
    height: 1,
    backgroundColor: "#F0F0F0",
  },
  modalView: {
    margin: 20,
    marginTop: 80,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
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
    fontWeight: 'bold',
    color: '#3AA6B9',
    marginBottom: 50,
  },
  modalTitlee: {
 marginRight:130,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  modalTitleee: {
    marginRight:70,
       fontSize: 16,
       fontWeight: 'bold',
       color: 'black',
       marginBottom: 10,
     },
  inputs: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#0147A6',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#3AA6B9',
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
