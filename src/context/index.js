import React, { useState, useEffect, createContext } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from "./../config/firebaseConfig"; // Make sure to import 'auth' from firebaseConfig

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null); 
  const [signedIn, setSignedIn] = useState(null);

  function onAuthStateChanged(user) {
    if (initializing) setInitializing(false);
  }

  function signUp( email, password ) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        setSignedIn(true);
        console.log("User account created & signed in!");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }

        console.error(error);
      });
  }

  function signIn( email, password ) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        setSignedIn(true);
        console.log("User account created & signed in!");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }

        console.error(error);
      });
  }

  function handleSignOut() {
    signOut(auth)
      .then(() =>{
        setSignedIn(false);
        setUser(null);
        console.log("User signed out!")})
      .catch(error => console.error("Error signing out:", error));
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged); 
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signedIn, signUp, handleSignOut }}> 
      {children}
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthProvider;
