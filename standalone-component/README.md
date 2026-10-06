# @3ddx/teeth-chart-clinical (V2.0)

Production-ready clinical odontogram and dental arch charting component engineered for enterprise SaaS applications, dental clinics, CAD/CAM laboratories, and surgical guide design systems.

---

## 🌟 Highlights

- **Pure SVG Vector Geometry:** Zero static PNG downloads; 100% scalable and crystal clear on Retina / 4K displays.
- **Biologically Accurate Dental Anatomy:**
  - 3-root maxillary molars with distinct palatal clefts.
  - 2-root wishbone mandibular molars with wide U-furcation arches.
  - Towering canine cusps and shovel incisor crowns.
- **Dynamic Implant Vector Swap:** Replaces biological roots with titanium threaded screws upon implant assignment.
- **Dual Numbering System Engine:** Seamless runtime switching between **ISO 3950 (FDI 2-Digit)** and **Universal ADA (1-32)**.
- **6 Clinical Restorative Modalities:** Crown, Bridge Unit, Veneer, Implant, Inlay/Onlay, Extraction/Pontic.
- **WCAG 2.1 AA Compliant:** ARIA attributes, keyboard navigation (`Tab`, `Space`, `Enter`), and contrast-certified tokens.
- **Zero Heavy Dependencies:** Only requires `react` and `lucide-react`.

---

## 📦 Installation

```bash
# In your package.json or local monorepo
npm install @3ddx/teeth-chart-clinical
```

---

## 🚀 Quick Start Example

```tsx
import React, { useState } from 'react';
import { 
  TeethChart, 
  type RestorationType 
} from '@3ddx/teeth-chart-clinical';

export function DentalPrescriptionPage() {
  const [selectedTeeth, setSelectedTeeth] = useState<number[]>([14, 15, 16]);
  const [restorations, setRestorations] = useState<Record<number, RestorationType>>({
    14: 'implant',
    15: 'crown',
    16: 'crown',
  });

  return (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm">
      <h2 className="text-xl font-bold mb-4">Patient Odontogram</h2>

      <TeethChart
        selected={selectedTeeth}
        toothRestorations={restorations}
        onSelectionChange={(newTeeth, newRestorations) => {
          setSelectedTeeth(newTeeth);
          setRestorations(newRestorations);
          console.log('Emitted Teeth Array:', newTeeth);
          console.log('Emitted Restorations:', newRestorations);
        }}
        showToolbar={true}
      />
    </div>
  );
}
```

---

## ⚙️ Component Props API

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `selected` | `number[]` | `[]` | Array of selected tooth numbers (Universal 1..32). |
| `toothRestorations` | `Record<number, RestorationType>` | `{}` | Key-value dictionary of assigned clinical restorations. |
| `onSelectionChange` | `(teeth: number[], restorations: Record<number, RestorationType>) => void` | `undefined` | Callback invoked when selection or restoration changes. |
| `onToggle` | `(toothNumber: number) => void` | `undefined` | Callback fired on single tooth toggle. |
| `onClearAll` | `() => void` | `undefined` | Callback fired when user resets selections. |
| `readonly` | `boolean` | `false` | When true, disables clicks and interaction triggers. |
| `showToolbar` | `boolean` | `true` | Renders the top tool selection and system switcher bar. |
| `className` | `string` | `''` | Additional Tailwind or CSS classes for container. |

---

## 🧪 Testing

```bash
# Run Vitest test suite
npm test
```

---

*Licensed under 3DDX Enterprise Software Agreement.*
