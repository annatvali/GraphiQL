import { describe, it, expect } from 'vitest';
import { teamMembers } from '@/app/data/teamMembers';

describe('teamMembers', () => {
  it('should have the correct number of members', () => {
    expect(teamMembers).toHaveLength(3);
  });

  it('should have members with valid properties', () => {
    teamMembers.forEach((member) => {
      expect(member).toHaveProperty('id');
      expect(member).toHaveProperty('photo');
      expect(['valeriya', 'ana', 'alex']).toContain(member.id);
      expect(typeof member.photo).toBe('string');
      expect(member.photo).toMatch(/^\/.+\.jpg$/);
    });
  });

  it('should have unique ids for each member', () => {
    const ids = teamMembers.map((member) => member.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});
