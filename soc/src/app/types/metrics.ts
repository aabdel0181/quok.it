export interface GPUMetrics {
  id: string;
  userId: string;
  network: string; // Ensure this line is present
  location: {
    city: string;
    latitude: number;
    longitude: number;
  };
  gpuCount: number;
  gpuType: string;
  utilization: number;
  networkHealth: number;
  pricing: {
    basePrice: string;
    currentPrice: string;
  };
  lastSeen: string;
  status: 'active' | 'inactive';
  performance: {
    throughput: number;
    latency: number;
  };
}