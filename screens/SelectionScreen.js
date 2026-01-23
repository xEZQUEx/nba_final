import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  FlatList, 
  SafeAreaView, 
  Platform, 
  StatusBar 
} from 'react-native';

import { TEAMS } from '../data';

export default function SelectionScreen({ navigation }) {
  const [localIndex, setLocalIndex] = useState(0);
  const [visitanteIndex, setVisitanteIndex] = useState(1);

  const nextLocal = () => {
    setLocalIndex((prev) => (prev + 1) % TEAMS.length);
  };

  const nextVisitante = () => {
    setVisitanteIndex((prev) => (prev + 1) % TEAMS.length);
  };

  const localTeam = TEAMS[localIndex];
  const visitTeam = TEAMS[visitanteIndex];

  const startGame = () => {
    navigation.navigate('Juego', {
      local: localTeam,
      visitante: visitTeam,
    });
  };

  const renderPlayer = ({ item }) => (
    <Text style={styles.playerText}>🏀 {item.name}</Text>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        
        <Text style={styles.headerTitle}>🏀 NBA JAM RETRO 🏀</Text>

        {/* AREA LOCAL */}
        <View style={[styles.teamArea, { backgroundColor: '#F9F9F9' }]}>
          <View style={styles.teamHeader}>
            <Image source={{ uri: localTeam.logo }} style={styles.logo} />
            <View>
              <Text style={styles.teamLabel}>LOCAL</Text>
              <Text style={[styles.teamName, { color: localTeam.color }]}>
                {localTeam.name}
              </Text>
            </View>
          </View>
          
          <View style={styles.rosterContainer}>
            <FlatList
              data={localTeam.players}
              renderItem={renderPlayer}
              keyExtractor={(item) => item.id}
              scrollEnabled={false} 
              numColumns={2} 
              columnWrapperStyle={{justifyContent: 'flex-start'}}
            />
          </View>

          <TouchableOpacity style={styles.changeButton} onPress={nextLocal}>
            <Text style={styles.buttonText}>CAMBIAR LOCAL</Text>
          </TouchableOpacity>
        </View>

        {/* SEPARADOR VS */}
        <View style={styles.vsContainer}>
          <Text style={styles.vsText}>VS</Text>
        </View>

        {/* VISITANTE */}
        <View style={[styles.teamArea, { backgroundColor: '#ECECEC' }]}>
          <View style={styles.teamHeader}>
            <Image source={{ uri: visitTeam.logo }} style={styles.logo} />
            <View>
              <Text style={styles.teamLabel}>VISITANTE</Text>
              <Text style={[styles.teamName, { color: visitTeam.color }]}>
                {visitTeam.name}
              </Text>
            </View>
          </View>

          <View style={styles.rosterContainer}>
            <FlatList
              data={visitTeam.players}
              renderItem={renderPlayer}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              numColumns={2}
              columnWrapperStyle={{justifyContent: 'flex-start'}}
            />
          </View>

          <TouchableOpacity style={styles.changeButton} onPress={nextVisitante}>
            <Text style={styles.buttonText}>CAMBIAR VISITANTE</Text>
          </TouchableOpacity>
        </View>

        {/* BOTON JUGAR */}
        <TouchableOpacity style={styles.startButton} onPress={startGame}>
          <Text style={styles.startButtonText}>🔥 EMPEZAR PARTIDO 🔥</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  mainContainer: {
    flex: 1,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '900',
    paddingVertical: 10,
    backgroundColor: '#000',
    color: '#FFD700',
  },
  teamArea: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  teamHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 70, 
    height: 70,
    resizeMode: 'contain',
    marginRight: 15,
  },
  teamLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#888',
  },
  teamName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  rosterContainer: {
    height: 75, 
    marginBottom: 10,
  },
  playerText: {
    fontSize: 12,
    color: '#333',
    width: '50%',
    paddingVertical: 2,
  },
  vsContainer: {
    height: 30,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  vsText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  changeButton: {
    backgroundColor: '#333',
    paddingVertical: 8,
    width: 180,
    alignSelf: 'center',
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  startButton: {
    backgroundColor: '#FF4500',
    padding: 20,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },
});