import React from 'react';
import { 
  Text, 
  View, 
  Image, 
  Pressable,
  SafeAreaView,
  ScrollView
} from 'react-native';

import styles from '../styles/WinnerStyles';

export default function WinnerScreen({ route, navigation }) {
  const { local, visitante, scoreLocal, scoreVisitante, playerStats } = route.params || {};

  const localWins = scoreLocal > scoreVisitante;
  const isTie = scoreLocal === scoreVisitante;
  const winner = localWins ? local : visitante;

  // Top 5 anotadores
  const topScorers = Object.values(playerStats || {})
    .filter(p => p.points > 0)
    .sort((a, b) => b.points - a.points)
    .slice(0, 5);

  const resetGame = () => {
    navigation.navigate('Seleccion');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          
          <Text style={styles.headerTitle}>🏆 RESULTADO FINAL 🏆</Text>

          {/* Marcador final */}
          <View style={styles.finalScoreContainer}>
            <View style={styles.teamScoreBox}>
              <Image source={{ uri: local.logo }} style={styles.smallLogo} />
              <Text style={styles.teamNameSmall}>
                {local.name}
              </Text>
              <Text style={styles.finalScore}>{scoreLocal}</Text>
            </View>

            <Text style={styles.vs}>-</Text>

            <View style={styles.teamScoreBox}>
              <Image source={{ uri: visitante.logo }} style={styles.smallLogo} />
              <Text style={styles.teamNameSmall}>
                {visitante.name}
              </Text>
              <Text style={styles.finalScore}>{scoreVisitante}</Text>
            </View>
          </View>

          {/* Ganador o empate */}
          <View style={styles.winnerSection}>
            {isTie ? (
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
              <>
                <Text style={styles.winnerLabel}>🏆 GANADOR 🏆</Text>
                <Image 
                  source={{ uri: winner.logo }} 
                  style={styles.winnerLogo} 
                />
                <Text style={styles.winnerName}>
                  {winner.name}
                </Text>
                <Text style={styles.victoryText}>
                  ¡Victoria con {localWins ? scoreLocal : scoreVisitante} puntos!
                </Text>
              </>
            )}
          </View>

          {/* Top 5 anotadores */}
          {topScorers.length > 0 && (
            <View style={styles.topScorersContainer}>
              <Text style={styles.topScorersTitle}>🔥 TOP 5 ANOTADORES 🔥</Text>
              {topScorers.map((player, index) => (
                <View key={index} style={styles.scorerRow}>
                  <Text style={styles.scorerRank}>
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                  </Text>
                  <View style={styles.scorerInfo}>
                    <Text style={styles.scorerName}>{player.name}</Text>
                    <Text style={styles.scorerTeam}>{player.team}</Text>
                  </View>
                  <Text style={styles.scorerPoints}>{player.points} PTS</Text>
                </View>
              ))}
            </View>
          )}

          <Pressable
            onPress={resetGame}
            style={({ pressed }) => [
              styles.backButton,
              pressed && { opacity: 0.7, transform: [{ scale: 0.97 }] },
            ]}
          >
            <Text style={styles.backButtonText}>🏀 VOLVER AL INICIO 🏀</Text>
          </Pressable>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}