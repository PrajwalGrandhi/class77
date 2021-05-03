import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator,DrawerItems } from 'react-navigation-drawer';

import AuthScreen from './screens/AuthScreen';
import RequestScreen from './screens/RequestScreen';
import DonationScreen from './screens/DonationScreen';
import Drawer from './screens/Drawer';
import SettingScreen from './screens/SettingsScreen';

export default class App extends React.Component{
  render(){
    return(
          <AppContainer/>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  RequestScreen: {screen:RequestScreen},
  DonationScreen: {screen:DonationScreen},
},
{
  defaultNavigationOptions: ({navigation})=>({
    tabBarIcon: ()=>{
      const routeName = navigation.state.routeName;
      //console.log(routeName)
      if(routeName === "RequestScreen"){
        return(
          <Image
          source={require("./assets/request.png")}
          style={{width:40, height:40}}
        />
        )

      }
      else if(routeName === "DonationScreen"){
        return(
          <Image
          source={require('./assets/donate.png')}
          style={{width:40, height:40}}
        />)

      }
    }
  })
}
);

const AppDrawerNavigator=createDrawerNavigator({SideDrawer:{screen:TabNavigator},SettingScreen:{screen:SettingScreen}},{contentComponent:Drawer},{initialRouteName:'SideDrawer'})

const switchNavigator=createSwitchNavigator({LoginScreen:{screen:AuthScreen},Drawer:{screen:AppDrawerNavigator}})

const AppContainer =  createAppContainer(switchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});