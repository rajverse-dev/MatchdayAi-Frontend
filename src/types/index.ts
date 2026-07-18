// Centralized domain types for MatchDay AI

export type UserRole = 'admin' | 'operator' | 'visitor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  preferredLanguage: Language;
  notificationsEnabled: boolean;
}

export type Language = 'en' | 'es' | 'fr' | 'ar' | 'de';

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

// Dashboard
export interface DashboardStats {
  visitors: number;
  visitorsTrend: number;
  crowdDensity: number;
  crowdDensityTrend: number;
  averageQueueTime: number;
  averageQueueTimeTrend: number;
  emergencyAlerts: number;
  energyUsage: number;
  energyUsageTrend: number;
  transportation: number;
  transportationTrend: number;
  wasteCollection: number;
  wasteCollectionTrend: number;
  announcements: number;
}

export interface TimeSeriesPoint {
  time: string;
  value: number;
}

export interface DashboardData {
  stats: DashboardStats;
  crowdTrend: TimeSeriesPoint[];
  queueTrend: TimeSeriesPoint[];
  energyTrend: TimeSeriesPoint[];
  transportTrend: TimeSeriesPoint[];
  announcements: Announcement[];
  aiRecommendation: AIRecommendation;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'danger';
  timestamp: string;
}

export interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  action: string;
  confidence: number;
}

// Chat
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  language?: Language;
}

export interface ChatPayload {
  message: string;
  language: Language;
  conversationId?: string;
}

export interface ChatResponse {
  reply: string;
  conversationId: string;
  suggestions: string[];
}

// Navigation
export interface MapPoint {
  id: string;
  label: string;
  type: 'gate' | 'food' | 'medical' | 'restroom' | 'parking' | 'seat' | 'exit';
  lat: number;
  lng: number;
  description?: string;
}

export interface RouteInfo {
  id: string;
  from: string;
  to: string;
  distance: number;
  estimatedTime: number;
  accessibility: boolean;
}

// Queue
export interface QueueInfo {
  id: string;
  stallName: string;
  location: string;
  waitingTime: number;
  estimatedTime: number;
  peopleInLine: number;
  status: 'low' | 'medium' | 'high' | 'closed';
  progress: number;
  category: 'food' | 'restroom' | 'merchandise' | 'ticket';
  rating: number;
}

// Crowd
export interface CrowdZone {
  id: string;
  zone: string;
  density: number;
  capacity: number;
  status: 'safe' | 'moderate' | 'busy' | 'critical';
  trend: number;
  lastUpdated: string;
}

export interface CrowdHeatmapPoint {
  lat: number;
  lng: number;
  intensity: number;
}

// Emergency
export interface EmergencyIncident {
  id: string;
  type: 'medical' | 'fire' | 'security' | 'crowd' | 'infrastructure';
  location: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'responding' | 'resolved';
  reportedAt: string;
  description: string;
  responder?: string;
}

// Transport
export interface TransportOption {
  id: string;
  type: 'metro' | 'bus' | 'parking' | 'rideshare' | 'shuttle';
  label: string;
  availability: number;
  nextArrival: number;
  capacity: number;
  status: 'available' | 'limited' | 'full';
  route?: string;
}

// Operations
export interface IncidentTimelineItem {
  id: string;
  time: string;
  title: string;
  description: string;
  status: 'resolved' | 'active' | 'monitoring';
  category: string;
}

export interface OperationsData {
  liveStats: DashboardStats;
  crowdTrend: TimeSeriesPoint[];
  incidents: IncidentTimelineItem[];
  alerts: Announcement[];
  aiRecommendations: AIRecommendation[];
  heatmap: CrowdHeatmapPoint[];
}
