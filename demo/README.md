# 🦷 3DDX Clinical Teeth Chart - Live Demo Suite

This folder contains resources and instructions for previewing and testing the **3DDX Clinical Odontogram** locally and in production.

## 🌐 Live Production Demo (Vercel)
The component is deployed and available live at:
**[https://teeth-chart.abdoaladawy.me](https://teeth-chart.abdoaladawy.me)**

## 🚀 Running the Interactive Demo Locally

1. From the repository root, install dependencies:
   ```bash
   npm install
   ```
2. Start the local development server:
   ```bash
   npm run dev
   ```
3. Open your browser at:
   ```
   http://localhost:5175
   ```

### 📱 Live Demo Features
- **4-Quadrant Anatomical Odontogram**: Classical Maxillary & Mandibular grid with clean vector SVG roots and crowns.
- **Service-Driven Procedures Filtering**: Switch between 3DDX services (Surgical Guide, Treatment Plan, DICOM conversion, PMMA provisional, Orthodontics, etc.) to see the procedure brush dynamically filter to scientifically logical tools.
- **Dual Numbering Systems**: Real-time switch between **Universal (1–32)** and **ISO 3950 / FDI (11–48)** notation.
- **Both Arches Preset**: Select all 32 teeth at once with one click (`+ Both Arches (1-32)`).
- **Per-Tooth Procedure Memory**: Switching tools never modifies previously assigned teeth; summary tags show each tooth's actual procedure with an `(X)` delete button.
- **Live JSON Payload Inspector**: Realtime inspection of the emitted clinical payload with 1-click clipboard copy and `.json` download.
- **Universal Embed Generator**: Interactive code generator for React, Vue, Angular, Vanilla JS, and iframe embedding.

## 📄 Zero-Build Standalone HTML Demo
You can directly open [`standalone-html-demo.html`](./standalone-html-demo.html) in any web browser without running any build tools. It showcases embedding via an iframe with real-time `window.postMessage` bidirectional event handling.
