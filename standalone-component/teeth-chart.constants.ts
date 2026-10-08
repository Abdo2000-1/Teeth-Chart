import { ToothOdontoData, RestorationMeta, RestorationType, DentalServiceId } from './teeth-chart.types';

export const ODONTO_DATABASE: ToothOdontoData[] = [
  // --- UPPER ARCH (Maxillary Arch) ---
  // Patient Right (UR: 1 to 8) - Viewer's Left
  { universal: 1,  fdi: 18, code: '18', name: 'Upper Right 3rd Molar (Wisdom)', category: 'molar', arch: 'upper', quadrant: 'UR', isAnterior: false },
  { universal: 2,  fdi: 17, code: '17', name: 'Upper Right 2nd Molar', category: 'molar', arch: 'upper', quadrant: 'UR', isAnterior: false },
  { universal: 3,  fdi: 16, code: '16', name: 'Upper Right 1st Molar', category: 'molar', arch: 'upper', quadrant: 'UR', isAnterior: false },
  { universal: 4,  fdi: 15, code: '15', name: 'Upper Right 2nd Premolar', category: 'premolar', arch: 'upper', quadrant: 'UR', isAnterior: false },
  { universal: 5,  fdi: 14, code: '14', name: 'Upper Right 1st Premolar', category: 'premolar', arch: 'upper', quadrant: 'UR', isAnterior: false },
  { universal: 6,  fdi: 13, code: '13', name: 'Upper Right Canine (Cuspid)', category: 'canine', arch: 'upper', quadrant: 'UR', isAnterior: true },
  { universal: 7,  fdi: 12, code: '12', name: 'Upper Right Lateral Incisor', category: 'incisor_lat', arch: 'upper', quadrant: 'UR', isAnterior: true },
  { universal: 8,  fdi: 11, code: '11', name: 'Upper Right Central Incisor', category: 'incisor_cen', arch: 'upper', quadrant: 'UR', isAnterior: true },

  // Patient Left (UL: 9 to 16) - Viewer's Right
  { universal: 9,  fdi: 21, code: '21', name: 'Upper Left Central Incisor', category: 'incisor_cen', arch: 'upper', quadrant: 'UL', isAnterior: true },
  { universal: 10, fdi: 22, code: '22', name: 'Upper Left Lateral Incisor', category: 'incisor_lat', arch: 'upper', quadrant: 'UL', isAnterior: true },
  { universal: 11, fdi: 23, code: '23', name: 'Upper Left Canine (Cuspid)', category: 'canine', arch: 'upper', quadrant: 'UL', isAnterior: true },
  { universal: 12, fdi: 24, code: '24', name: 'Upper Left 1st Premolar', category: 'premolar', arch: 'upper', quadrant: 'UL', isAnterior: false },
  { universal: 13, fdi: 25, code: '25', name: 'Upper Left 2nd Premolar', category: 'premolar', arch: 'upper', quadrant: 'UL', isAnterior: false },
  { universal: 14, fdi: 26, code: '26', name: 'Upper Left 1st Molar', category: 'molar', arch: 'upper', quadrant: 'UL', isAnterior: false },
  { universal: 15, fdi: 27, code: '27', name: 'Upper Left 2nd Molar', category: 'molar', arch: 'upper', quadrant: 'UL', isAnterior: false },
  { universal: 16, fdi: 28, code: '28', name: 'Upper Left 3rd Molar (Wisdom)', category: 'molar', arch: 'upper', quadrant: 'UL', isAnterior: false },

  // --- LOWER ARCH (Mandibular Arch) ---
  // Patient Right (LR: 32 to 25) - Viewer's Left
  { universal: 32, fdi: 48, code: '48', name: 'Lower Right 3rd Molar (Wisdom)', category: 'molar', arch: 'lower', quadrant: 'LR', isAnterior: false },
  { universal: 31, fdi: 47, code: '47', name: 'Lower Right 2nd Molar', category: 'molar', arch: 'lower', quadrant: 'LR', isAnterior: false },
  { universal: 30, fdi: 46, code: '46', name: 'Lower Right 1st Molar', category: 'molar', arch: 'lower', quadrant: 'LR', isAnterior: false },
  { universal: 29, fdi: 45, code: '45', name: 'Lower Right 2nd Premolar', category: 'premolar', arch: 'lower', quadrant: 'LR', isAnterior: false },
  { universal: 28, fdi: 44, code: '44', name: 'Lower Right 1st Premolar', category: 'premolar', arch: 'lower', quadrant: 'LR', isAnterior: false },
  { universal: 27, fdi: 43, code: '43', name: 'Lower Right Canine (Cuspid)', category: 'canine', arch: 'lower', quadrant: 'LR', isAnterior: true },
  { universal: 26, fdi: 42, code: '42', name: 'Lower Right Lateral Incisor', category: 'incisor_lat', arch: 'lower', quadrant: 'LR', isAnterior: true },
  { universal: 25, fdi: 41, code: '41', name: 'Lower Right Central Incisor', category: 'incisor_cen', arch: 'lower', quadrant: 'LR', isAnterior: true },

  // Patient Left (LL: 24 to 17) - Viewer's Right
  { universal: 24, fdi: 31, code: '31', name: 'Lower Left Central Incisor', category: 'incisor_cen', arch: 'lower', quadrant: 'LL', isAnterior: true },
  { universal: 23, fdi: 32, code: '32', name: 'Lower Left Lateral Incisor', category: 'incisor_lat', arch: 'lower', quadrant: 'LL', isAnterior: true },
  { universal: 22, fdi: 33, code: '33', name: 'Lower Left Canine (Cuspid)', category: 'canine', arch: 'lower', quadrant: 'LL', isAnterior: true },
  { universal: 21, fdi: 34, code: '34', name: 'Lower Left 1st Premolar', category: 'premolar', arch: 'lower', quadrant: 'LL', isAnterior: false },
  { universal: 20, fdi: 35, code: '35', name: 'Lower Left 2nd Premolar', category: 'premolar', arch: 'lower', quadrant: 'LL', isAnterior: false },
  { universal: 19, fdi: 36, code: '36', name: 'Lower Left 1st Molar', category: 'molar', arch: 'lower', quadrant: 'LL', isAnterior: false },
  { universal: 18, fdi: 37, code: '37', name: 'Lower Left 2nd Molar', category: 'molar', arch: 'lower', quadrant: 'LL', isAnterior: false },
  { universal: 17, fdi: 38, code: '38', name: 'Lower Left 3rd Molar (Wisdom)', category: 'molar', arch: 'lower', quadrant: 'LL', isAnterior: false },
];

export const RESTORATION_TYPES: RestorationMeta[] = [
  // --- Core Restorative & Surgical ---
  { 
    id: 'crown', 
    label: 'Crown', 
    labelAr: 'تاج كامل',
    icon: '👑', 
    color: '#00d8fe', 
    textColor: 'text-cyan-600 dark:text-cyan-400', 
    bgColor: 'bg-cyan-50 dark:bg-cyan-950/40', 
    borderColor: 'border-cyan-500',
    description: 'Full coverage prosthetic crown',
    serviceCategories: ['tp', 'restFinal', 'vr']
  },
  { 
    id: 'bridge', 
    label: 'Bridge Unit', 
    labelAr: 'جسر أسنان',
    icon: '🌉', 
    color: '#6366f1', 
    textColor: 'text-indigo-600 dark:text-indigo-400', 
    bgColor: 'bg-indigo-50 dark:bg-indigo-950/40', 
    borderColor: 'border-indigo-500',
    description: 'Fixed partial denture retainer or pontic',
    serviceCategories: ['tp', 'restFinal']
  },
  { 
    id: 'veneer', 
    label: 'Veneer', 
    labelAr: 'عدسة فينير',
    icon: '✨', 
    color: '#a855f7', 
    textColor: 'text-purple-600 dark:text-purple-400', 
    bgColor: 'bg-purple-50 dark:bg-purple-950/40', 
    borderColor: 'border-purple-500',
    description: 'Labial cosmetic ceramic laminate',
    serviceCategories: ['tp', 'restFinal', 'vr']
  },
  { 
    id: 'implant', 
    label: 'Implant', 
    labelAr: 'زرعة تيتانيوم',
    icon: '🔩', 
    color: '#f59e0b', 
    textColor: 'text-amber-600 dark:text-amber-400', 
    bgColor: 'bg-amber-50 dark:bg-amber-950/40', 
    borderColor: 'border-amber-500',
    description: 'Endosseous titanium fixture osteotomy site',
    serviceCategories: ['sg', 'tp', 'conv']
  },
  { 
    id: 'inlay', 
    label: 'Inlay / Onlay', 
    labelAr: 'حشوة مصبوبة',
    icon: '💎', 
    color: '#10b981', 
    textColor: 'text-emerald-600 dark:text-emerald-400', 
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/40', 
    borderColor: 'border-emerald-500',
    description: 'Indirect conservative cusp/cavity restoration',
    serviceCategories: ['restFinal']
  },
  { 
    id: 'extraction', 
    label: 'Missing / Pontic', 
    labelAr: 'سن مفقود / قلع',
    icon: '❌', 
    color: '#f43f5e', 
    textColor: 'text-rose-600 dark:text-rose-400', 
    bgColor: 'bg-rose-50 dark:bg-rose-950/40', 
    borderColor: 'border-rose-500',
    description: 'Edentulous gap or planned extraction',
    serviceCategories: ['sg', 'tp', 'conv', 'mod', 'rep', 'restTemp', 'restFinal', 'ortho']
  },

  // --- Surgical Guide (SG) Specific ---
  {
    id: 'sleeve',
    label: 'Guide Sleeve',
    labelAr: 'كم توجيه جراحي',
    icon: '⭕',
    color: '#0284c7',
    textColor: 'text-sky-600 dark:text-sky-400',
    bgColor: 'bg-sky-50 dark:bg-sky-950/40',
    borderColor: 'border-sky-500',
    description: 'Cylindrical titanium/stepped guide sleeve position',
    serviceCategories: ['sg']
  },
  {
    id: 'anchor',
    label: 'Anchor Pin',
    labelAr: 'مسمار تثبيت الدليل',
    icon: '📌',
    color: '#d97706',
    textColor: 'text-amber-700 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-950/40',
    borderColor: 'border-amber-600',
    description: 'Fixation pin site for bone-supported/mucosa surgical guides',
    serviceCategories: ['sg']
  },
  {
    id: 'bone_reduction',
    label: 'Bone Reduction',
    labelAr: 'تخفيض عظمي',
    icon: '📐',
    color: '#e11d48',
    textColor: 'text-rose-700 dark:text-rose-400',
    bgColor: 'bg-rose-50 dark:bg-rose-950/40',
    borderColor: 'border-rose-600',
    description: 'Planned alveolectomy / bone reduction plateau',
    serviceCategories: ['sg']
  },

  // --- Treatment Plan (TP) Specific ---
  {
    id: 'sinus_lift',
    label: 'Sinus Lift',
    labelAr: 'رفع الجيب الفكي',
    icon: '🌊',
    color: '#06b6d4',
    textColor: 'text-cyan-700 dark:text-cyan-400',
    bgColor: 'bg-cyan-50 dark:bg-cyan-950/40',
    borderColor: 'border-cyan-600',
    description: 'Maxillary sinus floor elevation region',
    serviceCategories: ['tp', 'rep']
  },
  {
    id: 'nerve_trace',
    label: 'IAN Safety Zone',
    labelAr: 'مسار العصب الفكي',
    icon: '⚡',
    color: '#f97316',
    textColor: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-950/40',
    borderColor: 'border-orange-500',
    description: 'Mandibular canal / IAN safe clearance landmark',
    serviceCategories: ['tp', 'conv']
  },

  // --- Conversion & Model Work ---
  {
    id: 'segmentation',
    label: 'Segmentation ROI',
    labelAr: 'منطقة استخلاص 3D',
    icon: '🧩',
    color: '#8b5cf6',
    textColor: 'text-violet-600 dark:text-violet-400',
    bgColor: 'bg-violet-50 dark:bg-violet-950/40',
    borderColor: 'border-violet-500',
    description: 'DICOM CBCT bone/tooth segmentation target',
    serviceCategories: ['conv']
  },
  {
    id: 'die_prep',
    label: 'Removable Die',
    labelAr: 'سن مجهز متحرك',
    icon: '🏷️',
    color: '#14b8a6',
    textColor: 'text-teal-600 dark:text-teal-400',
    bgColor: 'bg-teal-50 dark:bg-teal-950/40',
    borderColor: 'border-teal-500',
    description: '3D printed model removable die prep',
    serviceCategories: ['mod']
  },
  {
    id: 'analog',
    label: 'Implant Analog',
    labelAr: 'أنالوج في النموذج',
    icon: '📍',
    color: '#f59e0b',
    textColor: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-950/40',
    borderColor: 'border-amber-500',
    description: 'Printed model laboratory analog receptor',
    serviceCategories: ['mod']
  },

  // --- Radiology Specific ---
  {
    id: 'impacted',
    label: 'Impacted Tooth',
    labelAr: 'سن مطمور',
    icon: '🔍',
    color: '#ec4899',
    textColor: 'text-pink-600 dark:text-pink-400',
    bgColor: 'bg-pink-50 dark:bg-pink-950/40',
    borderColor: 'border-pink-500',
    description: 'Impacted / unerupted 3rd molar or canine evaluation',
    serviceCategories: ['rep']
  },
  {
    id: 'pathology',
    label: 'Pathology / Radiolucency',
    labelAr: 'آفة ذروية / فحص',
    icon: '⚠️',
    color: '#dc2626',
    textColor: 'text-red-700 dark:text-red-400',
    bgColor: 'bg-red-50 dark:bg-red-950/40',
    borderColor: 'border-red-600',
    description: 'Periapical lesion or bone resorption focus',
    serviceCategories: ['rep']
  },

  // --- Provisional & Orthodontics ---
  {
    id: 'temp_crown',
    label: 'Temp Crown',
    labelAr: 'تاج مؤقت PMMA',
    icon: '⏳',
    color: '#3b82f6',
    textColor: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-950/40',
    borderColor: 'border-blue-500',
    description: 'Immediate load PMMA provisional crown',
    serviceCategories: ['restTemp']
  },
  {
    id: 'temp_bridge',
    label: 'Temp Bridge',
    labelAr: 'جسر مؤقت',
    icon: '⏱️',
    color: '#6366f1',
    textColor: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-50 dark:bg-indigo-950/40',
    borderColor: 'border-indigo-500',
    description: 'Immediate load multi-unit provisional bridge',
    serviceCategories: ['restTemp']
  },
  {
    id: 'attachment',
    label: 'Aligner Attachment',
    labelAr: 'أتاشمنت تقويم',
    icon: '🔘',
    color: '#10b981',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/40',
    borderColor: 'border-emerald-500',
    description: 'Composite resin engagement bump for clear aligners',
    serviceCategories: ['ortho']
  },
  {
    id: 'ipr',
    label: 'IPR Contact',
    labelAr: 'برد مابين الأسنان',
    icon: '↔️',
    color: '#8b5cf6',
    textColor: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-950/40',
    borderColor: 'border-purple-500',
    description: 'Interproximal enamel reduction site',
    serviceCategories: ['ortho']
  },
  {
    id: 'smile_design',
    label: 'Smile Design',
    labelAr: 'تصميم الابتسامة DSD',
    icon: '🪄',
    color: '#ec4899',
    textColor: 'text-pink-600 dark:text-pink-400',
    bgColor: 'bg-pink-50 dark:bg-pink-950/40',
    borderColor: 'border-pink-500',
    description: 'Digital 3D Smile Design aesthetic target tooth',
    serviceCategories: ['vr']
  }
];

export const SERVICE_PROCEDURES_MAP: Record<string, RestorationType[]> = {
  sg: ['implant', 'sleeve', 'anchor', 'bone_reduction', 'extraction'],
  tp: ['implant', 'crown', 'bridge', 'veneer', 'sinus_lift', 'nerve_trace', 'extraction'],
  conv: ['segmentation', 'implant', 'nerve_trace', 'extraction'],
  mod: ['die_prep', 'analog', 'extraction'],
  rep: ['impacted', 'pathology', 'sinus_lift', 'extraction'],
  restTemp: ['temp_crown', 'temp_bridge', 'extraction'],
  restFinal: ['crown', 'bridge', 'veneer', 'inlay', 'extraction'],
  vr: ['smile_design', 'veneer', 'crown', 'extraction'],
  ortho: ['attachment', 'ipr', 'extraction']
};

export const SERVICE_METADATA: Record<string, { name: string; nameAr: string; icon: string }> = {
  sg: { name: 'Surgical Guide (SG)', nameAr: 'دليل جراحي', icon: '🎯' },
  tp: { name: 'Treatment Plan (TP)', nameAr: 'خطة علاجية', icon: '📋' },
  conv: { name: 'DICOM Conversion', nameAr: 'تحويل DICOM', icon: '🔄' },
  mod: { name: 'Model Work (MOD)', nameAr: 'نماذج طباعة', icon: '📦' },
  rep: { name: 'Radiology Report', nameAr: 'تقرير أشعة', icon: '🔬' },
  restTemp: { name: 'Temp Restoration', nameAr: 'تركيبات مؤقتة', icon: '⏳' },
  restFinal: { name: 'Final Restoration', nameAr: 'تركيبات نهائية', icon: '👑' },
  vr: { name: 'Virtual Reality VR', nameAr: 'واقع افتراضي وتصميم', icon: '👓' },
  ortho: { name: 'Orthodontics & ISmile', nameAr: 'تقويم أسنان وقوالب', icon: '✨' }
};

/**
 * Returns available procedures filtered by active prescribed 3DDX services.
 * If no serviceIds given or 'all' is selected, returns all primary clinical procedures.
 */
export function getProceduresForServices(serviceIds?: string[]): RestorationMeta[] {
  if (!serviceIds || serviceIds.length === 0 || serviceIds.includes('all')) {
    return RESTORATION_TYPES;
  }

  const allowedIds = new Set<RestorationType>();
  serviceIds.forEach(srv => {
    const list = SERVICE_PROCEDURES_MAP[srv];
    if (list) {
      list.forEach(item => allowedIds.add(item));
    }
  });

  if (allowedIds.size === 0) {
    return RESTORATION_TYPES;
  }

  return RESTORATION_TYPES.filter(r => allowedIds.has(r.id));
}
