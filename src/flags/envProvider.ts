import { FeatureFlagProvider, FlagContext } from './types';

/**
 * Environment provider:
 *  - Reads boolean from `FF_<FLAG_NAME>` (e.g. FF_POLYANDROME_ENABLED=true)
 *  - Defaults to false when missing
 */
export class EnvFlagProvider implements FeatureFlagProvider {
  async isEnabled(flag: string, _ctx?: FlagContext): Promise<boolean> {
    const key = `FF_${flag.toUpperCase()}`;
    const val = process.env[key];
    if (!val) return false;
    return ['1', 'true', 'on', 'yes'].includes(val.toLowerCase());
  }
}
