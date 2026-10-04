module.exports = {
  apps: [
    {
      name: 'datatech-ai',
      cwd: '/home/barrera/orca/projects/datatech-ai',
      script: 'npm',
      args: 'run dev -- --host 127.0.0.1 --port 5177 --strictPort',
      interpreter: 'none',
      env: {
        NODE_ENV: 'production',
      },
      max_restarts: 10,
      restart_delay: 3000,
    },
    {
      name: 'datatech-ai-api',
      cwd: '/home/barrera/orca/projects/datatech-ai/server',
      script: 'server.js',
      env: {
        PORT: 3010,
        NODE_ENV: 'production',
      },
      max_restarts: 10,
      restart_delay: 3000,
    },
  ],
}