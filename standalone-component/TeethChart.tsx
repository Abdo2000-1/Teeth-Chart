import React, { useState, useEffect } from 'react';
import { 
  Check, 
  RotateCcw, 
  Smile, 
  Zap, 
  Info, 
  X, 
  Activity 
} from 'lucide-react';
import { 
  ToothSystem, 
  RestorationType, 
  TeethChartProps, 
  ToothOdontoData 
} from './teeth-chart.types';
import { 
  ODONTO_DATABASE, 
  RESTORATION_TYPES 
} from './teeth-chart.constants';
import { 
  ClinicalToothSilhouette 
} from './teeth-chart.geometry';

export function TeethChart({
  selected,
  selectedTeeth,
  onToggle,
  onToggleTooth,
  toothRestorations = {},
  onAssignRestoration,
  onClearAll,
  onSelectionChange,
  readonly = false,
  showToolbar = true,
  className = ''
}: TeethChartProps) {
  const propSelected = selected ?? selectedTeeth;
  const [internalSelected, setInternalSelected] = useState<number[]>(propSelected || []);
  const [localRestorations, setLocalRestorations] = useState<Record<number, RestorationType>>({
    14: 'implant',
    15: 'crown',
    16: 'crown',
    ...toothRestorations
  });

  // Sync internal selected when external prop changes
  useEffect(() => {
    if (propSelected !== undefined) {
      setInternalSelected(propSelected);
    }
  }, [propSelected]);

  const activeSelected = propSelected !== undefined ? propSelected : internalSelected;
  const handleToggle = onToggle ?? onToggleTooth;

  const [system, setSystem] = useState<ToothSystem>('universal');
  const [selectedTool, setSelectedTool] = useState<RestorationType>('crown');
  const [hoveredTooth, setHoveredTooth] = useState<ToothOdontoData | null>(null);

  // Grouped into the standard 4 quadrants
  const upperRight = ODONTO_DATABASE.filter(t => t.quadrant === 'UR');
  const lowerRight = ODONTO_DATABASE.filter(t => t.quadrant === 'LR');
  const upperLeft  = ODONTO_DATABASE.filter(t => t.quadrant === 'UL');
  const lowerLeft  = ODONTO_DATABASE.filter(t => t.quadrant === 'LL');

  const handleToothClick = (tooth: ToothOdontoData) => {
    if (readonly) return;
    const num = tooth.universal;
    const isAlreadySelected = activeSelected.includes(num);

    if (!isAlreadySelected) {
      // Select tooth and assign active tool
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
      // Tooth already selected
      const currentRes = localRestorations[num] || toothRestorations[num] || 'crown';
      if (currentRes === selectedTool) {
        // Same tool clicked again -> Deselect
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
        // Change tool for already selected tooth
        const nextRestorations = { ...localRestorations, [num]: selectedTool };
        setLocalRestorations(nextRestorations);
        onSelectionChange?.(activeSelected, nextRestorations);
        onAssignRestoration?.(num, selectedTool);
      }
    }
  };

  const clearSelection = () => {
    if (readonly) return;
    setInternalSelected([]);
    setLocalRestorations({});
    onSelectionChange?.([], {});
    onClearAll?.();
  };

  const getToothLabel = (tooth: ToothOdontoData) => {
    return system === 'universal' ? tooth.universal.toString() : tooth.fdi.toString();
  };

  const renderToothCell = (tooth: ToothOdontoData) => {
    const isSelected = activeSelected.includes(tooth.universal);
    const restoration = localRestorations[tooth.universal] || toothRestorations[tooth.universal] || (isSelected ? 'crown' : undefined);
    const resInfo = RESTORATION_TYPES.find(r => r.id === restoration);
    const isUpper = tooth.arch === 'upper';

    return (
      <button
        key={tooth.universal}
        type="button"
        disabled={readonly}
        onClick={() => handleToothClick(tooth)}
        onMouseEnter={() => setHoveredTooth(tooth)}
        onMouseLeave={() => setHoveredTooth(null)}
        role="checkbox"
        aria-checked={isSelected}
        aria-label={`Tooth ${tooth.universal}, FDI ${tooth.fdi}, ${tooth.name}${isSelected ? `, Assigned: ${resInfo?.label || 'Selected'}` : ''}`}
        tabIndex={readonly ? -1 : 0}
        className={`group relative flex flex-col items-center justify-between p-1 rounded-xl transition-all duration-150 outline-none select-none ${
          readonly ? 'cursor-default' : 'cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/60'
        } ${
          isSelected 
            ? 'ring-2 ring-primary bg-primary/5 dark:bg-primary/10 shadow-xs' 
            : 'hover:scale-[1.02]'
        }`}
        style={{
          width: '52px',
          height: '116px',
        }}
      >
        {/* Upper label: when upper arch, label is at top; when lower arch, silhouette is at top */}
        {isUpper ? (
          <div className="flex flex-col items-center w-full">
            <span className={`text-[11px] font-black font-mono transition-colors ${
              isSelected ? 'text-primary' : 'text-slate-700 dark:text-slate-300 group-hover:text-primary'
            }`}>
              {getToothLabel(tooth)}
            </span>
            <span className="text-[8px] text-slate-400 dark:text-slate-500 uppercase tracking-tighter truncate max-w-[48px]">
              {tooth.category.replace('incisor_', 'inc_')}
            </span>
          </div>
        ) : null}

        {/* Anatomical Silhouette Drawing */}
        <div className="w-10 h-18 flex items-center justify-center my-auto transition-transform duration-150">
          <ClinicalToothSilhouette
            toothNumber={tooth.universal}
            isSelected={isSelected}
            restoration={restoration}
          />
        </div>

        {/* Lower label: when lower arch, label is at bottom */}
        {!isUpper ? (
          <div className="flex flex-col items-center w-full">
            <span className="text-[8px] text-slate-400 dark:text-slate-500 uppercase tracking-tighter truncate max-w-[48px]">
              {tooth.category.replace('incisor_', 'inc_')}
            </span>
            <span className={`text-[11px] font-black font-mono transition-colors ${
              isSelected ? 'text-primary' : 'text-slate-700 dark:text-slate-300 group-hover:text-primary'
            }`}>
              {getToothLabel(tooth)}
            </span>
          </div>
        ) : null}

        {/* Floating badge for active restoration */}
        {isSelected && resInfo && (
          <div 
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] shadow-sm border border-white dark:border-slate-900"
            style={{ backgroundColor: resInfo.color }}
            title={resInfo.label}
          >
            <span>{resInfo.icon}</span>
          </div>
        )}
      </button>
    );
  };

  return (
    <div className={`flex flex-col gap-4 w-full select-none ${className}`}>
      {/* Optional Top Clinical Toolbar */}
      {showToolbar && !readonly && (
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800">
          {/* Numbering System Switcher */}
          <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setSystem('universal')}
              className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                system === 'universal'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Universal (1-32)
            </button>
            <button
              type="button"
              onClick={() => setSystem('fdi')}
              className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                system === 'fdi'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              ISO 3950 (FDI)
            </button>
          </div>

          {/* Restoration Modality Palette */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">
              Active Tool:
            </span>
            {RESTORATION_TYPES.map(tool => (
              <button
                key={tool.id}
                type="button"
                onClick={() => setSelectedTool(tool.id)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                  selectedTool === tool.id
                    ? `${tool.bgColor} ${tool.textColor} ${tool.borderColor} shadow-xs scale-105`
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                }`}
              >
                <span>{tool.icon}</span>
                <span>{tool.label}</span>
              </button>
            ))}
          </div>

          {/* Clear Button */}
          {activeSelected.length > 0 && (
            <button
              type="button"
              onClick={clearSelection}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-transparent hover:border-rose-200 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      )}

      {/* Main Odontogram Clinical Chart */}
      <div 
        className="relative flex flex-col items-center bg-white dark:bg-[#0c1222] p-4 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs overflow-x-auto min-w-[900px]"
        role="region"
        aria-label="Dental Odontogram and Teeth Chart"
      >
        {/* UPPER ARCH (Maxilla) */}
        <div className="w-full flex flex-col items-center">
          <div className="flex items-center justify-between w-full max-w-4xl px-4 mb-2">
            <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">
              Quadrant 1 (UR) · Patient Right
            </span>
            <span className="text-xs font-extrabold tracking-wider uppercase text-primary bg-primary/10 px-3 py-0.5 rounded-full">
              Maxillary Arch (Upper)
            </span>
            <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">
              Quadrant 2 (UL) · Patient Left
            </span>
          </div>

          <div className="flex items-center justify-center gap-1 sm:gap-2 w-full">
            {/* UR (1 to 8) */}
            <div className="flex items-center gap-0.5 sm:gap-1">
              {upperRight.map(renderToothCell)}
            </div>

            {/* Midline Divider */}
            <div className="h-28 w-px bg-slate-300 dark:bg-slate-700 mx-2 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                Midline
              </span>
            </div>

            {/* UL (9 to 16) */}
            <div className="flex items-center gap-0.5 sm:gap-1">
              {upperLeft.map(renderToothCell)}
            </div>
          </div>
        </div>

        {/* OCCLUSAL / GUM LINE SEPARATOR */}
        <div className="w-full max-w-4xl my-4 relative flex items-center justify-center">
          <div className="w-full h-px border-t border-dashed border-slate-300 dark:border-slate-700"></div>
          <span className="absolute bg-white dark:bg-[#0c1222] px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Occlusal Line & Gum Boundary
          </span>
        </div>

        {/* LOWER ARCH (Mandible) */}
        <div className="w-full flex flex-col items-center">
          <div className="flex items-center justify-center gap-1 sm:gap-2 w-full">
            {/* LR (32 to 25) */}
            <div className="flex items-center gap-0.5 sm:gap-1">
              {lowerRight.map(renderToothCell)}
            </div>

            {/* Midline Divider */}
            <div className="h-28 w-px bg-slate-300 dark:bg-slate-700 mx-2"></div>

            {/* LL (24 to 17) */}
            <div className="flex items-center gap-0.5 sm:gap-1">
              {lowerLeft.map(renderToothCell)}
            </div>
          </div>

          <div className="flex items-center justify-between w-full max-w-4xl px-4 mt-2">
            <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">
              Quadrant 4 (LR) · Patient Right
            </span>
            <span className="text-xs font-extrabold tracking-wider uppercase text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-0.5 rounded-full">
              Mandibular Arch (Lower)
            </span>
            <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">
              Quadrant 3 (LL) · Patient Left
            </span>
          </div>
        </div>
      </div>

      {/* Hover Information Callout */}
      {hoveredTooth && (
        <div className="flex items-center justify-between p-2.5 px-4 bg-slate-100 dark:bg-slate-800/80 rounded-xl text-xs border border-slate-200 dark:border-slate-700 transition-all">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-primary">
              #{hoveredTooth.universal} (FDI {hoveredTooth.fdi})
            </span>
            <span className="font-bold text-slate-900 dark:text-white">
              {hoveredTooth.name}
            </span>
            <span className="text-slate-400">
              · {hoveredTooth.arch === 'upper' ? 'Maxillary' : 'Mandibular'} · Quad {hoveredTooth.quadrant}
            </span>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            Click to assign: <strong>{selectedTool.toUpperCase()}</strong>
          </span>
        </div>
      )}
    </div>
  );
}
