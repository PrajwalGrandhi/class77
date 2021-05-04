import React from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity, Alert,Modal, ScrollView, KeyboardAvoidingView,FlatList, ListView} from 'react-native';
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
        const data=await db.collection('Requests').get();

    data.docs.map((doc)=>{
      this.setState({allRequests:[...this.state.allRequests,doc.data()]})
    })
    }
    getRequests=async()=>{
        db.collection('Requests').onSnapshot((snapshot)=>{
            var data= snapshot.docs.map(document=>document.data())
            this.setState({
                allRequests:data
            })

        })
    }

    render(){
        return(
            renderItem = ( {item, i} ) =>( 
            <ListItem key={i} title={item.bookname} 
            subtitle={item.region,item.emailid,item.tagusers} titleStyle={{ color: 'black', fontWeight: 'bold' }} 
            rightElement={
                 <TouchableOpacity onPress={()=>{this.props.navigation.navigate('RequestDetails',{'details':item})}}> <Text style={{color:'#ffff'}}>Send Book</Text> </TouchableOpacity> } bottomDivider /> 
                 )
        )
    }
}