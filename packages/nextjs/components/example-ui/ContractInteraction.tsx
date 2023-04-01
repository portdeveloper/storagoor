import React, { useState } from "react";
import { ethers } from "ethers";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";

export const ContractInteraction = () => {
  const [contractAddress, setContractAddress] = useState("");
  const [storageSlotPosition, setStorageSlotPosition] = useState("");

  const [hexValue, setHexValue] = useState("");
  const [numberValue, setNumberValue] = useState("");
  const [stringValue, setStringValue] = useState("");
  const [addressValue, setAddressValue] = useState("");

  const [contractAddressError, setContractAddressError] = useState("");
  const [storageSlotPositionError, setStorageSlotPositionError] = useState("");

  const provider = new ethers.providers.JsonRpcProvider(
    "https://sepolia.infura.io/v3/86db127db1ef41458b5d68a82192984e",
  );

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
      <div className="flex flex-col mt-6 px-7 py-8 bg-base-200 opacity-80 rounded-2xl shadow-lg border-2 border-primary">
        <span className="text-4xl sm:text-6xl text-black">Read a Storage Slot</span>

        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
          <input
            type="text"
            placeholder="Contract Address"
            className="input font-bai-jamjuree w-full px-5 bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-white uppercase"
            value={contractAddress}
            onChange={e => {
              setContractAddress(e.target.value);
              setContractAddressError("");
            }}
          />
          {contractAddressError && <div className="text-red-600 text-sm mt-2">{contractAddressError}</div>}

          <input
            type="text"
            placeholder="Storage Slot Position"
            className="input font-bai-jamjuree w-full px-5 bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-white uppercase"
            value={storageSlotPosition}
            onChange={e => {
              setStorageSlotPosition(e.target.value);
              setStorageSlotPositionError("");
            }}
          />
          {storageSlotPositionError && <div className="text-red-600 text-sm mt-2">{storageSlotPositionError}</div>}

          <div className="flex rounded-full border border-primary p-1 flex-shrink-0">
            <div className="flex rounded-full border-2 border-primary p-1">
              <button
                className={`btn btn-primary rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest `}
                onClick={readStorageSlot}
              >
                <>
                  Read <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                </>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-2 items-start">
          <span className="text-sm leading-tight">Price:</span>
          <div className="badge badge-warning">Free</div>
        </div>

        {hexValue !== "" && (
          <div className="mt-8">
            <div className="text-lg font-bold">Result:</div>
            <div className="mt-2">
              <div>Hexadecimal value: {hexValue}</div>
              <div>Decimal value: {numberValue}</div>
              <div>String value: {stringValue}</div>
              <div>Address value: {addressValue}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
