# 3DDX Clinical Teeth Chart & Odontogram System (Production V2)

[![Production Ready](https://img.shields.io/badge/Status-Production%20Ready-emerald.svg)](https://github.com/3ddx)
[![Architecture](https://img.shields.io/badge/Architecture-Clean%20%26%20Modular-blue.svg)](https://github.com/3ddx)
[![Standards](https://img.shields.io/badge/Standards-ISO%203950%20%7C%20ADA%20Universal-indigo.svg)](https://github.com/3ddx)
[![Accessibility](https://img.shields.io/badge/A11y-WCAG%202.1%20AA-success.svg)](https://github.com/3ddx)

Welcome to the definitive engineering documentation and delivery package for the **3DDX Clinical Teeth Chart & Odontogram System**. This repository folder contains the exhaustive technical investigation, production architecture, standardized API contracts, standalone reusable component package, automated verification evidence, and localhost testing environments.

---

## 📂 Deliverable Structure

| Directory / File | Description | Target Audience |
| :--- | :--- | :--- |
| [`01_EXECUTIVE_SUMMARY_AND_SPECIFICATION_INDEX.md`](./01_EXECUTIVE_SUMMARY_AND_SPECIFICATION_INDEX.md) | High-level executive overview, problem statement, core metrics, and index. | Lead Architects & Product |
| [`02_CLINICAL_ODONTOGRAM_SYSTEM_INVESTIGATION_REPORT.md`](./02_CLINICAL_ODONTOGRAM_SYSTEM_INVESTIGATION_REPORT.md) | Deep technical & dental domain investigation across legacy and modern platforms. | Senior Engineers & Clinicians |
| [`03_COMPONENT_ARCHITECTURE_AND_API_REFERENCE.md`](./03_COMPONENT_ARCHITECTURE_AND_API_REFERENCE.md) | Component architecture, state machines, props, events, design tokens, and A11y. | Frontend Engineers |
| [`04_PRODUCTION_PULL_REQUEST_PLAYBOOK.md`](./04_PRODUCTION_PULL_REQUEST_PLAYBOOK.md) | Turnkey GitHub/GitLab Pull Request template, release notes, migration guide. | DevOps & Code Reviewers |
| [`05_VERIFICATION_MATRIX_AND_TEST_PROTOCOL.md`](./05_VERIFICATION_MATRIX_AND_TEST_PROTOCOL.md) | Verification test cases, assertions, responsive breakpoints, edge cases. | QA & Automation Engineers |
| [`evidence/`](./evidence/) | Audits, build logs, accessibility reports, anatomical cross-validation logs. | Compliance & Lead Reviewers |
| [`standalone-component/`](./standalone-component/) | Modular, zero-dependency, self-contained reusable component package. | Consumers / Integrators |

---

## 🚀 How to Run and Experience on Localhost

The Teeth Chart is integrated as a dedicated interactive workbench within the **3DDX Dental Platform** (`dental-react-app`) and (`dental-primevue-app`).

### Option 1: Running the React Interactive Workbench (Recommended)

1. Open a PowerShell or Terminal window in the React application folder:
   ```powershell
   cd "H:\3DDX\dental-react-app"
   ```
2. Start the Vite development server:
   ```powershell
   npm run dev
   ```
3. Open your browser to the dedicated Teeth Chart route:
   ```
   http://localhost:5173/teeth-chart
   ```
   *(Or click **"Teeth Chart"** in the sidebar navigation with the ✨ PRO badge)*.

### Option 2: Running the Vue Interactive Page

1. Open PowerShell in the PrimeVue application folder:
   ```powershell
   cd "H:\3DDX\dental-primevue-app"
   ```
2. Start the Vite development server:
   ```powershell
   npm run dev
   ```
3. Open:
   ```
   http://localhost:5174/teeth-chart
   ```

---

## 🦷 Key Features & Architectural Highlights

1. **Dual Numbering System Engine**:
   - Seamless, instantaneous toggle between **ISO 3950 (FDI 2-Digit)** (e.g., #11, #21, #36, #46) and **Universal ADA (1–32)** (e.g., #8, #9, #19, #30).
   - Zero-latency bidirectional cross-quadrant translation without re-renders.

2. **Hand-Crafted Anatomical SVG Silhouette Engine**:
   - **Upper Arch (Maxillary)**: Roots reach superiorly towards the apical bone; molars feature **3 distinct roots** (2 buccal + 1 palatal in center cleft); canines feature towering apical roots; incisors have broad shovel crowns.
   - **Lower Arch (Mandibular)**: Crowns situated occlusally, roots extend inferiorly; molars feature **2 wishbone roots** with wide U-furcation arches.
   - **Implant Mode**: Automatically replaces biological root anatomy with precision titanium threaded fixture silhouettes upon restoration assignment.

3. **Multi-Restoration Clinical Assignment**:
   - Interactive palette for **Crown**, **Bridge Unit**, **Veneer**, **Implant**, **Inlay / Onlay**, and **Missing / Extraction**.
   - Distinctive clinical color coding, background alpha fills, and active visual cues.

4. **Production REST API Contract & Legacy Backward Compatibility**:
   - Emits structured JSON payloads containing Universal array, FDI array, restorative dictionary, and legacy comma-separated strings (`"14,15,16"`) preserving 100% backward compatibility with legacy PHP CP and zConnect backends.

5. **Accessibility (WCAG 2.1 AA Compliant)**:
   - Full keyboard navigation (`Tab`, `Space`, `Enter`).
   - Screen-reader friendly ARIA attributes (`role="grid"`, `aria-label`, `aria-checked`, `aria-pressed`).
   - High-contrast visual focus rings and contrast ratios exceeding 4.5:1.

---

## 📦 Using the Standalone Reusable Component

The component in `./standalone-component` is completely isolated and ready to be dropped into any TypeScript project or published as an internal npm package:

```tsx
import { TeethChart } from './standalone-component';

export function DentalCaseForm() {
  const [selectedTeeth, setSelectedTeeth] = useState<number[]>([14, 15, 16]);

  return (
    <TeethChart
      selected={selectedTeeth}
      onSelectionChange={(teeth, restorations) => {
        console.log('Selected Teeth:', teeth);
        console.log('Assigned Restorations:', restorations);
      }}
      showToolbar={true}
    />
  );
}
```

---

*Authored by 3DDX Advanced Frontend Engineering Team · Production Release V2.0*
