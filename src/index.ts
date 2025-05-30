import type { TypedData } from "@starknet-io/types-js";
import { configs } from "./generated/controller-configs";
import { metadata } from "./generated/erc20-metadata";

export * from "./config-loader";

export const controllerConfigs = configs;
export const erc20Metadata = metadata;
export const defaultTheme = configs["cartridge"].theme!;

export type EkuboERC20Metadata = {
  name: string;
  symbol: string;
  decimals: number;
  l2_token_address: string;
  sort_order: number;
  total_supply: number | null;
  logo_url?: string;
  hidden?: boolean;
  disabled?: boolean;
};

export type Policy = CallPolicy | TypedDataPolicy;

export type CallPolicy = {
  target: string;
  method: string;
  description?: string;
};

export type TypedDataPolicy = Omit<TypedData, "message">;
export type Policies = Policy[] | SessionPolicies;

export type ChainId = string;

export type SessionPolicies = {
  /** The key must be the contract address */
  contracts?: ContractPolicies;
  messages?: SignMessagePolicy[];
};

export type Chains = {
  /** Map of chain IDs to specific chain policies */
  [chainId: ChainId]: { policies: SessionPolicies };
};

export type ContractPolicies = Record<string, ContractPolicy>;

export type ContractPolicy = {
  name?: string;
  description?: string;
  methods: Method[];
};

export type Method = {
  name?: string;
  description?: string;
  entrypoint: string;
  /**
   * Whether the method is togglable by the user.
   * If true, user can't toggle the method.
   * @default false
   */
  isRequired?: boolean | false;
  /**
   * Whether the method can be paymastered (fees paid by a third party).
   * @default false
   */
  isPaymastered?: boolean | false;
};

export type SignMessagePolicy = TypedDataPolicy & {
  name?: string;
  description?: string;
  /**
   * Whether the message policy is togglable by the user.
   * If true, user can't toggle the policy.
   * @default false
   */
  isRequired?: boolean | false;
};

export type ControllerConfig = {
  origin: string | string[];
  chains?: Chains;
  theme?: ControllerTheme;
};

export type ControllerConfigs = Record<string, ControllerConfig>;

export type ColorMode = "light" | "dark";

export type OptimizedImageSet = {
  webp: Record<number, string>;
  [format: string]: Record<number, string>;
};

export type ControllerTheme = {
  name: string;
  icon: string;
  cover: ThemeValue<string>;
  optimizedIcon?: OptimizedImageSet;
  optimizedCover?: ThemeValue<OptimizedImageSet>;
  colors?: ControllerColors;
};

export type ControllerColors = {
  primary?: ControllerColor;
  primaryForeground?: ControllerColor;
};

export type ControllerColor = ThemeValue<string>;

export type ThemeValue<T> = T | { dark: T; light: T };
