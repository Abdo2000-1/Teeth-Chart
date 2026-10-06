/**
 * 3DDX Clinical Odontogram Type Definitions
 */

export type ToothSystem = 'universal' | 'fdi';

export type RestorationType = 
  | 'crown' 
  | 'bridge' 
  | 'veneer' 
  | 'implant' 
  | 'inlay' 
  | 'extraction';

export type JawFilter = 'both' | 'upper' | 'lower';

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
  icon: string;
  color: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  description: string;
}

export interface TeethChartProps {
  /** Selected tooth numbers (Universal 1..32) */
  selected?: number[];
  /** Legacy alias for `selected` */
  selectedTeeth?: number[];
  /** Map of tooth number to assigned restoration type */
  toothRestorations?: Record<number, RestorationType>;
  /** Callback when selection or restoration changes */
  onSelectionChange?: (
    selected: number[],
    restorations: Record<number, RestorationType>
  ) => void;
  /** Callback when an individual tooth is toggled */
  onToggle?: (toothNumber: number) => void;
  /** Legacy alias for `onToggle` */
  onToggleTooth?: (toothNumber: number) => void;
  /** Callback when a restoration is assigned */
  onAssignRestoration?: (toothNumber: number, type: RestorationType) => void;
  /** Callback when all selections are cleared */
  onClearAll?: () => void;
  /** Read-only mode: disables clicks and hover triggers */
  readonly?: boolean;
  /** Whether to render top toolbar with tools and system switcher */
  showToolbar?: boolean;
  /** Additional CSS class names */
  className?: string;
}
