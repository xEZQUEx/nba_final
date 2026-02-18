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
    backgroundColor: '#111',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    flexGrow: 1,
  },
  gameContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    paddingBottom: 30,
  },
  quarterText: {
    color: '#FFD700',
    fontSize: 16,
    marginBottom: SPACING.xl,
    letterSpacing: 2,
    fontWeight: 'bold',
  },
  scoreboard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '92%',
    marginBottom: SPACING.xl,
  },
  scoreCard: {
    width: '42%',
    backgroundColor: '#222',
    padding: SPACING.md,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 3,
  },
  smallLogo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: SPACING.xs,
  },
  scoreName: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: SPACING.xs,
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
    width: '92%',
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  rostersTitle: {
    color: '#FFD700',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: SPACING.lg,
    textDecorationLine: 'underline',
  },
  rostersRow: {
    flexDirection: 'row',
  },
  rosterColumn: {
    flex: 1,
    paddingHorizontal: SPACING.xs,
  },
  verticalDivider: {
    width: 2,
    backgroundColor: '#333',
    marginHorizontal: SPACING.xs,
  },
  teamColumnTitle: {
    fontSize: 13,
    fontWeight: '900',
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  playerRow: {
    marginBottom: SPACING.md,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: SPACING.sm,
  },
  playerName: {
    color: '#fff',
    fontSize: 11,
    marginBottom: SPACING.sm,
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
    paddingVertical: SPACING.lg,
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
  },
});