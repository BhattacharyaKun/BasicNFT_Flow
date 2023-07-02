export const TotalSupply = `
import BasicNFT from 0xd4d64ddc6ee8454c

pub fun main():UInt64
{
    return BasicNFT.totalSupply;
}
`;