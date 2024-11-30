import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Card, Title, Paragraph, Avatar } from "react-native-paper";
import { auth } from "../firebase/firebase"; // Firebase auth

export default function ProfileScreen({ navigation }) {
  const handleLogout = async () => {
    try {
      await auth.signOut();
      alert("Logged out successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* User Info Card */}
      <Card style={styles.card}>
        <Card.Title
          title="Profile"
          subtitle={auth.currentUser?.email || "No User"}
          left={(props) => <Avatar.Icon {...props} icon="account" />}
        />
        <Card.Content>
          <Title>Welcome!</Title>
          <Paragraph>
            Manage your account and log out below. Stay connected!
          </Paragraph>
        </Card.Content>
      </Card>

      {/* Logout Button */}
      <Button
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonText}
        onPress={handleLogout}
      >
        Log Out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  card: {
    width: "100%",
    marginBottom: 20,
    backgroundColor: "white",
    elevation: 3,
  },
  button: {
    width: "100%",
    backgroundColor: "#023047", // Matches your preferred color
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
