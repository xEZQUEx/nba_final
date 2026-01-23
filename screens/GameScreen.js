import React from 'react';
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

export default function GameScreen({ route, navigation }) {
  const { local, visitante } = route.params || {};

  // Función para renderizar jugadores
  const renderRosterItem = ({ item }) => (
    <Text style={styles.playerText}>🏀 {item.name}</Text>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.gameContainer}>
        
        <Text style={styles.quarterText}>1er CUARTO - 12:00</Text>

        {/* --- MARCADOR --- */}
        <View style={styles.scoreboard}>
          {/* Lado Local */}
          <View style={[styles.scoreCard, { borderColor: local.color }]}>
            <Image source={{ uri: local.logo }} style={styles.smallLogo} />
            <Text style={[styles.scoreName, { color: local.color }]}>{local.name}</Text>
            <Text style={styles.points}>0</Text>
          </View>

          <Text style={styles.dash}>VS</Text>

          {/* Visitante */}
          <View style={[styles.scoreCard, { borderColor: visitante.color }]}>
            <Image source={{ uri: visitante.logo }} style={styles.smallLogo} />
            <Text style={[styles.scoreName, { color: visitante.color }]}>{visitante.name}</Text>
            <Text style={styles.points}>0</Text>
          </View>
        </View>

        {/* ALINEACIONES */}
        <View style={styles.rostersWrapper}>
          <Text style={styles.rostersTitle}>ALINEACIONES</Text>
          
          <View style={styles.rostersRow}>
            {/* Lista Local */}
            <View style={styles.rosterColumn}>
              <Text style={[styles.teamColumnTitle, { color: local.color }]}>LOCAL</Text>
              <FlatList
                data={local.players}
                renderItem={renderRosterItem}
                keyExtractor={item => item.id}
              />
            </View>

            {/* Separador vertical */}
            <View style={styles.verticalDivider} />

            {/* Lista Visitante */}
            <View style={styles.rosterColumn}>
              <Text style={[styles.teamColumnTitle, { color: visitante.color }]}>VISITANTE</Text>
              <FlatList
                data={visitante.players}
                renderItem={renderRosterItem}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>TERMINAR PARTIDO</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#111',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  gameContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  quarterText: {
    color: '#888',
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
    borderWidth: 2,
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
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  dash: {
    color: '#555',
    fontSize: 30,
    fontWeight: '100',
  },
  rostersWrapper: {
    flex: 1,
    width: '90%',
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  rostersTitle: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  rostersRow: {
    flex: 1,
    flexDirection: 'row',
  },
  rosterColumn: {
    flex: 1,
    alignItems: 'center',
  },
  verticalDivider: {
    width: 1,
    backgroundColor: '#333',
    marginHorizontal: 5,
  },
  teamColumnTitle: {
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 5,
  },
  playerText: {
    color: '#ccc',
    fontSize: 12,
    marginVertical: 2,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: '#333',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#555',
  },
  backButtonText: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: 'bold',
  }
});