import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";

export const useStoragoor = () => {
  const router = useRouter();
  const [selectedChain, setSelectedChain] = useState(
    `https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
  );
  const [contractAddress, setContractAddress] = useState("");
  const [storageSlotPosition, setStorageSlotPosition] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hexValue, setHexValue] = useState("");
  const [numberValue, setNumberValue] = useState("");
  const [stringValue, setStringValue] = useState("");
  const [addressValue, setAddressValue] = useState("");
  const [contractAddressError, setContractAddressError] = useState("");
  const [storageSlotPositionError, setStorageSlotPositionError] = useState("");
  const provider = new ethers.providers.JsonRpcProvider(selectedChain);

  const isAddressValid = (address: string): boolean => {
    return Boolean(address) && ethers.utils.isAddress(address);
  };

  const isStorageSlotValid = (storageSlot: string): boolean => {
    return Boolean(storageSlot) && /^[0-9]+$/.test(storageSlot);
  };

  const readStorageSlot = async (event: any) => {
    if (event) {
      event.preventDefault();
    }

    setContractAddressError("");
    setStorageSlotPositionError("");

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
    await readStorageSlotHelper();
  };

  useEffect(() => {
    if (router.query.contractAddress && router.query.storageSlotPosition) {
      const addressFromURL = router.query.contractAddress as string;
      const slotFromURL = router.query.storageSlotPosition as string;

      if (isAddressValid(addressFromURL) && isStorageSlotValid(slotFromURL)) {
        setContractAddress(addressFromURL);
        setStorageSlotPosition(slotFromURL);
        readStorageSlotHelper(addressFromURL, slotFromURL);
      }
    }
  }, [router.query.contractAddress, router.query.storageSlotPosition]);

  const readStorageSlotHelper = async (address: string = contractAddress, slot: string = storageSlotPosition) => {
    try {
      setIsLoading(true);

      const position = "0x" + Number(slot).toString(16);

      const storageSlot = await provider.getStorageAt(address, position);

      const numberValue = parseInt(storageSlot.slice(2), 16).toString();
      const stringValue = String.fromCharCode(
        ...(storageSlot.slice(2).match(/.{1,2}/g) || []) // Provide a fallback empty array in case of null
          .map(byte => parseInt(byte, 16)),
      );

      const addressValue = "0x" + storageSlot.slice(26);

      setHexValue(storageSlot);
      setNumberValue(numberValue);
      setStringValue(stringValue);
      setAddressValue(addressValue);

      router.replace({
        pathname: router.pathname,
        query: {
          contractAddress: address,
          storageSlotPosition: slot,
        },
      });

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  return {
    selectedChain,
    setSelectedChain,
    contractAddress,
    setContractAddress,
    storageSlotPosition,
    setStorageSlotPosition,
    isLoading,
    setIsLoading,
    hexValue,
    setHexValue,
    numberValue,
    setNumberValue,
    stringValue,
    setStringValue,
    addressValue,
    setAddressValue,
    contractAddressError,
    setContractAddressError,
    storageSlotPositionError,
    setStorageSlotPositionError,
    provider,
    isAddressValid,
    isStorageSlotValid,
    readStorageSlot,
    readStorageSlotHelper,
  };
};
