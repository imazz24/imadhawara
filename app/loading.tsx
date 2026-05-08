'use client';

import { ShieldCheck } from 'lucide-react';

/**
 * Loading Component
 * 
 * Displays a professional loading state while the dashboard is initializing.
 * This component is automatically used by Next.js during page transitions.
 */
export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="relative mb-8">
          <div className="w-20 h-20 mx-auto relative">
            {/* Outer ring animation */}
            <div className="absolute inset-0 border-4 border-slate-700 rounded-full animate-pulse" />
            <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin" />
            
            {/* Logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <ShieldCheck className="w-10 h-10 text-blue-500" />
            </div>
          </div>
          
          {/* Status indicator */}
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
            <span className="flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-3xl font-bold text-white mb-2">
          Nexus<span className="text-blue-500">Vision</span>
        </h1>
        <p className="text-slate-500 text-sm font-mono mb-8">
          AI-POWERED SECURITY DASHBOARD
        </p>

        {/* Loading Status */}
        <div className="space-y-4 max-w-xs mx-auto">
          {/* Progress bar */}
          <div className="relative">
            <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full animate-loading-bar"
                style={{
                  animation: 'loading-bar 1.5s ease-in-out infinite',
                }}
              />
            </div>
          </div>

          {/* Status text */}
          <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span>Initializing AI models...</span>
          </div>
        </div>

        {/* System checks */}
        <div className="mt-8 flex justify-center gap-6 text-xs text-slate-600">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            Systems Online
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            Cameras Connected
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            Loading Models
          </span>
        </div>
      </div>

      {/* Inline keyframes for loading animation */}
      <style jsx>{`
        @keyframes loading-bar {
          0% {
            width: 0%;
            margin-left: 0%;
          }
          50% {
            width: 60%;
            margin-left: 20%;
          }
          100% {
            width: 0%;
            margin-left: 100%;
          }
        }
      `}</style>
    </div>
  );
}