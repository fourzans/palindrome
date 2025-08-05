import { EnvFlagProvider } from './envProvider';
import { FeatureFlagProvider, FlagContext } from './types';

const providers: FeatureFlagProvider[] = [
  new EnvFlagProvider()
];

export async function isFlagEnabled(flag: string, ctx?: FlagContext): Promise<boolean> {
  for (const p of providers) {
    if (await p.isEnabled(flag, ctx)) return true; 
  }
  return false;
}

export function requireFlag(flag: string) {
  return async (req: any, res: any, next: any) => {
    const ctx = { ip: req.ip };
    if (await isFlagEnabled(flag, ctx)) return next();
    return res.status(404).json({ error: 'Not Found' }); 
  };
}
