export const CreateNFT = `
import BasicNFT from 0xd4d64ddc6ee8454c

transaction (url: String)
{

  prepare(acct: AuthAccount) 
  {
    acct.save(<-BasicNFT.createNFT(url: url), to: /storage/BasicNFTPath);
    acct.link<&BasicNFT.NFT{BasicNFT.NFTPublic}>(/public/BasicNFTPath, target: /storage/BasicNFTPath);
  }

  execute 
  {
      log("NFT Created!");
  }
}

`;