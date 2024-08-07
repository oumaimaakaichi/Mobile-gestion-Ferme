import React , {useEffect, useRef} from 'react';
import {Text, StyleSheet, View, Image , Pressable , ScrollView , SafeAreaView,Dimensions} from 'react-native';
import Svg, {G, Circle} from 'react-native-svg'
import logo from '../assets/so-removebg-preview.png'
import logo1 from '../assets/lopp-removebg-preview.png'
import { TouchableOpacity, Animated } from 'react-native';
import {AntDesign} from '@expo/vector-icons';
const {width:WIDTH} =Dimensions.get('window')
const {height:HEIGHT} =Dimensions.get('window')

const OnBoardScreenL = ({navigation}) => {

const size= 128;
const strokeWidth = 2;
const center = size / 2;
const radius = size / 2 - strokeWidth / 2
  const circumference = 2 * Math.PI * radius;
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef=  useRef(null);

const animation = (toValue) => {
  return Animated.timing(progressAnimation, {
    toValue,
    duration: 250,
    useNativeDriver: true
  }).start()
}
  return (
    <SafeAreaView style={{flex: 1}}>
    <ScrollView style={styles.scrollView}>
    <View style={{
      
        flexDirection: "row",
        marginBottom:100,
        
      
      }}> 
    <View style={{
        left:0,
        alignItems:'center',
        alignContent:'center',
        backgroundColor:'#79C2BE',
       
        width:WIDTH/2,
        height:HEIGHT+50
      }}>
        <Text  style={
            {
              alignItems:'center',
              textAlign:'center',
              
    
              marginTop:50,
           color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: '30%',
   // fontFamily: 'MMA Champ',
   fontWeight: "bold",
            }
  
        }>Êtes-vous un employeur  ?</Text>
         <Image source={logo}  style={{
        width: 200,
        height: 220,
       
        top: -20,
        left: 0,
        marginTop: 90,}}/>  
         <View style={styles.container} >
               <Svg width={size} height={size}>
              <G rotation="-90" origin={center}>
            <Circle stroke="#E6E7E8" cx= {center} 
            cy= {center} r= {radius} strokeWidth= {strokeWidth}  top={-100}/>
          <Circle 
          
          ref={progressRef}
          stroke= "#6482AD"
          cx={center}
          cy={center}
          r= {radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (circumference* (-60)) / 100}
          size={20}
          onPress={() => navigation.navigate('loginE')}
          />
</G> 
  </Svg> 
  <TouchableOpacity style={styles.button} activeOpacity={0.6}  onPress={() => navigation.navigate('loginE')}>
<AntDesign  name= "arrowleft" size={20} color="#fff" />
</TouchableOpacity>  
  </View>
      </View>
      <View style={{
       right: 0,
       alignItems:'center',
       alignContent:'center',
      backgroundColor:'white',
      resizeMode: "contain",
      width:WIDTH/2,
      height:HEIGHT+50
    }}>
      <Text style={
          {
            alignItems:'center',
              textAlign:'center',
              
            
              
             
              marginTop:50,
              color: 'black',
              fontSize: 25,
              fontWeight: 'bold',
              marginBottom: '30%',
          
               fontWeight: "bold",
          }

      }>Êtes-vous une Ferme ?</Text>
       <Image source={logo1}  style={{
    width: 170,
  
    height: 200,
    marginEnd:30,
    marginBottom:50,
    justifyContent: 'space-between',
    right:-15,
    
  
    top: -35,
    marginTop: 120,}}/>
 
        <View style={styles.container} top={-30}>
               <Svg width={size}  height={size}  >
              <G rotation="-90" origin={center} >
            <Circle stroke="#E6E7E8" cx= {center} 
            cy= {center} r= {radius} strokeWidth= {strokeWidth} />
          <Circle 
          ref={progressRef}
          onPress={() => navigation.navigate('signin')}
          stroke= "#6482AD"
       
          cx={center}
          cy={center}
          r= {radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (circumference* 60) / 100}
          size={20}
/>
</G> 
  </Svg> 
  <TouchableOpacity  style={styles.button} activeOpacity={0}  onPress={() => navigation.navigate('LoginC')} >
<AntDesign onPress={() => navigation.navigate('LoginC')}  name= "arrowright" size={20} color="white"/>
</TouchableOpacity>  
  </View>
       </View>  
      </View>
      </ScrollView>
      
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container : {

    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',

      },
      logo:{
        width:150,
        height:150,
      },
      scrollView: {
       
        marginVertical: 0,
        marginBottom:-50
      },
    
      button: {
    position: 'absolute',
    backgroundColor: '#6482AD',
    borderRadius: 100,
    padding: 20,
  
      },
    
      
});

export default OnBoardScreenL;