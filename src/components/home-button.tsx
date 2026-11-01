import { router } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';

import { AppColors } from '@/styles/app';

export function HomeButton() {
  return (
    <Pressable style={styles.button} onPress={() => router.replace('/')}>
      <Text style={styles.text}>Back to home</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    borderColor: AppColors.accent,
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  text: {
    color: AppColors.accent,
    fontSize: 15,
  },
});
