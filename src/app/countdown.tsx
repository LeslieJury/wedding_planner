import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { HomeButton } from '@/components/home-button';
import { AppButton, AppColors, AppText } from '@/styles/app';

function getDaysUntil(dateString: string) {
  const [month, day, year] = dateString.split('/').map(Number);
  const weddingDate = new Date(year, month - 1, day);
  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.ceil((weddingDate.getTime() - startOfToday.getTime()) / (1000 * 60 * 60 * 24));
}

export default function CountdownScreen() {
  const params = useLocalSearchParams<{ date?: string }>();
  const date = typeof params.date === 'string' ? params.date : '';
  const [days, setDays] = useState(() => getDaysUntil(date));

  useEffect(() => {
    const timer = setInterval(() => setDays(getDaysUntil(date)), 60 * 60 * 1000);
    return () => clearInterval(timer);
  }, [date]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Countdown</Text>
      <Text style={styles.date}>Your wedding date: {date}</Text>
      {days > 0 ? (
        <>
          <Text style={styles.number}>{days}</Text>
          <Text style={styles.label}>days until your wedding</Text>
        </>
      ) : (
        <Text style={styles.label}>Your wedding day has arrived!</Text>
      )}
      <View style={styles.button}>
        <Button color={AppColors.accent} title="Change date" onPress={() => router.back()} />
      </View>
      <HomeButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: AppColors.background,
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    ...AppText.title,
  },
  date: {
    ...AppText.subtitle,
    marginTop: 16,
  },
  number: {
    color: AppColors.accent,
    fontSize: 72,
    fontWeight: 'bold',
    marginTop: 32,
  },
  label: {
    color: AppColors.text,
    fontSize: 20,
    textAlign: 'center',
  },
  button: {
    ...AppButton,
  },
});
