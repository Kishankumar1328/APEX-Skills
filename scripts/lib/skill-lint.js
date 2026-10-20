/**
 * skill-lint.js
 * Core validation logic for skill directories, frontmatter, and standard sections.
 */
const fs = require('fs');
const path = require('path');

function lintSkill(dirName, skillsDir) {
  const errors = [];
  const warnings = [];
  const skillFile = path.join(skillsDir, dirName, 'SKILL.md');

  if (!fs.existsSync(skillFile)) {
    errors.push(`Missing SKILL.md in ${dirName}`);
    return { errors, warnings };
  }

  const content = fs.readFileSync(skillFile, 'utf8');
  if (!content.startsWith('---')) {
    errors.push(`${dirName}/SKILL.md missing frontmatter start delimiter '---'`);
  }
  if (!content.includes('name:') || !content.includes('description:')) {
    errors.push(`${dirName}/SKILL.md missing 'name:' or 'description:' in frontmatter`);
  }

  // Check recommended sections
  const requiredHeadings = ['## Overview', '## When to Use', '## Common Rationalizations', '## Red Flags', '## Verification'];
  for (const h of requiredHeadings) {
    if (!content.includes(h)) {
      warnings.push(`${dirName}/SKILL.md missing recommended section '${h}'`);
    }
  }

  return { errors, warnings };
}

module.exports = { lintSkill };
