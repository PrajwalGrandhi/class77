import React from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity, Alert,Modal, ScrollView, KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class RequestScreen extends React.Component{
    constructor(){
        super();
        this.state={
            bookname:'',
            region:'',
            tagusers:'',
            emailid:firebase.auth().currentUser.email,
        };
    }

    SubmitRequest=async(a,b,c)=>{
        db.collection('Requests').add({
            'bookname':a,
            'region':b,
            'tagusers':c,
            'emailid':this.state.emailid,
            'requestid':Math.random().toString(36).substring(10),
        });
        this.setState({
            bookname:'',
            region:'',
            tagusers:'',
            emailid:'',

        });
    }

    render(){
        return(
            <View>
                <KeyboardAvoidingView behavior="padding" enabled>
                <Text style={styles.header}>Request</Text>
        <TextInput
        style={styles.input}
        placeholder="Book Name"
        onChangeText = {(text)=>{this.setState({bookname: text})}}
      />
      <TextInput
        style={styles.input}
        placeholder="Region"
        onChangeText = {(text)=>{this.setState({region: text})}}
      />
        <TextInput
        style={styles.input}
        multiline={true}
        placeholder="Add User to tag."
        onChangeText = {(text)=>{this.setState({tagusers: text})}}
      />
        <TouchableOpacity style={styles.button}onPress={()=>{this.SubmitRequest(this.state.bookname,this.state.region,this.state.tagusers)}}>
            <Text>SUBMIT</Text>
        </TouchableOpacity>
            </KeyboardAvoidingView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    head:{
        textAlign: 'center', 
        fontSize: 50, 
        backgroundColor: '#FFC0CB', 
        padding: 20,
      },
      input: {
        alignSelf:'center',
        width: 300,
        height: 40,
        borderWidth: 1.5,
        fontSize: 20,
        paddingLeft:15,
        marginTop:25
      },
    button:{
        backgroundColor:'red',
        alignItems:'center',
        borderWidth:2,
        borderRadius:20,
        alignSelf:'center',
        padding:10,
        marginTop:10
    },

  });