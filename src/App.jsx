import React, { useEffect, useState } from "react";
import { ERC_CONTRACT_ADDRESS, ERC_CONTRACT_ABI } from "./constants/index.js";

import { Contract, formatEther, parseEther, ethers } from "ethers";

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);

  const [totalAmount, setTotalAmount] = useState(0);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [recipientAmount, setRecipientAmount] = useState(0);
  const [recipientBalance, setRecipientBalance] = useState("");
  const [ownerAddress, setOwnerAddress] = useState("");
  const [blacklistAddress, setBlacklistAddress] = useState("");
  const [provider, setProvider] = useState(null);
  const [netWork, setNetWork] = useState(null);
  const [changeRequirement, setChangeRequirement] = useState(0);
  const [amountMint, setAmountMint] = useState(0);
  const [addressMint, setAddressMint] = useState("");
  const [amountBurn, setAmountBurn] = useState(0);
  const [multisigMintAdd, setMultisigMintAdd] = useState("");
  const [multisigBurnAmt, setMultisigBurnAmt] = useState(0);
  const [multisigAmt, setMultisigAmt] = useState(0);
  const [addOwnerAdd, setAddOwnerAdd] = useState("");
  const [changeOwnerAdd, setChangeOwnerAdd] = useState("");
  //const web3ModalRef = useRef(null);

  const recipientAddressChange = (e) => {
    setRecipientAddress(e.target.value);
  };

  const blackllistAddressChange = (e) => {
    setBlacklistAddress(e.target.value);
  };

  const addOwnerChange = (e) => {
    setAddOwnerAdd(e.target.value);
  };

  const changeOwnerChange = (e) => {
    setChangeOwnerAdd(e.target.value);
  };

  const addressMintChange = (e) => {
    setAddressMint(e.target.value);
  };

  const amountBurnChange = (e) => {
    setAmountBurn(e.target.value);
  };

  const amountMintChange = (e) => {
    setAmountMint(e.target.value);
  };

  const changeRequirementChange = (e) => {
    setChangeRequirement(e.target.value);
  };

  const ownerAddressChange = (e) => {
    setOwnerAddress(e.target.value);
  };

  const blacklistAddressChange = (e) => {
    setBlacklistAddress(e.target.value);
  };

  const recipientAmountChange = (e) => {
    setRecipientAmount(e.target.value);
  };

  const recipientBalanceChange = (e) => {
    setRecipientBalance(e.target.value);
  };

  const multiSigBurnAmtChange = (e) => {
    setMultisigBurnAmt(e.target.value);
  };

  const multiSigAmtChange = (e) => {
    setMultisigAmt(e.target.value);
  };

  const multiSigMintAddChange = (e) => {
    setMultisigMintAdd(e.target.value);
  };

  const multiSigMint = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const contract = new Contract(
          ERC_CONTRACT_ADDRESS,
          ERC_CONTRACT_ABI,
          provider,
        );
        const amount = parseEther(multisigAmt);
        const tx = await contract.multiSigMint(multisigMintAdd, amount);
        await tx.wait();
        setLoading(false);
        setAmountMint("");
        setMultisigMintAdd("");
        console.log("Minted");
        setLoading(false);
      }
    } catch (error) {
      console.err(error);
    }
  };

  const multiSigBurn = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const contract = new Contract(
          ERC_CONTRACT_ADDRESS,
          ERC_CONTRACT_ABI,
          provider,
        );
        const amount = parseEther(multisigBurnAmt);
        const tx = await contract.multiSigBurn(multisigMintAdd, amount);
        await tx.wait();
        setLoading(false);
        setAmountMint("");
        setMultisigMintAdd("");
        console.log("Minted");
        setLoading(false);
      }
    } catch (error) {
      console.err(error);
    }
  };

  const transferTokens = async () => {
    if (recipientAddress === "" || recipientAmount > 0) {
      alert("Please enter a recipient address and amount");
      return;
    }

    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const contract = new Contract(
          ERC_CONTRACT_ADDRESS,
          ERC_CONTRACT_ABI,
          provider.getSigner(),
        );

        const tx = await contract.transfer(
          recipientAddress,
          parseEther(recipientAmount),
        );

        await tx.wait();
        console.log("Transfer successful");
        window.alert("Transfer successful!!");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBalance = async () => {
    if (recipientBalance === "" || !recipientAddress) {
      window.alert("Please enter a recipient address");
    }

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const contract = new Contract(
          ERC_CONTRACT_ADDRESS,
          ERC_CONTRACT_ABI,
          provider,
        );

        const balance = await contract.balanceOf(recipientAddress);
        setRecipientBalance(formatEther(balance));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getTotalSupply = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const contract = new Contract(
          ERC_CONTRACT_ADDRESS,
          ERC_CONTRACT_ABI,
          provider,
        );

        const total = await contract.getTotalSupply();
        setTotalAmount(formatEther(total));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const changeGovernor = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const contract = new Contract(
          ERC_CONTRACT_ADDRESS,
          ERC_CONTRACT_ABI,
          provider.signer(),
        );

        const tx = await contract.changeGovernor(changeOwnerAdd);

        await tx.wait();
        console.log("Chamge of Governor succesfull");
        window.alert("Change of Governor  successful!!");
        setLoading(false);
      }
    } catch (error) {
      conso.error(error);
    }
  };

  const addOwner = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const contract = new Contract(
          ERC_CONTRACT_ADDRESS,
          ERC_CONTRACT_ABI,
          provider.signer(),
        );

        const tx = await contract.addOwner(addOwnerAdd);

        await tx.wait();
        console.log("New Owner added succesfully");
        window.alert("New Owner added  successfuly!!");
        setLoading(false);
      }
    } catch (error) {
      conso.error(error);
    }
  };

  const blackList = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const contract = new Contract(
          ERC_CONTRACT_ADDRESS,
          ERC_CONTRACT_ABI,
          provider.signer(),
        );

        const tx = await contract.blacklist(blaklistAddress);

        await tx.wait();
        console.log("Black List succesfull");
        window.alert("Black List  successful!!");
        setLoading(false);
      }
    } catch (error) {
      conso.error(error);
    }
  };

  const confirmTransaction = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const contract = new Contract(
          ERC_CONTRACT_ADDRESS,
          ERC_CONTRACT_ABI,
          provider.signer(),
        );

        const tx = await contract.confirmTransaction();

        await tx.wait();
        console.log("Transaction confirmed");
        window.alert("Transaction confirmed!!");
        setLoading(false);
      }
    } catch (error) {
      conso.error(error);
    }
  };

  const mintToken = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const contract = new Contract(
          ERC_CONTRACT_ADDRESS,
          ERC_CONTRACT_ABI,
          provider.signer(),
        );
        const amount = parseEther(amountMint);
        const tx = await contract.mint(addressMint, amount);

        await tx.wait();
        setLoading(true);
        console.log("Mint Token succesfull");
        window.alert("Mint Token  successful!!");
        setLoading(false);
      }
    } catch (error) {
      conso.error(error);
    }
  };

  const burnToken = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const contract = new Contract(
          ERC_CONTRACT_ADDRESS,
          ERC_CONTRACT_ABI,
          provider.signer(),
        );
        const amount = parseEther(amountBurn);
        const tx = await contract.burn(addressMint, amount);
        await tx.wait();
        setLoading(true);
        console.log("Burn Token succesfull");
        window.alert("Burn Token  successful!!");
        setLoading(false);
      }
    } catch (error) {
      console.err(error);
    }
  };

  const confirmTransaction = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const contract = new Contract(
          ERC_CONTRACT_ADDRESS,
          ERC_CONTRACT_ABI,
          provider.signer(),
        );
        const tx = await contract.confirmTransaction();
        tx.wait();
      }
    } catch (error) {}
  };

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);
        setWalletConnected(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const initializeProvider = async () => {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
      }
    };
    initializeProvider();
  }, []);

  useEffect(() => {
    const getNetwork = async () => {
      if (provider) {
        const network = await provider.getNetwork();
        setNetWork(network.chainId);
      }
    };
    getNetwork();
  }, [walletConnected]);

  const renderButton = () => {
    if (!walletConnected) {
      return <button onClick={connectWallet}>Connect Wallet</button>;
    }
  };

  return (
    <>
      <main>
        <div>
          <h1>GNaira_Token</h1>
        </div>
        <div>
          <h3>TOTAL_SUPPLY!! : {totalAmount}</h3>
          <button onClick={getTotalSupply}>getsupply</button>
        </div>

        <h3>Governor Account</h3>
        <div>
          <label>
            Recipient Address:
            <input
              type="text"
              value={recipientAddress}
              onChange={recipientAddressChange}
            />
          </label>
          <label>
            Amount:
            <input
              type="text"
              value={recipientAmount}
              onChange={recipientAmountChange}
            />
          </label>

          <button onClick={transferTokens}>Transfer</button>
        </div>

        <div>
          <label>
            Add Owner Address:
            <input type="text" value={addOwnerAdd} onChange={addOwnerChange} />
          </label>

          <button onClick={addOwner}>Add Owner</button>
        </div>

        <div>
          <label>
            Change Governor Address:
            <input
              type="text"
              value={changeOwnerAdd}
              onChange={changeOwnerChange}
            />
          </label>

          <button onClick={changeGovernor}>Add Owner</button>
        </div>

        <div>
          <label>
            Blacklist Address:
            <input
              type="text"
              value={blacklistAddress}
              onChange={blackllistAddressChange}
            />
          </label>

          <button onClick={blackList}>blacklist Address</button>
        </div>

        <div>
          <label>
            Recipient Balance:
            <input
              type="text"
              value={recipientBalance}
              onChange={recipientBalanceChange}
            />
          </label>
          <button onClick={getBalance}>Get Balance</button>
        </div>

        <div>
          <label>
            Mint Address:
            <input
              type="text"
              value={addressMint}
              onChange={addressMintChange}
            />
          </label>
          <label>
            Amount:
            <input type="text" value={amountMint} onChange={amountMintChange} />
          </label>

          <button onClick={mintToken}>Mint</button>
        </div>

        <div>
          <label>
            Burn Address:
            <input
              type="text"
              value={addressMint}
              onChange={addressMintChange}
            />
          </label>
          <label>
            Amount:
            <input type="text" value={amountMint} onChange={amountBurnChange} />
          </label>

          <button onClick={burnToken}>Burn</button>
        </div>

        <h3> Multi-SIgnature Wallet:</h3>

        <div>
          <h4>Confirm Transaction before Minting</h4>
          <button onClick={confirmTransaction}>confirmation</button>
          <label>
            Mint Address:
            <input
              type="text"
              value={multisigMintAdd}
              onChange={multiSigMintAddChange}
            />
          </label>
          <label>
            Amount:
            <input
              type="text"
              value={amountMint}
              onChange={multiSigAmtChange}
            />
          </label>

          <button onClick={multiSigMint}>Mint</button>
        </div>

        <div>
          <label>
            Burn Address:
            <input
              type="text"
              value={multisigMintAdd}
              onChange={multiSigMintAddChange}
            />
          </label>
          <label>
            Amount:
            <input
              type="text"
              value={amountMint}
              onChange={multiSigBurnAmtChange}
            />
          </label>

          <button onClick={multiSigBurn}>Burn</button>
        </div>
        <div>
          <h3>AddressBalance!!: {recipientBalance}</h3>
        </div>

        <p>Connect your wallet by clicking this button</p>

        {renderButton()}

        <h4>NO LIGHT OO , KAIII ...</h4>
      </main>
    </>
  );
}
