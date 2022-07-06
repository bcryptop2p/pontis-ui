import { TokenClaim } from "../models/token-claim";

export interface Networks {
  [key: number]: string;
}
export const walletConnectSupportedNetworks: Networks = {
  // Add your network rpc URL here
  1: "https://ethereumnode.defiterm.io",
  3: "https://ethereumnode.defiterm-dev.net"
};

export const metaMaskNetworks: Map<number, string> = new Map<number, string>([
  [1, "Ethereum"],
  [3, "Ropsten"],
  [4, "Rinkeby"]
]);

// Network chain ids
export const supportedMetamaskNetworks = [1, 3, 4]; //, 5, 42];

// todo env variables - dotenv package
export const phoTokenAddresses: Map<number, string> = new Map<number, string>([
  [1, "naaaah, too expensive!!!"], // Ethereum
  [3, "0x15A511E73E8B96Bf4f452C207dab8885E7cA62CD"], // Ropsten
  [4, "0xE9F946EcC7a734F12A7DDB63FE8c0E72e54240a1"]  // Rinkeby
]);

export const pontisAddresses: Map<number, string> = new Map<number, string>([
  [1, "nope"], // Ethereum
  [3, "0x71a5E47d18adC93BeF97F5D8d24865bed7E4F34b"], // Ropsten
  [4, "0x065736ED82DD4ada2135E33f387e18fc59A80f1d"]  // Rinkeby
]);

// TODO - move to local storage!!!
export var pendingClaims: Map<string, TokenClaim[]> = new Map<string, TokenClaim[]>();
