// Importation des modules nécessaires
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

export default function App() {
  // États pour gérer les permissions et les résultats du scan
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  // Demande la permission d'utiliser la caméra au montage du composant
  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Fonction appelée quand un QR code est scanné
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // Affiche une alerte avec les données du QR code
    Alert.alert(
      'QR Code Scanné!',
      `Type: ${type}\nDonnées: ${data}`,
      [
        {
          text: 'OK',
          onPress: () => setScanned(false), // Réinitialise pour permettre un nouveau scan
        },
      ],
      { cancelable: false }
    );
  };

  // Gestion des états de permission
  if (hasPermission === null) {
    return <Text>Demande de permission pour la caméra...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Accès à la caméra refusé</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Composant Camera d'Expo avec scan QR code activé */}
      <Camera
        style={styles.camera}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <View style={styles.overlay}>
          {/* Carré de visée pour le QR code */}
          <View style={styles.square} />
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  square: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'transparent',
  },
});