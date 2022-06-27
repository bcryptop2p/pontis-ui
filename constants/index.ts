
  export interface Networks {
    [key: number]: string;
  }
  export const walletConnectSupportedNetworks: Networks = {
    // Add your network rpc URL here
    1: "https://ethereumnode.defiterm.io",
    3: "https://ethereumnode.defiterm-dev.net"
  };

  // Network chain ids
  export const supportedMetamaskNetworks = [1, 3, 4, 5, 42];

  export const PHO_TOKEN_ADDRESS = "0xD43DaA155e54C103B10f9588179339651Cb5d0fF";
  export const PONTIS_ADDRESS = "0x884a33dA3Fd4164b1c3a9FB0509b7ba75eF2F95b";