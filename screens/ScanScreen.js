import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, Alert, Dimensions } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get('window');
const overlaySize = width * 0.7;

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    if (!isFocused || scanned) return;
  
    const siteID = data.includes('http') ? data.split('/').pop() : data;
  
    setScanned(true);
    Alert.alert(
      "QR Code Scanned",
      `Bar code with type ${type} and data ${siteID} has been scanned!`,
      [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate('DetailsScreen', { scannedData: siteID });
            setScanned(false);
          }
        }
      ],
      { cancelable: false }
    );
  };
  

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={style.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topOverlay: {
    flex: 1,
    height: overlaySize,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  middleOverlay: {
    flexDirection: 'row',
  },
  sideOverlay: {
    flex: 1,
    width: overlaySize,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scanArea: {
    width: overlaySize,
    height: overlaySize,
    borderColor: '#fff',
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  bottomOverlay: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

