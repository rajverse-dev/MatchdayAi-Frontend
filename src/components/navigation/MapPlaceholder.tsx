import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { MapPoint } from '../../types';

interface MapPlaceholderProps {
  points: MapPoint[];
  center?: [number, number];
  zoom?: number;
  className?: string;
}

const typeColors: Record<MapPoint['type'], string> = {
  gate: '#2f7bff',
  food: '#f59e0b',
  medical: '#ef4444',
  restroom: '#10b981',
  parking: '#6889bf',
  seat: '#8ec1ff',
  exit: '#dc2626',
};

const typeIcons: Record<MapPoint['type'], string> = {
  gate: '🚪',
  food: '🍔',
  medical: '🏥',
  restroom: '🚻',
  parking: '🅿️',
  seat: '🎟️',
  exit: '🚪',
};

export function MapPlaceholder({
  points,
  center = [51.5549, -0.1072],
  zoom = 16,
  className = '',
}: MapPlaceholderProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center,
      zoom,
      zoomControl: true,
      attributionControl: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    points.forEach((point) => {
      const color = typeColors[point.type];
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="
          background: ${color};
          width: 36px;
          height: 36px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
          border: 2px solid white;
        "><span style="transform: rotate(45deg); font-size: 16px;">${typeIcons[point.type]}</span></div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36],
      });

      L.marker([point.lat, point.lng], { icon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family: Inter, sans-serif; min-width: 140px;">
            <strong style="color: ${color}; font-size: 14px;">${point.label}</strong>
            ${point.description ? `<p style="font-size: 12px; color: #64748b; margin-top: 4px;">${point.description}</p>` : ''}
          </div>`,
        );
    });
  }, [points]);

  return <div ref={mapRef} className={`w-full h-full min-h-[400px] rounded-2xl ${className}`} />;
}
