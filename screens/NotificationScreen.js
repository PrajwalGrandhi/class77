import React from 'react'
import {Text,View,ScrollView,FlatList,TouchableOpacity} from 'react-native'
import firebase from 'firebase'
import db from '../config'
import SwipeNotification from '../components/SwipeNotification'

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
            <View>
        {
                (this.state.allNotification.length!=0)?(
                <SwipeNotification allNotification={this.state.allNotification}/>
                )
            :(
                <View>
                <Text>No Notifications</Text>
                </View>
             )
        }
                </View>
        )
    }
}