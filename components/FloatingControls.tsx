import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Play, Pause, CircleStop as StopCircle, Save, X } from 'lucide-react-native';
import { theme } from '@/constants/theme';

interface FloatingControlsProps {
  isRecording: boolean;
  onStop: () => void;
  onPause: () => void;
  onResume: () => void;
  onSave: () => void;
  onClose: () => void;
}

export default function FloatingControls({
  isRecording,
  onStop,
  onPause,
  onResume,
  onSave,
  onClose,
}: FloatingControlsProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const opacityValue = useState(new Animated.Value(0.7))[0];
  
  const handlePauseResume = () => {
    if (isPaused) {
      onResume();
    } else {
      onPause();
    }
    setIsPaused(!isPaused);
  };
  
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  
  const fadeIn = () => {
    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  
  const fadeOut = () => {
    Animated.timing(opacityValue, {
      toValue: 0.7,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View 
      style={[
        styles.container, 
        { opacity: opacityValue },
        expanded ? styles.expandedContainer : {}
      ]}
      onTouchStart={fadeIn}
      onTouchEnd={fadeOut}
    >
      <TouchableOpacity style={styles.mainButton} onPress={toggleExpand}>
        <View style={[styles.recordIndicator, isRecording && !isPaused ? styles.recording : styles.paused]} />
      </TouchableOpacity>
      
      {expanded && (
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton} onPress={handlePauseResume}>
            {isPaused ? <Play size={18} color="#FFFFFF" /> : <Pause size={18} color="#FFFFFF" />}
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton} onPress={onStop}>
            <StopCircle size={18} color="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton} onPress={onSave}>
            <Save size={18} color="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton} onPress={onClose}>
            <X size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderRadius: 25,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  expandedContainer: {
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  mainButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  recordIndicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  recording: {
    backgroundColor: theme.colors.error,
  },
  paused: {
    backgroundColor: theme.colors.warning,
  },
  controls: {
    flexDirection: 'row',
    marginLeft: 15,
  },
  controlButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
});