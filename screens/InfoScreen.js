import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, Image, Text,ScrollView, ActivityIndicator, TouchableOpacity, Linking} from "react-native";
import axios from "axios";
import MapView, { Marker } from "react-native-maps";

const InfoScreen = ({ route }) => {
  const { siteId } = route.params; 
  const [siteData, setSiteData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSiteDetails = async () => {
      try {
        const response = await axios.get(`http://192.168.1.22:4000/api/sites/${siteId}`);
        setSiteData(response.data);
      } catch (error) {
        console.error("Error fetching site details:", error.response ? error.response.data : error.message);
        Alert.alert("Error", "Error fetching site details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSiteDetails();
  }, [siteId]);

  const openGoogleMaps = () => {
    if (!siteData?.location?.coordinates || siteData.location.coordinates.length !== 2) {
      Alert.alert("Error", "Invalid location data.");
      return;
    }
  

    const [longitude, latitude] = siteData.location.coordinates;
    

    if (isNaN(latitude) || isNaN(longitude)) {
      Alert.alert("Error", "Invalid latitude or longitude.");
      return;
    }
  
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url).catch((err) => {
      console.error(err);
      Alert.alert("Error", "Failed to open Google Maps.");
    });
  };
  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#023047" />
      </View>
    );
  }

  if (!siteData) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>No site data available</Text>
      </View>
    );
  }

  const { latitude, longitude } = siteData.location?.coordinates || {};  

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        {/* Site Details */}
        <Text style={styles.title}>{siteData.name}</Text>
        <Text style={styles.subtitle}>{siteData.city}</Text>

        {/* Images Section */}
        <View style={styles.imageContainer}>
          {siteData.images && siteData.images.length > 0 ? (
            siteData.images.map((image, index) => (
              <Image key={index} source={{ uri: `http://192.168.1.22:4000${image}` }} style={styles.image} />
            ))
          ) : (
            <Text style={styles.noImagesText}>No images available</Text>
          )}
        </View>

        {/* Description and Size */}
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsLabel}>Description:</Text>
          <Text style={styles.detailsValue}>{siteData.description}</Text>
        </View>

       {/* Map */}
{siteData?.location?.coordinates && siteData.location.coordinates.length === 2 ? (
  <View style={styles.mapContainer}>
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: parseFloat(siteData.location.coordinates[1]), 
        longitude: parseFloat(siteData.location.coordinates[0]), 
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }}
    >
      <Marker
        coordinate={{
          latitude: parseFloat(siteData.location.coordinates[1]), 
          longitude: parseFloat(siteData.location.coordinates[0]), 
        }}
        title={siteData.name}
        description={siteData.description || "No description available"}
      />
    </MapView>
  </View>
) : (
  <Text style={styles.noLocationText}>No location data available</Text>
)}


        <TouchableOpacity style={styles.directionsButton} onPress={openGoogleMaps}>
          <Text style={styles.directionsButtonText}>Get Directions</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  scrollViewContent: {
    paddingBottom: 16 + 64, 
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#023047",
    textAlign: "center",
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 20,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
  },
  image: {
    width: "95%",
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  noLocationText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginVertical: 10,
  },
  noImagesText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginVertical: 10,
  },
  detailsContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  detailsLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 5,
  },
  detailsValue: {
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
    lineHeight: 22,
  },
  mapContainer: {
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10,
  },
  map: {
    flex: 1,
  },
  directionsButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  directionsButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default InfoScreen;

