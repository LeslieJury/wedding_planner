export const AppColors = {
  background: '#fff0f3',
  heading: '#8f1d3f',
  text: '#6b3040',
  accent: '#c4455b',
  border: '#f0b5c1',
  white: '#ffffff',
} as const;

export const AppText = {
  title: {
    color: AppColors.heading,
    fontSize: 30,
    fontWeight: 'bold' as const,
  },
  subtitle: {
    color: AppColors.text,
    fontSize: 16,
  },
} as const;

export const AppButton = {
  marginTop: 20,
  width: 200,
} as const;
