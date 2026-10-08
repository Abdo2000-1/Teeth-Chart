/**
 * 3DDX Clinical Odontogram Type Definitions
 * Enterprise-grade digital dental charting types supporting ISO 3950 (FDI),
 * ADA Universal numbering, and service-driven clinical procedure workflows.
 */

export type ToothSystem = 'universal' | 'fdi';

export type DentalServiceId = 
  | 'sg'        // Surgical Guide
  | 'tp'        // Treatment Plan (Co-Diagnostix / Prosthetically Driven)
  | 'conv'      // DICOM Conversion
  | 'mod'       // Model Work
  | 'rep'       // Radiology Report
  | 'restTemp'  // Temp Restoration (Provisional PMMA)
  | 'restFinal' // Final Restoration (Zirconia / Ceramic / Hybrid)
  | 'vr'        // Virtual Reality & Digital Smile Design
  | 'ortho';    // Orthodontics & ISmile Aligners

export type RestorationType = 
  | 'crown' 
  | 'bridge' 
  | 'veneer' 
  | 'implant' 
  | 'inlay' 
  | 'extraction'
  | 'sleeve'
  | 'anchor'
  | 'bone_reduction'
  | 'sinus_lift'
  | 'nerve_trace'
  | 'segmentation'
  | 'die_prep'
  | 'analog'
  | 'impacted'
  | 'pathology'
  | 'temp_crown'
  | 'temp_bridge'
  | 'attachment'
  | 'ipr'
  | 'smile_design';

export type JawFilter = 'both' | 'upper' | 'lower';
export type ArchFocus = 'maxilla' | 'mandible' | 'dual' | 'both' | 'upper' | 'lower';

export type ToothCategory = 
  | 'molar' 
  | 'premolar' 
  | 'canine' 
  | 'incisor_lat' 
  | 'incisor_cen';

export type DentalArch = 'upper' | 'lower';
export type DentalQuadrant = 'UR' | 'UL' | 'LL' | 'LR';

export interface ToothOdontoData {
  universal: number;
  fdi: number;
  code: string;
  name: string;
  category: ToothCategory;
  arch: DentalArch;
  quadrant: DentalQuadrant;
  isAnterior: boolean;
}

export interface RestorationMeta {
  id: RestorationType;
  label: string;
  labelAr?: string;
  icon: string;
  color: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  description: string;
  serviceCategories?: DentalServiceId[];
}

export interface TeethChartProps {
  /** Selected tooth numbers (Universal 1..32) */
  selected?: number[];
  /** Legacy alias for `selected` */
  selectedTeeth?: number[];
  /** Map of tooth number to assigned procedure / restoration type */
  toothRestorations?: Record<number, RestorationType | string>;
  /** Active 3DDX prescribed services (e.g. ['sg', 'tp']) used to dynamically filter procedures */
  activeServices?: DentalServiceId[] | string[];
  /** Single service ID shortcut */
  serviceId?: DentalServiceId | string;
  /** Focus arch: 'maxilla' (upper), 'mandible' (lower), or 'dual' / 'both' */
  archFocus?: ArchFocus;
  /** Callback when selection or restoration changes */
  onSelectionChange?: (
    selected: number[],
    restorations: Record<number, RestorationType | string>
  ) => void;
  /** Callback when an individual tooth is toggled */
  onToggle?: (toothNumber: number) => void;
  /** Legacy alias for `onToggle` */
  onToggleTooth?: (toothNumber: number) => void;
  /** Callback when a restoration is assigned to a tooth */
  onAssignRestoration?: (toothNumber: number, type: RestorationType) => void;
  /** Callback when selection is cleared */
  onClearAll?: () => void;
  /** Read-only display mode without editing interactions */
  readonly?: boolean;
  /** Whether to show header toolbar, presets and palette */
  showToolbar?: boolean;
  /** Optional custom class name */
  className?: string;
}

export interface ClinicalPayload {
  selectedUniversal: number[];
  selectedFDI: number[];
  restorations: Record<number, string>;
  legacyString: string;
  activeServices: string[];
  totalUnits: number;
}
