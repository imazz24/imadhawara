'use client';

import { useState, useEffect, useCallback } from 'react';
import type { DetectionBox, DetectionLog, DetectionType } from '../types';

/**
 * Detection class configurations
 * Defines visual styling for each type of detected object
 */
export const DETECTION_CLASSES: Record<
  DetectionType,
  { color: string; borderColor: string; label: string }
> = {
  person: { color: 'rgba(52, 211, 153, 0.15)', borderColor: '#34d399', label: 'PERSON' },
  vehicle: { color: 'rgba(139, 92, 246, 0.15)', borderColor: '#8b5cf6', label: 'VEHICLE' },
  package: { color: 'rgba(251, 146, 60, 0.15)', borderColor: '#fb923c', label: 'PACKAGE' },
  animal: { color: 'rgba(59, 130, 246, 0.15)', borderColor: '#3b82f6', label: 'ANIMAL' },
  face: { color: 'rgba(236, 72, 153, 0.15)', borderColor: '#ec4899', label: 'FACE' },
};

/**
 * Camera locations for detection logs
 */
const CAMERA_LOCATIONS = ['Main Entrance', 'Parking Lot', 'Back Door', 'Lobby'];

/**
 * Generates a random detection log entry
 */
const generateDetectionLog = (): DetectionLog => ({
  id: Math.random().toString(36).substring(7),
  type: ['Person', 'Vehicle', 'Package', 'Animal'][Math.floor(Math.random() * 4)],
  confidence: Math.floor(Math.random() * 15) + 85,
  timestamp: new Date(),
  camera: CAMERA_LOCATIONS[Math.floor(Math.random() * 4)],
  status: ['verified', 'pending', 'alert'][Math.floor(Math.random() * 3)] as DetectionLog['status'],
});

/**
 * Generates a random detection box with realistic properties
 */
const generateDetectionBox = (): DetectionBox => {
  const types: DetectionType[] = ['person', 'vehicle', 'package', 'animal', 'face'];
  const type = types[Math.floor(Math.random() * types.length)];

  // Size based on type
  const sizeConfig: Record<DetectionType, { width: number; height: number }> = {
    person: { width: 80 + Math.random() * 40, height: 140 + Math.random() * 60 },
    vehicle: { width: 120 + Math.random() * 80, height: 70 + Math.random() * 40 },
    package: { width: 40 + Math.random() * 30, height: 40 + Math.random() * 30 },
    animal: { width: 60 + Math.random() * 40, height: 50 + Math.random() * 30 },
    face: { width: 50 + Math.random() * 20, height: 60 + Math.random() * 20 },
  };

  const size = sizeConfig[type];
  const classConfig = DETECTION_CLASSES[type];

  return {
    id: Math.random().toString(36).substring(2, 9),
    type,
    x: 10 + Math.random() * 70,
    y: 10 + Math.random() * 60,
    width: size.width,
    height: size.height,
    confidence: 75 + Math.random() * 24,
    trackingId: `#${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
    velocity: { x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 1 },
    color: classConfig.borderColor,
    isNew: true,
    lastSeen: Date.now(),
  };
};

/**
 * Configuration options for the detection simulation hook
 */
interface UseDetectionSimulationOptions {
  /** Whether the simulation is active */
  isActive?: boolean;
  /** Interval for updating metrics (ms) */
  metricsInterval?: number;
  /** Interval for animating boxes (ms) */
  animationInterval?: number;
  /** Interval for adding/removing detections (ms) */
  detectionInterval?: number;
  /** Maximum number of simultaneous detections */
  maxDetections?: number;
  /** Initial number of detection boxes */
  initialDetections?: number;
}

/**
 * Return type for the detection simulation hook
 */
interface UseDetectionSimulationReturn {
  detectionBoxes: DetectionBox[];
  detectionLogs: DetectionLog[];
  fps: number;
  modelConfidence: number;
  totalDetections: number;
  responseTime: number;
  inferenceTime: number;
  gpuUsage: number;
}

/**
 * Custom hook for simulating real-time AI detection data
 * 
 * This hook provides simulated detection boxes, logs, and performance metrics
 * that update in real-time to create a realistic dashboard experience.
 * 
 * @param options - Configuration options for the simulation
 * @returns Object containing detection data and metrics
 * 
 * @example
 * ```tsx
 * const {
 *   detectionBoxes,
 *   detectionLogs,
 *   fps,
 *   modelConfidence
 * } = useDetectionSimulation({ isActive: isRecording });
 * ```
 */
export function useDetectionSimulation(
  options: UseDetectionSimulationOptions = {}
): UseDetectionSimulationReturn {
  const {
    isActive = true,
    metricsInterval = 2000,
    animationInterval = 100,
    detectionInterval = 3000,
    maxDetections = 6,
    initialDetections = 2,
  } = options;

  // Detection state
  const [detectionBoxes, setDetectionBoxes] = useState<DetectionBox[]>([]);
  const [detectionLogs, setDetectionLogs] = useState<DetectionLog[]>([]);

  // Metrics state
  const [fps, setFps] = useState(58.4);
  const [modelConfidence, setModelConfidence] = useState(96.8);
  const [totalDetections, setTotalDetections] = useState(24892);
  const [responseTime, setResponseTime] = useState(87);
  const [inferenceTime, setInferenceTime] = useState(12.4);
  const [gpuUsage, setGpuUsage] = useState(67);

  // Initialize detection boxes and logs
  useEffect(() => {
    const initialBoxes: DetectionBox[] = [
      {
        id: 'init1',
        type: 'person' as const,
        x: 22,
        y: 18,
        width: 100,
        height: 180,
        confidence: 97.2,
        trackingId: '#A847',
        velocity: { x: 0.3, y: 0 },
        color: DETECTION_CLASSES.person.borderColor,
        isNew: false,
        lastSeen: Date.now(),
      },
      {
        id: 'init2',
        type: 'person' as const,
        x: 58,
        y: 25,
        width: 85,
        height: 155,
        confidence: 94.8,
        trackingId: '#B293',
        velocity: { x: -0.2, y: 0.1 },
        color: DETECTION_CLASSES.person.borderColor,
        isNew: false,
        lastSeen: Date.now(),
      },
    ].slice(0, initialDetections);

    setDetectionBoxes(initialBoxes);

    const initialLogs = Array.from({ length: 5 }, generateDetectionLog);
    setDetectionLogs(initialLogs);
  }, [initialDetections]);

  // Update metrics periodically
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setFps(prev => Math.max(30, Math.min(60, prev + (Math.random() - 0.5) * 2)));
      setModelConfidence(prev => Math.max(90, Math.min(99.9, prev + (Math.random() - 0.5) * 0.5)));
      setResponseTime(prev => Math.max(50, Math.min(150, prev + (Math.random() - 0.5) * 10)));

      // Occasionally add new detections
      if (Math.random() > 0.7) {
        setTotalDetections(prev => prev + 1);
        setDetectionLogs(prev => [generateDetectionLog(), ...prev.slice(0, 9)]);
      }
    }, metricsInterval);

    return () => clearInterval(interval);
  }, [isActive, metricsInterval]);

  // Animate detection boxes
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setDetectionBoxes(prev =>
        prev.map(box => {
          let newX = box.x + box.velocity.x + (Math.random() - 0.5) * 0.3;
          let newY = box.y + box.velocity.y + (Math.random() - 0.5) * 0.2;

          newX = Math.max(5, Math.min(85, newX));
          newY = Math.max(5, Math.min(70, newY));

          let newVelX = box.velocity.x;
          let newVelY = box.velocity.y;

          if (newX <= 5 || newX >= 85) newVelX = -newVelX * 0.8;
          if (newY <= 5 || newY >= 70) newVelY = -newVelY * 0.8;

          const newConfidence = Math.max(
            70,
            Math.min(99.9, box.confidence + (Math.random() - 0.5) * 0.5)
          );

          return {
            ...box,
            x: newX,
            y: newY,
            velocity: { x: newVelX, y: newVelY },
            confidence: newConfidence,
            isNew: false,
          };
        })
      );

      setInferenceTime(prev => Math.max(8, Math.min(25, prev + (Math.random() - 0.5) * 2)));
      setGpuUsage(prev => Math.max(50, Math.min(85, prev + (Math.random() - 0.5) * 5)));
    }, animationInterval);

    return () => clearInterval(interval);
  }, [isActive, animationInterval]);

  // Add/remove detection boxes randomly
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setDetectionBoxes(prev => {
        // Random chance to add new detection
        if (Math.random() > 0.85 && prev.length < maxDetections) {
          const newBox = generateDetectionBox();
          setTotalDetections(d => d + 1);
          setDetectionLogs(logs => [generateDetectionLog(), ...logs.slice(0, 9)]);
          return [...prev, newBox];
        }

        // Random chance to remove old detection
        if (Math.random() > 0.9 && prev.length > 1) {
          const indexToRemove = Math.floor(Math.random() * prev.length);
          return prev.filter((_, i) => i !== indexToRemove);
        }

        return prev;
      });
    }, detectionInterval);

    return () => clearInterval(interval);
  }, [isActive, detectionInterval, maxDetections]);

  return {
    detectionBoxes,
    detectionLogs,
    fps,
    modelConfidence,
    totalDetections,
    responseTime,
    inferenceTime,
    gpuUsage,
  };
}

export default useDetectionSimulation;