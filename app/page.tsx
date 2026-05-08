'use client';
import { 
  Camera, Users, Activity, Server, Bell, Search, ShieldCheck, Play, Pause,
  Settings, ChevronRight, Clock, AlertTriangle, CheckCircle, Eye, Zap,
  TrendingUp, TrendingDown, RefreshCw, Download, Maximize2, Volume2, VolumeX
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";

// Types
interface MetricData {
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  color: string;
  icon: React.ReactNode;
}

interface DetectionLog {
  id: string;
  type: string;
  confidence: number;
  timestamp: Date;
  camera: string;
  status: 'verified' | 'pending' | 'alert';
}

interface CameraFeed {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline' | 'warning';
  fps: number;
  detections: number;
}

interface DetectionBox {
  id: string;
  type: 'person' | 'vehicle' | 'package' | 'animal' | 'face';
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  trackingId: string;
  velocity: { x: number; y: number };
  color: string;
  isNew: boolean;
  lastSeen: number;
}

// Detection class configurations
const DETECTION_CLASSES: Record<string, { color: string; borderColor: string; label: string }> = {
  person: { color: 'rgba(52, 211, 153, 0.15)', borderColor: '#34d399', label: 'PERSON' },
  vehicle: { color: 'rgba(139, 92, 246, 0.15)', borderColor: '#8b5cf6', label: 'VEHICLE' },
  package: { color: 'rgba(251, 146, 60, 0.15)', borderColor: '#fb923c', label: 'PACKAGE' },
  animal: { color: 'rgba(59, 130, 246, 0.15)', borderColor: '#3b82f6', label: 'ANIMAL' },
  face: { color: 'rgba(236, 72, 153, 0.15)', borderColor: '#ec4899', label: 'FACE' },
};

// Generate realistic detection box
const generateDetectionBox = (existingBoxes: DetectionBox[]): DetectionBox => {
  const types: DetectionBox['type'][] = ['person', 'vehicle', 'package', 'animal', 'face'];
  const type = types[Math.floor(Math.random() * types.length)];
  
  // Size based on type
  const sizeConfig = {
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

// Simulated real-time data
const generateDetectionLog = (): DetectionLog => ({
  id: Math.random().toString(36).substring(7),
  type: ['Person', 'Vehicle', 'Package', 'Animal'][Math.floor(Math.random() * 4)],
  confidence: Math.floor(Math.random() * 15) + 85,
  timestamp: new Date(),
  camera: ['Main Entrance', 'Parking Lot', 'Back Door', 'Lobby'][Math.floor(Math.random() * 4)],
  status: ['verified', 'pending', 'alert'][Math.floor(Math.random() * 3)] as DetectionLog['status'],
});

export default function NexusVision() {
  const [isRecording, setIsRecording] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [alertCount, setAlertCount] = useState(3);
  const [activeNav, setActiveNav] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [detectionLogs, setDetectionLogs] = useState<DetectionLog[]>([]);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [fps, setFps] = useState(58.4);
  const [modelConfidence, setModelConfidence] = useState(96.8);
  const [totalDetections, setTotalDetections] = useState(24892);
  const [responseTime, setResponseTime] = useState(87);
  const [detectionBoxes, setDetectionBoxes] = useState<DetectionBox[]>([]);
  const [inferenceTime, setInferenceTime] = useState(12.4);
  const [gpuUsage, setGpuUsage] = useState(67);

  // Real-time clock - initialize on client only to avoid hydration mismatch
  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate real-time data updates
  useEffect(() => {
    if (!isRecording) return;
    
    const interval = setInterval(() => {
      // Update FPS with slight variation
      setFps(prev => Math.max(30, Math.min(60, prev + (Math.random() - 0.5) * 2)));
      
      // Update model confidence
      setModelConfidence(prev => Math.max(90, Math.min(99.9, prev + (Math.random() - 0.5) * 0.5)));
      
      // Occasionally add new detections
      if (Math.random() > 0.7) {
        setTotalDetections(prev => prev + 1);
        setDetectionLogs(prev => [generateDetectionLog(), ...prev.slice(0, 9)]);
      }
      
      // Update response time
      setResponseTime(prev => Math.max(50, Math.min(150, prev + (Math.random() - 0.5) * 10)));
    }, 2000);

    return () => clearInterval(interval);
  }, [isRecording]);

  // Initialize detection logs
  useEffect(() => {
    const initialLogs = Array.from({ length: 5 }, generateDetectionLog);
    setDetectionLogs(initialLogs);
  }, []);

  // Initialize detection boxes
  useEffect(() => {
    const initialBoxes: DetectionBox[] = [
      {
        id: 'init1',
        type: 'person',
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
        type: 'person',
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
    ];
    setDetectionBoxes(initialBoxes);
  }, []);

  // Animate detection boxes (smooth movement simulation)
  useEffect(() => {
    if (!isRecording) return;

    const animationInterval = setInterval(() => {
      setDetectionBoxes(prev => {
        return prev.map(box => {
          // Apply velocity with some randomness for natural movement
          let newX = box.x + box.velocity.x + (Math.random() - 0.5) * 0.3;
          let newY = box.y + box.velocity.y + (Math.random() - 0.5) * 0.2;
          
          // Boundary constraints
          newX = Math.max(5, Math.min(85, newX));
          newY = Math.max(5, Math.min(70, newY));
          
          // Reverse velocity at boundaries
          let newVelX = box.velocity.x;
          let newVelY = box.velocity.y;
          
          if (newX <= 5 || newX >= 85) newVelX = -newVelX * 0.8;
          if (newY <= 5 || newY >= 70) newVelY = -newVelY * 0.8;
          
          // Small confidence fluctuation
          const newConfidence = Math.max(70, Math.min(99.9, box.confidence + (Math.random() - 0.5) * 0.5));
          
          return {
            ...box,
            x: newX,
            y: newY,
            velocity: { x: newVelX, y: newVelY },
            confidence: newConfidence,
            isNew: false,
          };
        });
      });
      
      // Update inference time
      setInferenceTime(prev => Math.max(8, Math.min(25, prev + (Math.random() - 0.5) * 2)));
      setGpuUsage(prev => Math.max(50, Math.min(85, prev + (Math.random() - 0.5) * 5)));
    }, 100);

    return () => clearInterval(animationInterval);
  }, [isRecording]);

  // Add/remove detection boxes randomly
  useEffect(() => {
    if (!isRecording) return;

    const detectionInterval = setInterval(() => {
      setDetectionBoxes(prev => {
        // Random chance to add new detection
        if (Math.random() > 0.85 && prev.length < 6) {
          const newBox = generateDetectionBox(prev);
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
    }, 3000);

    return () => clearInterval(detectionInterval);
  }, [isRecording]);

  const dismissAlert = useCallback(() => {
    setAlertCount(prev => Math.max(0, prev - 1));
  }, []);

  const metrics: MetricData[] = [
    { 
      title: "Total Detections", 
      value: totalDetections.toLocaleString(), 
      change: "+18% this week", 
      trend: 'up',
      color: "text-blue-400",
      icon: <Eye className="w-5 h-5" />
    },
    { 
      title: "Avg Response Time", 
      value: `${responseTime.toFixed(0)} ms`, 
      change: "-23ms from last week", 
      trend: 'down',
      color: "text-emerald-400",
      icon: <Zap className="w-5 h-5" />
    },
    { 
      title: "Active Cameras", 
      value: "12 / 12", 
      change: "100% Uptime", 
      trend: 'neutral',
      color: "text-white",
      icon: <Camera className="w-5 h-5" />
    },
    { 
      title: "Security Alerts", 
      value: alertCount, 
      change: `${alertCount} require review`, 
      trend: alertCount > 0 ? 'up' : 'neutral',
      color: alertCount > 0 ? "text-red-400" : "text-emerald-400",
      icon: <AlertTriangle className="w-5 h-5" />
    },
  ];

  const navItems = [
    { id: 'overview', label: 'Live Overview', icon: Activity },
    { id: 'cameras', label: 'Camera Feeds', icon: Camera },
    { id: 'logs', label: 'Detection Logs', icon: Users },
    { id: 'api', label: 'API Status', icon: Server },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const getStatusColor = (status: DetectionLog['status']) => {
    switch (status) {
      case 'verified': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'alert': return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
  };

  const formatTime = (date: Date | null) => {
    if (!date) return '--:--:-- --';
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="flex h-screen bg-slate-950 font-sans text-slate-200 overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-72 bg-slate-900/95 backdrop-blur-xl border-r border-slate-800/50 flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-slate-700/50">
          <div className="relative">
            <ShieldCheck className="text-blue-500 w-10 h-10" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900 animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Nexus<span className="text-blue-500">Vision</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-mono">AI-POWERED SECURITY</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`w-full flex items-center gap-3 p-4 rounded-xl font-medium transition-all duration-200 ${
                activeNav === item.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'hover:bg-slate-800/50 text-slate-400 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
              {item.id === 'logs' && detectionLogs.length > 0 && (
                <span className="ml-auto bg-slate-700 text-xs px-2 py-0.5 rounded-full">
                  {detectionLogs.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* System Status */}
        <div className="p-4 mx-4 mb-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">System Status</span>
            <span className="flex items-center gap-1.5 text-xs text-emerald-400">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Operational
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">CPU Usage</span>
              <span className="text-white font-mono">34%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-1.5">
              <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '34%' }} />
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Memory</span>
              <span className="text-white font-mono">6.2 GB</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-1.5">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '62%' }} />
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-800/50 text-xs text-slate-500">
          <div className="flex items-center justify-between">
            <span>System v2.4.1 • Stable</span>
            <RefreshCw className="w-3 h-3 cursor-pointer hover:text-white transition" />
          </div>
          <p className="mt-1">Built by Imad Nidal Hawara © 2024</p>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col">
        
        {/* TOP NAV */}
        <header className="h-16 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800/50 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold text-white">AI Detection Center</h2>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono bg-slate-800/50 px-3 py-1.5 rounded-lg">
              <Clock className="w-3.5 h-3.5" />
              {formatTime(currentTime)}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-3 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search detection logs..." 
                className="bg-slate-800/50 border border-slate-700/50 pl-11 pr-6 py-2.5 w-80 rounded-2xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-500" 
              />
            </div>

            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-slate-800/50 rounded-xl transition"
              >
                <Bell className="w-6 h-6 text-slate-400 hover:text-white transition" />
                {alertCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full font-bold">
                    {alertCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl z-50 overflow-hidden">
                  <div className="p-4 border-b border-slate-700/50">
                    <h3 className="font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-auto">
                    {alertCount > 0 ? (
                      [...Array(alertCount)].map((_, i) => (
                        <div key={i} className="p-4 border-b border-slate-800/50 hover:bg-slate-800/30 transition">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">Security Alert #{i + 1}</p>
                              <p className="text-xs text-slate-400 mt-1">Unusual activity detected at Camera {i + 1}</p>
                            </div>
                            <button 
                              onClick={dismissAlert}
                              className="text-xs text-blue-400 hover:text-blue-300"
                            >
                              Dismiss
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-slate-500">
                        <CheckCircle className="w-8 h-8 mx-auto mb-2 text-emerald-400" />
                        <p className="text-sm">All clear! No pending alerts.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-3 bg-slate-800/50 px-4 py-2 rounded-2xl border border-slate-700/50 hover:border-slate-600 transition cursor-pointer">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center font-bold text-sm shadow-lg shadow-blue-500/25">
                IH
              </div>
              <div>
                <p className="text-sm font-medium">Imad Hawara</p>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  Online
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 ml-2" />
            </div>
          </div>
        </header>

        <div className="flex-1 p-8 overflow-auto space-y-6 bg-gradient-to-br from-slate-950 to-slate-900">
          
          {/* METRICS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((item, i) => (
              <div 
                key={i} 
                className="bg-slate-900/80 backdrop-blur border border-slate-800/50 rounded-2xl p-6 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-xl bg-slate-800/50 ${item.color}`}>
                    {item.icon}
                  </div>
                  <div className={`flex items-center gap-1 text-xs ${
                    item.trend === 'up' ? 'text-emerald-400' : 
                    item.trend === 'down' ? 'text-red-400' : 'text-slate-400'
                  }`}>
                    {item.trend === 'up' && <TrendingUp className="w-3 h-3" />}
                    {item.trend === 'down' && <TrendingDown className="w-3 h-3" />}
                  </div>
                </div>
                <p className="text-slate-400 text-sm font-medium">{item.title}</p>
                <p className={`text-3xl font-bold mt-2 mb-1 ${item.color} tracking-tight`}>{item.value}</p>
                <p className="text-xs text-slate-500">{item.change}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LIVE AI FEED */}
            <div className="lg:col-span-2 bg-slate-900/80 backdrop-blur border border-slate-800/50 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/50">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-slate-500'}`} />
                    <span className={`font-mono text-sm font-bold ${isRecording ? 'text-red-400' : 'text-slate-400'}`}>
                      {isRecording ? 'LIVE' : 'PAUSED'}
                    </span>
                  </div>
                  <div className="h-4 w-px bg-slate-700" />
                  <h3 className="text-sm font-semibold">Main Entrance Camera</h3>
                  <span className="text-xs text-slate-500 bg-slate-800/50 px-2 py-1 rounded-lg font-mono">YOLOv8</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 hover:bg-slate-800/50 rounded-xl transition"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-slate-400" />}
                  </button>
                  <button className="p-2 hover:bg-slate-800/50 rounded-xl transition" aria-label="Fullscreen">
                    <Maximize2 className="w-4 h-4 text-slate-400" />
                  </button>
                  <button className="p-2 hover:bg-slate-800/50 rounded-xl transition" aria-label="Download">
                    <Download className="w-4 h-4 text-slate-400" />
                  </button>
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      isRecording 
                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30' 
                        : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30'
                    }`}
                  >
                    {isRecording ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isRecording ? 'Pause' : 'Start'}
                  </button>
                </div>
              </div>

              <div className="relative h-[400px] bg-black flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" 
                  alt="Live security camera feed showing main entrance" 
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${isRecording ? 'opacity-80' : 'opacity-40 grayscale'}`}
                />

                {isRecording && (
                  <>
                    {/* Professional AI Detection Boxes */}
                    {detectionBoxes.map((box) => {
                      const classConfig = DETECTION_CLASSES[box.type];
                      return (
                        <div
                          key={box.id}
                          className="absolute transition-all duration-100 ease-linear"
                          style={{
                            left: `${box.x}%`,
                            top: `${box.y}%`,
                            width: `${box.width}px`,
                            height: `${box.height}px`,
                          }}
                        >
                          {/* Corner brackets - professional YOLO style */}
                          <div className="absolute inset-0">
                            {/* Top-left corner */}
                            <div 
                              className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2"
                              style={{ borderColor: box.color }}
                            />
                            {/* Top-right corner */}
                            <div 
                              className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2"
                              style={{ borderColor: box.color }}
                            />
                            {/* Bottom-left corner */}
                            <div 
                              className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2"
                              style={{ borderColor: box.color }}
                            />
                            {/* Bottom-right corner */}
                            <div 
                              className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2"
                              style={{ borderColor: box.color }}
                            />
                          </div>

                          {/* Subtle fill */}
                          <div 
                            className="absolute inset-0 rounded-sm"
                            style={{ backgroundColor: classConfig.color }}
                          />

                          {/* Detection label */}
                          <div 
                            className="absolute -top-6 left-0 flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wide shadow-lg"
                            style={{ 
                              backgroundColor: box.color,
                              color: 'white',
                            }}
                          >
                            <span>{classConfig.label}</span>
                            <span className="opacity-80">•</span>
                            <span>{box.confidence.toFixed(1)}%</span>
                          </div>

                          {/* Tracking info overlay */}
                          <div className="absolute -bottom-5 left-0 flex items-center gap-2 text-[9px] font-mono">
                            <span 
                              className="px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-sm"
                              style={{ color: box.color }}
                            >
                              ID: {box.trackingId}
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-sm text-slate-400">
                              {box.type === 'person' ? '🚶' : box.type === 'vehicle' ? '🚗' : box.type === 'face' ? '👤' : '📦'}
                            </span>
                          </div>

                          {/* Scanning line animation for new detections */}
                          {box.isNew && (
                            <div className="absolute inset-0 overflow-hidden rounded-sm">
                              <div 
                                className="absolute inset-x-0 h-0.5 animate-scan"
                                style={{ 
                                  backgroundColor: box.color,
                                  boxShadow: `0 0 10px ${box.color}`,
                                }}
                              />
                            </div>
                          )}

                          {/* Confidence bar */}
                          <div className="absolute -right-1 top-0 bottom-0 w-1 bg-black/50 rounded-full overflow-hidden">
                            <div 
                              className="absolute bottom-0 w-full rounded-full transition-all duration-300"
                              style={{ 
                                height: `${box.confidence}%`,
                                backgroundColor: box.color,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}

                    {/* Detection count indicator */}
                    <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-slate-700/50">
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-slate-400">Detections:</span>
                        <span className="text-white font-bold">{detectionBoxes.length}</span>
                      </div>
                    </div>

                    {/* Model info overlay */}
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-slate-700/50">
                      <div className="text-[10px] font-mono space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-blue-400">MODEL</span>
                          <span className="text-white">YOLOv8x</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500">Inference:</span>
                          <span className="text-emerald-400">{inferenceTime.toFixed(1)}ms</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className="bg-black/80 backdrop-blur-sm px-4 py-2.5 rounded-xl font-mono text-xs flex items-center gap-4 border border-slate-700/50">
                        <span className="text-red-400 flex items-center gap-1.5">
                          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                          REC
                        </span>
                        <div className="h-4 w-px bg-slate-700" />
                        <span className="text-slate-300">FPS: <span className="text-white font-bold">{fps.toFixed(1)}</span></span>
                        <div className="h-4 w-px bg-slate-700" />
                        <span className="text-slate-300">4K <span className="text-slate-500">2160p</span></span>
                        <div className="h-4 w-px bg-slate-700" />
                        <span className="text-slate-300">GPU: <span className="text-cyan-400 font-bold">{gpuUsage}%</span></span>
                      </div>
                      <div className="bg-black/80 backdrop-blur-sm px-4 py-2.5 rounded-xl font-mono text-xs border border-slate-700/50 flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400">Conf:</span>
                          <span className="text-white font-bold">{modelConfidence.toFixed(1)}%</span>
                        </div>
                        <div className="h-4 w-px bg-slate-700" />
                        <div className="flex items-center gap-1">
                          {Object.entries(DETECTION_CLASSES).slice(0, 3).map(([key, config]) => (
                            <div 
                              key={key}
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: config.borderColor }}
                              title={config.label}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Grid overlay for professional look */}
                    <div className="absolute inset-0 pointer-events-none opacity-10">
                      <div className="w-full h-full" style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '50px 50px',
                      }} />
                    </div>

                    {/* Crosshair center */}
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20">
                      <div className="w-8 h-px bg-white" />
                      <div className="absolute h-8 w-px bg-white" />
                    </div>
                  </>
                )}

                {!isRecording && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                    <div className="text-center">
                      <Pause className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                      <p className="text-slate-400 font-medium">Stream Paused</p>
                      <p className="text-slate-500 text-sm mt-1">Click Start to resume live feed</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RECENT DETECTIONS */}
            <div className="bg-slate-900/80 backdrop-blur border border-slate-800/50 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/50">
                <h3 className="font-semibold">Recent Detections</h3>
                <button className="text-xs text-blue-400 hover:text-blue-300 transition">View All</button>
              </div>
              <div className="divide-y divide-slate-800/50 max-h-[400px] overflow-auto">
                {detectionLogs.map((log) => (
                  <div key={log.id} className="p-4 hover:bg-slate-800/30 transition cursor-pointer group">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          log.type === 'Person' ? 'bg-blue-500/20 text-blue-400' :
                          log.type === 'Vehicle' ? 'bg-purple-500/20 text-purple-400' :
                          log.type === 'Package' ? 'bg-orange-500/20 text-orange-400' :
                          'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {log.type === 'Person' ? <Users className="w-5 h-5" /> :
                           log.type === 'Vehicle' ? <Server className="w-5 h-5" /> :
                           <Eye className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{log.type} Detected</p>
                          <p className="text-xs text-slate-500">{log.camera}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] px-2 py-1 rounded-full border font-medium ${getStatusColor(log.status)}`}>
                        {log.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                      <span className="font-mono">{formatTime(log.timestamp)}</span>
                      <span className="text-emerald-400 font-mono">{log.confidence}% confidence</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Click outside to close notifications */}
      {showNotifications && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowNotifications(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}