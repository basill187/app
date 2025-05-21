import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Trash2, Share, CreditCard as Edit, Info, Calendar, Clock, Film } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import EmptyState from '@/components/EmptyState';

// Placeholder data for demo
const sampleRecordings = [
  {
    id: '1',
    title: 'Login Screen Bug',
    duration: '00:45',
    date: '2023-05-15',
    fileSize: '12.5 MB',
    thumbnail: 'https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '2',
    title: 'Navigation Issue',
    duration: '01:23',
    date: '2023-05-14',
    fileSize: '28.7 MB',
    thumbnail: 'https://images.pexels.com/photos/907489/pexels-photo-907489.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

export default function RecordingsScreen() {
  const [recordings, setRecordings] = useState(sampleRecordings);

  const handlePlayRecording = (recordingId) => {
    // Implementation for playing a recording
    console.log(`Playing recording ${recordingId}`);
  };

  const handleDeleteRecording = (recordingId) => {
    setRecordings(recordings.filter(recording => recording.id !== recordingId));
  };

  const handleShareRecording = (recordingId) => {
    // Implementation for sharing a recording
    console.log(`Sharing recording ${recordingId}`);
  };

  const renderRecordingItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.recordingItem}
      onPress={() => handlePlayRecording(item.id)}
    >
      <Image 
        source={{ uri: item.thumbnail }} 
        style={styles.thumbnail}
      />
      <View style={styles.recordingInfo}>
        <Text style={styles.recordingTitle}>{item.title}</Text>
        <View style={styles.recordingMeta}>
          <View style={styles.metaItem}>
            <Calendar size={14} color={theme.colors.textLight} />
            <Text style={styles.metaText}>{item.date}</Text>
          </View>
          <View style={styles.metaItem}>
            <Clock size={14} color={theme.colors.textLight} />
            <Text style={styles.metaText}>{item.duration}</Text>
          </View>
        </View>
        <Text style={styles.fileSize}>{item.fileSize}</Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleShareRecording(item.id)}
        >
          <Share size={20} color={theme.colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleDeleteRecording(item.id)}
        >
          <Trash2 size={20} color={theme.colors.error} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <EmptyState
      icon={<Film size={64} color={theme.colors.textLight} />}
      title="No Recordings Yet"
      message="Your recorded screen sessions will appear here."
      actionLabel="Start Recording"
      onAction={() => {}}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{recordings.length}</Text>
          <Text style={styles.statLabel}>Recordings</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>41.2 MB</Text>
          <Text style={styles.statLabel}>Storage Used</Text>
        </View>
      </View>
      
      <FlatList
        data={recordings}
        keyExtractor={(item) => item.id}
        renderItem={renderRecordingItem}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: theme.colors.card,
    marginBottom: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: theme.colors.textLight,
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  recordingItem: {
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: theme.colors.backgroundLight,
  },
  recordingInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  recordingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 6,
  },
  recordingMeta: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  metaText: {
    fontSize: 14,
    color: theme.colors.textLight,
    marginLeft: 4,
  },
  fileSize: {
    fontSize: 14,
    color: theme.colors.textLight,
  },
  actionButtons: {
    justifyContent: 'center',
  },
  actionButton: {
    padding: 8,
  },
});