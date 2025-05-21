import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerTitle: 'Screen Recorder',
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="qr-scanner" 
        options={{ 
          headerTitle: 'Scan QR Code',
          presentation: 'modal' 
        }} 
      />
      <Stack.Screen 
        name="preview" 
        options={{ 
          headerTitle: 'Recording Preview',
          presentation: 'modal' 
        }} 
      />
    </Stack>
  );
}