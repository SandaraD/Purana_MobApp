import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, Animated, ImageBackground } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { FontAwesome } from '@expo/vector-icons';

export default function SignUpScreen({ navigation }) {

//statae Initialize for email and password input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [fadeAnimation] = useState(new Animated.Value(0)); 


  //fade animation for the form container
  React.useEffect(() => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnimation]);

  const handleSignUp = async () => {
    try {
      setError(null);
      setSuccess(null);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setSuccess(`User ${user.email} registered successfully!`);
      navigation.navigate("SignIn"); 
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ImageBackground
        source={require("../assets/sigiriya.jpg")}
        style={styles.background}
      >
        <Animated.View style={[styles.formContainer, { opacity: fadeAnimation }]}>
        <Text style={styles.title}>
        Sign Up
        </Text>

          {success && <Text style={styles.successMessage}>{success}</Text>}
          {error && <Text style={styles.errorMessage}>{error}</Text>}

          <View style={styles.inputContainer}>
            <FontAwesome
              name="envelope"
              size={20}
              color="#023047"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={setEmail}
              value={email}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <FontAwesome
              name="lock"
              size={20}
              color="#023047"
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.input, { borderColor: "lightgray" }]}
              placeholder="Password"
              secureTextEntry
              onChangeText={setPassword}
              value={password}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>
                Sign Up
                </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={styles.signInText}>
              Already have an account? Sign In
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "90%",
    maxWidth: 400,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "rgba(255, 255, 255, 0.7)",  
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#555", 
    shadowOpacity: 0.2,

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
  signInText: {
    fontSize: 16,
    color: "#023047",
    textAlign: "center",
    textDecorationLine: "underline",
  },
});




