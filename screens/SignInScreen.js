import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Animated, ImageBackground } from "react-native";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { FontAwesome } from '@expo/vector-icons';

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); 
  const [success, setSuccess] = useState(null); 
  const [fadeAnim] = useState(new Animated.Value(0)); 

 //animation
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  // handling email and password 
  const handleSignIn = async () => {
    try {
      setError(null); 
      setSuccess(null); 
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setSuccess(`Welcome back, ${user.email}!`);
      
    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <ImageBackground 
      source={require('../assets/sigiriya.jpg')}
      style={styles.container}
    >
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Animated.View style={[styles.formContainer, { opacity: fadeAnim }]}>
          <Text style={styles.title}>Sign In</Text>

          {success && <Text style={styles.successMessage}>{success}</Text>}
          {error && <Text style={styles.errorMessage}>{error}</Text>}

          <View style={styles.inputContainer}>
            <FontAwesome name="envelope" size={20} color="#023047" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={setEmail}
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <FontAwesome name="lock" size={20} color="#023047" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={setPassword}
              value={password}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  formContainer: {
    width: "90%",
    maxWidth: 400,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "rgba(255, 255, 255, 0.7)", 
    borderRadius: 15,
    elevation: 5, 
    shadowColor: "#000", 
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#023047",
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: "#ddd",
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    paddingLeft: 10,
    fontSize: 16,
    color: "#023047",
  },
  button: {
    height: 50,
    backgroundColor: "#023047",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  googleButton: {
    height: 50,
    backgroundColor: "#4285F4",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  googleButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  successMessage: {
    fontSize: 16,
    color: "green",
    textAlign: "center",
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  signUpText: {
    fontSize: 16,
    color: "#023047",
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
