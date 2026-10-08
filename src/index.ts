/**
 * 3DDX Clinical Odontogram Reusable Component
 * Production Release 2.5.0
 * 
 * Enterprise-grade 4-quadrant anatomical digital dental charting component
 * with SVG vector anatomy, service-driven procedure filtering, dual ISO 3950 / ADA numbering,
 * and universal iframe/web embed support.
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
  TeethChartProps,
  ClinicalPayload
} from './teeth-chart.types';
export { initTeethChartEmbed, listenToTeethChart } from './embed';
