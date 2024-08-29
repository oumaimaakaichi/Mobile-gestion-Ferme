import React, { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Card } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { REACT_APP_API_BASE_URL } from '@env';

const EmployeurList = ({ proprietaireId, navigation }) => {
  const [conges, setConges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchConges = async () => {
      try {
        const response = await axios.get(
          `${REACT_APP_API_BASE_URL}/users-by-owner/${proprietaireId}`
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

  return (
    <ScrollView style={styles.container}>
      {conges.map((conge) => (
        <Card
          key={conge._id}
          style={styles.card}
          onPress={() => {
            navigation.navigate("détailEmplo", {
              itemId: conge._id,
              getConge: conge,
              proprietaireId: proprietaireId,
              navigation: navigation,
            });
          }}
        >
          <Text style={styles.title}>
            Employé: {conge.nom} {conge.prenom}
          </Text>
          <Card.Content style={styles.cardContent}>
            <View style={styles.infoContainer}>
              <View style={styles.statusContainer}>
                <Text style={{ fontWeight: "bold" }}>Téléphone: </Text>
                <Text> {conge.Num_tel}</Text>
              </View>
              <View style={styles.statusContainer}>
                <Text style={{ fontWeight: "bold" }}>Cin: </Text>
                <Text> {conge.cin}</Text>
              </View>
            </View>

            <View style={styles.imageContainer}>
              <Image
                source={require("../../assets/so-removebg-preview.png")}
                style={styles.image}
              />
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
  card: {
    marginBottom: 10,
    backgroundColor: "whitesmoke",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoContainer: {
    flex: 1,
  },
  imageContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 110,
    color: "black",
    fontWeight: "bold",
  },
  image: {
    width: "120%",
    height: "120%",
    resizeMode: "cover",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
});

export default EmployeurList;
