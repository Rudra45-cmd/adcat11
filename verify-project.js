#!/usr/bin/env node

/**
 * AdGen - Complete Project Inventory
 * Run this to verify all files are present
 */

const fs = require('fs');
const path = require('path');

const requiredFilesCore = [
  // Frontend
  'frontend/index.html',
  'frontend/assets/css/styles.css',
  'frontend/assets/js/api.js',
  'frontend/assets/js/auth.js',
  'frontend/assets/js/app.js',

  // Documentation
  'README.md',
  'QUICKSTART.md',
  'PROJECT_SUMMARY.md',
  'LAUNCH_CHECKLIST.md',
  'CONFIG.md',
  'docs/API.md',
  'docs/DEPLOYMENT.md',
  'docs/CREDITS_SYSTEM.md',

  // Config
  'package.json',
  '.gitignore',
  'setup.sh',
];

const backendFiles = [
  'backend/package.json',
  'backend/.env.example',
  'backend/SQL_MIGRATION.sql',
  'backend/src/server.js',
  'backend/src/config/db.js',
  'backend/src/config/supabase.js',
  'backend/src/middleware/authMiddleware.js',
  'backend/src/middleware/rateLimiter.js',
  'backend/src/models/User.js',
  'backend/src/models/Credits.js',
  'backend/src/models/Generation.js',
  'backend/src/routes/auth.js',
  'backend/src/routes/generate.js',
  'backend/src/routes/payments.js',
  'backend/src/routes/user.js',
  'backend/src/services/AIService.js',
  'backend/src/services/PaymentService.js',
];

console.log('🔍 Checking AdGen Project Integrity...\n');

let totalCore = 0;
let foundCore = 0;

requiredFilesCore.forEach((file) => {
  totalCore++;
  const filePath = path.join(__dirname, file);
  const exists = fs.existsSync(filePath);
  const status = exists ? '✅' : '❌';
  console.log(`${status} ${file}`);
  if (exists) foundCore++;
});

// Backend: treat as optional/archived if an archive marker exists
const archiveMarker = path.join(__dirname, 'archive', 'backend', 'README.md');
const backendArchived = fs.existsSync(archiveMarker);

let backendFoundAll = true;
let backendFoundCount = 0;
backendFiles.forEach((file) => {
  const filePath = path.join(__dirname, file);
  const exists = fs.existsSync(filePath);
  const status = exists ? '✅' : '❌';
  console.log(`${status} ${file}`);
  if (!exists) backendFoundAll = false;
  if (exists) backendFoundCount++;
});

console.log(`\n${'='.repeat(50)}`);
console.log(`Core files: ${foundCore}/${totalCore}`);
if (backendArchived) {
  console.log('ℹ️ Backend archived at: archive/backend/README.md (treated as optional)');
} else {
  console.log(`Backend files found: ${backendFoundCount}/${backendFiles.length}`);
}

if (foundCore === totalCore) {
  console.log('✅ CORE FILES PRESENT.');
  if (!backendArchived && !backendFoundAll) {
    console.log('\n⚠️ Backend files are missing. If you need the backend, restore from another branch or the repo history.');
    process.exit(0);
  }
  console.log('\n✅ PROJECT READY (backend optional).\n');
  console.log('📖 Next Steps:');
  console.log('   1. Read QUICKSTART.md');
  console.log('   2. Run: bash setup.sh');
  console.log('   3. Configure .env files');
  console.log('   4. Deploy to production');
  process.exit(0);
} else {
  console.log('\n❌ Some core files are missing. Check above for details.\n');
  process.exit(1);
}
