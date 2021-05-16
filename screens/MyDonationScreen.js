import React from 'react'
import {Text,View,ScrollView,FlatList,TouchableOpacity} from 'react-native'
import firebase from 'firebase'
import db from '../config'

export default class MyDonationScreen extends React.Component{
    constructor(){
        super();
        this.state={
            allDonations:[],
        };
    }

    componentDidMount=async()=>{
        this.getDonations();
    }

    getDonations=()=>{
        db.collection('Donations').where('donorid','==',firebase.auth().currentUser.email).onSnapshot((snapshot)=>{
            var dt= snapshot.docs.map(document=>document.data())
            this.setState({
                allDonations:dt
            })
        })
    }

    render(){
        return(
            <ScrollView>
               
    
    <FlatList  data={this.state.allDonations}
         renderItem={({item,index})=>(
            <View key={index} style={{backgroundColor:'red',borderWidth:2,marginTop:10}}>
                  <Text>{"Book Name: "+item.bookname} </Text>
                  <Text>{"RecieverID: "+item.userid}</Text>
                  <TouchableOpacity>
                      <Text>Send Book</Text>
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
