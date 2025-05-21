import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Share2, Download, Save, Trash2, CreditCard as Edit3 } from 'lucide-react-native';
import VideoPlayer from '@/components/VideoPlayer';
import { theme } from '@/constants/theme';

export default function PreviewScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [title, setTitle] = useState('Screen Recording');
  const [editingTitle, setEditingTitle] = useState(false);
  const [format, setFormat] = useState('mp4');
  const [quality, setQuality] = useState('high');
  
  // Mock video URI for demo
  const videoUri = 'https://assets.mixkit.co/videos/preview/mixkit-app-user-interacting-with-a-smartphone-32646-large.mp4';
  
  const handleSave = () => {
    // In a real app, this would save the recording with the selected options
    console.log('Saving recording with:', { id, title, format, quality });
    router.back();
  };
  
  const handleShare = () => {
    // In a real app, this would share the recording
    console.log('Sharing recording:', id);
  };
  
  const handleDelete = () => {
    // In a real app, this would delete the recording
    console.log('Deleting recording:', id);
    router.back();
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <VideoPlayer uri={videoUri} onClose={() => router.back()} />
        
        <View style={styles.titleContainer}>
          {editingTitle ? (
            <TextInput
              style={styles.titleInput}
              value={title}
              onChangeText={setTitle}
              autoFocus
              onBlur={() => setEditingTitle(false)}
              onSubmitEditing={() => setEditingTitle(false)}
            />
          ) : (
            <View style={styles.titleRow}>
              <Text style={styles.title}>{title}</Text>
              <TouchableOpacity 
                style={styles.editButton}
                onPress={() => setEditingTitle(true)}
              >
                <Edit3 size={16} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>
          )}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Format Options</Text>
          
          <View style={styles.optionsContainer}>
            <TouchableOpacity 
              style={[styles.optionButton, format === 'mp4' && styles.selectedOption]}
              onPress={() => setFormat('mp4')}
            >
              <Text style={[styles.optionText, format === 'mp4' && styles.selectedOptionText]}>MP4</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.optionButton, format === 'mov' && styles.selectedOption]}
              onPress={() => setFormat('mov')}
            >
              <Text style={[styles.optionText, format === 'mov' && styles.selectedOptionText]}>MOV</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.optionButton, format === 'gif' && styles.selectedOption]}
              onPress={() => setFormat('gif')}
            >
              <Text style={[styles.optionText, format === 'gif' && styles.selectedOptionText]}>GIF</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quality</Text>
          
          <View style={styles.optionsContainer}>
            <TouchableOpacity 
              style={[styles.optionButton, quality === 'high' && styles.selectedOption]}
              onPress={() => setQuality('high')}
            >
              <Text style={[styles.optionText, quality === 'high' && styles.selectedOptionText]}>High</Text>
              <Text style={styles.optionSubtext}>Larger file size</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.optionButton, quality === 'medium' && styles.selectedOption]}
              onPress={() => setQuality('medium')}
            >
              <Text style={[styles.optionText, quality === 'medium' && styles.selectedOptionText]}>Medium</Text>
              <Text style={styles.optionSubtext}>Balanced</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.optionButton, quality === 'low' && styles.selectedOption]}
              onPress={() => setQuality('low')}
            >
              <Text style={[styles.optionText, quality === 'low' && styles.selectedOptionText]}>Low</Text>
              <Text style={styles.optionSubtext}>Smaller file size</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.aiSection}>
          <Text style={styles.aiTitle}>AI-Generated Analysis</Text>
          
          <View style={styles.aiCard}>
            <Text style={styles.aiSubtitle}>User Actions</Text>
            <Text style={styles.aiText}>1. Opened login screen</Text>
            <Text style={styles.aiText}>2. Entered username/password</Text>
            <Text style={styles.aiText}>3. Tapped login button</Text>
            <Text style={styles.aiText}>4. Error message appeared</Text>
          </View>
          
          <View style={styles.aiCard}>
            <Text style={styles.aiSubtitle}>Bug Report</Text>
            <Text style={styles.aiText}>
              <Text style={styles.aiLabel}>Expected: </Text>
              User should successfully log in to the dashboard
            </Text>
            <Text style={styles.aiText}>
              <Text style={styles.aiLabel}>Actual: </Text>
              Authentication error appears despite correct credentials
            </Text>
          </View>
        </View>
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.saveButton]}
            onPress={handleSave}
          >
            <Save size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Save</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.shareButton]}
            onPress={handleShare}
          >
            <Share2 size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Share</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.deleteButton]}
            onPress={handleDelete}
          >
            <Trash2 size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  titleContainer: {
    padding: 16,
    backgroundColor: theme.colors.card,
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    ...theme.shadows.small,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
  },
  titleInput: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary,
    paddingVertical: 4,
  },
  editButton: {
    padding: 8,
  },
  section: {
    padding: 16,
    backgroundColor: theme.colors.card,
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    ...theme.shadows.small,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundLight,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  selectedOption: {
    backgroundColor: `${theme.colors.primaryLight}20`,
    borderColor: theme.colors.primary,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text,
    marginBottom: 4,
  },
  selectedOptionText: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  optionSubtext: {
    fontSize: 12,
    color: theme.colors.textLight,
  },
  aiSection: {
    padding: 16,
    backgroundColor: theme.colors.card,
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    ...theme.shadows.small,
  },
  aiTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 16,
  },
  aiCard: {
    backgroundColor: `${theme.colors.secondaryLight}10`,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.secondary,
  },
  aiSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.secondary,
    marginBottom: 8,
  },
  aiText: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: 4,
    lineHeight: 20,
  },
  aiLabel: {
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 32,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
    ...theme.shadows.small,
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
  },
  shareButton: {
    backgroundColor: theme.colors.secondary,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
});