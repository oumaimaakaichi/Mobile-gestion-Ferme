import React, { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Card } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { REACT_APP_API_BASE_URL } from '@env';

import { getClientData } from "../../utils/AsyncStorageClient";
const ListeC = ({ proprietaireId, navigation }) => {
  const [conges, setConges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchConges = async () => {
      const userData = await getClientData();
      try {
        const response = await axios.get(
          `http://192.168.177.216:3000/conge/${userData.Data._id}`
        );
        setConges(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConges();
  }, [proprietaireId]);

  const filteredConges =
    statusFilter === "All"
      ? conges
      : conges.filter((conge) => conge.status === statusFilter);

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

  return (
    <ScrollView style={styles.container}>
      {conges.map((conge) => (
        <Card key={conge._id} style={styles.card}>
          <Card.Content>
            <View style={styles.row}>
              <View style={styles.infoContainer}>
                <Text style={styles.title}>
                  Employé: {conge.employeur.nom} {conge.employeur.prenom}
                </Text>

                <View style={styles.statusContainer}>
                  <Text style={{ fontWeight: "bold" }}>Date Début: </Text>
                  <Text> {new Date(conge.dateDébut).toLocaleDateString()}</Text>
                </View>

                <View style={styles.statusContainer}>
                  <Text style={styles.label}>Date Fin: </Text>
                  <Text style={styles.value}>
                    {conge.dateFin
                      ? new Date(conge.dateFin).toLocaleDateString()
                      : "Non spécifiée"}
                  </Text>
                </View>

                <View style={styles.statusContainer}>
                  <Text style={{ fontWeight: "bold" }}>Status: </Text>
                  <Text style={getStatusStyle(conge.status)}>
                    {conge.status}
                  </Text>
                </View>
              </View>
              <View style={styles.imageContainer}>
                <Image
                  source={require("../../assets/dema-removebg-preview.png")}
                  style={styles.image}
                />
              </View>
            </View>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 30,
  },
  filterContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "whitesmoke",
    borderRadius: 10,
    width: 320,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginBottom: 1,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  card: {
    marginBottom: 10,
    backgroundColor: "whitesmoke",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoContainer: {
    flex: 1,
  },
  imageContainer: {
    width: 85,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
    marginRight: 5,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    color: "black",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  pending: {
    color: "#009FBD",
    fontWeight: "bold",
  },
  accepted: {
    color: "green",
    fontWeight: "bold",
  },
  rejected: {
    color: "red",
    fontWeight: "bold",
  },
  default: {
    color: "black",
  },
});

export default ListeC;
