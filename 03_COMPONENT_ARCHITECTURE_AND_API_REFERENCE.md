# 3DDX Clinical Odontogram: Component Architecture & API Specification

**Document ID:** 3DDX-SPEC-ENG-TC-003  
**Version:** 2.0.0-PROD  
**Component Identifier:** `<TeethChart />`  
**Classification:** Core Clinical Reusable Component  

---

## 1. Architectural Overview

The `<TeethChart />` component is designed as an **autonomous, unidirectional or controlled stateful clinical widget**. It can operate either in an uncontrolled self-managing mode or as a strictly controlled component integrated into broader enterprise form architectures (such as `react-hook-form`, Angular reactive forms, or Formik).

```
   ┌────────────────────────────────────────────────────────┐
   │                  Parent Page / Form                    │
   └───────────────┬────────────────────────▲───────────────┘
     selectedTeeth │                        │ onSelectionChange
     restorations  ▼                        │ payload serialization
   ┌────────────────────────────────────────────────────────┐
   │               <TeethChart /> Host Shell                │
   │                                                        │
   │  ┌──────────────────────────────────────────────────┐  │
   │  │   Toolbar: Arch Filter / FDI Toggle / Modalities │  │
   │  └──────────────────────────────────────────────────┘  │
   │                                                        │
   │  ┌─────────────────────────┬────────────────────────┐  │
   │  │  Upper Right (Q1 - UR)  │ Upper Left (Q2 - UL)   │  │
   │  ├─────────────────────────┴────────────────────────┤  │
   │  │              Midline & Gum Boundary              │  │
   │  ├─────────────────────────┬────────────────────────┤  │
   │  │  Lower Right (Q4 - LR)  │ Lower Left (Q3 - LL)   │  │
   │  └─────────────────────────┴────────────────────────┘  │
   │                                                        │
   │  ┌──────────────────────────────────────────────────┐  │
   │  │   SVG Geometry Engine (ClinicalToothSilhouette)  │  │
   │  └──────────────────────────────────────────────────┘  │
   └────────────────────────────────────────────────────────┘
```

---

## 2. TypeScript Type Definitions & Data Structures

```typescript
/**
 * Supported Dental Numbering Notations
 */
export type ToothSystem = 'universal' | 'fdi';

/**
 * Clinical Restorative Treatment Modalities
 */
export type RestorationType = 
  | 'crown'        // Single-unit prosthetic crown
  | 'bridge'       // Multi-unit fixed partial denture retainer / abutment
  | 'veneer'       // Facial aesthetic laminate veneer
  | 'implant'      // Endosseous implant fixture + abutment
  | 'inlay'        // Conservative bonded inlay or onlay
  | 'extraction';  // Missing tooth or planned extraction site

/**
 * Anatomical tooth metadata record
 */
export interface ToothOdontoData {
  universal: number;                                             // 1 to 32 (ADA)
  fdi: number;                                                   // 11 to 48 (ISO 3950)
  code: string;                                                  // String identifier
  name: string;                                                  // Full anatomical medical name
  category: 'molar' | 'premolar' | 'canine' | 'incisor_lat' | 'incisor_cen';
  arch: 'upper' | 'lower';                                       // Maxillary or Mandibular
  quadrant: 'UR' | 'UL' | 'LL' | 'LR';                           // Anatomic quadrant
  isAnterior: boolean;                                           // Incisors & canines
}

/**
 * Component Public Props Contract
 */
export interface TeethChartProps {
  /** Array of currently selected tooth numbers (Universal 1..32) */
  selected?: number[];
  
  /** Legacy alias for `selected` */
  selectedTeeth?: number[];
  
  /** Map of tooth number to its assigned clinical restoration */
  toothRestorations?: Record<number, RestorationType>;
  
  /** Callback fired when tooth selection or restoration map changes */
  onSelectionChange?: (
    selected: number[],
    restorations: Record<number, RestorationType>
  ) => void;
  
  /** Callback fired when a single tooth is clicked */
  onToggle?: (toothNumber: number) => void;
  
  /** Legacy alias for `onToggle` */
  onToggleTooth?: (toothNumber: number) => void;
  
  /** Callback fired when a restoration is assigned to a tooth */
  onAssignRestoration?: (toothNumber: number, type: RestorationType) => void;
  
  /** Callback fired when all selections are cleared */
  onClearAll?: () => void;
  
  /** Disables all click interactions and hover effects */
  readonly?: boolean;
  
  /** Displays top control toolbar with numbering switcher and restoration palette */
  showToolbar?: boolean;
  
  /** Optional container class name override */
  className?: string;
}
```

---

## 3. Restoration Palette & Color Tokens

The component enforces standardized clinical color semantics:

| Modality | Key | Hex Color | Background Fill | Border Token | Clinical Semantics |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Crown** | `crown` | `#00d8fe` | `rgba(0,216,254,0.15)` | `border-cyan-500` | Full coverage prosthetic |
| **Bridge Unit** | `bridge` | `#6366f1` | `rgba(99,102,241,0.15)` | `border-indigo-500` | Fixed partial denture |
| **Veneer** | `veneer` | `#a855f7` | `rgba(168,85,247,0.15)` | `border-purple-500` | Labial aesthetic veneer |
| **Implant** | `implant`| `#f59e0b` | `rgba(245,158,11,0.15)` | `border-amber-500` | Fixture site (Titanium) |
| **Inlay/Onlay** | `inlay` | `#10b981` | `rgba(16,185,129,0.15)` | `border-emerald-500` | Indirect conservative restoration |
| **Missing/Pontic** | `extraction` | `#f43f5e` | `rgba(244,63,94,0.15)` | `border-rose-500` | Extraction / Edentulous space |

---

## 4. SVG Silhouette Geometry Mapping

The component implements a resolution-independent SVG coordinate space (`viewBox="0 0 50 90"`).

### 4.1 Coordinate Space Conventions
- `x: 0 -> 50`: Tooth width from mesial to distal.
- `y: 0 -> 90`: Apico-coronal axis.
  - For **Upper Teeth**: `y = 0` represents the apical root tip; `y = 84` represents the incisal edge / occlusal surface pointing downward towards the midline.
  - For **Lower Teeth**: `y = 8` represents the occlusal table at the top; `y = 88` represents the root apex plunging downward.

### 4.2 Anatomical Morphing
- When a tooth is clicked with the active tool `'implant'`, the biological root `<path>` elements are suppressed, and the titanium fixture sub-tree is rendered:
  ```tsx
  {isImplant && (
    <g stroke={strokeColor} fill="none">
      {/* Central screw core */}
      <rect x="20" y="8" width="10" height="42" rx="2" strokeWidth="1.5" />
      {/* Horizontal retention threads */}
      <line x1="17" y1="16" x2="33" y2="16" strokeWidth="1.5" />
      <line x1="17" y1="24" x2="33" y2="24" strokeWidth="1.5" />
      <line x1="17" y1="32" x2="33" y2="32" strokeWidth="1.5" />
      <line x1="17" y1="40" x2="33" y2="40" strokeWidth="1.5" />
      {/* Abutment collar */}
      <path d="M 18 50 L 32 50 L 30 53 L 20 53 Z" fill={strokeColor} />
    </g>
  )}
  ```

---

## 5. Accessibility Implementation (WCAG 2.1 AA)

To ensure clinical compliance with ADA Section 508 and European standard EN 301 549, the component incorporates full accessible semantics:

1. **Role and Label Hierarchy**:
   - The container declares `role="region"` and `aria-label="Dental Odontogram and Teeth Chart"`.
   - Each tooth container is focusable via `tabindex="0"` with `role="checkbox"`.
   - Active state is bound to `aria-checked={isSelected}`.
   - Screen readers vocalize descriptive labels:
     ```html
     aria-label="Tooth 14, Upper Left 1st Premolar, FDI 24. Currently assigned: Crown."
     ```

2. **Keyboard Interaction Model**:
   - `Tab` / `Shift+Tab`: Sequentially traverses through all 32 teeth in anatomical order.
   - `Space` / `Enter`: Toggles selection and assigns current active restoration modality.
   - `Escape`: Clears current hover or contextual focus.

3. **Color Contrast & Focus Rings**:
   - Selected states incorporate high-contrast outline rings (`ring-2 ring-primary ring-offset-2`).
   - Text labels adhere to minimum 4.5:1 contrast against both light (`#ffffff`) and dark (`#0b101d`) backgrounds.

---

## 6. Integration Snippets

### Standard Form Integration
```tsx
import React, { useState } from 'react';
import { TeethChart, type RestorationType } from '@/components/ui/TeethChart';

export function PrescriptionForm() {
  const [selectedTeeth, setSelectedTeeth] = useState<number[]>([14, 15, 16]);
  const [restorations, setRestorations] = useState<Record<number, RestorationType>>({
    14: 'implant',
    15: 'crown',
    16: 'crown',
  });

  return (
    <div className="p-4 bg-card rounded-xl">
      <TeethChart
        selected={selectedTeeth}
        toothRestorations={restorations}
        onSelectionChange={(newTeeth, newRes) => {
          setSelectedTeeth(newTeeth);
          setRestorations(newRes);
        }}
        showToolbar={true}
      />
    </div>
  );
}
```

---

*Specification verified against 3DDX Clinical UI Design System Guidelines V2.*
