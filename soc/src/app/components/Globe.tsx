import { useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import type { GPUMetrics } from "../types/metrics";

const GlobeGL = dynamic(() => import("react-globe.gl"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
    </div>
  ),
});

interface GlobeProps {
  data: Array<{
    date: string;
    provider: string;
    capacity_gpu: number;
    available_gpu: number;
    utilization_gpu: number;
    leases: number;
    daily_earnings: number;
    protocol_earnings: number;
    // Add location if available
    location?: {
      latitude: number;
      longitude: number;
    };
  }>;
}

export const Globe: React.FC<GlobeProps> = ({ data }) => {
  const globeRef = useRef<any>(null);

  useEffect(() => {
    let animationId: number;
    const rotationSpeed = 0.005;

    const animate = () => {
      if (globeRef.current) {
        const globe = globeRef.current;
        if (globe.scene()) {
          globe.scene().rotation.y += rotationSpeed;
          globe.renderer().render(globe.scene(), globe.camera());
        }

        globeRef.current.pointOfView({
          lat: 30,
          lng: -95,
          altitude: 2.5,
        });
      }
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const getColorByStatus = (metric: any) => {
    if (metric.utilization_gpu > 70) {
      return "#FFD700"; // Yellow for high utilization
    }
    return "#00cc00"; // Green for normal utilization
  };

  const globeData = useMemo(() => {
    console.log("Total data points:", data.length);
    return data
      .filter((metric) => metric.location) // Ensure location exists
      .map((metric) => ({
        lat: metric.location!.latitude,
        lng: metric.location!.longitude,
        size: 0.5,
        color: getColorByStatus(metric),
      }));
  }, [data]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <GlobeGL
        ref={globeRef}
        globeImageUrl="https://unpkg.com/three-globe@2.37.5/example/img/earth-dark.jpg"
        pointsData={globeData}
        pointAltitude={0.01}
        pointColor="color"
        pointRadius={0.5}
        atmosphereColor="#cc0000"
        atmosphereAltitude={0.15}
        backgroundColor="rgba(0,0,0,0)"
        width={800}
        height={800}
        enablePointerInteraction={false}
      />
    </div>
  );
};
