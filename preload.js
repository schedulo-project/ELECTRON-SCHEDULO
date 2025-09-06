const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronBridge', {
  getAppInfo: async () => ({
    version: process.env.npm_package_version,
    platform: process.platform,
  }),
});