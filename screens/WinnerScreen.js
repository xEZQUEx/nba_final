import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  SafeAreaView, 
  Platform, 
  StatusBar 
} from 'react-native';

export default function WinnerScreen({ route, navigation }) {
  const { local, visitante, scoreLocal, scoreVisitante } = route.params || {};

  // Determinar el ganador
  const localWins = scoreLocal > scoreVisitante;
  const visitanteWins = scoreVisitante > scoreLocal;
  const isTie = scoreLocal === scoreVisitante;

  const resetGame = () => {
    navigation.navigate('Seleccion');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Título de resultados */}
        <Text style={styles.headerTitle}>🏆 RESULTADO FINAL 🏆</Text>

        {/* Marcador final */}
        <View style={styles.finalScoreContainer}>
          <View style={styles.teamScoreBox}>
            <Image source={{ uri: local.logo }} style={styles.smallLogo} />
            <Text style={[styles.teamNameSmall, { color: local.color }]}>
              {local.name}
            </Text>
            <Text style={styles.finalScore}>{scoreLocal}</Text>
          </View>

          <Text style={styles.vs}>-</Text>

          <View style={styles.teamScoreBox}>
            <Image source={{ uri: visitante.logo }} style={styles.smallLogo} />
            <Text style={[styles.teamNameSmall, { color: visitante.color }]}>
              {visitante.name}
            </Text>
            <Text style={styles.finalScore}>{scoreVisitante}</Text>
          </View>
        </View>

        {/* Mostrar ganador o empate */}
        <View style={styles.winnerSection}>
          {isTie ? (
            // CASO EMPATE
            <>
              <Text style={styles.tieTitle}>¡EMPATE!</Text>
              <View style={styles.tieLogos}>
                <Image source={{ uri: local.logo }} style={styles.tieLogo} />
                <Text style={styles.tieText}>VS</Text>
                <Image source={{ uri: visitante.logo }} style={styles.tieLogo} />
              </View>
              <Text style={styles.tieSubtitle}>
                Ambos equipos quedaron igualados
              </Text>
            </>
          ) : (
            // CASO GANADOR
            <>
              <Text style={styles.winnerLabel}>🏆 GANADOR 🏆</Text>
              <Image 
                source={{ uri: localWins ? local.logo : visitante.logo }} 
                style={styles.winnerLogo} 
              />
              <Text 
                style={[
                  styles.winnerName, 
                  { color: localWins ? local.color : visitante.color }
                ]}
              >
                {localWins ? local.name : visitante.name}
              </Text>
              <Text style={styles.victoryText}>
                ¡Victoria con {localWins ? scoreLocal : scoreVisitante} puntos!
              </Text>
            </>
          )}
        </View>

        {/* Botón para volver */}
        <TouchableOpacity style={styles.backButton} onPress={resetGame}>
          <Text style={styles.backButtonText}>🏀 VOLVER AL INICIO 🏀</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 30,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFD700',
    letterSpacing: 2,
    textAlign: 'center',
  },
  finalScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 20,
    borderWidth: 2,
    borderColor: '#333',
  },
  teamScoreBox: {
    alignItems: 'center',
    flex: 1,
  },
  smallLogo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  teamNameSmall: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  finalScore: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  vs: {
    fontSize: 24,
    color: '#666',
    marginHorizontal: 10,
  },
  winnerSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  winnerLabel: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFD700',
    marginBottom: 20,
    letterSpacing: 1,
  },
  winnerLogo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  winnerName: {
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 10,
  },
  victoryText: {
    fontSize: 16,
    color: '#aaa',
    fontWeight: '600',
  },
  tieTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFD700',
    marginBottom: 20,
  },
  tieLogos: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  tieLogo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  tieText: {
    fontSize: 24,
    color: '#888',
    marginHorizontal: 20,
    fontWeight: 'bold',
  },
  tieSubtitle: {
    fontSize: 16,
    color: '#aaa',
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: '#FF4500',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FF6347',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
  },
});