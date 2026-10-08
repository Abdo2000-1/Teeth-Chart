/**
 * 3DDX Clinical Odontogram Reusable Component
 * Production Release 2.5.0
 */

export { TeethChart, default } from './TeethChart';
export { ClinicalToothSilhouette, getBaseToothNumber } from './teeth-chart.geometry';
export { 
  ODONTO_DATABASE, 
  RESTORATION_TYPES,
  SERVICE_PROCEDURES_MAP,
  SERVICE_METADATA,
  getProceduresForServices
} from './teeth-chart.constants';
export type {
  ToothSystem,
  RestorationType,
  DentalServiceId,
  JawFilter,
  ArchFocus,
  ToothCategory,
  DentalArch,
  DentalQuadrant,
  ToothOdontoData,
  RestorationMeta,
  TeethChartProps
} from './teeth-chart.types';
