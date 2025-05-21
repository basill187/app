import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  interpolate,
} from 'react-native-reanimated';
import { theme } from '@/constants/theme';

interface SliderProps {
  value: number;
  minimumValue: number;
  maximumValue: number;
  step?: number;
  onValueChange: (value: number) => void;
}

export default function Slider({
  value,
  minimumValue,
  maximumValue,
  step = 1,
  onValueChange,
}: SliderProps) {
  const position = useSharedValue(
    ((value - minimumValue) / (maximumValue - minimumValue)) * 100
  );

  const updateValue = (pos: number) => {
    const percentage = pos / 100;
    let newValue = minimumValue + percentage * (maximumValue - minimumValue);
    
    if (step > 0) {
      newValue = Math.round(newValue / step) * step;
    }
    
    newValue = Math.max(minimumValue, Math.min(maximumValue, newValue));
    onValueChange(newValue);
  };

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      const newPosition = Math.max(0, Math.min(100, position.value + e.changeX / 3));
      position.value = newPosition;
      runOnJS(updateValue)(newPosition);
    })
    .onEnd(() => {
      position.value = withSpring(position.value);
    });

  const thumbStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: interpolate(position.value, [0, 100], [0, 280]) }],
    };
  });

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${position.value}%`,
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.trackContainer}>
        <Animated.View style={[styles.progressTrack, progressStyle]} />
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.thumb, thumbStyle]} />
        </GestureDetector>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
    marginVertical: 8,
  },
  trackContainer: {
    height: 4,
    backgroundColor: theme.colors.backgroundLight,
    borderRadius: 2,
    position: 'relative',
  },
  progressTrack: {
    height: 4,
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
    position: 'absolute',
    top: -8,
    left: -10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});