import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Platform, StatusBar } from 'react-native';

//* Import Screens
import ToDoScreen from './src/screens/ToDoScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ToDoScreen />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 0
  },
  container: {
    flex: 1
  },
});
