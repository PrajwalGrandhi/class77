import React from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity, Alert,Modal, ScrollView, KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import {Card} from 'react-native-elements';
export default class RequestDetails extends React.Component{
    constructor(props){
        super(props);
        this.state={
            details:this.props.navigation.getParam('details'),
            userid:this.props.navigation.getParam('details')['emailid'],
            userphone:0,
            username:'',
            useraddress:'',
            bookname:this.props.navigation.getParam('details')['bookname'],
            tagusers:this.props.navigation.getParam('details')['tagusers'],
            donorid:firebase.auth().currentUser.email,

        };
    }
 
    componentDidMount(){
this.getUserDetails();
    }

    getUserDetails=()=>{
db.collection('UserDetails').where('emailid',"==",this.state.userid).get().then(snapshot=>{snapshot.forEach(doc=>{
    this.setState({
        userphone:doc.data().phone_no,
        username:doc.data().name,
        useraddress:doc.data().address,
    })}
    )});
    }

    updateTransaction=()=>{
db.collection('Donations').add({
bookname:this.state.bookname,
donorid:this.state.donorid,
userid:this.state.userid,
status:"donor interested",
readstatus:'unread',
})
    }

    addNotification=()=>{
        db.collection('Notifications').add({
            userid:this.state.userid,
            readstatus:'unread',
            status:"donor interested",
            donorid:this.state.donorid,
            bookname:this.state.bookname,
            date:firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    sendNotificaition=()=>{
db.collection('Notifications').where('donorid','==',this.state.donorid).where('userid','==',this.state.userid).onSnapshot((snapshot)=>{
    snapshot.forEach((doc)=>{
        var message;
        if(status=="book sent"){
message=this.state.donorid+"sent you the book."
        }else{
message=this.state.donorid+"has interest."
        }
db.collection('Notification').doc(doc.id).update({
    status:message,
})
    })
    
})
    }
    render(){
        return(
            <View>
                  <Card>
                  <Text>{"Book Name: "+this.state.bookname} </Text>
                  </Card>

                  <Card>
                  <Text>{"EmailID: "+this.state.emailid}</Text>
                  </Card>

                    <Card>
                    <Text>{"Phone No: "+this.state.userphone}</Text>
                    </Card>
                    <Card>
                        <Text>{"Address: "+this.state.useraddress}</Text>
                    </Card>
                    <View>
                    {
                        
                        (this.state.userid!=this.state.donorid)?
                                (
                                <TouchableOpacity onPress={()=>{
                                    this.updateTransaction()
                                    this.addNotification()
                                    this.sendNotificaition()
                                    this.props.navigation.navigate('DonationScreen')
                                    }}>
                                    <Text>Donate</Text>
                                </TouchableOpacity>
                                ):null
                    }
                    </View>
            </View>
        );
    }
}