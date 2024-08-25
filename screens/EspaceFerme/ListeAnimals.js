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
} from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { getClientData } from "../../utils/AsyncStorageClient";
import Toast from "react-native-toast-message";
import { useFocusEffect } from "@react-navigation/native";
const { width: WIDTH } = Dimensions.get("window");
export default function ListAnimal({ navigation }) {
  const [data, setData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const fetchData = async () => {
    const userData = await getClientData();
    const response = await fetch(
      `http://192.168.195.216:3000/AnimalParFerme/${userData?.Data?._id}`
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
  const deleteAnimal = async (id) => {
    console.log(id);
    try {
      await fetch(`http://192.168.195.216:3000/api/deleteAni/${id}`, {
        method: "DELETE",
      });
      Toast.show({
        type: "success",
        text1: "Succès",
        text2: "Animal supprimé",
        visibilityTime: 1000,
        position: "top",
      });
      fetchData();
    } catch (error) {
      console.error("Erreur lors de la suppression du Animal :", error);
    }
  };
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const renderItem = ({ item }) => {
    return (
      <>
        <View style={styles.itemContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("OneAnimal", {
                itemId: item._id,
                getAnimal: item,
                navigation: navigation,
              });
            }}
          >
            <View style={styles.itemContent}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.contactText}>Animal:</Text>

                <TouchableOpacity onPress={() => deleteAnimal(item._id)}>
                  <Image
                    source={require("../../assets/delete.png")}
                    style={{
                      tintColor: "red",
                      width: 25,
                      height: 25,
                      marginLeft: 190,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: "bold", marginStart: 10 }}>
                  Animal:{" "}
                </Text>
                <Text style={styles.WrapText}>{item.animal} </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.marginText}>Race: {item.race}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.marginText}>
                  Date entrée: {formatDate(item.createdAt)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.separator}></View>
      </>
    );
  };

  const filteredData = data
    ? data.filter(
        (item) =>
          item.animal.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.race.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Image
          source={require("../../assets/search.png")}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(237, 243, 247)",
    width: WIDTH - 30,
    alignSelf: "center",
    borderRadius: 7,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.6,
    borderColor: "#B692C2",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 20,
    height: 50,
    marginLeft: 5,
    width: "95%",
    padding: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: "#B692C2",
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
    color: "black",
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
    marginTop: 7,
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
  },
  separator: {
    height: 1,
    backgroundColor: "#F0F0F0",
  },
});
