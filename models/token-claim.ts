export class TokenClaim {
  targetChainId: number;
  //nativeChainId: number;
  nativeToken: string;
  
  // TODO - use BigNumber amount???
  amount: number; 

  constructor(
    targetChainId: number,
    //nativeChainId: number,
    nativeToken: string,
    amount: number) {

    this.targetChainId = targetChainId;
    //this.nativeChainId = nativeChainId;
    this.nativeToken = nativeToken;
    this.amount = amount;
  }
}
