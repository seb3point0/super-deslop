/**
 * Super Deslop plugin for OpenCode.ai
 */

import path from 'node:path';
import os from 'node:os';
import { buildBootstrapContent, normalizePath } from '../../src/bootstrap.js';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export const SuperDeslopPlugin = async ({ client, directory }) => {
  const homeDir = os.homedir();
  const bridgeSkillsDir = path.resolve(__dirname, '../../skills');
  const envConfigDir = normalizePath(process.env.OPENCODE_CONFIG_DIR, homeDir);
  const configDir = envConfigDir || path.join(homeDir, '.config/opencode');

  return {
    config: async (config) => {
      config.skills = config.skills || {};
      config.skills.paths = config.skills.paths || [];
      if (!config.skills.paths.includes(bridgeSkillsDir)) {
        config.skills.paths.push(bridgeSkillsDir);
      }
    },
    'experimental.chat.system.transform': async (_input, output) => {
      const bootstrap = buildBootstrapContent(
        path.join(configDir, 'skills/super-deslop'),
      );
      (output.system ||= []).push(bootstrap);
    },
  };
};
