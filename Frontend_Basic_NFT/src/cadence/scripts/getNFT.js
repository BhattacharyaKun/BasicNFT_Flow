export const GetNFT = `
import BasicNFT from 0xd4d64ddc6ee8454c

pub fun main(accAddress: Address): AnyStruct 
{
  let publicReference = getAccount(accAddress).getCapability(/public/BasicNFTPath).borrow<&BasicNFT.NFT{BasicNFT.NFTPublic}>() ?? panic("No NFT reference found here!");
  
  return [publicReference.getID(), publicReference.getURL()];
}
`;