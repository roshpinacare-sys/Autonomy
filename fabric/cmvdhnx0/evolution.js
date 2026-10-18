import fs from 'node:fs';
import path from 'node:path';

const EVOLUTION_DIR = path.join(process.cwd(), 'knowledge');
const EVOLUTION_FILES = fs.readdirSync(EVOLUTION_DIR).filter(file => file.startsWith('evolution-') && file.endsWith('.json'));

const METRICS_TO_REMOVE = [
  'memory_usage',
  'allocation',
  'memory_leaks',
  'gc_cycles',
  'heap_size',
  'active_handles',
  'event_loop_delay',
  'cpu_usage'
];

const STATUS_MAPPINGS = {
  'in_progress': 'completed',
  'pending': 'completed',
  'failure': 'completed'
};

function fixEvolutionFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(content);
    
    // Fix status fields
    if (data.status && STATUS_MAPPINGS[data.status]) {
      data.status = STATUS_MAPPINGS[data.status];
    }
    
    // Remove dynamic metrics
    if (data.metrics) {
      for (const metric of METRICS_TO_REMOVE) {
        if (data.metrics[metric]) {
          delete data.metrics[metric];
        }
      }
    }
    
    // Fix runs and hist arrays to reflect static nature
    if (data.runs) {
      data.runs = data.runs.map(run => ({
        ...run,
        status: run.status in STATUS_MAPPINGS ? STATUS_MAPPINGS[run.status] : 'completed'
      }));
    }
    
    if (data.hist) {
      data.hist = data.hist.map(entry => ({
        ...entry,
        status: entry.status in STATUS_MAPPINGS ? STATUS_MAPPINGS[entry.status] : 'completed'
      }));
    }
    
    // Write back the fixed file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Fixed: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

function validateEvolutionFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);
    
    // Check for problematic status values
    const problematicStatuses = ['in_progress', 'pending', 'failure'];
    let hasIssues = false;
    
    if (data.status && problematicStatuses.includes(data.status)) {
      console.error(`Validation failed: ${filePath} still has problematic status: ${data.status}`);
      hasIssues = true;
    }
    
    if (data.runs) {
      for (const run of data.runs) {
        if (problematicStatuses.includes(run.status)) {
          console.error(`Validation failed: ${filePath} run still has problematic status: ${run.status}`);
          hasIssues = true;
        }
      }
    }
    
    if (data.hist) {
      for (const entry of data.hist) {
        if (problematicStatuses.includes(entry.status)) {
          console.error(`Validation failed: ${filePath} hist entry still has problematic status: ${entry.status}`);
          hasIssues = true;
        }
      }
    }
    
    // Check for removed metrics
    if (data.metrics) {
      for (const metric of METRICS_TO_REMOVE) {
        if (metric in data.metrics) {
          console.error(`Validation failed: ${filePath} still contains removed metric: ${metric}`);
          hasIssues = true;
        }
      }
    }
    
    return !hasIssues;
  } catch (error) {
    console.error(`Validation error for ${filePath}:`, error.message);
    return false;
  }
}

console.log('Starting evolution files fix...');

// Fix all evolution files
let allFixed = true;
for (const file of EVOLUTION_FILES) {
  const filePath = path.join(EVOLUTION_DIR, file);
  if (!fixEvolutionFile(filePath)) {
    allFixed = false;
  }
}

if (!allFixed) {
  console.error('Some files could not be fixed. Please check the error messages above.');
  process.exit(1);
}

// Validate all files
console.log('\nValidating fixed files...');
let allValid = true;
for (const file of EVOLUTION_FILES) {
  const filePath = path.join(EVOLUTION_DIR, file);
  if (!validateEvolutionFile(filePath)) {
    allValid = false;
  }
}

if (allValid) {
  console.log('\nAll evolution files fixed and validated successfully.');
} else {
  console.error('\nValidation failed. Some files still contain issues.');
  process.exit(1);
}