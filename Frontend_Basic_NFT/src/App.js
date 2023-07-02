import * as fcl from "@onflow/fcl";
import react, { useState } from "react";
import './App.css';

import { GetNFT } from "./cadence/scripts/getNFT";
import { TotalSupply } from "./cadence/scripts/getTotalSupply";
import { CreateNFT } from "./cadence/transactions/createNFT";

//0xd4d64ddc6ee8454c

try {
  fcl.config()
    .put("app.detail.title", "Basic NFT")
    .put("app.detail.icon", "https://images.pexels.com/photos/1643457/pexels-photo-1643457.jpeg?auto=compress&cs=tinysrgb&w=1600")
    .put("accessNode.api", "https://rest-testnet.onflow.org")
    .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn");
}
catch (err) { console.log(err.message); }

function App()
{
  const [user, setUser] = useState();
  const [NFTURL, setNFTURL] = useState();
  const [totalSupply, setTotalSupply] = useState();
  const catURL =
    "https://images.pexels.com/photos/1643457/pexels-photo-1643457.jpeg?auto=compress&cs=tinysrgb&w=1600";

  const login = () =>
  {
    try {
      fcl.authenticate();
      fcl.currentUser().subscribe(setUser);
    }
    catch (err) { console.log(err.message); }
  }

  const getNFT = async () =>
  {
    const result = await fcl
      .send([
        fcl.script(GetNFT),
        fcl.args([fcl.arg(user.addr, fcl.t.Address)])
      ])
      .then(fcl.decode);

    console.log(result);
    setNFTURL(result[1]);
  };

  const getTotalSupply = async () =>
  {
    const result = await fcl.send([
      fcl.script(TotalSupply)
    ]).then(fcl.decode);

    console.log(result);
    setTotalSupply(result);
  };
  
  const createNFT = async () =>
  {
    const txID = await fcl
      .send([
        fcl.transaction(CreateNFT),
        fcl.args([fcl.arg(catURL, fcl.t.String)]),
        fcl.payer(fcl.authz),
        fcl.proposer(fcl.authz),
        fcl.authorizations([fcl.authz]),
        fcl.limit(9999),
      ])
      .then(fcl.decode);

    console.log(txID);
  };

  return (
    <div className="App">
      <p>-------------------</p>
      <h1>Basic NFT</h1>
      <p>-------------------</p>
      <h2>Current Address : {user && user.addr ? user.addr : ""}</h2>
      <button onClick={() => login()}>Login</button>
      <p>-------------------</p>
      <h1>Create NFT</h1>
      <p>-------------------</p>
      <button onClick={() => createNFT()}>Create NFT</button>
      <p>-------------------</p>
      <h1>Get NFT</h1>
      <p>-------------------</p>
      <button onClick={() => getNFT()}>Get NFT</button>
      <p>
        <img height={60} src={NFTURL}></img>
      </p>
      <p>-------------------</p>
      <h1>Get Total Supply</h1>
      <p>-------------------</p>
      <button onClick={() => getTotalSupply()}>
        Total Supply: {totalSupply}
      </button>
    </div>
  );
}

export default App;
