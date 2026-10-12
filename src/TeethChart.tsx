import React, { useState, useEffect, useMemo } from 'react';
import { 
  Check, 
  RotateCcw, 
  Smile, 
  Zap, 
  Info, 
  X, 
  Activity,
  Layers,
  Sparkles,
  SlidersHorizontal,
  ChevronDown,
  Grid,
  Eye,
  Crown,
  Disc,
  GitFork,
  Gem,
  XCircle,
  Target,
  Pin,
  Ruler,
  ChevronsUp,
  Component,
  Tag,
  MapPin,
  Search,
  AlertTriangle,
  Clock,
  History,
  Triangle,
  Split,
  Wand2
} from 'lucide-react';
import { 
  ToothSystem, 
  RestorationType, 
  TeethChartProps, 
  ToothOdontoData,
  DentalServiceId
} from './teeth-chart.types';
import { 
  ODONTO_DATABASE, 
  RESTORATION_TYPES,
  SERVICE_METADATA,
  getProceduresForServices
} from './teeth-chart.constants';
import { 
  ClinicalToothSilhouette 
} from './teeth-chart.geometry';

export function ProcedureIcon({ type, className = "w-3.5 h-3.5" }: { type: RestorationType | string; className?: string }) {
  switch (type) {
    case 'crown':
      return <Crown className={className} />;
    case 'bridge':
      return <GitFork className={className} />;
    case 'veneer':
      return <Sparkles className={className} />;
    case 'implant':
      return <Disc className={className} />;
    case 'inlay':
      return <Gem className={className} />;
    case 'extraction':
      return <XCircle className={className} />;
    case 'sleeve':
      return <Target className={className} />;
    case 'anchor':
      return <Pin className={className} />;
    case 'bone_reduction':
      return <Ruler className={className} />;
    case 'sinus_lift':
      return <ChevronsUp className={className} />;
    case 'nerve_trace':
      return <Activity className={className} />;
    case 'segmentation':
      return <Layers className={className} />;
    case 'die_prep':
      return <Tag className={className} />;
    case 'analog':
      return <MapPin className={className} />;
    case 'impacted':
      return <Search className={className} />;
    case 'pathology':
      return <AlertTriangle className={className} />;
    case 'temp_crown':
      return <Clock className={className} />;
    case 'temp_bridge':
      return <History className={className} />;
    case 'attachment':
      return <Triangle className={className} />;
    case 'ipr':
      return <Split className={className} />;
    case 'smile_design':
      return <Wand2 className={className} />;
    default:
      return <Component className={className} />;
  }
}

export const UPPER_ARCH_POSITIONS: Record<number, { left: number; top: number; rot: number }> = {
  1:  { left: 48,  top: 18, rot: 24 },
  2:  { left: 88,  top: 26, rot: 20 },
  3:  { left: 132, top: 36, rot: 16 },
  4:  { left: 180, top: 46, rot: 13 },
  5:  { left: 230, top: 56, rot: 9 },
  6:  { left: 282, top: 64, rot: 6 },
  7:  { left: 332, top: 70, rot: 3 },
  8:  { left: 372, top: 72, rot: 0 },
  9:  { left: 410, top: 72, rot: 0 },
  10: { left: 450, top: 70, rot: -3 },
  11: { left: 500, top: 64, rot: -6 },
  12: { left: 552, top: 56, rot: -9 },
  13: { left: 602, top: 46, rot: -13 },
  14: { left: 650, top: 36, rot: -16 },
  15: { left: 694, top: 26, rot: -20 },
  16: { left: 734, top: 18, rot: -24 },
};

export const LOWER_ARCH_POSITIONS: Record<number, { left: number; top: number; rot: number }> = {
  32: { left: 48,  top: 210, rot: -24 },
  31: { left: 88,  top: 202, rot: -20 },
  30: { left: 132, top: 192, rot: -16 },
  29: { left: 180, top: 182, rot: -13 },
  28: { left: 230, top: 172, rot: -9 },
  27: { left: 282, top: 164, rot: -6 },
  26: { left: 332, top: 158, rot: -3 },
  25: { left: 372, top: 156, rot: 0 },
  24: { left: 410, top: 156, rot: 0 },
  23: { left: 450, top: 158, rot: 3 },
  22: { left: 500, top: 164, rot: 6 },
  21: { left: 552, top: 172, rot: 9 },
  20: { left: 602, top: 182, rot: 13 },
  19: { left: 650, top: 192, rot: 16 },
  18: { left: 694, top: 202, rot: 20 },
  17: { left: 734, top: 210, rot: 24 },
};

export function TeethChart({
  selected,
  selectedTeeth,
  onToggle,
  onToggleTooth,
  toothRestorations = {},
  activeServices,
  serviceId,
  archFocus = 'dual',
  onAssignRestoration,
  onClearAll,
  onSelectionChange,
  readonly = false,
  showToolbar = true,
  className = ''
}: TeethChartProps) {
  const [viewLayoutMode, setViewLayoutMode] = useState<'grid' | 'anatomical'>('grid');
  // Normalize incoming service filters
  const effectiveServices = useMemo(() => {
    if (activeServices && activeServices.length > 0) {
      return activeServices.map(s => String(s));
    }
    if (serviceId) {
      return [String(serviceId)];
    }
    return [];
  }, [activeServices, serviceId]);

  const [showAllProcedures, setShowAllProcedures] = useState(false);

  // Filter available procedures based on active prescribed services
  const availableProcedures = useMemo(() => {
    if (showAllProcedures || effectiveServices.length === 0) {
      return RESTORATION_TYPES;
    }
    return getProceduresForServices(effectiveServices);
  }, [effectiveServices, showAllProcedures]);

  const propSelected = selected ?? selectedTeeth;
  const [internalSelected, setInternalSelected] = useState<number[]>(propSelected || []);
  
  // Independent per-tooth procedure dictionary: { [toothNumber]: procedureId }
  const [localRestorations, setLocalRestorations] = useState<Record<number, string>>({
    ...toothRestorations
  });

  // Sync internal selected when external prop changes
  useEffect(() => {
    if (propSelected !== undefined) {
      setInternalSelected(propSelected);
    }
  }, [propSelected]);

  // Sync restorations when external prop changes
  useEffect(() => {
    if (toothRestorations && Object.keys(toothRestorations).length > 0) {
      setLocalRestorations(prev => ({
        ...prev,
        ...toothRestorations
      }));
    }
  }, [toothRestorations]);

  const activeSelected = propSelected !== undefined ? propSelected : internalSelected;
  const handleToggle = onToggle ?? onToggleTooth;

  const [system, setSystem] = useState<ToothSystem>('universal');

  // Selected tool initializes to the first valid procedure in the filtered list
  const [selectedTool, setSelectedTool] = useState<RestorationType>(() => {
    return availableProcedures[0]?.id || 'crown';
  });

  // Keep selected tool valid if available procedures change
  useEffect(() => {
    if (!availableProcedures.some(p => p.id === selectedTool)) {
      if (availableProcedures[0]) {
        setSelectedTool(availableProcedures[0].id);
      }
    }
  }, [availableProcedures, selectedTool]);

  const [hoveredTooth, setHoveredTooth] = useState<ToothOdontoData | null>(null);
  const [visibleArch, setVisibleArch] = useState<'both' | 'upper' | 'lower'>('both');

  // Grouped procedures for clean enterprise procedure-level summary tags
  const groupedProcedures = useMemo(() => {
    const map: Record<string, number[]> = {};
    activeSelected.forEach((num) => {
      const res = localRestorations[num] || toothRestorations[num] || 'crown';
      if (!map[res]) {
        map[res] = [];
      }
      map[res].push(num);
    });
    Object.keys(map).forEach(key => {
      map[key].sort((a, b) => a - b);
    });
    return map;
  }, [activeSelected, localRestorations, toothRestorations]);

  // Grouped into the standard 4 anatomical quadrants
  const upperRight = ODONTO_DATABASE.filter(t => t.quadrant === 'UR');
  const lowerRight = ODONTO_DATABASE.filter(t => t.quadrant === 'LR');
  const upperLeft  = ODONTO_DATABASE.filter(t => t.quadrant === 'UL');
  const lowerLeft  = ODONTO_DATABASE.filter(t => t.quadrant === 'LL');

  /**
   * Safe tooth selection handler:
   * - Never overwrites other teeth when switching tools
   * - Preserves the specific assigned procedure on each tooth
   */
  const handleToothClick = (tooth: ToothOdontoData) => {
    if (readonly) return;
    const num = tooth.universal;
    const isAlreadySelected = activeSelected.includes(num);

    if (!isAlreadySelected) {
      // 1. Tooth not selected -> Add to selection with CURRENT selected tool
      const nextSelected = [...activeSelected, num];
      const nextRestorations = { ...localRestorations, [num]: selectedTool };
      setInternalSelected(nextSelected);
      setLocalRestorations(nextRestorations);
      if (onSelectionChange) {
        onSelectionChange(nextSelected, nextRestorations);
      } else {
        handleToggle?.(num);
      }
      onAssignRestoration?.(num, selectedTool);
    } else {
      // 2. Tooth already selected -> Check if clicked with SAME tool or DIFFERENT tool
      const currentRes = localRestorations[num] || toothRestorations[num] || 'crown';
      if (currentRes === selectedTool) {
        // Same tool clicked again -> Deselect and remove from dictionary
        const nextSelected = activeSelected.filter(t => t !== num);
        const nextRestorations = { ...localRestorations };
        delete nextRestorations[num];
        setInternalSelected(nextSelected);
        setLocalRestorations(nextRestorations);
        if (onSelectionChange) {
          onSelectionChange(nextSelected, nextRestorations);
        } else {
          handleToggle?.(num);
        }
      } else {
        // Different tool clicked -> Update ONLY this tooth's assigned procedure
        const nextRestorations = { ...localRestorations, [num]: selectedTool };
        setLocalRestorations(nextRestorations);
        onAssignRestoration?.(num, selectedTool);
        if (onSelectionChange) {
          onSelectionChange(activeSelected, nextRestorations);
        }
      }
    }
  };

  /**
   * Batch selection handler:
   * Supports 'both' (Both Arches / All 32 teeth at once), upper, lower, smile, posteriors, clear
   */
  const handleSelectBatch = (type: 'all' | 'both' | 'upper' | 'lower' | 'smile' | 'posteriors' | 'clear') => {
    if (readonly) return;
    if (type === 'clear') {
      const prev = [...activeSelected];
      setInternalSelected([]);
      setLocalRestorations({});
      onClearAll?.();
      onSelectionChange?.([], {});
      if (!onClearAll && !onSelectionChange && handleToggle) {
        prev.forEach(n => handleToggle(n));
      }
      return;
    }

    let targets: ToothOdontoData[] = [];
    if (type === 'all' || type === 'both') targets = ODONTO_DATABASE;
    if (type === 'upper') targets = ODONTO_DATABASE.filter(t => t.arch === 'upper');
    if (type === 'lower') targets = ODONTO_DATABASE.filter(t => t.arch === 'lower');
    if (type === 'smile') targets = ODONTO_DATABASE.filter(t => t.isAnterior);
    if (type === 'posteriors') targets = ODONTO_DATABASE.filter(t => !t.isAnterior);

    const targetNums = targets.map(t => t.universal);
    const allSelected = targetNums.every(n => activeSelected.includes(n));

    let nextSelected: number[];
    let nextRestorations = { ...localRestorations };

    if (allSelected) {
      // Toggle OFF: remove targetNums
      nextSelected = activeSelected.filter(n => !targetNums.includes(n));
      targetNums.forEach(n => {
        delete nextRestorations[n];
      });
      if (!onSelectionChange && handleToggle) {
        targetNums.forEach(n => {
          if (activeSelected.includes(n)) handleToggle(n);
        });
      }
    } else {
      // Toggle ON: add targetNums with active selectedTool
      nextSelected = Array.from(new Set([...activeSelected, ...targetNums]));
      targetNums.forEach(n => {
        if (!nextRestorations[n]) {
          nextRestorations[n] = selectedTool;
        }
      });
      if (!onSelectionChange && handleToggle) {
        targetNums.forEach(n => {
          if (!activeSelected.includes(n)) handleToggle(n);
        });
      }
    }

    setInternalSelected(nextSelected);
    setLocalRestorations(nextRestorations);
    onSelectionChange?.(nextSelected, nextRestorations);
  };

  /**
   * Remove single tooth selection via summary tag (X) button
   */
  const handleRemoveSingleTooth = (num: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (readonly) return;
    const nextSelected = activeSelected.filter(t => t !== num);
    const nextRestorations = { ...localRestorations };
    delete nextRestorations[num];
    setInternalSelected(nextSelected);
    setLocalRestorations(nextRestorations);
    if (onSelectionChange) {
      onSelectionChange(nextSelected, nextRestorations);
    } else {
      handleToggle?.(num);
    }
  };

  /**
   * Anatomical Arch Tooth Renderer:
   * - ZERO rectangular bounding boxes or border rings (conforms strictly to tooth silhouette)
   * - Highlights the tooth silhouette itself with vibrant clinical fill and contour drop-shadow
   * - Ultra-clean minimal number label without visual clutter
   */
  const renderAnatomicalToothCell = (tooth: ToothOdontoData, arch: 'upper' | 'lower') => {
    const isSelected = activeSelected.includes(tooth.universal);
    const assignedRes = isSelected 
      ? (localRestorations[tooth.universal] || toothRestorations[tooth.universal] || selectedTool) 
      : undefined;
    const resInfo = assignedRes ? RESTORATION_TYPES.find(r => r.id === assignedRes) : null;
    const displayNum = system === 'universal' ? tooth.universal : tooth.fdi;
    const activeColor = resInfo?.color || '#00d8fe';

    return (
      <div
        key={tooth.universal}
        onClick={() => handleToothClick(tooth)}
        onMouseEnter={() => setHoveredTooth(tooth)}
        onMouseLeave={() => setHoveredTooth(null)}
        className="group relative flex flex-col items-center justify-center cursor-pointer select-none transition-transform duration-150 hover:scale-115 active:scale-95"
        style={{
          background: 'transparent',
          border: 'none',
          boxShadow: 'none',
          outline: 'none',
        }}
      >
        {/* Upper tooth: clean subtle number above root apex */}
        {arch === 'upper' && (
          <span 
            className="text-[10px] font-mono font-bold leading-none mb-1 transition-colors select-none"
            style={{
              color: isSelected ? activeColor : undefined,
              opacity: isSelected ? 1 : 0.6
            }}
          >
            {displayNum}
          </span>
        )}

        {/* Clinical Tooth Silhouette - highlights tooth boundaries directly */}
        <div 
          className="w-8 sm:w-9 h-14 sm:h-15 flex items-center justify-center transition-all duration-200"
          style={{
            filter: isSelected ? `drop-shadow(0 0 6px ${activeColor})` : 'drop-shadow(0 1px 2px rgba(0,0,0,0.08))'
          }}
        >
          <ClinicalToothSilhouette
            toothNumber={tooth.universal}
            isSelected={isSelected}
            restoration={assignedRes as RestorationType}
          />
        </div>

        {/* Lower tooth: clean subtle number below root apex */}
        {arch === 'lower' && (
          <span 
            className="text-[10px] font-mono font-bold leading-none mt-1 transition-colors select-none"
            style={{
              color: isSelected ? activeColor : undefined,
              opacity: isSelected ? 1 : 0.6
            }}
          >
            {displayNum}
          </span>
        )}
      </div>
    );
  };

  const renderToothCell = (tooth: ToothOdontoData) => {
    const isSelected = activeSelected.includes(tooth.universal);
    const assignedRes = isSelected 
      ? (localRestorations[tooth.universal] || toothRestorations[tooth.universal] || selectedTool) 
      : undefined;
    const resInfo = assignedRes ? RESTORATION_TYPES.find(r => r.id === assignedRes) : null;
    const isUpper = tooth.arch === 'upper';
    const displayNum = system === 'universal' ? tooth.universal : tooth.fdi;

    const activeRingColor = resInfo?.color || '#00d8fe';

    return (
      <div
        key={tooth.universal}
        onClick={() => handleToothClick(tooth)}
        onMouseEnter={() => setHoveredTooth(tooth)}
        onMouseLeave={() => setHoveredTooth(null)}
        style={{
          boxShadow: isSelected ? `0 0 0 2px ${activeRingColor}` : undefined
        }}
        className={`group relative flex flex-col items-center justify-between p-1 sm:p-1.5 rounded-xl cursor-pointer transition-all duration-150 select-none ${
          isSelected 
            ? `${resInfo?.bgColor || 'bg-cyan-500/10'} ring-1 ring-current shadow-sm` 
            : 'hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
        }`}
      >
        {/* Upper teeth: Number above crown */}
        {isUpper && (
          <span className={`text-[10px] font-mono font-bold leading-none mb-1 transition-colors ${
            isSelected ? 'text-primary dark:text-cyan-400' : 'text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'
          }`}>
            {displayNum}
          </span>
        )}

        {/* Anatomical Silhouette SVG */}
        <div className="w-9 h-18 sm:w-11 sm:h-20 flex items-center justify-center">
          <ClinicalToothSilhouette
            toothNumber={tooth.universal}
            isSelected={isSelected}
            restoration={assignedRes as RestorationType}
          />
        </div>

        {/* Lower teeth: Number below crown */}
        {!isUpper && (
          <span className={`text-[10px] font-mono font-bold leading-none mt-1 transition-colors ${
            isSelected ? 'text-primary dark:text-cyan-400' : 'text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'
          }`}>
            {displayNum}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className={`space-y-4 w-full select-none ${className}`}>
      {/* 1. HEADER & SERVICE INTELLIGENCE BAR */}
      {showToolbar && (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                <span className="p-1 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
                  <Activity className="w-4 h-4" />
                </span>
                <span>Clinical Odontogram (Teeth 1 - 32)</span>
              </h3>
              
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30">
                {activeSelected.length} Selected
              </span>

              {/* Active Prescribed Services Indicators */}
              {effectiveServices.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  {effectiveServices.map(srvId => {
                    const srv = SERVICE_METADATA[srvId];
                    return (
                      <span
                        key={srvId}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
                      >
                        <span>{srv?.icon || '⚙️'}</span>
                        <span>{srv?.name || srvId.toUpperCase()}</span>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Select any tooth to assign the active clinical procedure. Click an assigned tooth with the same tool to unselect.
            </p>
          </div>

          <div className="flex items-center gap-2 self-stretch md:self-auto justify-between md:justify-end flex-wrap">
            {/* Numbering System Switcher */}
            <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-0.5 border border-slate-200 dark:border-slate-700 text-xs">
              <button
                type="button"
                onClick={() => setSystem('universal')}
                className={`px-2.5 py-1 font-bold rounded-lg transition-all cursor-pointer ${
                  system === 'universal'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Universal (1-32)
              </button>
              <button
                type="button"
                onClick={() => setSystem('fdi')}
                className={`px-2.5 py-1 font-bold rounded-lg transition-all cursor-pointer ${
                  system === 'fdi'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                ISO / FDI (11-48)
              </button>
            </div>

            {/* Clear All */}
            {!readonly && activeSelected.length > 0 && (
              <button
                type="button"
                onClick={() => handleSelectBatch('clear')}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors border border-rose-200 dark:border-rose-900/30 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* 2. PROCEDURES BRUSH PALETTE & QUICK ACTION BATCHES */}
      {!readonly && showToolbar && (
        <div className="py-2.5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80">
          {/* Active Procedure Brush Selector */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-cyan-500" />
              <span>Tool:</span>
            </span>

            {availableProcedures.map((res) => {
              const isCurrent = selectedTool === res.id;
              return (
                <button
                  key={res.id}
                  type="button"
                  onClick={() => setSelectedTool(res.id)}
                  style={{
                    borderColor: isCurrent ? res.color : undefined
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    isCurrent
                      ? `${res.bgColor} ${res.textColor} shadow-xs ring-1 ring-current`
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  title={res.description}
                >
                  <ProcedureIcon type={res.id} className="w-3.5 h-3.5" />
                  <span>{res.label}</span>
                </button>
              );
            })}

            {/* Toggle show all procedures if filtered */}
            {effectiveServices.length > 0 && (
              <button
                type="button"
                onClick={() => setShowAllProcedures(!showAllProcedures)}
                className="text-[11px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 underline ml-1 cursor-pointer"
              >
                {showAllProcedures ? 'Filter to Active Services' : '+ Show All Procedures'}
              </button>
            )}
          </div>

          {/* Layout Mode, Arch Filters & Presets Toolbar */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* View Layout Switcher (Mode 1 vs Mode 2) */}
            <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setViewLayoutMode('grid')}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  viewLayoutMode === 'grid'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Traditional 4-Quadrant Odontogram Grid"
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Quadrant Grid</span>
              </button>
              <button
                type="button"
                onClick={() => setViewLayoutMode('anatomical')}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  viewLayoutMode === 'anatomical'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Realistic Anatomical Dental Arch (Natural Mouth Curvature)"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Anatomical Arch</span>
              </button>
            </div>

            {/* Arch Visibility Toggle */}
            <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setVisibleArch('both')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  visibleArch === 'both'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Display both upper and lower arches"
              >
                Both Arches
              </button>
              <button
                type="button"
                onClick={() => setVisibleArch('upper')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  visibleArch === 'upper'
                    ? 'bg-cyan-600 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Display upper maxilla row only"
              >
                Upper
              </button>
              <button
                type="button"
                onClick={() => setVisibleArch('lower')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  visibleArch === 'lower'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Display lower mandible row only"
              >
                Lower
              </button>
            </div>

            {/* Quick Batch Presets */}
            <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => handleSelectBatch('smile')}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg text-purple-600 dark:text-purple-400 hover:bg-white dark:hover:bg-slate-700 transition-all cursor-pointer"
                title="Select Anterior Smile Zone (#6-11, #22-27)"
              >
                <Smile className="w-3.5 h-3.5" />
                <span>Smile Zone</span>
              </button>
              <button
                type="button"
                onClick={() => handleSelectBatch('posteriors')}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 transition-all cursor-pointer"
                title="Select Posterior Teeth"
              >
                <span>Posteriors</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODE 1: EXACT 4-QUADRANT DENTAL ARCH GRID (Default) */}
      {viewLayoutMode === 'grid' && (
        <div className="py-2 overflow-x-auto">
          <div className="min-w-[700px] max-w-4xl mx-auto space-y-3">
            
            {/* Top Quadrant Header Labels */}
            {(visibleArch === 'both' || visibleArch === 'upper') && (
              <div className="grid grid-cols-[1fr_auto_1fr] items-center text-xs font-bold text-slate-600 dark:text-slate-300 px-2 pb-1">
                <div className="flex items-center justify-between pr-4">
                  <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono text-[11px] border border-cyan-500/20">
                    UR • Maxillary Right
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">#1 ➔ #8</span>
                </div>
                <div className="w-8 flex justify-center text-slate-400 font-mono text-xs">│</div>
                <div className="flex items-center justify-between pl-4">
                  <span className="text-[10px] font-mono text-slate-400">#9 ➔ #16</span>
                  <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono text-[11px] border border-blue-500/20">
                    UL • Maxillary Left
                  </span>
                </div>
              </div>
            )}

            {/* The 4-Quadrant Anatomical Canvas */}
            <div className="relative border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-6 bg-slate-50/50 dark:bg-slate-900/40 shadow-inner">
              
              {/* UPPER ARCH (Maxilla) */}
              {(visibleArch === 'both' || visibleArch === 'upper') && (
                <div className="grid grid-cols-[1fr_auto_1fr] items-end pb-2">
                  <div className="grid grid-cols-8 gap-0.5 sm:gap-1">
                    {upperRight.map(renderToothCell)}
                  </div>

                  {/* Midline Divider */}
                  <div className="w-8 h-full flex items-center justify-center">
                    <div className="w-[1.5px] h-full bg-slate-800 dark:bg-slate-200 rounded-full" />
                  </div>

                  <div className="grid grid-cols-8 gap-0.5 sm:gap-1">
                    {upperLeft.map(renderToothCell)}
                  </div>
                </div>
              )}

              {/* Occlusal Midline Cross Line */}
              <div className="relative flex items-center justify-between my-2">
                <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 pl-1 shrink-0 select-none">
                  Patient Right
                </span>
                <div className="flex-1 h-[1.5px] bg-slate-800 dark:bg-slate-200 mx-3 relative flex items-center justify-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 ring-4 ring-white dark:ring-slate-900" />
                </div>
                <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 pr-1 shrink-0 select-none">
                  Patient Left
                </span>
              </div>

              {/* LOWER ARCH (Mandible) */}
              {(visibleArch === 'both' || visibleArch === 'lower') && (
                <div className="grid grid-cols-[1fr_auto_1fr] items-start pt-2">
                  <div className="grid grid-cols-8 gap-0.5 sm:gap-1">
                    {lowerRight.map(renderToothCell)}
                  </div>

                  {/* Midline Divider */}
                  <div className="w-8 h-full flex items-center justify-center">
                    <div className="w-[1.5px] h-full bg-slate-800 dark:bg-slate-200 rounded-full" />
                  </div>

                  <div className="grid grid-cols-8 gap-0.5 sm:gap-1">
                    {lowerLeft.map(renderToothCell)}
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Quadrant Header Labels */}
            {(visibleArch === 'both' || visibleArch === 'lower') && (
              <div className="grid grid-cols-[1fr_auto_1fr] items-center text-xs font-bold text-slate-600 dark:text-slate-300 px-2 pt-1">
                <div className="flex items-center justify-between pr-4">
                  <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-[11px] border border-indigo-500/20">
                    LR • Mandibular Right
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">#32 ➔ #25</span>
                </div>
                <div className="w-8 flex justify-center text-slate-400 font-mono text-xs">│</div>
                <div className="flex items-center justify-between pl-4">
                  <span className="text-[10px] font-mono text-slate-400">#24 ➔ #17</span>
                  <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono text-[11px] border border-purple-500/20">
                    LL • Mandibular Left
                  </span>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* MODE 2: REALISTIC ANATOMICAL DENTAL ARCH (Ultra-Compact Natural Mouth Curvature) */}
      {viewLayoutMode === 'anatomical' && (
        <div className="py-2 overflow-x-auto">
          <div className="min-w-[820px] max-w-4xl mx-auto">
            {/* Single Unified Dental Mouth Canvas */}
            <div className="relative border border-slate-200/90 dark:border-slate-800/90 rounded-3xl p-4 bg-slate-50/50 dark:bg-slate-900/40 shadow-inner">
              
              {/* Parabolic Canvas Sized Appropriately to Visible Arches */}
              <div 
                className={`relative w-[810px] mx-auto select-none transition-all ${
                  visibleArch === 'both' ? 'h-[295px]' : 'h-[155px]'
                }`}
              >
                {/* Anatomical Guide Curves & Occlusal Plane */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                  {/* Upper Parabolic Arch Guide */}
                  {(visibleArch === 'both' || visibleArch === 'upper') && (
                    <path
                      d="M 50 18 Q 405 92 760 18"
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                  )}

                  {/* Occlusal Contact Midline (When both arches visible) */}
                  {visibleArch === 'both' && (
                    <>
                      <line
                        x1="30"
                        y1="140"
                        x2="780"
                        y2="140"
                        stroke="#64748b"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                      />
                      <circle cx="405" cy="140" r="3" fill="#06b6d4" />
                    </>
                  )}

                  {/* Lower Parabolic Arch Guide */}
                  {visibleArch === 'both' && (
                    <path
                      d="M 50 262 Q 405 188 760 262"
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                  )}
                  {visibleArch === 'lower' && (
                    <path
                      d="M 50 117 Q 405 43 760 117"
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                  )}
                </svg>

                {/* Patient Orientation Indicators */}
                <div className="absolute top-1 left-2 flex items-center gap-1 text-[10px] font-mono font-bold text-slate-400">
                  <span>UR (Right)</span>
                </div>
                <div className="absolute top-1 right-2 flex items-center gap-1 text-[10px] font-mono font-bold text-slate-400">
                  <span>UL (Left)</span>
                </div>

                {/* Upper Teeth in Natural Parabolic Arc */}
                {(visibleArch === 'both' || visibleArch === 'upper') && (
                  [...upperRight, ...upperLeft].map((tooth) => {
                    const pos = UPPER_ARCH_POSITIONS[tooth.universal];
                    if (!pos) return null;
                    return (
                      <div
                        key={tooth.universal}
                        style={{
                          position: 'absolute',
                          left: `${pos.left}px`,
                          top: `${pos.top}px`,
                          transform: `rotate(${pos.rot}deg)`,
                          transformOrigin: 'center center'
                        }}
                      >
                        {renderAnatomicalToothCell(tooth, 'upper')}
                      </div>
                    );
                  })
                )}

                {/* Lower Teeth in Natural Parabolic Arc */}
                {(visibleArch === 'both' || visibleArch === 'lower') && (
                  [...lowerRight, ...lowerLeft].map((tooth) => {
                    const pos = LOWER_ARCH_POSITIONS[tooth.universal];
                    if (!pos) return null;
                    const yOffset = visibleArch === 'lower' ? -145 : 0;
                    return (
                      <div
                        key={tooth.universal}
                        style={{
                          position: 'absolute',
                          left: `${pos.left}px`,
                          top: `${pos.top + yOffset}px`,
                          transform: `rotate(${pos.rot}deg)`,
                          transformOrigin: 'center center'
                        }}
                      >
                        {renderAnatomicalToothCell(tooth, 'lower')}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. HOVER TOOTH INSPECTOR BAR */}
      <div className="min-h-10 py-1.5 flex flex-wrap items-center justify-between px-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-xs text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 transition-all gap-2">
        {hoveredTooth ? (
          <div className="flex items-center gap-2.5 truncate">
            <span className="font-extrabold text-slate-900 dark:text-white text-sm">
              {hoveredTooth.name}
            </span>
            <span className="text-slate-400">•</span>
            <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">
              Universal #{hoveredTooth.universal} (FDI {hoveredTooth.fdi})
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 dark:text-slate-400 font-medium">
              Quadrant {hoveredTooth.quadrant} • {hoveredTooth.isAnterior ? 'Anterior' : 'Posterior'}
            </span>
          </div>
        ) : (
          <span className="text-slate-400 dark:text-slate-500 flex items-center gap-2">
            <Info className="w-4 h-4 text-cyan-500 shrink-0" />
            <span>Hover over any tooth to view anatomical details and assigned clinical procedures</span>
          </span>
        )}

        {hoveredTooth && activeSelected.includes(hoveredTooth.universal) && (
          <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5 shrink-0 bg-emerald-500/10 px-2.5 py-1 rounded-xl border border-emerald-500/20">
            <Check className="w-4 h-4 stroke-[3]" /> 
            <span>
              Assigned: {
                RESTORATION_TYPES.find(r => r.id === (localRestorations[hoveredTooth.universal] || toothRestorations[hoveredTooth.universal]))?.label ||
                localRestorations[hoveredTooth.universal] ||
                selectedTool
              }
            </span>
          </span>
        )}
      </div>

      {/* 5. SELECTED PROCEDURES SUMMARY TAGS GROUPED BY PROCEDURE (Image 1) */}
      {activeSelected.length > 0 && (
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-xs">
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <span className="font-extrabold text-slate-700 dark:text-slate-300">
              Selected Procedures Summary ({activeSelected.length} Units):
            </span>
            <div className="flex flex-wrap gap-2">
              {Object.entries(groupedProcedures).map(([resType, toothNums]) => {
                const resConfig = RESTORATION_TYPES.find(r => r.id === resType);
                const label = resConfig?.label || resType;
                const bgColor = resConfig?.bgColor || 'bg-slate-100 dark:bg-slate-800';
                const textColor = resConfig?.textColor || 'text-slate-800 dark:text-slate-200';
                const borderColor = resConfig?.borderColor || 'border-slate-300 dark:border-slate-700';

                return (
                  <div
                    key={resType}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border ${borderColor} ${bgColor} ${textColor} font-bold shadow-xs`}
                  >
                    <div className="flex items-center gap-1.5">
                      <ProcedureIcon type={resType} className="w-3.5 h-3.5" />
                      <span className="font-extrabold text-[12px]">{label}:</span>
                    </div>

                    <div className="flex items-center gap-1 font-mono text-[11px]">
                      {toothNums.map((num) => {
                        const t = ODONTO_DATABASE.find(item => item.universal === num);
                        const display = system === 'universal' ? `#${num}` : `FDI ${t?.fdi || num}`;
                        return (
                          <span
                            key={num}
                            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-white/60 dark:bg-black/40 border border-current/20"
                          >
                            <span>{display}</span>
                            {!readonly && (
                              <button
                                type="button"
                                onClick={(e) => handleRemoveSingleTooth(num, e)}
                                className="hover:text-rose-500 ml-0.5 p-0.5 cursor-pointer rounded text-slate-400 hover:bg-white/40 transition-colors"
                                title={`Remove tooth ${display}`}
                              >
                                <X className="w-2.5 h-2.5" />
                              </button>
                            )}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-slate-500 font-medium font-mono text-xs shrink-0 self-end md:self-center">
            Total Clinical Sites: <strong className="text-cyan-600 dark:text-cyan-400 font-black text-sm">{activeSelected.length}</strong>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeethChart;
