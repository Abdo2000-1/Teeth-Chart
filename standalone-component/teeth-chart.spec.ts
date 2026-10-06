import { describe, it, expect } from 'vitest';
import { ODONTO_DATABASE, RESTORATION_TYPES } from './teeth-chart.constants';
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
    // Upper Right Central Incisor (8) and Upper Left Central Incisor (9) map to base 8
    expect(getBaseToothNumber(8)).toBe(8);
    expect(getBaseToothNumber(9)).toBe(8);

    // Upper Right 1st Molar (3) and Upper Left 1st Molar (14) map to base 3
    expect(getBaseToothNumber(3)).toBe(3);
    expect(getBaseToothNumber(14)).toBe(3);

    // Lower Right 1st Molar (30) and Lower Left 1st Molar (19) map to base 30
    expect(getBaseToothNumber(30)).toBe(30);
    expect(getBaseToothNumber(19)).toBe(30);
  });

  it('should define all 6 required clinical restorative modalities', () => {
    const ids = RESTORATION_TYPES.map(r => r.id);
    expect(ids).toContain('crown');
    expect(ids).toContain('bridge');
    expect(ids).toContain('veneer');
    expect(ids).toContain('implant');
    expect(ids).toContain('inlay');
    expect(ids).toContain('extraction');
  });

  it('should guarantee valid WCAG color tokens for every restoration', () => {
    RESTORATION_TYPES.forEach(res => {
      expect(res.color).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(res.bgColor).toBeTruthy();
      expect(res.textColor).toBeTruthy();
      expect(res.borderColor).toBeTruthy();
    });
  });
});
