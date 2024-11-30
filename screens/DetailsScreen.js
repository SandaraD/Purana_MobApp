import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Image, Text, ScrollView } from 'react-native';
import axios from 'axios';
import { ActivityIndicator } from '@ant-design/react-native';

export default function DetailsScreen({ route }) {
  const { scannedData } = route.params;
  const [siteData, setSiteData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSiteDetails = async () => {
      try {
        console.log('Scanned Data:', scannedData);
        const response = await axios.get(`http://192.168.1.22:4000/api/sites/${scannedData}`);
        setSiteData(response.data);
      } catch (error) {
        console.error(
          'Error fetching site details:',
          error.response ? error.response.data : error.message
        );
        Alert.alert("Error", "Error fetching site details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSiteDetails();
  }, [scannedData]);

  const renderInfoText = (label, value) => {
    const displayValue = typeof value === 'object' ? JSON.stringify(value) : value;
    return (
      <Text style={styles.infoText}>
        <Text style={styles.boldText}>{label}:</Text> {displayValue}
      </Text>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0288D1" />
      </View>
    );
  }

  if (!siteData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No site data available</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{siteData.name}</Text>
          <Text style={styles.subtitle}>{siteData.city}</Text>
        </View>

        {siteData.images && siteData.images.length > 0 ? (
          <View style={styles.imageContainer}>
            {siteData.images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: `http://192.168.1.14:4000${image}` }}
                style={styles.image}
              />
            ))}
          </View>
        ) : (
          <Text style={styles.noImageText}>No images available</Text>
        )}

        <View style={styles.card}>
          {/* {renderInfoText('Location', siteData.location)} */}
          {renderInfoText('Description', siteData.description)}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingBottom: 50,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  scrollViewContent: {
    paddingBottom: 10,
  },
  header: {
    marginBottom: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#023047",
    textAlign: "center",
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 20,
    color: "#555",
    textAlign: "center",
    marginBottom: 5,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  infoText: {
    fontSize: 16,
    color: '#455A64',
    marginBottom: 10,
    lineHeight: 22,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#37474F',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  image: {
    width: '90%',
    height: 180,
    borderRadius: 10,
    marginBottom: 15,
  },
  noImageText: {
    fontSize: 16,
    color: '#B0BEC5',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#D32F2F',
    textAlign: 'center',
    marginTop: 20,
  },
});

