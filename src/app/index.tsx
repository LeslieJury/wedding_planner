import { router } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

import { AppButton, AppColors, AppText } from '@/styles/app';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wedding Planner</Text>
      <Text style={styles.subtitle}>Plan your wedding day!</Text>
      <View style={styles.button}>
        <Button color={AppColors.accent} title="Wedding Countdown" onPress={() => router.push('/date')} />
      </View>
      <View style={styles.button}>
        <Button color={AppColors.accent} title="Wedding Checklist" onPress={() => router.push('/checklist')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: AppColors.background,
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    ...AppText.title,
    textAlign: 'center',
  },
  subtitle: {
    ...AppText.subtitle,
    marginTop: 12,
    textAlign: 'center',
  },
  button: {
    ...AppButton,
  },
});
