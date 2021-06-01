import React from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity, Alert,Modal, ScrollView, KeyboardAvoidingView,FlatList, ListItem} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import RequestDetails from './RequesterDetails';

export default class DonationScreen extends React.Component{
    constructor(){
        super();
        this.state={
            allRequests:[],
        };
    }

    componentDidMount=async()=>{
        this.getRequests();
    }

    getRequests=()=>{
        db.collection('Requests').onSnapshot((snapshot)=>{
            var dt= snapshot.docs.map(document=>document.data())
            this.setState({
                allRequests:dt
            })

        })
    }

    render(){
        return(
            <ScrollView>
               
    
    <FlatList  data={this.state.allRequests}
         renderItem={({item,index})=>(
            <View key={index} style={{backgroundColor:'red',borderWidth:2,marginTop:10}}>
                  <Text>{"Region: "+item.region}</Text>
                  <Text>{"Book Name: "+item.bookname} </Text>
                  <Text>{"EmailID: "+item.emailid}</Text>
                  <Text>{"TagedUsers: "+item.tagusers}</Text>
                  <TouchableOpacity style={{marginLeft:800,backgroundColor:'white',borderRadius:20}} onPress={()=>{
                       this.props.navigation.navigate('RequestDetailsScreen',{'details':item})
                  }}>
                      <Text>donate</Text>
                      {
//                          console.log(item)
                      }
                  </TouchableOpacity>
             </View>
         )} keyExtractor={(item,index)=>{
           index.toString();
         }} 
         onEndReachedThreshold={0.6}/>
            </ScrollView>
        )
    }
}