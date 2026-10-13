# 🧩 Standalone Component Integration & Developer Guide

### `@3ddx/teeth-chart` — Zero-Dependency Production Dental Odontogram

This guide details how to integrate and use the **3DDX Teeth Chart** reusable component into any modern React or Web application.

---

## 📦 Step-by-Step Integration

### Step 1: Copy or Import the Component

The component is self-contained in:
* **Source Path:** `standalone-component/TeethChart.tsx` (or `src/TeethChart.tsx`)

Copy `TeethChart.tsx` into your project UI components directory:

```bash
cp standalone-component/TeethChart.tsx src/components/ui/TeethChart.tsx
```

### Step 2: Install Peer Dependencies

Ensure your project has `react`, `react-dom`, and `lucide-react`:

```bash
npm install lucide-react clsx
```

### Step 3: Import and Mount

```tsx
import React, { useState } from 'react';
import TeethChart, { ToothData, ClinicalProcedure } from './components/ui/TeethChart';

export function DentalConsultationPage() {
  const [selectedTeeth, setSelectedTeeth] = useState<number[]>([3, 14, 19, 30]);

  const handleToothClick = (tooth: ToothData) => {
    console.log(`Tooth clicked: #${tooth.id} (${tooth.name}) - Condition: ${tooth.condition}`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-slate-900 rounded-2xl shadow-2xl">
      <h2 className="text-2xl font-bold text-white mb-4">Patient Dental Chart</h2>
      
      {/* Standalone Teeth Chart Component */}
      <TeethChart 
        selectedTeeth={selectedTeeth}
        onToothClick={handleToothClick}
        defaultLayout="arch"           // 'arch' (Parabolic) or 'grid' (Cross-Grid)
        showControls={true}            // Procedural toolbar & presets
        readOnly={false}
      />
    </div>
  );
}
```

---

## ⚙️ Component Props API Reference

| Prop Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `selectedTeeth` | `number[]` | `[]` | Array of currently selected tooth IDs (1–32 Universal Numbering). |
| `onToothClick` | `(tooth: ToothData) => void` | `undefined` | Callback fired when a clinician clicks on any tooth or implant fixture. |
| `defaultLayout` | `'grid' \| 'arch'` | `'grid'` | Initial rendering mode: `'grid'` (4-quadrant cross) or `'arch'` (parabolic anatomical curvature). |
| `showControls` | `boolean` | `true` | Toggles the top clinical procedural toolbar and arch quick presets (`Smile Zone`, `Posteriors`, `Select All`). |
| `readOnly` | `boolean` | `false` | Disables interactive editing for review-only clinical modes. |
| `theme` | `'light' \| 'dark'` | `'light'` | Clinical surface color theme. |

---

## 🎯 Clinical Procedures Supported

1. **Crown** (`#3b82f6` - Blue Accent)
2. **Bridge Unit** (`#8b5cf6` - Purple Glow)
3. **Veneer** (`#06b6d4` - Cyan Esthetic)
4. **Implant** (`#f59e0b` - Surgical Titanium Gold)
5. **Guide Sleeve** (`#10b981` - Surgical Emerald)
6. **Anchor Pin** (`#6366f1` - Indigo Fixation)
7. **Bone Reduction** (`#ef4444` - Resection Red)
8. **Sinus Lift** (`#ec4899` - Pink Augmentation)
9. **IAN Safety Zone** (`#14b8a6` - Mandibular Canal Teal)
10. **Missing / Pontic** (`#64748b` - Extraction Slate)
11. **Segmentation ROI** (`#f97316` - Orange Volumetric Boundary)
