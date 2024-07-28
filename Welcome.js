import React, { useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import h from "./assets/3da81dada38bc46f89f8afee05bdbf56-removebg-preview.png";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Welcome = ({ navigation }) => {
  useEffect(() => {
    if (navigation) {
      const timer = setTimeout(() => {
        navigation.navigate("LoginC");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FarmManager</Text>
      <Image source={h} style={styles.logo} resizeMode="contain" />
    
      <Text style={styles.text}>
  Avec <Text style={styles.highlight}>FarmManager</Text>, nous facilitons la gestion de votre ferme pour que vous puissiez vous concentrer sur l'essentiel.
</Text>


      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("LoginC")} 
      >
        <Text style={styles.buttonText}>Commencer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: "Arial", 
    lineHeight: 24, 
    flex: 1,
    backgroundColor: "#219C90",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -screenHeight * 0.4,
  },
  logo: {
    width: screenWidth *1.2, // 80% de la largeur de l'écran
    height: screenHeight * 0.4, // 50% de la hauteur de l'écran
    marginTop: screenHeight *0.05
    ,
  },
  button: {
    width: 250,
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 60,
    alignItems: "center",
    backgroundColor: "#01BACF", // Correction ici
  },

  buttonText: {
    color: "#FFFFFF", // Couleur du texte du bouton
    fontSize: 16, // Taille de police du texte du bouton
    fontWeight: "bold", // Gras pour le texte du bouton
  },
  texte: {
    textAlign: "center",

    fontSize: 18, // Changer la taille de la police selon vos préférences
    color: "#ffffff", // Couleur du texte en blanc
  },
  title: {
    marginTop: screenHeight * 0.4,
    // Utilisation de la police Arial
    fontSize: 22,
    color: "#ffffff",
    fontFamily: "Sevillana-Regular",
  },
  text: {
    color: "#FFFFFF", // Couleur du texte en blanc
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Arial", // Changer la police selon vos préférences
    lineHeight: 24, // Espacement des lignes
    marginHorizontal: 20, // Marge horizontale
    marginTop: 20, // Marge supérieure
  },
  highlight: {
    fontWeight: "bold", // Texte en gras
    color: "#01BACF", // Couleur du texte en surbrillance
    fontFamily: "Arial", // Changer la police selon vos préférences
  },
});

export default Welcome;