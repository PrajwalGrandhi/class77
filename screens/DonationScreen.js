import React from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity, Alert,Modal, ScrollView, KeyboardAvoidingView,FlatList} from 'react-native';
import firebase from 'firebase';
import db from '../config';

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
            <View>
                <FlatList  data={this.state.allRequests}
         renderItem={({item})=>(
            <View style={{backgroundColor:'red',borderWidth:10,marginTop:10}}>
                  <Text>{"BookName: "+item.bookname}</Text>
                  <Text>{"Region: "+item.region} </Text>
                  <Text>{"EmailID: "+item.emailid}</Text>
                  <Text>{"TagedUsers: "+item.tagusers}</Text>
             </View>
         )} keyExtractor={(item,index)=>{
           index.toString();
         }} 
         //onEndReached={this.loadMore()}
         onEndReachedThreshold={0.6}/>
            </View>
        )
    }
}