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
  StatusBar,
  ScrollView
} from 'react-native';

export default function GameScreen({ route, navigation }) {
  const { local, visitante } = route.params || {};

  const [scoreLocal, setScoreLocal] = useState(0);
  const [scoreVisitante, setScoreVisitante] = useState(0);

  // Función para sumar puntos al equipo local
  const addPointsLocal = (points) => {
    setScoreLocal(prev => prev + points);
  };

  // Función para sumar puntos al equipo visitante
  const addPointsVisitante = (points) => {
    setScoreVisitante(prev => prev + points);
  };

  // Función para terminar el juego
  const endGame = () => {
    navigation.navigate('Ganador', {
      local: local,
      visitante: visitante,
      scoreLocal: scoreLocal,
      scoreVisitante: scoreVisitante,
    });
  };

  // Renderizar jugador del equipo local
  const renderLocalPlayer = ({ item }) => (
    <View style={styles.playerRow}>
      <Text style={styles.playerName}>🏀 {item.name}</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity 
          style={[styles.pointButton, { backgroundColor: local.color }]}
          onPress={() => addPointsLocal(2)}
        >
          <Text style={styles.pointButtonText}>+2</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.pointButton, { backgroundColor: local.color, opacity: 0.8 }]}
          onPress={() => addPointsLocal(3)}
        >
          <Text style={styles.pointButtonText}>+3</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Renderizar jugador del equipo visitante
  const renderVisitantePlayer = ({ item }) => (
    <View style={styles.playerRow}>
      <Text style={styles.playerName}>🏀 {item.name}</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity 
          style={[styles.pointButton, { backgroundColor: visitante.color }]}
          onPress={() => addPointsVisitante(2)}
        >
          <Text style={styles.pointButtonText}>+2</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.pointButton, { backgroundColor: visitante.color, opacity: 0.8 }]}
          onPress={() => addPointsVisitante(3)}
        >
          <Text style={styles.pointButtonText}>+3</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.gameContainer}>
          
          <Text style={styles.quarterText}>🏀 PARTIDO EN VIVO 🏀</Text>

          {/* --- MARCADOR --- */}
          <View style={styles.scoreboard}>
            {/* Local */}
            <View style={[styles.scoreCard, { borderColor: local.color }]}>
              <Image source={{ uri: local.logo }} style={styles.smallLogo} />
              <Text style={[styles.scoreName, { color: local.color }]}>{local.name}</Text>
              <Text style={styles.points}>{scoreLocal}</Text>
            </View>

            <Text style={styles.dash}>VS</Text>

            {/* Visitante */}
            <View style={[styles.scoreCard, { borderColor: visitante.color }]}>
              <Image source={{ uri: visitante.logo }} style={styles.smallLogo} />
              <Text style={[styles.scoreName, { color: visitante.color }]}>{visitante.name}</Text>
              <Text style={styles.points}>{scoreVisitante}</Text>
            </View>
          </View>

          {/* ALINEACIONES CON BOTONES */}
          <View style={styles.rostersWrapper}>
            <Text style={styles.rostersTitle}>PLANTILLAS - ANOTA PUNTOS</Text>
            
            <View style={styles.rostersRow}>
              {/* Lista Local */}
              <View style={styles.rosterColumn}>
                <Text style={[styles.teamColumnTitle, { color: local.color }]}>LOCAL</Text>
                <FlatList
                  data={local.players}
                  renderItem={renderLocalPlayer}
                  keyExtractor={item => item.id}
                  scrollEnabled={false}
                />
              </View>

              {/* Separador vertical */}
              <View style={styles.verticalDivider} />

              {/* Lista Visitante */}
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

          <TouchableOpacity 
            style={styles.endButton} 
            onPress={endGame}
          >
            <Text style={styles.endButtonText}>🏁 TERMINAR PARTIDO 🏁</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#111',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    flexGrow: 1,
  },
  gameContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 30,
  },
  quarterText: {
    color: '#FFD700',
    fontSize: 16,
    marginBottom: 20,
    letterSpacing: 2,
    fontWeight: 'bold',
  },
  scoreboard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
    marginBottom: 30,
  },
  scoreCard: {
    width: '42%',
    backgroundColor: '#222',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 3,
  },
  smallLogo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  scoreName: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    height: 35,
    color: 'white',
  },
  points: {
    fontSize: 40,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  dash: {
    color: '#555',
    fontSize: 30,
    fontWeight: '100',
  },
  rostersWrapper: {
    width: '95%',
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  rostersTitle: {
    color: '#FFD700',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 15,
    textDecorationLine: 'underline',
  },
  rostersRow: {
    flexDirection: 'row',
  },
  rosterColumn: {
    flex: 1,
    paddingHorizontal: 5,
  },
  verticalDivider: {
    width: 2,
    backgroundColor: '#333',
    marginHorizontal: 5,
  },
  teamColumnTitle: {
    fontSize: 13,
    fontWeight: '900',
    marginBottom: 10,
    textAlign: 'center',
  },
  playerRow: {
    marginBottom: 12,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 8,
  },
  playerName: {
    color: '#fff',
    fontSize: 11,
    marginBottom: 6,
    fontWeight: '600',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  pointButton: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 5,
    minWidth: 45,
    alignItems: 'center',
  },
  pointButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  endButton: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    backgroundColor: '#FF4500',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FF6347',
  },
  endButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
  }
});