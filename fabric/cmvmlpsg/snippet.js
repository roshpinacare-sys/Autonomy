const { EventEmitter } = require('events');

class LoadBalancer extends EventEmitter {
  constructor() {
    super();
    this.replicas = new Map(); // replicaId => { status: 'active'|'overloaded'|'offline', load: number, lastHeartbeat: Date }
    this.requestQueue = [];
    this.priorityLevels = {
      high: 3,
      medium: 2,
      low: 1
    };
    this.loadThreshold = 0.8; // 80% load before considered overloaded
    this.healthCheckInterval = 30000; // 30 seconds
    
    // Start health check loop
    setInterval(() => this.checkReplicaHealth(), this.healthCheckInterval);
  }
  
  // Add a new replica to the load balancer
  addReplica(replicaId, capacity = 100) {
    this.replicas.set(replicaId, {
      status: 'active',
      capacity,
      currentLoad: 0,
      lastHeartbeat: new Date(),
      responseTime: 0,
      errorRate: 0
    });
    this.emit('replicaAdded', replicaId);
  }
  
  // Remove a replica
  removeReplica(replicaId) {
    if (this.replicas.has(replicaId)) {
      this.replicas.delete(replicaId);
      this.emit('replicaRemoved', replicaId);
    }
  }
  
  // Update replica load metrics
  updateReplicaLoad(replicaId, loadDelta, responseTime, errorRate = 0) {
    const replica = this.replicas.get(replicaId);
    if (replica) {
      replica.currentLoad = Math.max(0, Math.min(replica.capacity, replica.currentLoad + loadDelta));
      replica.responseTime = responseTime;
      replica.errorRate = errorRate;
      replica.lastHeartbeat = new Date();
      
      // Update status based on load
      if (replica.currentLoad / replica.capacity > this.loadThreshold) {
        replica.status = 'overloaded';
      } else if (replica.currentLoad === 0) {
        replica.status = 'active';
      }
      
      this.emit('loadUpdated', { replicaId, load: replica.currentLoad });
    }
  }
  
  // Check replica health
  checkReplicaHealth() {
    const now = new Date();
    for (const [replicaId, replica] of this.replicas) {
      // If no heartbeat for 2 intervals, mark as offline
      if (now - replica.lastHeartbeat > this.healthCheckInterval * 2) {
        replica.status = 'offline';
        this.emit('replicaOffline', replicaId);
      }
    }
  }
  
  // Submit a request to be processed
  submitRequest(requestType, priority = 'medium', payload) {
    const priorityValue = this.priorityLevels[priority] || this.priorityLevels.medium;
    this.requestQueue.push({
      id: Date.now() + Math.random(),
      type: requestType,
      priority: priorityValue,
      payload,
      timestamp: new Date()
    });
    
    // Sort queue by priority
    this.requestQueue.sort((a, b) => b.priority - a.priority);
    
    // Try to process immediately
    this.processNextRequest();
  }
  
  // Process the next request in queue
  processNextRequest() {
    if (this.requestQueue.length === 0) return;
    
    // Find the best replica for this request
    const request = this.requestQueue[0];
    const bestReplica = this.selectBestReplica(request);
    
    if (bestReplica) {
      // Remove from queue
      this.requestQueue.shift();
      
      // Simulate processing
      this.emit('requestAssigned', {
        requestId: request.id,
        replicaId: bestReplica,
        requestType: request.type
      });
      
      // In a real implementation, this would be an async operation
      // Here we'll simulate it with a timeout
      setTimeout(() => {
        const responseTime = Math.random() * 500 + 100; // 100-600ms
        const success = Math.random() > 0.05; // 95% success rate
        
        if (success) {
          // Update load metrics
          this.updateReplicaLoad(bestReplica, 1, responseTime);
          this.emit('requestCompleted', {
            requestId: request.id,
            replicaId: bestReplica,
            responseTime
          });
        } else {
          // Handle error
          const errorRate = this.replicas.get(bestReplica).errorRate + 0.01;
          this.updateReplicaLoad(bestReplica, 0, responseTime, errorRate);
          this.emit('requestFailed', {
            requestId: request.id,
            replicaId: bestReplica,
            error: 'Processing error'
          });
          
          // Re-queue the request with lower priority
          request.priority = Math.max(1, request.priority - 1);
          this.requestQueue.push(request);
          this.requestQueue.sort((a, b) => b.priority - a.priority);
        }
        
        // Process next request
        this.processNextRequest();
      }, 100);
    }
  }
  
  // Select the best replica for a request
  selectBestReplica(request) {
    const activeReplicas = Array.from(this.replicas.entries())
      .filter(([_, replica]) => replica.status === 'active');
    
    if (activeReplicas.length === 0) return null;
    
    // Score each replica based on multiple factors
    const scoredReplicas = activeReplicas.map(([replicaId, replica]) => {
      // Load factor (lower is better)
      const loadScore = 1 - (replica.currentLoad / replica.capacity);
      
      // Response time factor (lower is better)
      const responseScore = 1 - Math.min(1, replica.responseTime / 1000);
      
      // Error rate factor (lower is better)
      const errorScore = 1 - Math.min(1, replica.errorRate);
      
      // Type-specific preference (if implemented)
      const typeScore = this.getRequestTypeScore(replicaId, request.type);
      
      // Weighted overall score
      const totalScore = (
        loadScore * 0.4 +
        responseScore * 0.3 +
        errorScore * 0.2 +
        typeScore * 0.1
      );
      
      return { replicaId, score: totalScore };
    });
    
    // Sort by score and return the best
    scoredReplicas.sort((a, b) => b.score - a.score);
    return scoredReplicas[0].replicaId;
  }
  
  // Get type-specific score for a replica (can be overridden)
  getRequestTypeScore(replicaId, requestType) {
    // Default implementation - no preference
    return 0.5;
  }
  
  // Get current status of the load balancer
  getStatus() {
    const status = {
      replicas: {},
      queueLength: this.requestQueue.length,
      loadDistribution: {}
    };
    
    for (const [replicaId, replica] of this.replicas) {
      status.replicas[replicaId] = {
        status: replica.status,
        load: replica.currentLoad,
        capacity: replica.capacity,
        utilization: replica.currentLoad / replica.capacity,
        responseTime: replica.responseTime,
        errorRate: replica.errorRate,
        lastHeartbeat: replica.lastHeartbeat
      };
      
      status.loadDistribution[replicaId] = replica.currentLoad;
    }
    
    return status;
  }
}

// API for managing the load balancer
class LoadBalancerAPI {
  constructor(loadBalancer) {
    this.loadBalancer = loadBalancer;
    this.routes = {
      '/replicas': {
        GET: () => this.getReplicas(),
        POST: (req) => this.addReplica(req.body)
      },
      '/replicas/:id': {
        DELETE: (req) => this.removeReplica(req.params.id),
        PUT: (req) => this.updateReplica(req.params.id, req.body)
      },
      '/requests': {
        POST: (req) => this.submitRequest(req.body)
      },
      '/status': {
        GET: () => this.getStatus()
      },
      '/config': {
        GET: () => this.getConfig(),
        PUT: (req) => this.updateConfig(req.body)
      }
    };
  }
  
  // Route a request to the appropriate handler
  handleRequest(method, path, data) {
    const pathParts = path.split('/');
    let route = this.routes;
    
    for (const part of pathParts) {
      if (route[part]) {
        route = route[part];
      } else if (route[':id']) {
        route = route[':id'];
        this.paramId = part;
      } else {
        return { error: 'Route not found' };
      }
    }
    
    if (route[method]) {
      return route[method]({ body: data, params: { id: this.paramId } });
    } else {
      return { error: 'Method not allowed' };
    }
  }
  
  // API endpoint handlers
  getReplicas() {
    return Array.from(this.loadBalancer.replicas.entries()).map(([id, replica]) => ({
      id,
      status: replica.status,
      load: replica.currentLoad,
      capacity: replica.capacity,
      utilization: replica.currentLoad / replica.capacity
    }));
  }
  
  addReplica(data) {
    if (!data.id || !data.capacity) {
      return { error: 'Missing required fields: id, capacity' };
    }
    
    this.loadBalancer.addReplica(data.id, data.capacity);
    return { success: true, id: data.id };
  }
  
  removeReplica(id) {
    this.loadBalancer.removeReplica(id);
    return { success: true };
  }
  
  updateReplica(id, data) {
    if (!this.loadBalancer.replicas.has(id)) {
      return { error: 'Replica not found' };
    }
    
    const replica = this.loadBalancer.replicas.get(id);
    if (data.capacity !== undefined) replica.capacity = data.capacity;
    if (data.status !== undefined) replica.status = data.status;
    
    return { success: true };
  }
  
  submitRequest(data) {
    if (!data.type || !data.priority) {
      return { error: 'Missing required fields: type, priority' };
    }
    
    this.loadBalancer.submitRequest(data.type, data.priority, data.payload);
    return { success: true };
  }
  
  getStatus() {
    return this.loadBalancer.getStatus();
  }
  
  getConfig() {
    return {
      loadThreshold: this.loadBalancer.loadThreshold,
      healthCheckInterval: this.loadBalancer.healthCheckInterval,
      priorityLevels: this.loadBalancer.priorityLevels
    };
  }
  
  updateConfig(data) {
    if (data.loadThreshold !== undefined) {
      this.loadBalancer.loadThreshold = data.loadThreshold;
    }
    if (data.healthCheckInterval !== undefined) {
      this.loadBalancer.healthCheckInterval = data.healthCheckInterval;
    }
    if (data.priorityLevels !== undefined) {
      this.loadBalancer.priorityLevels = data.priorityLevels;
    }
    
    return { success: true };
  }
}

// Example usage
const loadBalancer = new LoadBalancer();
const api = new LoadBalancerAPI(loadBalancer);

// Add some replicas
loadBalancer.addReplica('replica-1', 100);
loadBalancer.addReplica('replica-2', 80);
loadBalancer.addReplica('replica-3', 120);

// Submit some requests
loadBalancer.submitRequest('compute', 'high', { data: 'task1' });
loadBalancer.submitRequest('compute', 'medium', { data: 'task2' });
loadBalancer.submitRequest('compute', 'low', { data: 'task3' });
loadBalancer.submitRequest('compute', 'high', { data: 'task4' });

// Simulate load updates
setTimeout(() => {
  loadBalancer.updateReplicaLoad('replica-1', 20, 150, 0.01);
  loadBalancer.updateReplicaLoad('replica-2', 40, 300, 0.02);
  loadBalancer.updateReplicaLoad('replica-3', 60, 200, 0.01);
}, 1000);

// Get status
console.log('Initial status:', loadBalancer.getStatus());

// API example
console.log('\nAPI Example:');
console.log('Add replica:', api.handleRequest('POST', '/replicas', { id: 'replica-4', capacity: 90 }));
console.log('Get replicas:', api.handleRequest('GET', '/replicas', null));
console.log('Submit request:', api.handleRequest('POST', '/requests', { type: 'compute', priority: 'high' }));
console.log('Get status:', api.handleRequest('GET', '/status', null));

// Export for use in Autonomy
module.exports = { LoadBalancer, LoadBalancerAPI };