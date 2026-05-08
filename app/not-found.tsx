import Link from 'next/link';
import { ShieldCheck, Home, ArrowLeft, Search } from 'lucide-react';

/**
 * Custom 404 Not Found Page
 * 
 * Displays a professional and on-brand 404 error page when users
 * navigate to a non-existent route.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="relative">
            <ShieldCheck className="text-blue-500 w-12 h-12" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-950" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Nexus<span className="text-blue-500">Vision</span>
            </h1>
          </div>
        </div>

        {/* 404 Display */}
        <div className="relative mb-8">
          <h2 className="text-[150px] font-bold text-slate-800 leading-none select-none">
            404
          </h2>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-slate-900/90 backdrop-blur-sm px-6 py-3 rounded-xl border border-slate-700">
              <p className="text-xl font-semibold text-white">Page Not Found</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-400 mb-8 max-w-md mx-auto">
          The surveillance sector you&apos;re looking for doesn&apos;t exist or has been moved. 
          Our AI couldn&apos;t detect any content at this location.
        </p>

        {/* Search Suggestion */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-3 text-slate-500 mb-4">
            <Search className="w-5 h-5" />
            <span className="text-sm">Looking for something specific?</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Link 
              href="/" 
              className="bg-slate-800/50 hover:bg-slate-800 p-3 rounded-xl text-slate-300 hover:text-white transition"
            >
              Live Overview
            </Link>
            <Link 
              href="/" 
              className="bg-slate-800/50 hover:bg-slate-800 p-3 rounded-xl text-slate-300 hover:text-white transition"
            >
              Camera Feeds
            </Link>
            <Link 
              href="/" 
              className="bg-slate-800/50 hover:bg-slate-800 p-3 rounded-xl text-slate-300 hover:text-white transition"
            >
              Detection Logs
            </Link>
            <Link 
              href="/" 
              className="bg-slate-800/50 hover:bg-slate-800 p-3 rounded-xl text-slate-300 hover:text-white transition"
            >
              Settings
            </Link>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <button
            onClick={() => typeof window !== 'undefined' && window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

        {/* Status */}
        <div className="mt-12 flex items-center justify-center gap-6 text-xs text-slate-600">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-emerald-500 rounded-full" />
            Systems Operational
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-emerald-500 rounded-full" />
            12 Cameras Online
          </span>
        </div>
      </div>
    </div>
  );
}