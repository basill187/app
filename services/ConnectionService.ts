import { Platform } from 'react-native';

interface ServerConnection {
  id: string;
  name: string;
  ipAddress: string;
  connected: boolean;
  lastConnected?: string;
}

class ConnectionServiceClass {
  private isConnected: boolean = false;
  private currentServer: ServerConnection | null = null;
  private serverHistory: ServerConnection[] = [];
  
  constructor() {
    // Initialize service
    this.loadConnectionHistory();
  }
  
  /**
   * Connect to a server via QR code data
   */
  async connectViaQR(qrData: string): Promise<boolean> {
    try {
      // Parse QR data
      const data = JSON.parse(qrData);
      
      if (!data.ipAddress || !data.name || !data.id) {
        throw new Error('Invalid QR code data');
      }
      
      return this.connectToServer({
        id: data.id,
        name: data.name,
        ipAddress: data.ipAddress,
        connected: false
      });
    } catch (error) {
      console.error('Failed to connect via QR:', error);
      return false;
    }
  }
  
  /**
   * Connect to a server via IP address
   */
  async connectViaIP(ipAddress: string, name?: string): Promise<boolean> {
    try {
      return this.connectToServer({
        id: Date.now().toString(),
        name: name || `Server ${this.serverHistory.length + 1}`,
        ipAddress,
        connected: false
      });
    } catch (error) {
      console.error('Failed to connect via IP:', error);
      return false;
    }
  }
  
  /**
   * Connect to a server
   */
  private async connectToServer(server: ServerConnection): Promise<boolean> {
    // In a real implementation, this would establish a WebSocket connection
    console.log('Connecting to server:', server);
    
    // Simulate connection
    server.connected = true;
    server.lastConnected = new Date().toISOString();
    
    // Update current server and history
    this.currentServer = server;
    this.isConnected = true;
    
    // Update server history
    const existingIndex = this.serverHistory.findIndex(s => s.id === server.id);
    if (existingIndex >= 0) {
      this.serverHistory[existingIndex] = server;
    } else {
      this.serverHistory.push(server);
    }
    
    this.saveConnectionHistory();
    return true;
  }
  
  /**
   * Disconnect from the current server
   */
  async disconnect(): Promise<boolean> {
    if (!this.isConnected || !this.currentServer) {
      return false;
    }
    
    // In a real implementation, this would close the WebSocket connection
    console.log('Disconnecting from server:', this.currentServer);
    
    // Update server in history
    const serverIndex = this.serverHistory.findIndex(s => s.id === this.currentServer?.id);
    if (serverIndex >= 0) {
      this.serverHistory[serverIndex].connected = false;
      this.saveConnectionHistory();
    }
    
    this.currentServer = null;
    this.isConnected = false;
    
    return true;
  }
  
  /**
   * Send a recording to the connected server
   */
  async sendRecording(recordingId: string): Promise<boolean> {
    if (!this.isConnected || !this.currentServer) {
      return false;
    }
    
    // In a real implementation, this would send the recording file
    console.log(`Sending recording ${recordingId} to server:`, this.currentServer);
    
    // Mock implementation
    return true;
  }
  
  /**
   * Check if connected to a server
   */
  isServerConnected(): boolean {
    return this.isConnected;
  }
  
  /**
   * Get current server
   */
  getCurrentServer(): ServerConnection | null {
    return this.currentServer;
  }
  
  /**
   * Get server connection history
   */
  getServerHistory(): ServerConnection[] {
    return this.serverHistory;
  }
  
  /**
   * Save connection history
   */
  private saveConnectionHistory(): void {
    // In a real implementation, this would save to AsyncStorage
    try {
      if (Platform.OS !== 'web') {
        // Mock implementation
        console.log('Saving connection history:', this.serverHistory);
      }
    } catch (error) {
      console.error('Failed to save connection history:', error);
    }
  }
  
  /**
   * Load connection history
   */
  private loadConnectionHistory(): void {
    // In a real implementation, this would load from AsyncStorage
    try {
      // Mock implementation
      this.serverHistory = [];
    } catch (error) {
      console.error('Failed to load connection history:', error);
      this.serverHistory = [];
    }
  }
}

// Export as singleton
export const ConnectionService = new ConnectionServiceClass();