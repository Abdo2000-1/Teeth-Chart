import React from 'react';
import { RestorationType } from './teeth-chart.types';
import { RESTORATION_TYPES } from './teeth-chart.constants';

/**
 * Maps any tooth 1..32 to its master anatomical base shape (1..8 for upper, 25..32 for lower)
 */
export function getBaseToothNumber(num: number): number {
  if (num >= 1 && num <= 8) return num;
  if (num >= 9 && num <= 16) return 17 - num; // 9->8, 10->7, ... 16->1
  if (num >= 25 && num <= 32) return num;
  if (num >= 17 && num <= 24) return 49 - num; // 24->25, 23->26, ... 17->32
  return 8;
}

export interface SilhouetteProps {
  toothNumber: number;
  isSelected: boolean;
  restoration?: RestorationType;
}

/**
 * Hand-drawn Clinical Dental Anatomy Silhouette
 * - Upper teeth (1-16): roots reach UP, crowns point DOWN towards occlusal line.
 *   - Molars have 3 distinct roots (2 outer buccal + 1 center vertical palatal root).
 *   - Premolars have roots curving distally and oval crowns.
 *   - Canines are tallest with towering roots and sharp cusps.
 *   - Incisors have broad shovel crowns.
 * - Lower teeth (32-17): crowns at TOP with occlusal fissures, roots reach DOWN.
 *   - Molars have 2 distinct wishbone roots with a wide U-furcation arch.
 *   - Canines have the deepest root and pointed cusp.
 *   - Premolars have single tapered roots.
 *   - Incisors have slender straight roots.
 */
export function ClinicalToothSilhouette({
  toothNumber,
  isSelected,
  restoration,
}: SilhouetteProps) {
  const resInfo = RESTORATION_TYPES.find(r => r.id === restoration);
  const strokeColor = isSelected ? (resInfo?.color || '#00d8fe') : 'currentColor';
  const crownFill = isSelected ? (resInfo ? `${resInfo.color}25` : 'rgba(0,216,254,0.18)') : 'none';
  const isImplant = Boolean(isSelected && restoration === 'implant');
  const isExtraction = Boolean(isSelected && restoration === 'extraction');

  const isUpper = toothNumber >= 1 && toothNumber <= 16;
  const isLeftQuadrant = (toothNumber >= 9 && toothNumber <= 16) || (toothNumber >= 17 && toothNumber <= 24);
  const baseNumber = getBaseToothNumber(toothNumber);

  const renderAnatomy = () => {
    switch (baseNumber) {
      // UPPER TEETH
      case 8: // Central Incisor
        return (
          <g>
            {!isImplant && (
              <path
                d="M 15 52 C 16 38, 20 24, 24 14 C 25 12, 26 12, 27 14 C 31 24, 34 38, 35 52"
                stroke={strokeColor}
                strokeWidth={isSelected ? '2' : '1.5'}
                fill="none"
              />
            )}
            <path d="M 15 52 C 20 49, 30 49, 35 52" stroke={strokeColor} strokeWidth="1.2" opacity="0.8" fill="none" />
            <path
              d="M 15 52 C 13 62, 13 74, 15 82 C 17 84, 33 84, 35 82 C 37 74, 37 62, 35 52 Z"
              stroke={strokeColor}
              strokeWidth={isSelected ? '2.2' : '1.6'}
              fill={crownFill}
            />
          </g>
        );

      case 7: // Lateral Incisor
        return (
          <g>
            {!isImplant && (
              <path
                d="M 17 52 C 17 40, 18 28, 21 16 C 22 14, 25 14, 27 17 C 29 28, 32 40, 33 52"
                stroke={strokeColor}
                strokeWidth={isSelected ? '2' : '1.5'}
                fill="none"
              />
            )}
            <path d="M 17 52 C 21 49, 29 49, 33 52" stroke={strokeColor} strokeWidth="1.2" opacity="0.8" fill="none" />
            <path
              d="M 17 52 C 15 62, 15 74, 17 82 C 19 84, 31 84, 33 82 C 35 74, 35 62, 33 52 Z"
              stroke={strokeColor}
              strokeWidth={isSelected ? '2.2' : '1.6'}
              fill={crownFill}
            />
          </g>
        );

      case 6: // Canine
        return (
          <g>
            {!isImplant && (
              <path
                d="M 16 50 C 18 34, 21 16, 24 4 C 25 3, 26 3, 27 4 C 30 16, 33 34, 34 50"
                stroke={strokeColor}
                strokeWidth={isSelected ? '2' : '1.5'}
                fill="none"
              />
            )}
            <path d="M 16 50 C 21 47, 29 47, 34 50" stroke={strokeColor} strokeWidth="1.2" opacity="0.8" fill="none" />
            <path
              d="M 16 50 C 14 62, 15 72, 25 84 C 35 72, 36 62, 34 50 Z"
              stroke={strokeColor}
              strokeWidth={isSelected ? '2.2' : '1.6'}
              fill={crownFill}
            />
            <line x1="25" y1="52" x2="25" y2="80" stroke={strokeColor} strokeWidth="0.8" opacity="0.4" />
          </g>
        );

      case 5:
      case 4: // Premolars
        return (
          <g>
            {!isImplant && (
              <path
                d="M 16 52 C 15 40, 17 26, 22 16 C 24 14, 27 14, 29 17 C 31 26, 33 40, 34 52"
                stroke={strokeColor}
                strokeWidth={isSelected ? '2' : '1.5'}
                fill="none"
              />
            )}
            <path d="M 16 52 C 21 49, 29 49, 34 52" stroke={strokeColor} strokeWidth="1.2" opacity="0.8" fill="none" />
            <path
              d="M 15 52 C 12 62, 13 74, 18 82 C 21 84, 29 84, 32 82 C 37 74, 38 62, 35 52 Z"
              stroke={strokeColor}
              strokeWidth={isSelected ? '2.2' : '1.6'}
              fill={crownFill}
            />
          </g>
        );

      case 3:
      case 2:
      case 1: // Upper Molars (3 roots)
        return (
          <g>
            {!isImplant && (
              <g stroke={strokeColor} strokeWidth={isSelected ? '2' : '1.5'} fill="none">
                <path d="M 21 42 C 22 26, 24 12, 25.5 10 C 27 12, 29 26, 30 42" />
                <path d="M 8 52 C 7 38, 9 24, 12 16 C 14 16, 16 22, 17 34 C 18 42, 20 46, 22 48" />
                <path d="M 29 48 C 31 46, 33 42, 34 34 C 35 22, 37 16, 39 16 C 42 24, 44 38, 43 52" />
              </g>
            )}
            <path d="M 8 52 C 18 49, 33 49, 43 52" stroke={strokeColor} strokeWidth="1.2" opacity="0.8" fill="none" />
            <path
              d="M 8 52 C 6 63, 8 75, 14 82 C 17 84, 22 82, 25.5 78 C 29 82, 34 84, 37 82 C 43 75, 45 63, 43 52 Z"
              stroke={strokeColor}
              strokeWidth={isSelected ? '2.2' : '1.6'}
              fill={crownFill}
            />
            <line x1="25.5" y1="68" x2="25.5" y2="78" stroke={strokeColor} strokeWidth="1" strokeLinecap="round" />
          </g>
        );

      // LOWER TEETH
      case 25:
      case 26: // Lower Incisors
        return (
          <g>
            <path
              d="M 16 38 C 14 26, 15 14, 17 6 C 19 4, 31 4, 33 6 C 35 14, 36 26, 34 38 Z"
              stroke={strokeColor}
              strokeWidth={isSelected ? '2.2' : '1.6'}
              fill={crownFill}
            />
            <path d="M 16 38 C 21 41, 29 41, 34 38" stroke={strokeColor} strokeWidth="1.2" opacity="0.8" fill="none" />
            {!isImplant && (
              <path
                d="M 17 38 C 17 50, 19 64, 23 76 C 24 78, 26 78, 27 76 C 31 64, 33 50, 33 38"
                stroke={strokeColor}
                strokeWidth={isSelected ? '2' : '1.5'}
                fill="none"
              />
            )}
          </g>
        );

      case 27: // Lower Canine
        return (
          <g>
            <path
              d="M 15 40 C 13 28, 14 16, 25 4 C 36 16, 37 28, 35 40 Z"
              stroke={strokeColor}
              strokeWidth={isSelected ? '2.2' : '1.6'}
              fill={crownFill}
            />
            <path d="M 15 40 C 20 43, 30 43, 35 40" stroke={strokeColor} strokeWidth="1.2" opacity="0.8" fill="none" />
            {!isImplant && (
              <path
                d="M 17 40 C 17 54, 20 72, 24 86 C 25 87, 26 87, 27 86 C 31 72, 33 54, 33 40"
                stroke={strokeColor}
                strokeWidth={isSelected ? '2' : '1.5'}
                fill="none"
              />
            )}
          </g>
        );

      case 28:
      case 29: // Lower Premolars
        return (
          <g>
            <path
              d="M 15 38 C 12 26, 13 14, 18 6 C 21 4, 29 4, 32 6 C 37 14, 38 26, 35 38 Z"
              stroke={strokeColor}
              strokeWidth={isSelected ? '2.2' : '1.6'}
              fill={crownFill}
            />
            <path d="M 15 38 C 20 41, 30 41, 35 38" stroke={strokeColor} strokeWidth="1.2" opacity="0.8" fill="none" />
            {!isImplant && (
              <path
                d="M 16 38 C 16 50, 18 64, 23 76 C 24 78, 26 78, 27 76 C 31 64, 34 50, 34 38"
                stroke={strokeColor}
                strokeWidth={isSelected ? '2' : '1.5'}
                fill="none"
              />
            )}
          </g>
        );

      case 30:
      case 31:
      case 32: // Lower Molars (2 Wishbone Roots)
      default:
        return (
          <g>
            <path
              d="M 8 38 C 6 27, 8 15, 14 8 C 17 6, 22 8, 25 12 C 28 8, 33 6, 36 8 C 42 15, 44 27, 42 38 Z"
              stroke={strokeColor}
              strokeWidth={isSelected ? '2.2' : '1.6'}
              fill={crownFill}
            />
            <path d="M 8 38 C 18 41, 32 41, 42 38" stroke={strokeColor} strokeWidth="1.2" opacity="0.8" fill="none" />
            <line x1="25" y1="12" x2="25" y2="22" stroke={strokeColor} strokeWidth="1" strokeLinecap="round" />
            {!isImplant && (
              <g stroke={strokeColor} strokeWidth={isSelected ? '2' : '1.5'} fill="none">
                <path d="M 11 38 C 11 50, 14 64, 17 76 C 18 78, 21 77, 22 74 C 23 66, 22 56, 25 48" />
                <path d="M 39 38 C 39 50, 36 64, 33 76 C 32 78, 29 77, 28 74 C 27 66, 28 56, 25 48" />
              </g>
            )}
          </g>
        );
    }
  };

  return (
    <svg
      viewBox="0 0 50 90"
      className="w-full h-full transition-transform duration-200"
      style={{
        transform: isLeftQuadrant ? 'scaleX(-1)' : 'none',
      }}
    >
      {renderAnatomy()}

      {/* Dynamic Titanium Implant Fixture Replacement */}
      {isImplant && (
        <g stroke={strokeColor} fill="none">
          {isUpper ? (
            <g>
              <rect x="20" y="8" width="10" height="42" rx="2" strokeWidth="1.5" />
              <line x1="17" y1="16" x2="33" y2="16" strokeWidth="1.5" />
              <line x1="17" y1="24" x2="33" y2="24" strokeWidth="1.5" />
              <line x1="17" y1="32" x2="33" y2="32" strokeWidth="1.5" />
              <line x1="17" y1="40" x2="33" y2="40" strokeWidth="1.5" />
              <path d="M 18 50 L 32 50 L 30 53 L 20 53 Z" fill={strokeColor} />
            </g>
          ) : (
            <g>
              <path d="M 18 40 L 32 40 L 30 37 L 20 37 Z" fill={strokeColor} />
              <rect x="20" y="40" width="10" height="42" rx="2" strokeWidth="1.5" />
              <line x1="17" y1="48" x2="33" y2="48" strokeWidth="1.5" />
              <line x1="17" y1="56" x2="33" y2="56" strokeWidth="1.5" />
              <line x1="17" y1="64" x2="33" y2="64" strokeWidth="1.5" />
              <line x1="17" y1="72" x2="33" y2="72" strokeWidth="1.5" />
            </g>
          )}
        </g>
      )}

      {/* Extraction / Missing Cross Hatch */}
      {isExtraction && (
        <g stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round">
          <line x1="10" y1="15" x2="40" y2="75" />
          <line x1="40" y1="15" x2="10" y2="75" />
        </g>
      )}
    </svg>
  );
}
