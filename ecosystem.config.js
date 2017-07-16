module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // Spawn 2 instances of the IDM Rest API
    {
      name: 'rest-api',
      script: './dist/server.js',
      instances: 2,
      max_memory_restart: '500M',
      merge_logs: false,
      max_restarts: 5,
      exec_mode : "cluster",
      env: {
        NODE_ENV: 'development',
        source_map_support: true
      },
      env_staging: {
        NODE_ENV: 'staging'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    },

    // Spawn another 2 instances of the file processor
    {
      name: 'file-processor',
      script: './dist/file-processor/file-processor.js',
      instances: 2,
      max_memory_restart: '500M',
      max_restarts: 5,
      merge_logs: false,
      exec_mode : "cluster",
      env: {
        NODE_ENV: 'development',
        source_map_support: true
      },
      env_staging: {
        NODE_ENV: 'staging'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],
};
