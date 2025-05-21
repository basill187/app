import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import Slider from './Slider';
import { Play, Pause, SkipBack, SkipForward, Maximize, Minimize, X } from 'lucide-react-native';
import { theme } from '@/constants/theme';

interface VideoPlayerProps {
  uri: string;
  onClose: () => void;
}

export default function VideoPlayer({ uri, onClose }: VideoPlayerProps) {
  const webViewRef = useRef<WebView>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const handlePlay = () => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`
        if (document.querySelector('video')) {
          document.querySelector('video').play();
          true;
        }
      `);
      setIsPlaying(true);
    }
  };
  
  const handlePause = () => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`
        if (document.querySelector('video')) {
          document.querySelector('video').pause();
          true;
        }
      `);
      setIsPlaying(false);
    }
  };
  
  const handleSeek = (value: number) => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`
        if (document.querySelector('video')) {
          document.querySelector('video').currentTime = ${value};
          true;
        }
      `);
      setCurrentTime(value);
    }
  };
  
  const skipBackward = () => {
    const newTime = Math.max(0, currentTime - 5);
    handleSeek(newTime);
  };
  
  const skipForward = () => {
    const newTime = Math.min(duration, currentTime + 5);
    handleSeek(newTime);
  };
  
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };
  
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  // HTML to inject for the video
  const videoHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
        <style>
          body, html {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background-color: #000;
          }
          video {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        </style>
      </head>
      <body>
        <video
          id="videoPlayer"
          src="${uri}"
          webkit-playsinline
          playsinline
        ></video>
        <script>
          const video = document.getElementById('videoPlayer');
          
          video.addEventListener('loadedmetadata', () => {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'DURATION_CHANGE',
              duration: video.duration
            }));
          });
          
          video.addEventListener('timeupdate', () => {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'TIME_UPDATE',
              currentTime: video.currentTime
            }));
          });
          
          video.addEventListener('play', () => {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'PLAY'
            }));
          });
          
          video.addEventListener('pause', () => {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'PAUSE'
            }));
          });
          
          video.addEventListener('ended', () => {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'ENDED'
            }));
          });
        </script>
      </body>
    </html>
  `;
  
  const handleMessage = (event: { nativeEvent: { data: string } }) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      switch (data.type) {
        case 'DURATION_CHANGE':
          setDuration(data.duration);
          break;
        case 'TIME_UPDATE':
          setCurrentTime(data.currentTime);
          break;
        case 'PLAY':
          setIsPlaying(true);
          break;
        case 'PAUSE':
          setIsPlaying(false);
          break;
        case 'ENDED':
          setIsPlaying(false);
          setCurrentTime(0);
          break;
      }
    } catch (e) {
      console.log('Error parsing message:', e);
    }
  };

  return (
    <View style={[styles.container, isFullscreen && styles.fullscreenContainer]}>
      <View style={styles.videoContainer}>
        <WebView
          ref={webViewRef}
          source={{ html: videoHTML }}
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          javaScriptEnabled
          onMessage={handleMessage}
          style={styles.webView}
        />
      </View>
      
      <View style={styles.controls}>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
          <Slider
            value={currentTime}
            minimumValue={0}
            maximumValue={duration || 100}
            onValueChange={handleSeek}
          />
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.controlButton} onPress={skipBackward}>
            <SkipBack size={24} color={theme.colors.text} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.controlButton, styles.playPauseButton]} 
            onPress={isPlaying ? handlePause : handlePlay}
          >
            {isPlaying ? 
              <Pause size={24} color="#FFFFFF" /> : 
              <Play size={24} color="#FFFFFF" />
            }
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton} onPress={skipForward}>
            <SkipForward size={24} color={theme.colors.text} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton} onPress={toggleFullscreen}>
            {isFullscreen ? 
              <Minimize size={24} color={theme.colors.text} /> : 
              <Maximize size={24} color={theme.colors.text} />
            }
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <X size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  fullscreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    borderRadius: 0,
  },
  videoContainer: {
    width: '100%',
    height: 250,
    backgroundColor: '#000',
  },
  webView: {
    flex: 1,
  },
  controls: {
    padding: 16,
    backgroundColor: theme.colors.card,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  timeText: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '500',
    width: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  playPauseButton: {
    backgroundColor: theme.colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});