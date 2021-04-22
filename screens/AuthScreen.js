import React from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity, Alert} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class AuthScreen extends React.Component{
    constructor(){
        super();
        this.state={
            emailid:'',
            pass:'',

        }
    }

    login=async(email,pass)=>{
        if(email && pass){
             try{
        const data = await  firebase.auth().signInWithEmailAndPassword(email,pass).then((Response)=>{
            return console.log("asdf");//Alert.alert( "logged in", "My Alert Msg", [ { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" }, { text: "OK", onPress: () => console.log("OK Pressed") } ] );
        });
                
          if(data){
             //this.props.navigation.navigate('Transaction');
          } 
       }catch(error){
         if(error.code=='auth/user-not-found'){
          Alert.alert( "use doesnt exist", "My Alert Msg", [ { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" }, { text: "OK", onPress: () => console.log("OK Pressed") } ] );
         }
         else if(error.code=='auth/invalid-email'){
  
          Alert.alert( "email id invalid", "eamilid envalid", [ { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" }, { text: "OK", onPress: () => console.log("OK Pressed") } ] );
         }
       }
     }
     else{
       Alert.alert( "Please enter your email id and password", "My Alert Msg", [ { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" }, { text: "OK", onPress: () => console.log("OK Pressed") } ] );
     }
  }

    signup=async(email,pass)=>{
        try{  
            firebase.auth().createUserWithEmailAndPassword(email,pass).then((response)=>{
                console.log("jkl;");
            return  Alert.alert("user created succesfully", "My Alert Msg", [ { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" }, { text: "OK", onPress: () => console.log("OK Pressed") } ] );
        })
    }
      catch(error){
          console.log("asfd");
          return Alert.alert( error.message+","+error.code, "My Alert Msg", [ { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" }, { text: "OK", onPress: () => console.log("OK Pressed") } ] );
      }

    }
    render(){
        return(
            <View>
              <TextInput
          //style={styles.inputBox}
           placeholder="email ID"
           keyboardType="email-address"
           onChangeText={(text)=>{this.setState({emailid:text})}}/>

           <TextInput
          //style={styles.inputBox}
           placeholder="password"
           secureTextEntry={true}
           onChangeText={(text)=>{this.setState({pass:text})}}/>

        <TouchableOpacity
          //style={styles.scanButton}
          onPress={()=>{
           this.login(this.state.emailid,this.state.pass)
          }}>
          <Text>Login</Text>
        </TouchableOpacity>
                
        <TouchableOpacity
         onPress={()=>{
            this.signup(this.state.emailid,this.state.pass)
           }}>        
            <Text>SignUp</Text>
        </TouchableOpacity>
            </View>
        )
    }
}