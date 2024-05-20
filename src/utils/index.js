const local = 'http://localhost:3000';
const server = 'https://calander-server.onrender.com';
const isServer = true;
export const useServerUrl = isServer ? server : local;
