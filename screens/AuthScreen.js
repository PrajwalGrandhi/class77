import React from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity, Alert,Modal, ScrollView, KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class AuthScreen extends React.Component{
    constructor(){
        super();
        this.state={
            emailid:'',
            pass:'',
            visibilty:true,
            name:'',
            phoneno:0,
            address:'',
            conpass:'',

                }
    }

    login=async(email,pass)=>{
        if(email && pass){
             try{
        const data = await  firebase.auth().signInWithEmailAndPassword(email,pass).then((Response)=>{
            return this.props.navigation.navigate('RequestScreen');//Alert.alert( "logged in", "My Alert Msg", [ { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" }, { text: "OK", onPress: () => console.log("OK Pressed") } ] );
        });
                
          if(data){
             this.props.navigation.navigate('RequestScreen');
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

    signup=async(email,pass,conpass)=>{
      if(pass!=conpass){
        Alert.alert("password mismatched");
      }
        else{
          try{  
            firebase.auth().createUserWithEmailAndPassword(email,pass).then((response)=>{
              
                db.collection('UserDetails').add({
                  'phone_no':this.state.phoneno,
                  'address':this.state.address,
                  'emailid':this.state.emailid,
                  'name':this.state.name,
                  'password':this.state.conpass,
                  'userid':Math.random().toString(36).substring(10),
                })
            return this.props.navigation.navigate('DonationScreen');
        })
    }
      catch(error){
          //console.log("asfd");
          return Alert.alert( error.message+","+error.code, "My Alert Msg", [ { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" }, { text: "OK", onPress: () => console.log("OK Pressed") } ] );
      } 
        }
    }

    displayForm=()=>{
      return(
        <View>
        <Modal
          visible={true}
          animationType="slide"
          transparent={true}
        >
          <ScrollView>
            <KeyboardAvoidingView>
            <TextInput
          //style={styles.inputBox}
           placeholder="Enter your name: "
           onChangeText={(text)=>{this.setState({name:text})}}/>

            <TextInput
          //style={styles.inputBox}
           placeholder="email ID"
           keyboardType="email-address"
           onChangeText={(text)=>{this.setState({emailid:text})}}/>

            <TextInput
          //style={styles.inputBox}
           placeholder="Your Phone no: "
           onChangeText={(text)=>{this.setState({phoneno:text})}}/>

            <TextInput
          //style={styles.inputBox}
           placeholder="Your Address: "
           onChangeText={(text)=>{this.setState({address:text})}}/>
           <TextInput
          //style={styles.inputBox}
           placeholder="password"
           secureTextEntry={true}
           onChangeText={(text)=>{this.setState({pass:text})}}/>
              <TextInput
          //style={styles.inputBox}
           placeholder="confirm password"
           secureTextEntry={true}
           onChangeText={(text)=>{this.setState({conpass:text})}}/>

        <TouchableOpacity
         onPress={()=>{
            this.signup(this.state.emailid,this.state.pass,this.state.conpass)
            this.setState({visibilty:false});
           }}>        
            <Text>Submit</Text>

        </TouchableOpacity>

            </KeyboardAvoidingView>
          </ScrollView>
        </Modal>
        </View>
      );
    }

    render(){
        return(
            <View>
             {this.displayForm()}
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
          //  this.setState({
          //    visibilty:true,

          //  });
            //this.displayForm()
           }}>        
            <Text>SignUp</Text>
        </TouchableOpacity>

            </View>
        )
    }
}