import { StyleSheet, Platform, StatusBar } from 'react-native';

const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
};

export default StyleSheet.create({
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
    paddingVertical: SPACING.sm,
    backgroundColor: '#000',
    color: '#FFD700',
  },
  teamArea: {
    flex: 1,
    padding: SPACING.lg,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  teamHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  logo: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginRight: SPACING.lg,
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
    marginBottom: SPACING.md,
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
    paddingVertical: SPACING.sm,
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
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FF6347',
    marginVertical: SPACING.lg,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
  },
  lastGameBanner: {
    backgroundColor: '#1a1a1a',
    padding: SPACING.sm,
    alignItems: 'center',
  },
  lastGameText: {
    color: '#FFD700',
    fontSize: 11,
    fontWeight: 'bold',
  },
  lastGameScore: {
    color: '#fff',
    fontSize: 13,
    marginTop: SPACING.xs,
  },
});