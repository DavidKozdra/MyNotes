
// plugin-system.js
const plugins = [];

function registerPlugin(plugin) {
  plugins.push(plugin);
}

function applyPlugins(coreApp) {
  for (const plugin of plugins) {
    plugin(coreApp);
  }
  return coreApp;
}

module.exports = { registerPlugin, applyPlugins };
