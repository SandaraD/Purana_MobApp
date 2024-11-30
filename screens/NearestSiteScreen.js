import React, { useEffect, useState } from "react";
import { View, Text, Alert, ActivityIndicator, FlatList, TouchableOpacity, StyleSheet, Linking } from "react-native";
import axios from "axios";
import * as Location from "expo-location";
import { getDistance } from "geolib";
import { Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const NearestSitesScreen = () => {
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [sortedSites, setSortedSites] = useState([]);

  // Fetch user location
  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission Denied", "Location permission is required to find nearby sites.");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords); // Set user location
      } catch (error) {
        console.error("Error getting user location:", error);
        Alert.alert("Error", "Could not retrieve your location.");
      }
    };

    fetchUserLocation();
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetchSites();
    }
  }, [userLocation]);

  const fetchSites = async () => {
    try {
      const response = await axios.get("http://192.168.1.22:4000/api/sites");
      const sitesData = response.data;

      if (Array.isArray(sitesData)) {
        sortSitesByDistance(sitesData, userLocation);
      } else {
        Alert.alert("Error", "Received data is not an array.");
        console.error("Received data is not an array:", sitesData);
      }
    } catch (error) {
      console.error("Error fetching sites:", error);
      Alert.alert("Error", "Failed to fetch site data.");
    }
  };

  const sortSitesByDistance = (sitesData, userLocation) => {
    const sitesWithDistances = sitesData
      .filter((site) => site.location?.coordinates?.length === 2) 
      .map((site) => {
        const [longitude, latitude] = site.location.coordinates; 
        const distance = getDistance(
          { latitude: userLocation.latitude, longitude: userLocation.longitude },
          { latitude, longitude }
        );
        return { ...site, distance };
      });

    const maxDistance = 20000; // 20 km range
    const sitesWithinRange = sitesWithDistances.filter((site) => site.distance <= maxDistance);

    const sortedSites = sitesWithinRange.sort((a, b) => a.distance - b.distance); 
    setSortedSites(sortedSites);
    setLoading(false);
  };

  const openGoogleMaps = (site) => {
    const [longitude, latitude] = site.location.coordinates || [];
    if (!latitude || !longitude) {
      Alert.alert("Error", "Latitude and longitude are not available for this site.");
      return;
    }
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url).catch((err) => Alert.alert("Error", "Failed to open Google Maps."));
  };

  const renderSiteItem = ({ item }) => {
    return (
      <Card style={styles.card}>
        <Card.Title
          title={item.name}
          subtitle={item.city || "Unknown location"}
          left={() => <Ionicons name="location-outline" size={32} color="#023047" />}
        />
        <Card.Content>
          <Text style={styles.distanceText}>
            <Ionicons name="navigate" size={18} color="#FB8500" />{" "}
            {(item.distance / 1000).toFixed(2)} km away
          </Text>
        </Card.Content>
        <Card.Actions>
          <TouchableOpacity style={styles.mapButton} onPress={() => openGoogleMaps(item)}>
            <Text style={styles.mapButtonText}>
              <Ionicons name="map-outline" size={16} /> View on Map
            </Text>
          </TouchableOpacity>
        </Card.Actions>
      </Card>
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#023047" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedSites}
        renderItem={renderSiteItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#F8FAFD",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  distanceText: {
    fontSize: 16,
    color: "#6C757D",
    marginTop: 8,
  },
  mapButton: {
    backgroundColor: "#023047",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginTop: 10,
  },
  mapButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default NearestSitesScreen;


