import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Alert, Image } from 'react-native';
import axios from 'axios';
import { Searchbar, Card, Text, ActivityIndicator } from 'react-native-paper';

export default function ExploreScreen({ navigation }) {
  const [sites, setSites] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [filteredSites, setFilteredSites] = useState([]);

  // Fetch sites
  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await axios.get('http://192.168.1.22:4000/api/sites');
        setSites(response.data); 
        setFilteredSites(response.data);
      } catch (error) {
        console.error('Error fetching sites:', error.response ? error.response.data : error.message);
        Alert.alert("Error", "Error fetching site data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSites(); 
  }, []); 


  const handleSearch = (query) => {
    setSearchQuery(query);
    // Search by name or city
    const filteredData = sites.filter((site) => {
      const nameMatch = site.name.toLowerCase().includes(query.toLowerCase());
      const cityeMatch = site.city && site.city.toLowerCase().includes(query.toLowerCase()); 
      return nameMatch || cityeMatch;
    });
    setFilteredSites(filteredData);
  };
  


  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#023047" />
        <Text style={styles.loadingText}>Loading sites...</Text>
      </View>
    );
  }

  
  if (filteredSites.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No sites available. Try searching again.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search by name or location"
        value={searchQuery}
        onChangeText={handleSearch}
        style={styles.searchBar}
        icon="magnify"
      />
      <FlatList
        data={filteredSites}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Card
            style={styles.card}
            onPress={() =>
              navigation.navigate("InfoScreen", { siteId: item._id })
            }
          >
            {item.images && item.images.length > 0 && (
              <Image
                source={{ uri: `http://192.168.1.22:4000${item.images[0]}` }} 
                style={styles.cardImage}
              />
            )}

            <Card.Title
              title={item.name}
              titleStyle={styles.cardTitle}
              subtitle={
                <View style={styles.subtitleContainer}>
                  <Text style={styles.cardSubtitle}>{item.city}</Text>
                </View>
              }
            />
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFD',
    padding: 15,
    paddingBottom: 64,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6C757D',
  },
  noDataText: {
    fontSize: 18,
    color: '#6C757D',
    textAlign: 'center',
    marginTop: 20,
  },
  searchBar: {
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    elevation: 3,
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 3,
    padding: 5
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#023047',
    paddingTop: 15,
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#546E7A',
    paddingTop: 5
  },
  cardImage: {
    height: 125,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'cover',
  },
});


