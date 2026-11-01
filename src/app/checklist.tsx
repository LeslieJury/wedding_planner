import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { HomeButton } from '@/components/home-button';
import { AppColors, AppText } from '@/styles/app';

const STORAGE_KEY = 'wedding-planner-checklist';

const checklistItems = [
  'Choose the Date',
  'Set a Budget',
  'Make a Guest List',
  'Book a Venue',
  'Choose a Photographer',
  'Send Invitations',
  'Pick Wedding Rings',
  'Choose Wedding Dress & Suit',
  'Plan Ceremony',
];

export default function ChecklistScreen() {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  useEffect(() => {
    async function loadChecklist() {
      const savedItems = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedItems) {
        setCheckedItems(JSON.parse(savedItems));
      }
    }

    void loadChecklist();
  }, []);

  async function toggleItem(item: string) {
    const nextItems = checkedItems.includes(item)
      ? checkedItems.filter((checkedItem) => checkedItem !== item)
      : [...checkedItems, item];

    setCheckedItems(nextItems);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems));
  }

  async function resetChecklist() {
    setCheckedItems([]);
    await AsyncStorage.removeItem(STORAGE_KEY);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Wedding checklist</Text>
      <Text style={styles.subtitle}>
        {checkedItems.length} of {checklistItems.length} completed
      </Text>

      <View style={styles.list}>
        {checklistItems.map((item) => {
          const isChecked = checkedItems.includes(item);

          return (
            <Pressable
              key={item}
              style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
              onPress={() => void toggleItem(item)}>
              <View style={[styles.checkbox, isChecked && styles.checkedBox]}>
                {isChecked ? <Text style={styles.checkmark}>✓</Text> : null}
              </View>
              <Text style={[styles.itemText, isChecked && styles.completedText]}>{item}</Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable style={styles.resetButton} onPress={() => void resetChecklist()}>
        <Text style={styles.resetButtonText}>Reset checklist</Text>
      </Pressable>

      <HomeButton />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.background,
    flexGrow: 1,
    padding: 24,
    paddingTop: 48,
  },
  title: {
    ...AppText.title,
  },
  subtitle: {
    ...AppText.subtitle,
    marginTop: 8,
  },
  list: {
    marginTop: 24,
  },
  item: {
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderColor: AppColors.border,
    borderRadius: 6,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 10,
    padding: 14,
  },
  itemPressed: {
    backgroundColor: '#ffe0e7',
  },
  checkbox: {
    alignItems: 'center',
    borderColor: AppColors.accent,
    borderRadius: 3,
    borderWidth: 2,
    height: 24,
    justifyContent: 'center',
    width: 24,
  },
  checkedBox: {
    backgroundColor: AppColors.accent,
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemText: {
    color: AppColors.text,
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  completedText: {
    color: '#a06b78',
    textDecorationLine: 'line-through',
  },
  resetButton: {
    alignSelf: 'center',
    borderColor: AppColors.accent,
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  resetButtonText: {
    color: AppColors.accent,
    fontSize: 15,
  },
});
