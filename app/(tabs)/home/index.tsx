import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TextInput, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Camera, Mic, QrCode, Eye, Volume2, Smartphone, BellOff } from 'lucide-react-native';
import Slider from '@/components/Slider';
import { RecordingService } from '@/services/RecordingService';
import { theme } from '@/constants/theme';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [duration, setDuration] = useState(30); // Default 30 seconds
  const [jiraLink, setJiraLink] = useState('');
  const [dndEnabled, setDndEnabled] = useState(false);
  const [showTouches, setShowTouches] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isRecording, setIsRecording] = useState(false);

  const handleStartRecording = async () => {
    if (Platform.OS === 'web') {
      alert('Recording is not available on web platform');
      return;
    }
    
    try {
      setIsRecording(true);
      await RecordingService.startRecording({
        duration,
        jiraLink,
        dndEnabled,
        showTouches,
        audioEnabled
      });
    } catch (error) {
      console.error('Failed to start recording:', error);
      setIsRecording(false);
    }
  };

  const handleScanQRCode = () => {
    // Navigate to QR code scanner
  };

  return (
    <ScrollView 
      style={[styles.container, { paddingTop: insets.top }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recording Settings</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLabelContainer}>
            <Camera size={20} color={theme.colors.primary} />
            <Text style={styles.settingLabel}>Recording Duration</Text>
          </View>
          <Text style={styles.durationText}>{formatDuration(duration)}</Text>
        </View>
        
        <Slider
          value={duration}
          minimumValue={15}
          maximumValue={180}
          step={5}
          onValueChange={setDuration}
        />
        
        <View style={styles.settingItem}>
          <View style={styles.settingLabelContainer}>
            <TextInput
              style={styles.input}
              placeholder="Jira Story Link (Optional)"
              value={jiraLink}
              onChangeText={setJiraLink}
            />
          </View>
        </View>
        
        <View style={styles.toggleContainer}>
          <View style={styles.toggleItem}>
            <View style={styles.settingLabelContainer}>
              <BellOff size={20} color={theme.colors.primary} />
              <Text style={styles.settingLabel}>Do Not Disturb</Text>
            </View>
            <Switch
              value={dndEnabled}
              onValueChange={setDndEnabled}
              trackColor={{ false: '#D1D1D6', true: theme.colors.primaryLight }}
              thumbColor={dndEnabled ? theme.colors.primary : '#FFFFFF'}
            />
          </View>
          
          <View style={styles.toggleItem}>
            <View style={styles.settingLabelContainer}>
              <Eye size={20} color={theme.colors.primary} />
              <Text style={styles.settingLabel}>Show Touches</Text>
            </View>
            <Switch
              value={showTouches}
              onValueChange={setShowTouches}
              trackColor={{ false: '#D1D1D6', true: theme.colors.primaryLight }}
              thumbColor={showTouches ? theme.colors.primary : '#FFFFFF'}
            />
          </View>
          
          <View style={styles.toggleItem}>
            <View style={styles.settingLabelContainer}>
              <Mic size={20} color={theme.colors.primary} />
              <Text style={styles.settingLabel}>Record Audio</Text>
            </View>
            <Switch
              value={audioEnabled}
              onValueChange={setAudioEnabled}
              trackColor={{ false: '#D1D1D6', true: theme.colors.primaryLight }}
              thumbColor={audioEnabled ? theme.colors.primary : '#FFFFFF'}
            />
          </View>
        </View>
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.startButton]} 
          onPress={handleStartRecording}
          disabled={isRecording}
        >
          <Camera size={24} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>
            {isRecording ? 'Recording...' : 'Start Recording'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.scanButton]} 
          onPress={handleScanQRCode}
        >
          <QrCode size={24} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Scan QR Code</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Device Connection</Text>
        </View>
        
        <View style={styles.connectionStatus}>
          <View style={styles.statusIndicator}>
            <View style={[styles.indicator, styles.disconnected]} />
            <Text style={styles.statusText}>Disconnected</Text>
          </View>
          <Smartphone size={24} color={theme.colors.gray[500]} />
        </View>
        
        <Text style={styles.connectionInfo}>
          Connect to the desktop application by scanning the QR code or entering the IP manually.
        </Text>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Recordings</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.emptyText}>No recordings yet</Text>
      </View>
    </ScrollView>
  );
}

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 16,
  },
  settingItem: {
    marginBottom: 12,
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  settingLabel: {
    fontSize: 16,
    color: theme.colors.text,
    marginLeft: 8,
  },
  durationText: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.primary,
    textAlign: 'center',
    marginVertical: 8,
  },
  input: {
    height: 44,
    width: '100%',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: theme.colors.text,
  },
  toggleContainer: {
    marginTop: 16,
  },
  toggleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  startButton: {
    backgroundColor: theme.colors.primary,
    marginRight: 8,
  },
  scanButton: {
    backgroundColor: theme.colors.secondary,
    marginLeft: 8,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  connectionStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: theme.colors.backgroundLight,
    borderRadius: 8,
    marginBottom: 12,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  disconnected: {
    backgroundColor: theme.colors.error,
  },
  connected: {
    backgroundColor: theme.colors.success,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text,
  },
  connectionInfo: {
    fontSize: 14,
    color: theme.colors.textLight,
    lineHeight: 20,
  },
  seeAllText: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '500',
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.textLight,
    textAlign: 'center',
    padding: 24,
  },
});