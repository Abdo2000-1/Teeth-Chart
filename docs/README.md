# 📚 3DDX Teeth Chart Engineering Documentation Hub

This directory contains formal software engineering specifications, architectural designs, and verification protocols compliant with international standards.

---

## 📑 Documentation Index

### 1. [IEEE 830 Software Requirements Specification (SRS)](SRS_SOFTWARE_REQUIREMENTS_SPECIFICATION.md)
* Comprehensive functional & non-functional requirements.
* Anatomical fidelity specifications for all 32 human teeth.
* UI performance benchmarks (< 16ms render budget, 60 FPS).
* Clinical numbering compliance (ISO 3950 FDI & Universal ADA).

### 2. [IEEE 1016 Software Design Specification (SDS)](SDS_SOFTWARE_DESIGN_SPECIFICATION.md)
* High-level & low-level architectural blueprints.
* Dual-layout engine design: 4-Quadrant Orthogonal Cross & Parabolic Curvature Arch.
* Titanium implant fixture geometry & threaded shaders.
* State management and event propagation protocols.

### 3. [Architecture & Design Patterns Deep Dive](ARCHITECTURE_AND_DESIGN_PATTERNS.md)
* **SOLID Principles Implementation** across the Teeth Chart modules.
* **GoF Patterns Applied**:
  * *Facade Pattern*: `TeethChart` unified wrapper.
  * *Strategy Pattern*: Interchangeable layout strategies (Grid vs. Arch).
  * *Observer Pattern*: Reactive tooth state synchronization.
  * *Factory Pattern*: Parametric tooth SVG morphology generator.

---

## 🖼️ Clinical Visual Assets

| Asset Name | Description | Reference Link |
| :--- | :--- | :--- |
| `teeth_chart_hero_animation.svg` | Dynamic animated SVG hero banner with rotating radar & glowing tooth nodes | [View Banner](assets/images/teeth_chart_hero_animation.svg) |
| `01_parabolic_arch_view.png` | Live production screenshot: Anatomical Parabolic Arch View with Smile Zone preset | [View Image](assets/images/01_parabolic_arch_view.png) |
| `02_cross_grid_baseline.png` | Live production screenshot: 4-Quadrant Cross Odontogram Baseline | [View Image](assets/images/02_cross_grid_baseline.png) |
| `03_full_mouth_implants.png` | Live production screenshot: Full-Mouth Titanium Surgical Implants mode | [View Image](assets/images/03_full_mouth_implants.png) |
| `04_clinical_procedures_active.png` | Live production screenshot: Multi-Procedure assignment toolbar with glow contours | [View Image](assets/images/04_clinical_procedures_active.png) |
