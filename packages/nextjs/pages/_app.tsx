import React, { useState } from "react";
import { ethers } from "ethers";
import Blockies from "react-blockies";
import "~~/styles/globals.css";

const App = () => {
  const [contractAddress, setContractAddress] = useState("");
  const [storageSlotPosition, setStorageSlotPosition] = useState("");

  const [hexValue, setHexValue] = useState("");
  const [numberValue, setNumberValue] = useState("");
  const [stringValue, setStringValue] = useState("");
  const [addressValue, setAddressValue] = useState("");

  const [contractAddressError, setContractAddressError] = useState("");
  const [storageSlotPositionError, setStorageSlotPositionError] = useState("");

  const [selectedChain, setSelectedChain] = useState(
    `https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
  );

  const provider = new ethers.providers.JsonRpcProvider(selectedChain);

  // ADD TYPES TO THE FOLLOWING: isAddressValid isStorageSlotValid readStorageSlot
  const isAddressValid = (address: string): boolean => {
    return Boolean(address) && ethers.utils.isAddress(address);
  };

  const isStorageSlotValid = (storageSlot: string): boolean => {
    return Boolean(storageSlot) && /^[0-9]+$/.test(storageSlot);
  };

  const readStorageSlot = async (event: any) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Clear any previous errors
    setContractAddressError("");
    setStorageSlotPositionError("");

    // Validate the form fields
    let hasErrors = false;

    if (!isAddressValid(contractAddress)) {
      setContractAddressError("Invalid contract address.");
      hasErrors = true;
    }
    if (!isStorageSlotValid(storageSlotPosition)) {
      setStorageSlotPositionError("Invalid storage slot position.");
      hasErrors = true;
    }
    if (!contractAddress) {
      setContractAddressError("Contract address is required.");
      hasErrors = true;
    }
    if (!storageSlotPosition) {
      setStorageSlotPositionError("Storage slot position is required.");
      hasErrors = true;
    }
    if (hasErrors) {
      return;
    }

    try {
      const position = "0x" + Number(storageSlotPosition).toString(16);

      const storageSlot = await provider.getStorageAt(contractAddress, position);

      console.log(`Hexadecimal value is: ${storageSlot}`);

      const numberValue = parseInt(storageSlot.slice(2), 16).toString();
      const stringValue = String.fromCharCode(
        ...(storageSlot.slice(2).match(/.{1,2}/g) || []) // Provide a fallback empty array in case of null
          .map(byte => parseInt(byte, 16)),
      );

      const addressValue = "0x" + storageSlot.slice(26);

      console.log(`Number value is: ${numberValue}`);
      console.log(`String value is: ${stringValue}`);

      setHexValue(storageSlot);
      setNumberValue(numberValue);
      setStringValue(stringValue);
      setAddressValue(addressValue);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
        <div className="px-4 sm:px-8 w-full max-w-5xl">
          <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Storagoor ( •̀ ω •́ )✧</h1>
          <div className="w-full flex justify-center">
            <form onSubmit={readStorageSlot} className="w-full max-w-md flex flex-col space-y-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="chain" className="text-lg font-semibold">
                  Chain
                </label>
                <select
                  id="chain"
                  className="input w-full bg-gray-700 rounded-none"
                  value={selectedChain}
                  onChange={e => {
                    setSelectedChain(e.target.value);
                  }}
                >
                  <option value={`https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`}>Sepolia</option>
                  <option value={`https://goerli.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`}>Goerli</option>
                  <option value={`https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`}>Mainnet</option>
                </select>
              </div>
              <div className="flex flex-col space-y-2 relative">
                <label htmlFor="contractAddress" className="text-lg font-semibold">
                  Contract Address
                </label>
                <input
                  type="text"
                  id="contractAddress"
                  placeholder="Enter contract address"
                  className="input w-full bg-gray-700 rounded-none"
                  value={contractAddress}
                  onChange={e => {
                    setContractAddress(e.target.value);
                    setContractAddressError("");
                  }}
                />
                {isAddressValid(contractAddress) && (
                  <Blockies
                    className="absolute top-1/2 right-2 transform -translate-y-2 rounded-none"
                    size={9}
                    seed={contractAddress.toLowerCase()}
                    scale={4}
                  />
                )}
                {contractAddressError && <div className="text-red-600 text-sm">{contractAddressError}</div>}
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="storageSlotPosition" className="text-lg font-semibold">
                  Storage Slot Position
                </label>
                <input
                  type="text"
                  id="storageSlotPosition"
                  placeholder="Enter storage slot position"
                  className="input w-full bg-gray-700 rounded-none"
                  value={storageSlotPosition}
                  onChange={e => {
                    setStorageSlotPosition(e.target.value);
                    setStorageSlotPositionError("");
                  }}
                />
                {storageSlotPositionError && <div className="text-red-600 text-sm">{storageSlotPositionError}</div>}
              </div>

              <button type="submit" className="btn w-full py-2 bg-black text-white rounded-md">
                Read
              </button>
            </form>
          </div>

          {hexValue !== "" && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4">Result:</h2>
              <div className="overflow-x-scroll">
                <table className="table w-full mx-auto">
                  <tbody>
                    <tr>
                      <td className="bg-gray-300 font-mono text-lg text-black">Hexadecimal value:</td>
                      <td className="bg-gray-700 font-mono text-lg">{hexValue}</td>
                    </tr>
                    <tr>
                      <td className="bg-gray-300 font-mono text-lg text-black">Decimal value:</td>
                      <td className="bg-gray-700 font-mono text-lg">{numberValue}</td>
                    </tr>
                    <tr>
                      <td className="bg-gray-300 font-mono text-lg text-black">String value:</td>
                      <td className="bg-gray-700 font-mono text-lg">{stringValue}</td>
                    </tr>
                    <tr>
                      <td className="bg-gray-300 font-mono text-lg text-black">Address value:</td>
                      <td className="bg-gray-700 font-mono text-lg">{addressValue}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
