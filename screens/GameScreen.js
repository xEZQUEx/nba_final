import React, { useState } from 'react';
import { 
  Text, 
  View, 
  Image, 
  Pressable,
  FlatList, 
  SafeAreaView, 
  ScrollView
} from 'react-native';

import { saveLastGame } from '../utils/storage';
import styles from '../styles/GameStyles';

export default function GameScreen({ route, navigation }) {
  const { local, visitante } = route.params || {};

  const [scoreLocal, setScoreLocal] = useState(0);
  const [scoreVisitante, setScoreVisitante] = useState(0);

  // Registro de puntos por jugador
  const [playerStats, setPlayerStats] = useState({});

  const addPoints = (player, team, points) => {
    // Sumar al marcador del equipo
    if (team === 'local') {
      setScoreLocal(prev => prev + points);
    } else {
      setScoreVisitante(prev => prev + points);
    }

    // Sumar al jugador individual
    setPlayerStats(prev => ({
      ...prev,
      [player.id]: {
        name: player.name,
        team: team === 'local' ? local.name : visitante.name,
        teamColor: team === 'local' ? local.color : visitante.color,
        points: (prev[player.id]?.points || 0) + points,
      },
    }));
  };

  const endGame = async () => {
    await saveLastGame({
      localName: local.name,
      visitanteName: visitante.name,
      scoreLocal,
      scoreVisitante,
    });

    navigation.navigate('Ganador', {
      local,
      visitante,
      scoreLocal,
      scoreVisitante,
      playerStats,
    });
  };

  const renderLocalPlayer = ({ item }) => (
    <View style={styles.playerRow}>
      <Text style={styles.playerName}>
        🏀 {item.name} {playerStats[item.id] ? `(${playerStats[item.id].points})` : ''}
      </Text>
      <View style={styles.buttonGroup}>
        <Pressable
          onPress={() => addPoints(item, 'local', 2)}
          style={({ pressed }) => [
            styles.pointButton,
            { backgroundColor: local.color },
            pressed && { opacity: 0.5, transform: [{ scale: 0.9 }] },
          ]}
        >
          <Text style={styles.pointButtonText}>+2</Text>
        </Pressable>
        <Pressable
          onPress={() => addPoints(item, 'local', 3)}
          style={({ pressed }) => [
            styles.pointButton,
            { backgroundColor: local.color, opacity: pressed ? 0.5 : 0.8 },
            pressed && { transform: [{ scale: 0.9 }] },
          ]}
        >
          <Text style={styles.pointButtonText}>+3</Text>
        </Pressable>
      </View>
    </View>
  );

  const renderVisitantePlayer = ({ item }) => (
    <View style={styles.playerRow}>
      <Text style={styles.playerName}>
        🏀 {item.name} {playerStats[item.id] ? `(${playerStats[item.id].points})` : ''}
      </Text>
      <View style={styles.buttonGroup}>
        <Pressable
          onPress={() => addPoints(item, 'visitante', 2)}
          style={({ pressed }) => [
            styles.pointButton,
            { backgroundColor: visitante.color },
            pressed && { opacity: 0.5, transform: [{ scale: 0.9 }] },
          ]}
        >
          <Text style={styles.pointButtonText}>+2</Text>
        </Pressable>
        <Pressable
          onPress={() => addPoints(item, 'visitante', 3)}
          style={({ pressed }) => [
            styles.pointButton,
            { backgroundColor: visitante.color, opacity: pressed ? 0.5 : 0.8 },
            pressed && { transform: [{ scale: 0.9 }] },
          ]}
        >
          <Text style={styles.pointButtonText}>+3</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.gameContainer}>
          
          <Text style={styles.quarterText}>🏀 PARTIDO EN VIVO 🏀</Text>

          {/* MARCADOR */}
          <View style={styles.scoreboard}>
            <View style={[styles.scoreCard, { borderColor: local.color }]}>
              <Image source={local.logo} style={styles.smallLogo} />
              <Text style={[styles.scoreName, { color: local.color }]}>{local.name}</Text>
              <Text style={styles.points}>{scoreLocal}</Text>
            </View>

            <Text style={styles.dash}>VS</Text>

            <View style={[styles.scoreCard, { borderColor: visitante.color }]}>
              <Image source={visitante.logo} style={styles.smallLogo} />
              <Text style={[styles.scoreName, { color: visitante.color }]}>{visitante.name}</Text>
              <Text style={styles.points}>{scoreVisitante}</Text>
            </View>
          </View>

          {/* ALINEACIONES */}
          <View style={styles.rostersWrapper}>
            <Text style={styles.rostersTitle}>PLANTILLAS - ANOTA PUNTOS</Text>
            
            <View style={styles.rostersRow}>
              <View style={styles.rosterColumn}>
                <Text style={[styles.teamColumnTitle, { color: local.color }]}>LOCAL</Text>
                <FlatList
                  data={local.players}
                  renderItem={renderLocalPlayer}
                  keyExtractor={item => item.id}
                  scrollEnabled={false}
                />
              </View>

              <View style={styles.verticalDivider} />

              <View style={styles.rosterColumn}>
                <Text style={[styles.teamColumnTitle, { color: visitante.color }]}>VISITANTE</Text>
                <FlatList
                  data={visitante.players}
                  renderItem={renderVisitantePlayer}
                  keyExtractor={item => item.id}
                  scrollEnabled={false}
                />
              </View>
            </View>
          </View>

          <Pressable
            onPress={endGame}
            style={({ pressed }) => [
              styles.endButton,
              pressed && { opacity: 0.7, transform: [{ scale: 0.97 }] },
            ]}
          >
            <Text style={styles.endButtonText}>🏁 TERMINAR PARTIDO 🏁</Text>
          </Pressable>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}