import fs from 'node:fs';
import path from 'node:path';

class HiveAPIKeyManager {
  constructor() {
    this.keysFile = path.join(process.cwd(), 'state', 'api-keys.json');
    this.logsFile = path.join(process.cwd(), 'state', 'api-logs.jsonl');
    this.ensureFilesExist();
  }

  ensureFilesExist() {
    if (!fs.existsSync(this.keysFile)) {
      fs.writeFileSync(this.keysFile, JSON.stringify({
        schema: 'hive-api-keys/1',
        keys: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }, null, 2));
    }
    
    if (!fs.existsSync(this.logsFile)) {
      fs.writeFileSync(this.logsFile, '');
    }
  }

  generateKey() {
    return 'hive_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  createKey(name, permissions = ['read']) {
    const keys = this.loadKeys();
    const newKey = {
      id: Date.now().toString(),
      name,
      key: this.generateKey(),
      permissions,
      createdAt: new Date().toISOString(),
      lastUsed: null,
      active: true
    };
    
    keys.keys.push(newKey);
    this.saveKeys(keys);
    this.logActivity('key_created', { keyId: newKey.id, name });
    return newKey;
  }

  revokeKey(keyId) {
    const keys = this.loadKeys();
    const keyIndex = keys.keys.findIndex(k => k.id === keyId);
    
    if (keyIndex === -1) {
      throw new Error('Key not found');
    }
    
    keys.keys[keyIndex].active = false;
    keys.keys[keyIndex].revokedAt = new Date().toISOString();
    this.saveKeys(keys);
    this.logActivity('key_revoked', { keyId });
    return keys.keys[keyIndex];
  }

  getActiveKeys() {
    const keys = this.loadKeys();
    return keys.keys.filter(k => k.active);
  }

  loadKeys() {
    try {
      return JSON.parse(fs.readFileSync(this.keysFile, 'utf8'));
    } catch (error) {
      console.error('Error loading API keys:', error);
      return { schema: 'hive-api-keys/1', keys: [], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    }
  }

  saveKeys(keys) {
    keys.updatedAt = new Date().toISOString();
    fs.writeFileSync(this.keysFile, JSON.stringify(keys, null, 2));
  }

  logActivity(action, details) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      action,
      details
    };
    
    fs.appendFileSync(this.logsFile, JSON.stringify(logEntry) + '\n');
  }

  validateKey(apiKey) {
    const keys = this.loadKeys();
    const key = keys.keys.find(k => k.key === apiKey && k.active);
    
    if (!key) {
      this.logActivity('key_validation_failed', { apiKey });
      return false;
    }
    
    key.lastUsed = new Date().toISOString();
    this.saveKeys(keys);
    this.logActivity('key_validation_success', { keyId: key.id });
    return true;
  }
}

// Integration with estate-redboard.mjs
export function authenticateHiveRequest(apiKey) {
  const keyManager = new HiveAPIKeyManager();
  return keyManager.validateKey(apiKey);
}

// API Key Management Interface
export const apiKeyManager = new HiveAPIKeyManager();

// CLI-like functions for direct usage
export function createAPIKey(name, permissions = ['read']) {
  return apiKeyManager.createKey(name, permissions);
}

export function revokeAPIKey(keyId) {
  return apiKeyManager.revokeKey(keyId);
}

export function listAPIKeys() {
  return apiKeyManager.getActiveKeys();
}

// Example usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const command = process.argv[2];
  
  switch (command) {
    case 'create':
      const name = process.argv[3] || 'default';
      const permissions = process.argv[4] ? process.argv[4].split(',') : ['read'];
      console.log('Creating API key:', createAPIKey(name, permissions));
      break;
      
    case 'revoke':
      const keyId = process.argv[3];
      if (!keyId) {
        console.error('Please provide a key ID to revoke');
        process.exit(1);
      }
      console.log('Revoking API key:', revokeAPIKey(keyId));
      break;
      
    case 'list':
      console.log('Active API keys:', listAPIKeys());
      break;
      
    default:
      console.log('Usage:');
      console.log('  node hive-api-keys.mjs create [name] [permissions]');
      console.log('  node hive-api-keys.mjs revoke [keyId]');
      console.log('  node hive-api-keys.mjs list');
  }
}