# @3ddx/teeth-chart-clinical (V2.5.0)

Production-ready clinical odontogram and dental arch charting component engineered for enterprise SaaS applications, digital dental clinics, CAD/CAM laboratories, implant planning workflows, and surgical guide design systems (3DDX Engine).

---

## 🌟 Highlights & New Features in v2.5.0

- **Service-Driven Clinical Intelligence:**
  - Dynamic procedure filtering based on prescribed 3DDX services (`sg`, `tp`, `conv`, `mod`, `rep`, `restTemp`, `restFinal`, `vr`, `ortho`).
  - Pass `activeServices={['sg', 'tp']}` to automatically display surgical guide and treatment planning procedures, or toggle to view all.
- **Both Arches (Dual Arch 1-32) Quick Batch Selection:**
  - One-click selection for all 32 teeth in both upper (Maxillary) and lower (Mandibular) arches simultaneously.
  - Granular presets: `Both Arches (1-32)`, `Upper (1-16)`, `Lower (17-32)`, `Smile Zone (Canine-to-Canine)`, `Posteriors`.
- **Bug-Free Per-Tooth Procedure Storage:**
  - Every tooth independently retains its assigned procedure (Crown, Implant, Missing, Veneer, Sleeve, etc.).
  - Switching the active brush tool **never** alters previously assigned teeth.
  - Interactive summary tags at the bottom display each tooth with its specific procedure badge and an individual `(X)` removal button.
- **Pure SVG Vector Geometry:**
  - Zero static image dependencies; 100% scalable and crystal clear on Retina / 4K displays.
  - 3-root maxillary molars, 2-root wishbone mandibular molars, towering canines, and shovel incisors.
- **Clinical Overlays:**
  - Titanium implant fixtures, guided surgery sleeves, anchor pins, aligner attachments, bone reduction lines, sinus elevations, and nerve canal safety zones.
- **Dual Numbering System Engine:**
  - Seamless runtime switching between **Universal ADA (1-32)** and **ISO 3950 (FDI 2-Digit)**.
- **WCAG 2.1 AA Compliant & Dark Mode Ready:**
  - Built with accessible colors and high-contrast tokens.

---

## 📦 Installation

```bash
# In your project root
npm install @3ddx/teeth-chart-clinical
```

---

## 🚀 Quick Start Example

```tsx
import React, { useState } from 'react';
import { 
  TeethChart, 
  type DentalServiceId 
} from '@3ddx/teeth-chart-clinical';

export function DentalPrescriptionPage() {
  const [selectedTeeth, setSelectedTeeth] = useState<number[]>([14, 15, 16]);
  const [restorations, setRestorations] = useState<Record<number, string>>({
    14: 'implant',
    15: 'crown',
    16: 'crown',
  });

  return (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm">
      <h2 className="text-xl font-bold mb-4">Clinical Odontogram</h2>

      <TeethChart
        selected={selectedTeeth}
        toothRestorations={restorations}
        activeServices={['sg', 'tp']} // Dynamically filters tools to Surgical Guide & Treatment Planning
        archFocus="dual"
        onSelectionChange={(newTeeth, newRestorations) => {
          setSelectedTeeth(newTeeth);
          setRestorations(newRestorations);
          console.log('Selected Teeth:', newTeeth);
          console.log('Assigned Procedures:', newRestorations);
        }}
      />
    </div>
  );
}
```

---

## 📋 Props API Reference

| Prop Name | Type | Default | Description |
|---|---|---|---|
| `selected` / `selectedTeeth` | `number[]` | `[]` | Array of currently selected tooth numbers (Universal 1..32) |
| `toothRestorations` | `Record<number, string>` | `{}` | Key-value dictionary mapping tooth number to procedure ID |
| `activeServices` | `DentalServiceId[] \| string[]` | `[]` | Prescribed 3DDX services (e.g. `['sg', 'tp']`) to filter procedure tools |
| `serviceId` | `DentalServiceId \| string` | `undefined` | Single service ID shortcut |
| `archFocus` | `'maxilla' \| 'mandible' \| 'dual'` | `'dual'` | Initial anatomical focus |
| `onSelectionChange` | `(teeth: number[], restorations: Record<number, string>) => void` | `undefined` | Main callback emitted whenever teeth or procedures change |
| `onToggleTooth` / `onToggle` | `(toothNumber: number) => void` | `undefined` | Emitted when an individual tooth is toggled |
| `onAssignRestoration` | `(toothNumber: number, type: string) => void` | `undefined` | Emitted when a procedure is assigned |
| `onClearAll` | `() => void` | `undefined` | Emitted when selections are reset |
| `readonly` | `boolean` | `false` | Read-only mode for reports and view-only drawers |
| `showToolbar` | `boolean` | `true` | Toggles rendering of the top procedure and preset toolbar |
| `className` | `string` | `''` | Custom wrapper CSS classes |

---

## 🦷 3DDX Prescribed Service IDs & Procedures

| Service ID | Service Name | Available Scientific Procedures |
|---|---|---|
| `sg` | Surgical Guide | Implant, Guide Sleeve, Anchor Pin, Bone Reduction, Missing |
| `tp` | Treatment Plan | Implant, Crown, Bridge, Veneer, Sinus Lift, IAN Nerve Trace, Missing |
| `conv` | DICOM Conversion | Segmentation ROI, Implant, Nerve Trace, Missing |
| `mod` | Model Work | Removable Die, Implant Analog, Missing |
| `rep` | Radiology Report | Impacted Tooth, Pathology, Sinus Floor, Missing |
| `restTemp` | Temp Restoration | Temporary PMMA Crown, Temporary Bridge, Missing |
| `restFinal` | Final Restoration | Full Crown, Bridge, Veneer, Inlay/Onlay, Missing |
| `vr` | Virtual Reality VR | Digital Smile Design (DSD), Veneer, Crown, Missing |
| `ortho` | Orthodontics / ISmile | Aligner Attachment, IPR Contact, Missing |
