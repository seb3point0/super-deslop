/**
 * Super Deslop plugin for OpenCode.ai
 *
 * On first load, auto-installs Python dependencies (desloppify, desloppify-api)
 * so the user only needs to add the plugin to opencode.json.
 */

import path from 'node:path';
import os from 'node:os';
import { execSync } from 'node:child_process';
import { buildBootstrapContent, normalizePath } from '../../src/bootstrap.js';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

/**
 * Check whether a Python package is importable.
 */
function isPythonPackageInstalled(packageImportName) {
  try {
    execSync(`python3 -c "import ${packageImportName}"`, {
      stdio: 'ignore',
      timeout: 10_000,
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Install a pip package if not already present.
 * Returns true if install succeeded or was already present.
 */
function ensurePipPackage(pipSpec, importName) {
  if (isPythonPackageInstalled(importName)) return true;
  try {
    execSync(`pip install ${pipSpec}`, {
      stdio: 'pipe',
      timeout: 120_000,
    });
    return true;
  } catch {
    // Try pip3 as fallback
    try {
      execSync(`pip3 install ${pipSpec}`, {
        stdio: 'pipe',
        timeout: 120_000,
      });
      return true;
    } catch {
      return false;
    }
  }
}

/**
 * Auto-install all Python dependencies on plugin load.
 */
function bootstrapPythonDeps() {
  const deps = [
    { pip: '"desloppify[full]"', importName: 'desloppify' },
    {
      pip: 'git+https://github.com/seb3point0/desloppify-api.git',
      importName: 'desloppify_api',
    },
  ];
  const results = [];
  for (const dep of deps) {
    const ok = ensurePipPackage(dep.pip, dep.importName);
    results.push({ name: dep.importName, installed: ok });
  }
  return results;
}

export const SuperDeslopPlugin = async ({ client, directory }) => {
  const homeDir = os.homedir();
  const bridgeSkillsDir = path.resolve(__dirname, '../../skills');
  const envConfigDir = normalizePath(process.env.OPENCODE_CONFIG_DIR, homeDir);
  const configDir = envConfigDir || path.join(homeDir, '.config/opencode');

  // Auto-install Python deps on plugin load
  const depResults = bootstrapPythonDeps();
  const allInstalled = depResults.every((d) => d.installed);

  return {
    config: async (config) => {
      config.skills = config.skills || {};
      config.skills.paths = config.skills.paths || [];
      if (!config.skills.paths.includes(bridgeSkillsDir)) {
        config.skills.paths.push(bridgeSkillsDir);
      }
    },
    'experimental.chat.system.transform': async (_input, output) => {
      let bootstrap = buildBootstrapContent(
        path.join(configDir, 'skills/super-deslop'),
      );
      if (!allInstalled) {
        const missing = depResults
          .filter((d) => !d.installed)
          .map((d) => d.name)
          .join(', ');
        bootstrap += `\n\nWARNING: Failed to auto-install Python dependencies: ${missing}. Run manually:\n  pip install "desloppify[full]"\n  pip install git+https://github.com/seb3point0/desloppify-api.git\n`;
      }
      (output.system ||= []).push(bootstrap);
    },
  };
};
