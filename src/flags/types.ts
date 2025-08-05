export type FlagContext = {
  userId?: string;
  ip?: string;
  [k: string]: unknown;
};

export interface FeatureFlagProvider {
  isEnabled(flag: string, ctx?: FlagContext): Promise<boolean>;
}
