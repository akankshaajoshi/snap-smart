import React from 'react'
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext } from "react";
import { AuthContext } from "./context";
import Ionicons from "react-native-vector-icons/Ionicons";
import Login from "./Login";
import Signup from "./Signup";
import ImgToText from './ImgToText';
import DetectObject from "./Analyzer";

const Tab = createBottomTabNavigator();

function HomeScreen() {
    return (
      <View style={styles.container}>
        <DetectObject  />
        <StatusBar style="auto" />
      </View>
    );
  }
  
  function SignOut(){
    const {handleSignOut} = useContext(AuthContext);
    return (
      <View style={styles.center}>
        <TouchableOpacity style={styles.signout} onPress={handleSignOut}>
          <Text style={styles.white}>
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

const NavigationMenu = () => {
  const {signedIn} = useContext(AuthContext);
  return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Analyzer") {
                iconName = focused ? "search-circle" : "search-circle-outline";
              } else if (route.name === "Login") {
                iconName = focused ? "log-in" : "log-in-outline";
              }else if(route.name=== 'Sign Up'){
                iconName = focused? 'person-add' : 'person-add-outline'
              }else if(route.name === 'Sign Out'){
                iconName = focused? 'log-out' : 'log-out-outline'
              }else if(route.name === 'To Text'){
                iconName = focused? 'text': 'text-outline'
              }else if(route.name === 'Video'){
                iconName = focused? 'videocam' : 'videocam-outline'
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "purple",
            tabBarInactiveTintColor: "gray",
          })}
        >
          {signedIn? <>
            <Tab.Screen name="Analyzer" component={HomeScreen} />
            <Tab.Screen name="To Text" component={ImgToText} />
            <Tab.Screen name="Sign Out" component={SignOut} />
          </>: <>
          <Tab.Screen name="Login" component={Login} />
          <Tab.Screen name="Sign Up" component={Signup} />
          </>
        }
        </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    signout: {
        padding: 10,
        backgroundColor: "red",
    },
    white: {
        color: "white"
    }
  });

export default NavigationMenu