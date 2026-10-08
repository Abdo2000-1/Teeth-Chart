# 🦷 3DDX Clinical Teeth Chart & Odontogram System

[![Production Ready](https://img.shields.io/badge/Status-Production%20Ready%20v2.5.0-emerald.svg?style=for-the-badge&logo=checkmarx)](https://teeth-chart.abdoaladawy.me)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-teeth--chart.abdoaladawy.me-00d8fe.svg?style=for-the-badge&logo=vercel)](https://teeth-chart.abdoaladawy.me)
[![Standards](https://img.shields.io/badge/Standards-ISO%203950%20(FDI)%20%7C%20ADA%20Universal-indigo.svg?style=for-the-badge)](https://teeth-chart.abdoaladawy.me)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7%20Strict-blue.svg?style=for-the-badge&logo=typescript)](https://teeth-chart.abdoaladawy.me)
[![A11y](https://img.shields.io/badge/A11y-WCAG%202.1%20AA-success.svg?style=for-the-badge)](https://teeth-chart.abdoaladawy.me)
[![License](https://img.shields.io/badge/License-MIT-gray.svg?style=for-the-badge)](./LICENSE)

> **Enterprise-grade, lightweight anatomical dental charting component designed for modern digital dentistry workflows, SaaS applications, dental laboratories, and clinical management platforms.**
> Features hand-crafted vector SVG tooth silhouettes, service-driven procedure filtering, dual ISO 3950 / ADA numbering, per-tooth restorative memory, and a universal embed bridge.

---

## 🌐 Live Production Demo & Playground

Experience the component live, test all clinical workflows, view real-time JSON payloads, and generate embed snippets:

### 🔗 **[https://teeth-chart.abdoaladawy.me](https://teeth-chart.abdoaladawy.me)**
*(Deployed on Vercel with automatic CI/CD from this repository)*

---

## 📑 Table of Contents

- [Key Architectural Highlights](#-key-architectural-highlights)
- [Directory Structure](#-directory-structure)
- [Installation & Quickstart](#-installation--quickstart)
- [React / Next.js Integration](#-react--nextjs-integration)
- [Universal Embedding (Any Platform)](#-universal-embedding-any-platform)
  - [1. Responsive Iframe with postMessage (Zero Install)](#1-responsive-iframe-with-postmessage-zero-install)
  - [2. Vanilla JS Helper (`initTeethChartEmbed`)](#2-vanilla-js-helper-initteethchartembed)
  - [3. Vue.js 3 Integration](#3-vuejs-3-integration)
  - [4. Angular Integration](#4-angular-integration)
- [Props & API Reference](#-props--api-reference)
- [Service-Driven Procedures Filtering](#-service-driven-procedures-filtering)
- [Restoration Procedures Catalog](#-restoration-procedures-catalog)
- [Running Locally & Building](#-running-locally--building)
- [Deploying to Vercel](#-deploying-to-vercel)
- [License & Authors](#-license--authors)

---

## ✨ Key Architectural Highlights

1. **Clean Vector SVG Anatomy (No Photos, No Heavy 3D Meshes)**:
   - 100% vector SVG silhouettes ([`ClinicalToothSilhouette`](./src/teeth-chart.geometry.tsx)).
   - Distinct root morphology: **Maxillary molars feature 3 anatomical roots** (2 outer buccal + 1 center vertical palatal root); **Mandibular molars feature 2 distinct wishbone roots** with wide U-furcation arches; canines feature towering apical roots; incisors have shovel crowns.
   - Dynamic procedural overlays for implants (threaded titanium fixture), surgical sleeves, fixation anchors, bone reduction planes, nerve canal traces, and clear aligner attachments.

2. **Classical 4-Quadrant Clinical Grid**:
   - Structured according to international clinical odontogram standards:
     - **UR** (Maxillary Right, #1 ➔ #8)
     - **UL** (Maxillary Left, #9 ➔ #16)
     - **LR** (Mandibular Right, #32 ➔ #25)
     - **LL** (Mandibular Left, #24 ➔ #17)
   - Divided by horizontal occlusal and vertical facial midlines matching physical dental charts.

3. **Service-Driven Procedures Filtering**:
   - Pass any prescribed 3DDX service ID (`sg`, `tp`, `conv`, `mod`, `rep`, `restTemp`, `restFinal`, `vr`, `ortho`) to filter the procedure brush palette to scientifically valid tools automatically, with a toggle to view all procedures.

4. **Per-Tooth Procedure Persistence (Zero Mutation Bug)**:
   - Each selected tooth maintains its own procedure type in an immutable state dictionary (`localRestorations`).
   - Switching the active brush tool (e.g., from Crown to Missing) never mutates previously assigned teeth.
   - Each tooth in summary tags displays its actual assigned procedure with an individual `(X)` delete button.

5. **Quick Preset Selectors (Including Both Arches)**:
   - **`+ Both Arches (1-32)`**: Selects all 32 teeth across upper and lower arches at once with the active tool.
   - **`+ Upper (1-16)`** & **`+ Lower (17-32)`**: Selects the maxillary or mandibular arch.
   - **`Smile Zone`**: Selects anterior aesthetic zone (canine to canine).
   - **`+ Posteriors`**: Selects premolars and molars.

6. **Dual International Numbering Engine**:
   - Toggle instantly between **Universal ADA (1–32)** and **ISO 3950 / FDI (11–48)** without losing data.

7. **Universal Embed Bridge**:
   - Run in standalone embed mode via `?embed=true`.
   - Embed seamlessly in PHP, WordPress, Vue, Angular, or plain HTML via an iframe with bidirectional `window.postMessage` synchronization.

---

## 📂 Directory Structure

```
teeth-chart/
├── .github/
│   └── workflows/
│       └── ci.yml               # Automated CI for linting and production build
├── demo/                        # Interactive Demo Assets
│   ├── README.md                # Demo documentation
│   └── standalone-html-demo.html # Zero-build single-file HTML embed preview
├── src/                         # Core Production Library & Demo App
│   ├── index.ts                 # Clean barrel export for npm/esm
│   ├── TeethChart.tsx           # Primary 4-quadrant anatomical odontogram
│   ├── teeth-chart.types.ts     # TypeScript interfaces & types
│   ├── teeth-chart.constants.ts # Clinical tooth database & procedure catalogs
│   ├── teeth-chart.geometry.tsx # Vector SVG anatomical silhouettes
│   ├── embed.ts                 # Vanilla JS embed helper & postMessage bridge
│   ├── App.tsx                  # Interactive Showcase Playground (Demo app)
│   ├── main.tsx                 # Demo entry point
│   └── index.css                # Tailwind directives & clinical styles
├── standalone-component/        # Drop-in standalone copy for backwards compatibility
│   ├── index.ts
│   ├── TeethChart.tsx
│   ├── teeth-chart.types.ts
│   └── ...
├── dist/                        # Production build output (served by Vercel)
├── package.json                 # Project configuration and build scripts
├── tsconfig.json                # TypeScript strict configuration
├── vite.config.ts               # Vite bundler configuration
├── tailwind.config.js           # Tailwind configuration
├── postcss.config.js            # PostCSS configuration
├── vercel.json                  # Vercel deployment configuration with iframe headers
├── CNAME                        # Custom domain binding (teeth-chart.abdoaladawy.me)
├── LICENSE                      # MIT Open-Source License
└── README.md                    # Definitive documentation
```

---

## 📦 Installation & Quickstart

### Option A: Install from GitHub directly

```bash
npm install git+https://github.com/Abdo2000-1/Teeth-Chart.git
```

Or using yarn / pnpm:
```bash
yarn add git+https://github.com/Abdo2000-1/Teeth-Chart.git
# or
pnpm add git+https://github.com/Abdo2000-1/Teeth-Chart.git
```

### Option B: Copy-Paste the `src/` folder
Copy [`src/TeethChart.tsx`](./src/TeethChart.tsx), [`src/teeth-chart.types.ts`](./src/teeth-chart.types.ts), [`src/teeth-chart.constants.ts`](./src/teeth-chart.constants.ts), and [`src/teeth-chart.geometry.tsx`](./src/teeth-chart.geometry.tsx) directly into your project's `components/ui/` directory.

---

## 💻 React / Next.js Integration

### Basic Example (Controlled State)

```tsx
import React, { useState } from 'react';
import { TeethChart } from '@3ddx/teeth-chart';

export function PrescriptionCase() {
  const [selectedTeeth, setSelectedTeeth] = useState<number[]>([14, 15, 16]);
  const [restorations, setRestorations] = useState<Record<number, string>>({
    14: 'implant',
    15: 'crown',
    16: 'crown',
  });

  return (
    <div className="p-6 bg-slate-900 rounded-3xl">
      <TeethChart
        selected={selectedTeeth}
        toothRestorations={restorations}
        activeServices={['sg', 'tp']} // Dynamically filters tools to Surgical Guide & Treatment Plan
        onSelectionChange={(newSelected, newRestorations) => {
          setSelectedTeeth(newSelected);
          setRestorations(newRestorations);
          console.log('Selected sites:', newSelected);
          console.log('Restoration map:', newRestorations);
        }}
        onClearAll={() => {
          setSelectedTeeth([]);
          setRestorations({});
        }}
      />
    </div>
  );
}
```

### Advanced Multi-Step Prescription Example (Like 3DDX AddCase)

```tsx
import React, { useState, useMemo } from 'react';
import { TeethChart, DentalServiceId, RestorationType } from '@3ddx/teeth-chart';

export function ClinicalOrderForm() {
  // 1. Services selected in Step 2
  const [services, setServices] = useState({
    sg: true,       // Surgical Guide
    tp: true,       // Treatment Plan
    conv: false,    // DICOM Conversion
    mod: false,     // Model Work
    restFinal: true // Final Crown / Bridge
  });

  // Extract active service IDs
  const activeServiceIds = useMemo(() => {
    return Object.entries(services)
      .filter(([_, active]) => active)
      .map(([id]) => id as DentalServiceId);
  }, [services]);

  // 2. Teeth selected in Step 3
  const [selectedTeeth, setSelectedTeeth] = useState<number[]>([14, 15, 16]);
  const [toothProcedures, setToothProcedures] = useState<Record<number, RestorationType>>({
    14: 'implant',
    15: 'crown',
    16: 'bridge'
  });

  return (
    <div className="space-y-4">
      <TeethChart
        selectedTeeth={selectedTeeth}
        activeServices={activeServiceIds}
        toothRestorations={toothProcedures}
        archFocus="dual"
        onSelectionChange={(sel, procMap) => {
          setSelectedTeeth(sel);
          setToothProcedures(procMap as Record<number, RestorationType>);
        }}
      />

      {/* Step 4 Review Output */}
      <div className="p-4 rounded-xl bg-slate-800 text-xs text-white">
        <strong>Prescribed Sites for Fabrication:</strong>
        <p className="font-mono mt-1">
          {selectedTeeth.map(t => `#${t} (${toothProcedures[t] || 'crown'})`).join(', ')}
        </p>
      </div>
    </div>
  );
}
```

---

## 🌐 Universal Embedding (Any Platform)

You do **NOT** need React to use this component. It can be embedded into **any application** (PHP, WordPress, Laravel, Django, Ruby on Rails, ASP.NET, Vue, Angular, or static HTML) using an iframe or helper.

### 1. Responsive Iframe with postMessage (Zero Install)

Add the following HTML to any page:

```html
<!-- 3DDX Clinical Odontogram Responsive Iframe -->
<iframe
  id="teethChart"
  src="https://teeth-chart.abdoaladawy.me/?embed=true&services=sg,tp&theme=dark"
  width="100%"
  height="700"
  frameborder="0"
  style="border: none; border-radius: 1.5rem; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.3);"
  allow="clipboard-write"
></iframe>

<script>
  // Listen for real-time events emitted by the chart
  window.addEventListener('message', function(event) {
    if (event.data && event.data.type === '3DDX_TEETH_CHART_UPDATE') {
      const payload = event.data.payload;
      
      console.log('Universal Teeth:', payload.selectedUniversal); // e.g. [14, 15, 16]
      console.log('ISO 3950 / FDI Teeth:', payload.selectedFDI);   // e.g. [26, 27, 28]
      console.log('Procedures Dictionary:', payload.restorations);  // e.g. { "14": "implant", "15": "crown" }
      console.log('Legacy String for PHP:', payload.legacyString);  // e.g. "14,15,16"
      console.log('Total Units:', payload.totalUnits);              // e.g. 3

      // Example: Fill a hidden form input in PHP / HTML form
      const hiddenInput = document.getElementById('selected_teeth_input');
      if (hiddenInput) hiddenInput.value = payload.legacyString;
    }
  });

  // Example: Programmatically send data into the chart from your page
  function updateChartFromHost() {
    const iframe = document.getElementById('teethChart');
    iframe.contentWindow.postMessage({
      type: '3DDX_TEETH_CHART_SET_DATA',
      payload: {
        selected: [8, 9, 10],
        restorations: { 8: 'veneer', 9: 'veneer', 10: 'crown' },
        activeServices: ['vr', 'restFinal']
      }
    }, '*');
  }
</script>
```

#### URL Query Parameters Supported in Embed Mode:
| Parameter | Values | Description |
| :--- | :--- | :--- |
| `embed` | `true` | Activates clean embed mode (strips navbar, padding, and outer headers). |
| `services` | `sg,tp,conv` | Comma-separated 3DDX service IDs to filter available procedures. |
| `selected` | `14,15,16` | Initial selected tooth numbers in Universal notation. |
| `theme` | `dark` or `light` | Sets visual theme. |

---

### 2. Vanilla JS Helper (`initTeethChartEmbed`)

If using bundled JS:

```javascript
import { initTeethChartEmbed } from '@3ddx/teeth-chart';

const chart = initTeethChartEmbed({
  target: '#my-chart-div',
  theme: 'dark',
  activeServices: ['sg', 'tp'],
  initialSelected: [14, 15, 16],
  height: 700,
  onChange: (payload) => {
    console.log('Received payload:', payload);
    document.getElementById('teeth_field').value = payload.legacyString;
  }
});

// To clean up or destroy:
// chart.destroy();
```

---

### 3. Vue.js 3 Integration

```vue
<template>
  <div class="teeth-chart-wrapper">
    <iframe
      :src="embedUrl"
      width="100%"
      height="720"
      frameborder="0"
      style="border: none; border-radius: 1.5rem;"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const embedUrl = ref('https://teeth-chart.abdoaladawy.me/?embed=true&services=sg,tp&theme=dark');

const onMessage = (event) => {
  if (event.data?.type === '3DDX_TEETH_CHART_UPDATE') {
    const { selectedUniversal, restorations, legacyString } = event.data.payload;
    console.log('Vue captured updates:', selectedUniversal, restorations);
  }
};

onMounted(() => window.addEventListener('message', onMessage));
onUnmounted(() => window.removeEventListener('message', onMessage));
</script>
```

---

### 4. Angular Integration

```typescript
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-teeth-chart-embed',
  template: `
    <iframe
      src="https://teeth-chart.abdoaladawy.me/?embed=true&services=sg,tp&theme=dark"
      width="100%"
      height="720"
      style="border: none; border-radius: 24px;"
    ></iframe>
  `
})
export class TeethChartEmbedComponent {
  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data?.type === '3DDX_TEETH_CHART_UPDATE') {
      console.log('Angular captured TeethChart event:', event.data.payload);
    }
  }
}
```

---

## 📋 Props & API Reference

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `selected` | `number[]` | `[]` | Array of selected teeth in Universal notation (1–32). |
| `selectedTeeth` | `number[]` | `[]` | Alias for `selected` for backwards compatibility. |
| `toothRestorations` | `Record<number, string>` | `{}` | Map of tooth number to assigned procedure (e.g. `{ 14: 'implant' }`). |
| `activeServices` | `DentalServiceId[]` | `[]` | Prescribed service IDs (`sg`, `tp`, `conv`, etc.) filtering available tools. |
| `serviceId` | `DentalServiceId` | `undefined` | Single service ID shortcut. |
| `onSelectionChange` | `(selected, restorations) => void` | `undefined` | Primary event fired when tooth selection or assigned procedure mutates. |
| `onToggle` / `onToggleTooth` | `(toothNumber) => void` | `undefined` | Fired when an individual tooth is clicked. |
| `onAssignRestoration` | `(tooth, type) => void` | `undefined` | Fired when a restoration type is assigned to a tooth. |
| `onClearAll` | `() => void` | `undefined` | Fired when the "Reset / Clear All" button is pressed. |
| `archFocus` | `'maxilla' \| 'mandible' \| 'dual' \| 'both' \| 'upper' \| 'lower'` | `'dual'` | Highlights specific arch focus. |
| `readonly` | `boolean` | `false` | Locks the chart in read-only presentation mode. |
| `showToolbar` | `boolean` | `true` | Shows or hides numbering switcher, presets, and active tool palette. |
| `className` | `string` | `''` | Custom CSS classes applied to root container. |

---

## 🔬 Service-Driven Procedures Filtering

When active services are specified, the procedure brush toolbar automatically filters down to scientifically valid dental procedures:

| 3DDX Service ID | Service Name | Available Procedures |
| :--- | :--- | :--- |
| `sg` | **Surgical Guide** | `Sleeve`, `Anchor Pin`, `Bone Reduction`, `Nerve Canal Trace` |
| `tp` | **Treatment Plan** | `Implant`, `Crown`, `Bridge Unit`, `Veneer`, `Sinus Lift` |
| `conv` | **DICOM Conversion** | `Nerve Canal Trace`, `Segmentation`, `Bone Reduction` |
| `mod` | **Model Work** | `Model Analog`, `Die Prep`, `Extraction` |
| `rep` | **Radiology Report** | `Pathology`, `Impacted Tooth` |
| `restTemp` | **Temp Restoration** | `Provisional PMMA Crown`, `Provisional Bridge Unit` |
| `restFinal` | **Final Restoration**| `Final Crown`, `Bridge Unit`, `Veneer`, `Inlay / Onlay` |
| `vr` | **VR / Smile Design** | `Digital Smile Design`, `Veneer`, `Crown` |
| `ortho` | **Orthodontics / Aligners**| `Clear Aligner Attachment`, `IPR (Interproximal Reduction)` |

Clinicians can always click **`+ Show All Procedures`** to display all tools regardless of the active service filter.

---

## 🎨 Restoration Procedures Catalog

| ID | Name | Arabic Name | Icon | Hex Color | Description |
| :--- | :--- | :--- | :---: | :---: | :--- |
| `crown` | Crown | تاج كامل | 👑 | `#00d8fe` | Full coverage prosthetic crown |
| `implant` | Dental Implant | زرعة أسنان | 🔩 | `#3b82f6` | Endosseous titanium fixture |
| `bridge` | Bridge Unit | جسر أسنان | 🌉 | `#8b5cf6` | Fixed partial denture pontic / retainer |
| `veneer` | Veneer | فينير تجميلي | ✨ | `#ec4899` | Aesthetic ceramic laminate veneer |
| `inlay` | Inlay / Onlay | حشوة مصبوبة | 💎 | `#10b981` | Indirect cast composite / ceramic |
| `extraction` | Extraction | خلع سن | ❌ | `#ef4444` | Planned surgical or simple extraction |
| `sleeve` | Guide Sleeve | سليف جراحي | ⭕ | `#f59e0b` | Titanium surgical drill guidance sleeve |
| `anchor` | Anchor Pin | مسمار تثبيت | 📌 | `#6366f1` | Fixation pin for surgical guide stabilization |
| `bone_reduction`| Bone Reduction | تسوية عظم | 📏 | `#84cc16` | Surgical alveoloplasty bone reduction plane |
| `sinus_lift` | Sinus Lift | رفع الجيب | ☁️ | `#06b6d4` | Maxillary sinus membrane elevation site |
| `nerve_trace` | Nerve Trace | مسار العصب | ⚡ | `#eab308` | Mandibular canal / IAN nerve pathway |
| `temp_crown` | Temp Crown | تاج مؤقت | ⏱️ | `#f97316` | PMMA provisional coverage |
| `attachment` | Aligner Attachment | زر تقويم | 🔺 | `#a855f7` | Composite button for clear aligner tracking |
| `ipr` | IPR | تبريد الأسنان | ✂️ | `#14b8a6` | Interproximal enamel reduction site |

---

## 🛠️ Running Locally & Building

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Abdo2000-1/Teeth-Chart.git
   cd Teeth-Chart
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5175` in your browser.

4. **Typecheck & Build for Production:**
   ```bash
   npm run build
   ```
   Generates production bundle in `dist/`.

---

## 🚀 Deploying to Vercel

This repository is pre-configured with [`vercel.json`](./vercel.json) for instant, zero-config deployment on Vercel:

1. Import the repository in Vercel: `https://github.com/Abdo2000-1/Teeth-Chart.git`.
2. Framework Preset: **Vite**.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.
5. Custom Domain: `teeth-chart.abdoaladawy.me` (or your preferred domain).

The `vercel.json` file automatically enables `X-Frame-Options: ALLOWALL` and `Access-Control-Allow-Origin: *`, ensuring that iframes can embed the chart without cross-origin blocks.

---

## 📜 License & Authors

- **Developed for:** 3DDX Advanced Digital Dentistry Systems
- **Author:** Abdo Al Adawy ([@Abdo2000-1](https://github.com/Abdo2000-1))
- **License:** [MIT License](./LICENSE)
