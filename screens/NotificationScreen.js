import React from 'react'
import {Text,View,ScrollView,FlatList,TouchableOpacity} from 'react-native'
import firebase from 'firebase'
import db from '../config'

export default class NotificationScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
allNotification:[],

        }
    }
    componentDidMount(){
    this.getNotifications();
    }

    getNotifications=()=>{
db.collection('Notifications').where('userid','==',firebase.auth().currentUser.email).where('readstatus','==',"unread").onSnapshot((snapshot)=>{
    var dt= snapshot.docs.map(document=>document.data())
    this.setState({
        allNotification:dt
    })
})
    }

    
    render(){
        return(
            <ScrollView>
               
            <FlatList  data={this.state.allNotification}
                 renderItem={({item,index})=>(
                    <View key={index} style={{backgroundColor:'red',borderWidth:2,marginTop:10}}>
                          <Text>{"Book Name: "+item.bookname} </Text>
                          <Text>{"RecieverID: "+item.userid}</Text>
                          <Text>{"DonorID: "+item.donorid}</Text>
                          <Text>{"Date: "+item.date}</Text>
                          <Text>{"Message: "+item.status}</Text>
                          <Text>{"Status: "+item.readstatus}</Text>
                          <TouchableOpacity>
                              <Text></Text>
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