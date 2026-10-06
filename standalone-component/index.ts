/**
 * 3DDX Clinical Odontogram Reusable Component
 * Production Release 2.0.0
 */

export { TeethChart } from './TeethChart';
export { ClinicalToothSilhouette, getBaseToothNumber } from './teeth-chart.geometry';
export { ODONTO_DATABASE, RESTORATION_TYPES } from './teeth-chart.constants';
export type {
  ToothSystem,
  RestorationType,
  JawFilter,
  ToothCategory,
  DentalArch,
  DentalQuadrant,
  ToothOdontoData,
  RestorationMeta,
  TeethChartProps
} from './teeth-chart.types';
