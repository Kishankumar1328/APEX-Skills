/**
 * validate-apex-skills.js
 * Validates frontmatter, directory layout, specialist references,
 * and markdown integrity of APEX skills.
 */
const fs = require('fs');
const path = require('path');

const SKILLS_ROOT = path.resolve(__dirname, '..', 'skills');

function validateMarkdownFile(filePath, label) {
  const content = fs.readFileSync(filePath, 'utf8');
  const errors = [];
  if (/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/.test(content)) {
    errors.push(`${label} contains unsupported control characters`);
  }
  const fences = content.match(/^```/gm) || [];
  if (fences.length % 2 !== 0) {
    errors.push(`${label} has unbalanced Markdown code fences`);
  }
  return errors;
}

function validateSkillDir(skillName, expectedSpecialistsCount) {
  const dir = path.join(SKILLS_ROOT, skillName);
  const skillFile = path.join(dir, 'SKILL.md');
  const specialistsDir = path.join(dir, 'specialists');

  const errors = [];

  if (!fs.existsSync(skillFile)) {
    errors.push(`Missing SKILL.md in ${skillName}`);
  } else {
    const content = fs.readFileSync(skillFile, 'utf8');
    if (!content.startsWith('---')) {
      errors.push(`${skillName}/SKILL.md missing frontmatter start delimiter '---'`);
    }
    if (!content.includes('name:') || !content.includes('description:')) {
      errors.push(`${skillName}/SKILL.md missing 'name:' or 'description:' in frontmatter`);
    }
    errors.push(...validateMarkdownFile(skillFile, `${skillName}/SKILL.md`));
  }

  if (!fs.existsSync(specialistsDir)) {
    errors.push(`Missing specialists directory in ${skillName}`);
  } else {
    const files = fs.readdirSync(specialistsDir).filter(f => f.endsWith('.md'));
    if (files.length !== expectedSpecialistsCount) {
      errors.push(`${skillName} expected ${expectedSpecialistsCount} specialists, found ${files.length}`);
    }
  }

  return errors;
}

console.log('=== Validating APEX Framework Skills ===\n');
let hasErrors = false;

const devErrors = validateSkillDir('developer-skill', 7);
if (devErrors.length === 0) {
  console.log('  [PASS] developer-skill (7 specialists verified)');
} else {
  hasErrors = true;
  console.log('  [FAIL] developer-skill:');
  devErrors.forEach(e => console.log('    - ' + e));
}

const testErrors = validateSkillDir('testing-skill', 11);
if (testErrors.length === 0) {
  console.log('  [PASS] testing-skill (11 specialists verified)');
} else {
  hasErrors = true;
  console.log('  [FAIL] testing-skill:');
  testErrors.forEach(e => console.log('    - ' + e));
}

// Check defect handoff contract & platform compatibility
const contractPath = path.join(SKILLS_ROOT, 'defect-handoff-contract.md');
const compatPath = path.join(SKILLS_ROOT, 'PLATFORM-COMPATIBILITY.md');

if (fs.existsSync(contractPath)) {
  const errors = validateMarkdownFile(contractPath, 'defect-handoff-contract.md');
  if (errors.length > 0) {
    hasErrors = true;
    errors.forEach(error => console.log(`  [FAIL] ${error}`));
  } else {
    console.log('  [PASS] defect-handoff-contract.md exists and has valid Markdown structure');
  }
} else {
  hasErrors = true;
  console.log('  [FAIL] Missing defect-handoff-contract.md');
}

if (fs.existsSync(compatPath)) {
  const errors = validateMarkdownFile(compatPath, 'PLATFORM-COMPATIBILITY.md');
  if (errors.length > 0) {
    hasErrors = true;
    errors.forEach(error => console.log(`  [FAIL] ${error}`));
  } else {
    console.log('  [PASS] PLATFORM-COMPATIBILITY.md exists and has valid Markdown structure');
  }
} else {
  hasErrors = true;
  console.log('  [FAIL] Missing PLATFORM-COMPATIBILITY.md');
}

if (hasErrors) {
  console.log('\nResult: VALIDATION FAILED');
  process.exit(1);
} else {
  console.log('\nResult: ALL SKILL STRUCTURES VALIDATED SUCCESSFULLY');
  process.exit(0);
}
