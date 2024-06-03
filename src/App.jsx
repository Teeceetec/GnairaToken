import React, { useEffect, useState } from "react";
import { ERC_CONTRACT_ADDRESS, ERC_CONTRACT_ABI } from "./constants/index.js";

import { Contract, formatEther, parseEther, ethers } from "ethers";

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);

  const [totalAmount, setTotalAmount] = useState(0);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [recipientAmount, setRecipientAmount] = useState(0);
  const [recipientBalance, setRecipientBalance] = useState("");
  const [provider, setProvider] = useState(null);
  const [netWork, setNetWork] = useState(null);

  //const web3ModalRef = useRef(null);

  const recipientAddressChange = (e) => {
    setRecipientAddress(e.target.value);
  };

  const recipientAmountChange = (e) => {
    setRecipientAmount(e.target.value);
  };

  const recipientBalanceChange = (e) => {
    setRecipientBalance(e.target.value);
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
    <div>
      <main>
        <h1>GNaira_Token</h1>
        <div>
          <h3>TOTAL_SUPPLY!! : {totalAmount}</h3>
          <button onClick={getTotalSupply}>getsupply</button>
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
          <h3>AddressBalance!!: {recipientBalance}</h3>
        </div>

        <p>Connect your wallet by clicking this button</p>

        {renderButton()}
      </main>
    </div>
  );
}
