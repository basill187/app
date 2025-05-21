import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { 
  Settings, Server, Smartphone, Film, Trash2, Share, 
  Save, Camera, Mic, Volume2, CornerUpRight 
} from 'lucide-react-native';
import { theme } from '@/constants/theme';

export default function SettingsScreen() {
  const [autoSave, setAutoSave] = useState(true);
  const [highQuality, setHighQuality] = useState(false);
  const [enableAI, setEnableAI] = useState(true);
  const [showFloatingControls, setShowFloatingControls] = useState(true);

  const handleClearAllRecordings = () => {
    Alert.alert(
      "Clear All Recordings",
      "Are you sure you want to delete all recordings? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete All", 
          onPress: () => console.log("Deleted all recordings"),
          style: "destructive"
        }
      ]
    );
  };

  const handleDisconnectServer = () => {
    Alert.alert(
      "Disconnect Server",
      "Are you sure you want to disconnect from the server?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Disconnect", 
          onPress: () => console.log("Disconnected from server")
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recording Preferences</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLabelContainer}>
            <Save size={20} color={theme.colors.primary} />
            <Text style={styles.settingLabel}>Auto-save recordings</Text>
          </View>
          <Switch
            value={autoSave}
            onValueChange={setAutoSave}
            trackColor={{ false: '#D1D1D6', true: theme.colors.primaryLight }}
            thumbColor={autoSave ? theme.colors.primary : '#FFFFFF'}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLabelContainer}>
            <Film size={20} color={theme.colors.primary} />
            <Text style={styles.settingLabel}>High quality recordings</Text>
          </View>
          <Switch
            value={highQuality}
            onValueChange={setHighQuality}
            trackColor={{ false: '#D1D1D6', true: theme.colors.primaryLight }}
            thumbColor={highQuality ? theme.colors.primary : '#FFFFFF'}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLabelContainer}>
            <Camera size={20} color={theme.colors.primary} />
            <Text style={styles.settingLabel}>Show floating controls</Text>
          </View>
          <Switch
            value={showFloatingControls}
            onValueChange={setShowFloatingControls}
            trackColor={{ false: '#D1D1D6', true: theme.colors.primaryLight }}
            thumbColor={showFloatingControls ? theme.colors.primary : '#FFFFFF'}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI Features</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLabelContainer}>
            <CornerUpRight size={20} color={theme.colors.primary} />
            <Text style={styles.settingLabel}>Enable AI suggestions</Text>
          </View>
          <Switch
            value={enableAI}
            onValueChange={setEnableAI}
            trackColor={{ false: '#D1D1D6', true: theme.colors.primaryLight }}
            thumbColor={enableAI ? theme.colors.primary : '#FFFFFF'}
          />
        </View>
        
        {enableAI && (
          <View style={styles.aiSettings}>
            <Text style={styles.aiDescription}>
              AI will analyze your recordings to suggest file names, identify user actions, and help with bug reports.
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Server Connection</Text>
        
        <View style={styles.serverInfo}>
          <Server size={24} color={theme.colors.primary} />
          <View style={styles.serverDetails}>
            <Text style={styles.serverStatus}>Not Connected</Text>
            <Text style={styles.serverAddress}>No server address</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={[styles.button, styles.disconnectButton]}
          onPress={handleDisconnectServer}
        >
          <Smartphone size={20} color="#FFFFFF" />
          <Text style={styles.buttonText}>Disconnect Server</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Storage</Text>
        
        <View style={styles.storageInfo}>
          <View style={styles.storageBar}>
            <View style={[styles.storageUsed, { width: '25%' }]} />
          </View>
          <Text style={styles.storageText}>41.2 MB used of 1 GB</Text>
        </View>
        
        <TouchableOpacity 
          style={[styles.button, styles.clearButton]}
          onPress={handleClearAllRecordings}
        >
          <Trash2 size={20} color="#FFFFFF" />
          <Text style={styles.buttonText}>Clear All Recordings</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        
        <View style={styles.aboutItem}>
          <Text style={styles.aboutLabel}>Version</Text>
          <Text style={styles.aboutValue}>1.0.0</Text>
        </View>
        
        <View style={styles.aboutItem}>
          <Text style={styles.aboutLabel}>Build</Text>
          <Text style={styles.aboutValue}>2023.05.01</Text>
        </View>
        
        {Platform.OS !== 'web' && (
          <TouchableOpacity style={[styles.button, styles.shareButton]}>
            <Share size={20} color="#FFFFFF" />
            <Text style={styles.buttonText}>Share App</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    color: theme.colors.text,
    marginLeft: 12,
  },
  aiSettings: {
    paddingTop: 12,
  },
  aiDescription: {
    fontSize: 14,
    color: theme.colors.textLight,
    lineHeight: 20,
  },
  serverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: theme.colors.backgroundLight,
    borderRadius: 8,
    marginBottom: 16,
  },
  serverDetails: {
    marginLeft: 16,
  },
  serverStatus: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  serverAddress: {
    fontSize: 14,
    color: theme.colors.textLight,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  disconnectButton: {
    backgroundColor: theme.colors.secondary,
  },
  clearButton: {
    backgroundColor: theme.colors.error,
  },
  shareButton: {
    backgroundColor: theme.colors.primary,
  },
  storageInfo: {
    marginBottom: 16,
  },
  storageBar: {
    height: 8,
    backgroundColor: theme.colors.backgroundLight,
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  storageUsed: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
  },
  storageText: {
    fontSize: 14,
    color: theme.colors.textLight,
  },
  aboutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  aboutLabel: {
    fontSize: 16,
    color: theme.colors.text,
  },
  aboutValue: {
    fontSize: 16,
    color: theme.colors.textLight,
  },
});