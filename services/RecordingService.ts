import { Platform } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as ScreenCapture from 'expo-screen-capture';
import * as VideoThumbnails from 'expo-video-thumbnails';

interface RecordingOptions {
  duration: number;
  jiraLink?: string;
  dndEnabled: boolean;
  showTouches: boolean;
  audioEnabled: boolean;
}

interface RecordingData {
  id: string;
  title: string;
  path: string;
  duration: number;
  date: string;
  jiraLink?: string;
  size: number;
}

class RecordingServiceClass {
  private isRecording: boolean = false;
  private isPaused: boolean = false;
  private recordings: RecordingData[] = [];
  
  async startRecording(options: RecordingOptions): Promise<boolean> {
    if (Platform.OS === 'web') {
      throw new Error('Screen recording is not supported on web platform');
    }

    try {
      // Request permissions
      const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
      if (mediaStatus !== 'granted') {
        throw new Error('Media library permission not granted');
      }

      // Enable DND if requested
      if (options.dndEnabled) {
        await ScreenCapture.preventScreenCaptureAsync();
      }

      // On iOS, we need to use the native screen recording feature
      if (Platform.OS === 'ios') {
        alert('Please use the built-in iOS screen recording feature:\n\n1. Open Control Center\n2. Tap Screen Recording\n3. Wait for countdown');
        return true;
      }

      // On Android, we'll use the native screen capture API
      if (Platform.OS === 'android') {
        // Note: This requires additional setup in Android native code
        // which would be handled through expo-dev-client or a custom dev build
        alert('Please use the built-in Android screen recording feature:\n\n1. Pull down notification shade\n2. Tap Screen Record\n3. Configure options and start recording');
        return true;
      }

      return false;
    } catch (error) {
      console.error('Failed to start recording:', error);
      return false;
    }
  }

  async stopRecording(): Promise<RecordingData | null> {
    if (!this.isRecording) {
      return null;
    }

    try {
      // Disable DND
      await ScreenCapture.allowScreenCaptureAsync();

      // For demonstration, we'll create a mock recording entry
      const recordingData: RecordingData = {
        id: Date.now().toString(),
        title: `Recording ${this.recordings.length + 1}`,
        path: '', // This would be the actual video path from the native recording
        duration: 0,
        date: new Date().toISOString(),
        size: 0
      };

      this.recordings.push(recordingData);
      this.isRecording = false;
      this.isPaused = false;

      return recordingData;
    } catch (error) {
      console.error('Failed to stop recording:', error);
      return null;
    }
  }

  pauseRecording(): boolean {
    if (!this.isRecording || this.isPaused) {
      return false;
    }
    
    this.isPaused = true;
    return true;
  }

  resumeRecording(): boolean {
    if (!this.isRecording || !this.isPaused) {
      return false;
    }
    
    this.isPaused = false;
    return true;
  }

  getRecordings(): RecordingData[] {
    return this.recordings;
  }

  async deleteRecording(id: string): Promise<boolean> {
    try {
      const recording = this.recordings.find(r => r.id === id);
      if (recording && recording.path) {
        await MediaLibrary.deleteAssetsAsync([recording.path]);
      }
      
      this.recordings = this.recordings.filter(r => r.id !== id);
      return true;
    } catch (error) {
      console.error('Failed to delete recording:', error);
      return false;
    }
  }

  async deleteAllRecordings(): Promise<boolean> {
    try {
      for (const recording of this.recordings) {
        if (recording.path) {
          await MediaLibrary.deleteAssetsAsync([recording.path]);
        }
      }
      
      this.recordings = [];
      return true;
    } catch (error) {
      console.error('Failed to delete all recordings:', error);
      return false;
    }
  }

  isCurrentlyRecording(): boolean {
    return this.isRecording;
  }

  isRecordingPaused(): boolean {
    return this.isRecording && this.isPaused;
  }

  async shareRecording(id: string): Promise<boolean> {
    try {
      const recording = this.recordings.find(r => r.id === id);
      if (!recording) return false;

      // Implementation would depend on the native sharing capabilities
      return true;
    } catch (error) {
      console.error('Failed to share recording:', error);
      return false;
    }
  }
}

export const RecordingService = new RecordingServiceClass();