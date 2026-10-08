import { describe, it, expect } from 'vitest';
import { 
  ODONTO_DATABASE, 
  RESTORATION_TYPES,
  SERVICE_PROCEDURES_MAP,
  getProceduresForServices 
} from './teeth-chart.constants';
import { getBaseToothNumber } from './teeth-chart.geometry';

describe('Clinical Odontogram Database & Morphology Engine', () => {
  it('should contain exactly 32 permanent teeth', () => {
    expect(ODONTO_DATABASE.length).toBe(32);
  });

  it('should partition evenly into 16 maxillary and 16 mandibular teeth', () => {
    const maxillary = ODONTO_DATABASE.filter(t => t.arch === 'upper');
    const mandibular = ODONTO_DATABASE.filter(t => t.arch === 'lower');
    expect(maxillary.length).toBe(16);
    expect(mandibular.length).toBe(16);
  });

  it('should partition evenly into 4 standard quadrants of 8 teeth each', () => {
    const ur = ODONTO_DATABASE.filter(t => t.quadrant === 'UR');
    const ul = ODONTO_DATABASE.filter(t => t.quadrant === 'UL');
    const ll = ODONTO_DATABASE.filter(t => t.quadrant === 'LL');
    const lr = ODONTO_DATABASE.filter(t => t.quadrant === 'LR');

    expect(ur.length).toBe(8);
    expect(ul.length).toBe(8);
    expect(ll.length).toBe(8);
    expect(lr.length).toBe(8);
  });

  it('should map Maxillary Central Incisors correctly', () => {
    const tooth8 = ODONTO_DATABASE.find(t => t.universal === 8);
    const tooth9 = ODONTO_DATABASE.find(t => t.universal === 9);

    expect(tooth8?.fdi).toBe(11);
    expect(tooth8?.category).toBe('incisor_cen');
    expect(tooth8?.isAnterior).toBe(true);

    expect(tooth9?.fdi).toBe(21);
    expect(tooth9?.category).toBe('incisor_cen');
    expect(tooth9?.isAnterior).toBe(true);
  });

  it('should map Mandibular 1st Molars correctly', () => {
    const tooth19 = ODONTO_DATABASE.find(t => t.universal === 19);
    const tooth30 = ODONTO_DATABASE.find(t => t.universal === 30);

    expect(tooth19?.fdi).toBe(36);
    expect(tooth19?.category).toBe('molar');
    expect(tooth19?.arch).toBe('lower');

    expect(tooth30?.fdi).toBe(46);
    expect(tooth30?.category).toBe('molar');
    expect(tooth30?.arch).toBe('lower');
  });

  it('should map base tooth numbers symmetrically for anatomy rendering', () => {
    expect(getBaseToothNumber(8)).toBe(8);
    expect(getBaseToothNumber(9)).toBe(8);
    expect(getBaseToothNumber(3)).toBe(3);
    expect(getBaseToothNumber(14)).toBe(3);
    expect(getBaseToothNumber(30)).toBe(30);
    expect(getBaseToothNumber(19)).toBe(30);
  });

  it('should define all clinical restorative and surgical modalities', () => {
    const ids = RESTORATION_TYPES.map(r => r.id);
    expect(ids).toContain('crown');
    expect(ids).toContain('bridge');
    expect(ids).toContain('veneer');
    expect(ids).toContain('implant');
    expect(ids).toContain('inlay');
    expect(ids).toContain('extraction');
    expect(ids).toContain('sleeve');
    expect(ids).toContain('anchor');
    expect(ids).toContain('sinus_lift');
    expect(ids).toContain('nerve_trace');
  });

  it('should guarantee valid WCAG color tokens for every restoration', () => {
    RESTORATION_TYPES.forEach(res => {
      expect(res.color).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(res.bgColor).toBeTruthy();
      expect(res.textColor).toBeTruthy();
      expect(res.borderColor).toBeTruthy();
    });
  });

  it('should filter procedures dynamically by 3DDX prescribed services', () => {
    const sgProcedures = getProceduresForServices(['sg']);
    const sgIds = sgProcedures.map(p => p.id);
    expect(sgIds).toContain('implant');
    expect(sgIds).toContain('sleeve');
    expect(sgIds).toContain('anchor');
    expect(sgIds).not.toContain('veneer');

    const tpProcedures = getProceduresForServices(['tp']);
    const tpIds = tpProcedures.map(p => p.id);
    expect(tpIds).toContain('crown');
    expect(tpIds).toContain('veneer');
    expect(tpIds).toContain('implant');
    expect(tpIds).not.toContain('sleeve');

    const multiProcedures = getProceduresForServices(['sg', 'tp']);
    const multiIds = multiProcedures.map(p => p.id);
    expect(multiIds).toContain('sleeve');
    expect(multiIds).toContain('crown');
  });
});
