import React, { useState, useEffect, useMemo } from 'react';
import {
  Activity,
  Sparkles,
  Layers,
  Code2,
  Copy,
  Check,
  Download,
  RotateCcw,
  Sun,
  Moon,
  ExternalLink,
  ShieldCheck,
  Info,
  CheckCircle2,
  Eye,
  SlidersHorizontal,
  ChevronRight,
  BookOpen,
  FileCode2,
  Share2
} from 'lucide-react';
import { TeethChart } from './TeethChart';
import { 
  ODONTO_DATABASE, 
  RESTORATION_TYPES, 
  SERVICE_METADATA, 
  SERVICE_PROCEDURES_MAP 
} from './teeth-chart.constants';
import type { 
  DentalServiceId, 
  RestorationType, 
  ClinicalPayload 
} from './teeth-chart.types';

export default function App() {
  // Check if running in embedded iframe mode (?embed=true)
  const isEmbedMode = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    return params.get('embed') === 'true';
  }, []);

  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    const params = new URLSearchParams(window.location.search);
    const themeParam = params.get('theme');
    if (themeParam === 'light') return false;
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  // Selected teeth state
  const [selectedTeeth, setSelectedTeeth] = useState<number[]>(() => {
    if (typeof window === 'undefined') return [14, 15, 16];
    const params = new URLSearchParams(window.location.search);
    const selParam = params.get('selected');
    if (selParam) {
      return selParam.split(',').map(n => parseInt(n.trim(), 10)).filter(n => !isNaN(n) && n >= 1 && n <= 32);
    }
    return [14, 15, 16];
  });

  // Per-tooth restorations mapping
  const [restorations, setRestorations] = useState<Record<number, string>>({
    14: 'implant',
    15: 'crown',
    16: 'crown',
  });

  // Active Prescribed Services Filter
  const [activeServices, setActiveServices] = useState<DentalServiceId[]>(() => {
    if (typeof window === 'undefined') return ['sg', 'tp'];
    const params = new URLSearchParams(window.location.search);
    const srvParam = params.get('services');
    if (srvParam) {
      return srvParam.split(',').map(s => s.trim() as DentalServiceId);
    }
    return ['sg', 'tp'];
  });

  // Active Showcase Tab
  const [activeTab, setActiveTab] = useState<'playground' | 'payload' | 'embed' | 'docs'>('playground');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Embed Generator Config state
  const [embedFramework, setEmbedFramework] = useState<'react' | 'iframe' | 'vanilla' | 'vue' | 'angular'>('react');
  const [embedIncludeServices, setEmbedIncludeServices] = useState(true);

  // Synchronize state changes to parent frame if running inside iframe
  useEffect(() => {
    if (isEmbedMode && window.parent) {
      const payload: ClinicalPayload = {
        selectedUniversal: selectedTeeth,
        selectedFDI: selectedTeeth.map(u => ODONTO_DATABASE.find(t => t.universal === u)?.fdi || u),
        restorations,
        legacyString: [...selectedTeeth].sort((a, b) => a - b).join(','),
        activeServices,
        totalUnits: selectedTeeth.length,
      };
      window.parent.postMessage({
        type: '3DDX_TEETH_CHART_UPDATE',
        payload,
      }, '*');
    }
  }, [selectedTeeth, restorations, activeServices, isEmbedMode]);

  // Listen for parent messages when in embed mode
  useEffect(() => {
    if (!isEmbedMode) return;
    const handleParentMessage = (event: MessageEvent) => {
      if (event.data?.type === '3DDX_TEETH_CHART_SET_DATA') {
        const { selected, restorations: res, activeServices: srv } = event.data.payload || {};
        if (Array.isArray(selected)) setSelectedTeeth(selected);
        if (res) setRestorations(res);
        if (Array.isArray(srv)) setActiveServices(srv);
      }
    };
    window.addEventListener('message', handleParentMessage);
    return () => window.removeEventListener('message', handleParentMessage);
  }, [isEmbedMode]);

  const handleSelectionChange = (sel: number[], res: Record<number, string>) => {
    setSelectedTeeth(sel);
    setRestorations(res);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const downloadJson = () => {
    const payload = {
      selectedUniversal: selectedTeeth,
      selectedFDI: selectedTeeth.map(u => ODONTO_DATABASE.find(t => t.universal === u)?.fdi || u),
      restorations,
      legacyString: [...selectedTeeth].sort((a, b) => a - b).join(','),
      activeServices,
      totalUnits: selectedTeeth.length,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `3ddx-clinical-chart-case-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // 1. EMBED MODE (Strips all surrounding chrome for seamless iframe embedding)
  if (isEmbedMode) {
    return (
      <div className="p-2 sm:p-4 min-h-screen bg-transparent flex flex-col justify-center">
        <TeethChart
          selected={selectedTeeth}
          toothRestorations={restorations}
          activeServices={activeServices}
          onSelectionChange={handleSelectionChange}
          onClearAll={() => {
            setSelectedTeeth([]);
            setRestorations({});
          }}
          className="shadow-2xl border-slate-300 dark:border-slate-800"
        />
      </div>
    );
  }

  // 2. FULL INTERACTIVE SHOWCASE APPLICATION
  const currentPayload: ClinicalPayload = {
    selectedUniversal: [...selectedTeeth].sort((a, b) => a - b),
    selectedFDI: [...selectedTeeth].sort((a, b) => a - b).map(u => ODONTO_DATABASE.find(t => t.universal === u)?.fdi || u),
    restorations,
    legacyString: [...selectedTeeth].sort((a, b) => a - b).join(','),
    activeServices,
    totalUnits: selectedTeeth.length,
  };

  const toggleService = (srvId: DentalServiceId) => {
    setActiveServices(prev => 
      prev.includes(srvId) ? prev.filter(s => s !== srvId) : [...prev, srvId]
    );
  };

  // Code snippets for Embed Tab
  const reactSnippet = `import React, { useState } from 'react';
import { TeethChart } from '@3ddx/teeth-chart';

export function DentalPrescriptionForm() {
  const [selectedTeeth, setSelectedTeeth] = useState<number[]>([14, 15, 16]);
  const [restorations, setRestorations] = useState<Record<number, string>>({
    14: 'implant',
    15: 'crown',
    16: 'crown'
  });

  return (
    <div className="p-4 bg-slate-950 text-white rounded-3xl">
      <TeethChart
        selected={selectedTeeth}
        toothRestorations={restorations}
        activeServices={${JSON.stringify(activeServices)}}
        onSelectionChange={(selected, newRestorations) => {
          setSelectedTeeth(selected);
          setRestorations(newRestorations);
          console.log('Selected sites:', selected);
        }}
        onClearAll={() => {
          setSelectedTeeth([]);
          setRestorations({});
        }}
      />
    </div>
  );
}`;

  const iframeSnippet = `<!-- 3DDX Clinical Odontogram Responsive Iframe Embed -->
<iframe
  src="https://teeth-chart.abdoaladawy.me/?embed=true&services=${activeServices.join(',')}&theme=${isDark ? 'dark' : 'light'}"
  width="100%"
  height="720"
  frameborder="0"
  style="border: none; border-radius: 1.5rem; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);"
  id="teethChartFrame"
  allow="clipboard-write"
></iframe>

<script>
  // Listen for real-time odontogram updates
  window.addEventListener('message', function(event) {
    if (event.data && event.data.type === '3DDX_TEETH_CHART_UPDATE') {
      const payload = event.data.payload;
      console.log('Selected Universal:', payload.selectedUniversal);
      console.log('Selected FDI:', payload.selectedFDI);
      console.log('Restorations Map:', payload.restorations);
      console.log('Legacy String for PHP:', payload.legacyString);
    }
  });
</script>`;

  const vanillaSnippet = `import { initTeethChartEmbed } from '@3ddx/teeth-chart';

// Mount the odontogram inside any DOM container
const chart = initTeethChartEmbed({
  target: '#dental-chart-container',
  theme: '${isDark ? 'dark' : 'light'}',
  activeServices: ${JSON.stringify(activeServices)},
  initialSelected: [14, 15, 16],
  onChange: (payload) => {
    document.getElementById('case-teeth-input').value = payload.legacyString;
    console.log('Updated clinical payload:', payload);
  }
});

// To programmatically update from your app:
// chart.sendUpdate({ selected: [12, 13, 14] });`;

  const vueSnippet = `<template>
  <div class="teeth-chart-wrapper">
    <iframe
      :src="embedUrl"
      width="100%"
      height="720"
      frameborder="0"
      style="border: none; border-radius: 1.5rem;"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const embedUrl = ref('https://teeth-chart.abdoaladawy.me/?embed=true&services=${activeServices.join(',')}');

const onMessage = (event) => {
  if (event.data?.type === '3DDX_TEETH_CHART_UPDATE') {
    const { selectedUniversal, restorations, legacyString } = event.data.payload;
    console.log('Vue received update:', selectedUniversal, restorations);
  }
};

onMounted(() => window.addEventListener('message', onMessage));
onUnmounted(() => window.removeEventListener('message', onMessage));
</script>`;

  const angularSnippet = `import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-teeth-chart-embed',
  template: \`
    <iframe
      src="https://teeth-chart.abdoaladawy.me/?embed=true&services=${activeServices.join(',')}"
      width="100%"
      height="720"
      style="border: none; border-radius: 24px;"
    ></iframe>
  \`
})
export class TeethChartEmbedComponent {
  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data?.type === '3DDX_TEETH_CHART_UPDATE') {
      console.log('Angular captured TeethChart event:', event.data.payload);
    }
  }
}`;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060911] text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* 1. TOP HEADER & NAVIGATION BAR */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-[#070b14]/85 border-b border-slate-200 dark:border-slate-800/80 px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25">
                <Activity className="w-5 h-5" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-black text-base sm:text-lg tracking-tight text-slate-900 dark:text-white">
                    3DDX Teeth Chart
                  </h1>
                  <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
                    v2.5.0 Production
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                  Universal Anatomical Odontogram • Vector SVG Engine • ISO 3950 & ADA
                </p>
              </div>
            </div>

            {/* Quick Mobile Theme & Links */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                type="button"
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs font-bold w-full md:w-auto overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('playground')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'playground'
                  ? 'bg-cyan-500 text-slate-950 font-black shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live Odontogram</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('payload')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'payload'
                  ? 'bg-cyan-500 text-slate-950 font-black shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Live Payload JSON ({selectedTeeth.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('embed')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'embed'
                  ? 'bg-cyan-500 text-slate-950 font-black shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Universal Embed</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('docs')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'docs'
                  ? 'bg-cyan-500 text-slate-950 font-black shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>API & Props</span>
            </button>
          </div>

          {/* Right Action Icons */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-cyan-500 transition-colors"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <a
              href="https://github.com/Abdo2000-1/Teeth-Chart.git"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 transition-all border border-slate-700"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </header>

      {/* 2. MAIN WORKSPACE CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">

        {/* TAB 1: LIVE ODONTOGRAM PLAYGROUND */}
        {activeTab === 'playground' && (
          <div className="space-y-6">
            
            {/* Prescribed 3DDX Services Configurator Bar */}
            <div className="p-4 rounded-3xl bg-white dark:bg-[#0b101d] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    <Layers className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                    Simulate 3DDX Prescribed Service Workflow
                  </span>
                  <span className="text-[10px] text-slate-400">
                    (Filters procedure palette to logical clinical steps)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveServices(['sg', 'tp', 'conv', 'mod', 'rep', 'restTemp', 'restFinal', 'vr', 'ortho'])}
                    className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer"
                  >
                    Select All
                  </button>
                  <span className="text-slate-400 text-xs">•</span>
                  <button
                    type="button"
                    onClick={() => setActiveServices([])}
                    className="text-[11px] font-bold text-slate-400 hover:underline cursor-pointer"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>

              {/* Service Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {(Object.keys(SERVICE_METADATA) as DentalServiceId[]).map(srvId => {
                  const srv = SERVICE_METADATA[srvId];
                  const isActive = activeServices.includes(srvId);
                  return (
                    <button
                      key={srvId}
                      type="button"
                      onClick={() => toggleService(srvId)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        isActive
                          ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-700 dark:text-cyan-300 ring-1 ring-cyan-500/30 shadow-xs'
                          : 'bg-slate-100/70 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      <span>{srv.icon}</span>
                      <span>{srv.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* The Actual Core Reusable TeethChart Component */}
            <TeethChart
              selected={selectedTeeth}
              toothRestorations={restorations}
              activeServices={activeServices}
              onSelectionChange={handleSelectionChange}
              onClearAll={() => {
                setSelectedTeeth([]);
                setRestorations({});
              }}
            />

            {/* Quick Status Inspection Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-white dark:bg-[#0b101d] border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Selected Teeth</span>
                <span className="text-2xl font-black text-cyan-600 dark:text-cyan-400 mt-0.5 block">
                  {selectedTeeth.length} <span className="text-xs text-slate-400 font-normal">units</span>
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-1 block truncate">
                  Universal: {selectedTeeth.sort((a,b)=>a-b).join(', ') || 'None'}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-[#0b101d] border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">ISO 3950 (FDI Notation)</span>
                <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-0.5 block">
                  {currentPayload.selectedFDI.length} <span className="text-xs text-slate-400 font-normal">sites</span>
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-1 block truncate">
                  FDI: {currentPayload.selectedFDI.join(', ') || 'None'}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-[#0b101d] border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Active Services Filter</span>
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5 block">
                  {activeServices.length} <span className="text-xs text-slate-400 font-normal">services</span>
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-1 block truncate">
                  {activeServices.map(s => s.toUpperCase()).join(', ') || 'All Procedures Available'}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-[#0b101d] border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Legacy Backend String</span>
                <span className="text-xs font-mono font-bold text-slate-900 dark:text-white mt-2 block truncate bg-slate-100 dark:bg-slate-900 p-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  "{currentPayload.legacyString}"
                </span>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  100% Compatible with PHP / zConnect
                </span>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: LIVE PAYLOAD JSON INSPECTOR */}
        {activeTab === 'payload' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#0b101d] p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-cyan-500" />
                  Realtime Clinical Odontogram Payload
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  This exact structured JSON is emitted on every click via `onSelectionChange` and `postMessage`.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => copyToClipboard(JSON.stringify(currentPayload, null, 2), 'payload-json')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-all cursor-pointer shadow-xs"
                >
                  {copiedCode === 'payload-json' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === 'payload-json' ? 'Copied!' : 'Copy JSON'}</span>
                </button>

                <button
                  type="button"
                  onClick={downloadJson}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer border border-slate-200 dark:border-slate-700"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .json</span>
                </button>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 font-mono text-xs shadow-xl">
              <div className="px-4 py-2.5 bg-slate-800/60 border-b border-slate-700 flex items-center justify-between text-[11px] text-slate-400">
                <span>payload.json</span>
                <span>{selectedTeeth.length} items</span>
              </div>
              <pre className="p-5 overflow-x-auto text-[13px] leading-relaxed">
                {JSON.stringify(currentPayload, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* TAB 3: UNIVERSAL EMBED GENERATOR */}
        {activeTab === 'embed' && (
          <div className="space-y-6">
            
            {/* Framework Switcher Header */}
            <div className="bg-white dark:bg-[#0b101d] p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-cyan-500" />
                  Universal Embed & Integration Code Generator
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Choose your target framework or integration method to generate production-ready code.
                </p>
              </div>

              {/* Framework Selector Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: 'react', label: 'React / Next.js Component' },
                  { id: 'iframe', label: 'HTML / Iframe (Any Platform)' },
                  { id: 'vanilla', label: 'Vanilla JS / Helper' },
                  { id: 'vue', label: 'Vue.js 3' },
                  { id: 'angular', label: 'Angular' },
                ].map((fw) => (
                  <button
                    key={fw.id}
                    type="button"
                    onClick={() => setEmbedFramework(fw.id as any)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      embedFramework === fw.id
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-sm font-black'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                    }`}
                  >
                    {fw.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Generated Code Snippet */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 font-mono text-xs shadow-xl">
              <div className="px-5 py-3 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-300">
                  {embedFramework === 'react' && 'DentalPrescriptionForm.tsx'}
                  {embedFramework === 'iframe' && 'index.html (Iframe Embed)'}
                  {embedFramework === 'vanilla' && 'main.js (Vanilla DOM Embed)'}
                  {embedFramework === 'vue' && 'TeethChartEmbed.vue'}
                  {embedFramework === 'angular' && 'teeth-chart-embed.component.ts'}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    const code = embedFramework === 'react' ? reactSnippet :
                                 embedFramework === 'iframe' ? iframeSnippet :
                                 embedFramework === 'vanilla' ? vanillaSnippet :
                                 embedFramework === 'vue' ? vueSnippet : angularSnippet;
                    copyToClipboard(code, 'framework-code');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-all cursor-pointer"
                >
                  {copiedCode === 'framework-code' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === 'framework-code' ? 'Copied Code!' : 'Copy Code'}</span>
                </button>
              </div>

              <pre className="p-5 overflow-x-auto text-[13px] leading-relaxed">
                {embedFramework === 'react' && reactSnippet}
                {embedFramework === 'iframe' && iframeSnippet}
                {embedFramework === 'vanilla' && vanillaSnippet}
                {embedFramework === 'vue' && vueSnippet}
                {embedFramework === 'angular' && angularSnippet}
              </pre>
            </div>

            {/* Live Interactive Iframe Preview */}
            <div className="bg-white dark:bg-[#0b101d] p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Eye className="w-4 h-4 text-indigo-500" />
                    Live Embedded Iframe Preview
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Previewing `?embed=true` rendered inside an isolated iframe sandbox below.
                  </p>
                </div>
                <a
                  href="/?embed=true"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <span>Open Standalone Embed Window</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-950 shadow-inner">
                <iframe
                  src="/?embed=true"
                  title="3DDX Teeth Chart Embed Preview"
                  className="w-full h-[620px] border-none"
                />
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: API & PROPS REFERENCE */}
        {activeTab === 'docs' && (
          <div className="space-y-6">
            
            {/* Component Props Table */}
            <div className="bg-white dark:bg-[#0b101d] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div>
                <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-cyan-500" />
                  TeethChart Component Props
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Full TypeScript contract for the &lt;TeethChart&gt; reusable component.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-mono">
                      <th className="py-2.5 px-3">Prop</th>
                      <th className="py-2.5 px-3">Type</th>
                      <th className="py-2.5 px-3">Default</th>
                      <th className="py-2.5 px-3">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                    <tr>
                      <td className="py-2.5 px-3 font-mono font-bold text-cyan-600 dark:text-cyan-400">selected</td>
                      <td className="py-2.5 px-3 font-mono text-slate-500">number[]</td>
                      <td className="py-2.5 px-3 font-mono text-slate-400">[]</td>
                      <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">Array of currently selected tooth numbers in Universal notation (1-32).</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-mono font-bold text-cyan-600 dark:text-cyan-400">toothRestorations</td>
                      <td className="py-2.5 px-3 font-mono text-slate-500">Record&lt;number, string&gt;</td>
                      <td className="py-2.5 px-3 font-mono text-slate-400">{}</td>
                      <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">Dictionary mapping tooth number to assigned procedure (e.g. <code>&#123; 14: 'implant' &#125;</code>).</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-mono font-bold text-cyan-600 dark:text-cyan-400">activeServices</td>
                      <td className="py-2.5 px-3 font-mono text-slate-500">DentalServiceId[]</td>
                      <td className="py-2.5 px-3 font-mono text-slate-400">[]</td>
                      <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">Prescribed 3DDX service IDs (e.g. <code>['sg', 'tp']</code>) dynamically filtering available procedure brushes.</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-mono font-bold text-cyan-600 dark:text-cyan-400">onSelectionChange</td>
                      <td className="py-2.5 px-3 font-mono text-slate-500">(selected, restorations) =&gt; void</td>
                      <td className="py-2.5 px-3 font-mono text-slate-400">-</td>
                      <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">Primary callback invoked whenever tooth selection or procedure assignment mutates.</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-mono font-bold text-cyan-600 dark:text-cyan-400">onClearAll</td>
                      <td className="py-2.5 px-3 font-mono text-slate-500">() =&gt; void</td>
                      <td className="py-2.5 px-3 font-mono text-slate-400">-</td>
                      <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">Callback fired when clinician clicks "Reset / Clear All".</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-mono font-bold text-cyan-600 dark:text-cyan-400">archFocus</td>
                      <td className="py-2.5 px-3 font-mono text-slate-500">'maxilla' | 'mandible' | 'dual' | 'both'</td>
                      <td className="py-2.5 px-3 font-mono text-slate-400">'dual'</td>
                      <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">Highlights or focuses upper arch, lower arch, or both arches.</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-mono font-bold text-cyan-600 dark:text-cyan-400">readonly</td>
                      <td className="py-2.5 px-3 font-mono text-slate-500">boolean</td>
                      <td className="py-2.5 px-3 font-mono text-slate-400">false</td>
                      <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">When true, locks chart into read-only viewing mode for review screens.</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-mono font-bold text-cyan-600 dark:text-cyan-400">showToolbar</td>
                      <td className="py-2.5 px-3 font-mono text-slate-500">boolean</td>
                      <td className="py-2.5 px-3 font-mono text-slate-400">true</td>
                      <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">Controls visibility of header toolbar, system switcher, and preset buttons.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Clinical Procedure Catalog */}
            <div className="bg-white dark:bg-[#0b101d] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div>
                <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  Clinical Procedure & Restorative Catalog
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Supported procedure types, visual markers, and 3DDX service alignments.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {RESTORATION_TYPES.map(res => (
                  <div
                    key={res.id}
                    className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 flex items-start gap-3"
                  >
                    <span className="text-2xl p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
                      {res.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <strong className="text-xs text-slate-900 dark:text-white">{res.label}</strong>
                        <span className="text-[10px] text-slate-400 font-mono">({res.id})</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                        {res.description}
                      </p>
                      {res.serviceCategories && (
                        <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                          {res.serviceCategories.map(s => (
                            <span key={s} className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                              {s.toUpperCase()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="mt-12 py-6 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 3DDX Advanced Digital Dentistry Solutions. All rights reserved.</p>
          <div className="flex items-center gap-4 font-semibold">
            <a href="https://teeth-chart.abdoaladawy.me" className="hover:text-cyan-500 transition-colors">teeth-chart.abdoaladawy.me</a>
            <span>•</span>
            <a href="https://github.com/Abdo2000-1/Teeth-Chart.git" className="hover:text-cyan-500 transition-colors">GitHub Repository</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
