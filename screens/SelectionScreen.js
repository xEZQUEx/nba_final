import React, { useState, useEffect } from 'react';
import { 
  Text, 
  View, 
  Image, 
  Pressable,
  FlatList, 
  SafeAreaView 
} from 'react-native';

import { TEAMS } from '../data';
import { getLastGame } from '../utils/storage';
import styles from '../styles/SelectionStyles';

export default function SelectionScreen({ navigation }) {
  const [localIndex, setLocalIndex] = useState(0);
  const [visitanteIndex, setVisitanteIndex] = useState(1);
  const [lastGame, setLastGame] = useState(null);

  // Cargar último partido al entrar a la pantalla
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const data = await getLastGame();
      if (data) setLastGame(data);
    });
    return unsubscribe;
  }, [navigation]);

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

        {/* Banner último partido */}
        {lastGame && (
          <View style={styles.lastGameBanner}>
            <Text style={styles.lastGameText}>ÚLTIMO PARTIDO</Text>
            <Text style={styles.lastGameScore}>
              {lastGame.localName} {lastGame.scoreLocal} - {lastGame.scoreVisitante} {lastGame.visitanteName}
            </Text>
          </View>
        )}

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
              columnWrapperStyle={{ justifyContent: 'flex-start' }}
            />
          </View>

          <Pressable
            onPress={nextLocal}
            style={({ pressed }) => [
              styles.changeButton,
              pressed && { opacity: 0.7, transform: [{ scale: 0.96 }] },
            ]}
          >
            <Text style={styles.buttonText}>CAMBIAR LOCAL</Text>
          </Pressable>
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
              columnWrapperStyle={{ justifyContent: 'flex-start' }}
            />
          </View>

          <Pressable
            onPress={nextVisitante}
            style={({ pressed }) => [
              styles.changeButton,
              pressed && { opacity: 0.7, transform: [{ scale: 0.96 }] },
            ]}
          >
            <Text style={styles.buttonText}>CAMBIAR VISITANTE</Text>
          </Pressable>
        </View>

        {/* BOTON JUGAR */}
        <Pressable
          onPress={startGame}
          style={({ pressed }) => [
            styles.startButton,
            pressed && { opacity: 0.7, transform: [{ scale: 0.98 }] },
          ]}
        >
          <Text style={styles.startButtonText}>🔥 EMPEZAR PARTIDO 🔥</Text>
        </Pressable>

      </View>
    </SafeAreaView>
  );
}