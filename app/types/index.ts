/**
 * NexusVision Type Definitions
 * 
 * This file contains all TypeScript interfaces and types used throughout
 * the NexusVision dashboard application.
 */

// ============================================================================
// Detection Types
// ============================================================================

/**
 * Represents the type of object that can be detected by the AI system
 */
export type DetectionType = 'person' | 'vehicle' | 'package' | 'animal' | 'face';

/**
 * Represents the status of a detection log entry
 */
export type DetectionStatus = 'verified' | 'pending' | 'alert';

/**
 * Represents the trend direction for metrics
 */
export type TrendDirection = 'up' | 'down' | 'neutral';

/**
 * Represents the status of a camera feed
 */
export type CameraStatus = 'online' | 'offline' | 'warning';

// ============================================================================
// Data Interfaces
// ============================================================================

/**
 * Configuration for each detection class including visual styling
 */
export interface DetectionClassConfig {
  color: string;
  borderColor: string;
  label: string;
}

/**
 * A single detection box with position, classification, and tracking data
 */
export interface DetectionBox {
  /** Unique identifier for the detection */
  id: string;
  /** Type of detected object */
  type: DetectionType;
  /** X position as percentage (0-100) */
  x: number;
  /** Y position as percentage (0-100) */
  y: number;
  /** Width in pixels */
  width: number;
  /** Height in pixels */
  height: number;
  /** Confidence score (0-100) */
  confidence: number;
  /** Tracking ID for object persistence */
  trackingId: string;
  /** Velocity vector for movement prediction */
  velocity: Velocity;
  /** Color for rendering the detection box */
  color: string;
  /** Whether this is a newly detected object */
  isNew: boolean;
  /** Timestamp of last detection */
  lastSeen: number;
}

/**
 * Velocity vector for object tracking
 */
export interface Velocity {
  x: number;
  y: number;
}

/**
 * A log entry for a detection event
 */
export interface DetectionLog {
  /** Unique identifier */
  id: string;
  /** Type of detected object */
  type: string;
  /** Confidence score (0-100) */
  confidence: number;
  /** Timestamp of detection */
  timestamp: Date;
  /** Camera that captured the detection */
  camera: string;
  /** Current verification status */
  status: DetectionStatus;
}

/**
 * Metric data for dashboard display
 */
export interface MetricData {
  /** Display title */
  title: string;
  /** Current value (string or number) */
  value: string | number;
  /** Change description */
  change: string;
  /** Trend direction */
  trend: TrendDirection;
  /** Tailwind color class */
  color: string;
  /** Icon component */
  icon: React.ReactNode;
}

/**
 * Camera feed information
 */
export interface CameraFeed {
  /** Unique identifier */
  id: string;
  /** Display name */
  name: string;
  /** Physical location */
  location: string;
  /** Current operational status */
  status: CameraStatus;
  /** Current frames per second */
  fps: number;
  /** Total detections count */
  detections: number;
}

// ============================================================================
// Navigation Types
// ============================================================================

/**
 * Navigation item configuration
 */
export interface NavItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Lucide icon component */
  icon: React.ComponentType<{ className?: string }>;
}

// ============================================================================
// System Types
// ============================================================================

/**
 * System health metrics
 */
export interface SystemMetrics {
  /** CPU usage percentage (0-100) */
  cpuUsage: number;
  /** Memory usage in GB */
  memoryUsage: number;
  /** Memory total in GB */
  memoryTotal: number;
  /** GPU usage percentage (0-100) */
  gpuUsage: number;
  /** Current inference time in ms */
  inferenceTime: number;
  /** Current FPS */
  fps: number;
}

/**
 * Alert notification
 */
export interface Alert {
  /** Unique identifier */
  id: string;
  /** Alert title */
  title: string;
  /** Alert description */
  description: string;
  /** Severity level */
  severity: 'low' | 'medium' | 'high' | 'critical';
  /** Timestamp */
  timestamp: Date;
  /** Whether alert has been read */
  read: boolean;
}

// ============================================================================
// Component Props Types
// ============================================================================

/**
 * Props for the detection box component
 */
export interface DetectionBoxProps {
  box: DetectionBox;
  classConfig: DetectionClassConfig;
}

/**
 * Props for metric card component
 */
export interface MetricCardProps {
  metric: MetricData;
}

/**
 * Props for the live feed component
 */
export interface LiveFeedProps {
  isRecording: boolean;
  isMuted: boolean;
  detectionBoxes: DetectionBox[];
  fps: number;
  gpuUsage: number;
  modelConfidence: number;
  inferenceTime: number;
  onToggleRecording: () => void;
  onToggleMute: () => void;
}

// ============================================================================
// API Types (for future backend integration)
// ============================================================================

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page: number;
  limit: number;
  total?: number;
}

/**
 * Detection API request
 */
export interface DetectionRequest {
  cameraId: string;
  startTime?: Date;
  endTime?: Date;
  types?: DetectionType[];
  minConfidence?: number;
}

/**
 * Detection API response
 */
export interface DetectionResponse {
  detections: DetectionLog[];
  pagination: PaginationParams;
}