import { router } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import { HomeButton } from '@/components/home-button';
import { AppButton, AppColors, AppText } from '@/styles/app';

export default function DateScreen() {
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  function continueToCountdown() {
    const parts = date.trim().split('/');
    const month = Number(parts[0]);
    const day = Number(parts[1]);
    const year = Number(parts[2]);
    const weddingDate = new Date(year, month - 1, day);
    const isValidDate =
      parts.length === 3 &&
      Number.isInteger(month) &&
      Number.isInteger(day) &&
      Number.isInteger(year) &&
      month >= 1 &&
      month <= 12 &&
      day >= 1 &&
      day <= 31 &&
      year >= 2026 &&
      weddingDate.getMonth() === month - 1 &&
      weddingDate.getDate() === day &&
      weddingDate.getFullYear() === year;

    if (!isValidDate) {
      setError('Please enter a date like 06/15/2027.');
      return;
    }

    setError('');
    router.push({ pathname: '/countdown', params: { date } });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wedding date</Text>
      <Text style={styles.instructions}>When do you plan to get married?</Text>
      <TextInput
        style={styles.input}
        onChangeText={setDate}
        placeholder="MM/DD/YYYY"
        keyboardType="numbers-and-punctuation"
        value={date}
        maxLength={10}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={styles.button}>
        <Button color={AppColors.accent} title="Continue" onPress={continueToCountdown} />
      </View>
      <HomeButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.background,
    flex: 1,
    padding: 24,
    paddingTop: 60,
  },
  title: {
    ...AppText.title,
  },
  instructions: {
    ...AppText.subtitle,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#ffffff',
    borderColor: AppColors.border,
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 18,
    marginTop: 20,
    padding: 12,
  },
  error: {
    color: '#b00020',
    marginTop: 8,
  },
  button: {
    ...AppButton,
  },
});
