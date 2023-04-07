import React from "react";
import ChainSelect from "../components/ChainSelect";
import ContractAddressInput from "../components/ContractAddressInput";
import ResultTable from "../components/ResultTable";
import StorageSlotPositionInput from "../components/StorageSlotPositionInput";
import { useStoragoor } from "../hooks/useStoragoor";
import "~~/styles/globals.css";

const App = () => {
  const {
    selectedChain,
    setSelectedChain,
    contractAddress,
    setContractAddress,
    storageSlotPosition,
    setStorageSlotPosition,
    isLoading,
    hexValue,
    numberValue,
    stringValue,
    addressValue,
    contractAddressError,
    setContractAddressError,
    storageSlotPositionError,
    isAddressValid,
    readStorageSlot,
  } = useStoragoor();

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
        <div className="px-4 sm:px-8 w-full max-w-5xl">
          <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Storagoor ( •̀ ω •́ )✧</h1>
          <div className="w-full flex justify-center">
            <form onSubmit={readStorageSlot} className="w-full max-w-md flex flex-col space-y-4">
              <ChainSelect selectedChain={selectedChain} setSelectedChain={setSelectedChain} />
              <ContractAddressInput
                contractAddress={contractAddress}
                setContractAddress={setContractAddress}
                isAddressValid={isAddressValid}
                contractAddressError={contractAddressError}
                setContractAddressError={setContractAddressError}
              />
              <StorageSlotPositionInput
                storageSlotPosition={storageSlotPosition}
                setStorageSlotPosition={setStorageSlotPosition}
                storageSlotPositionError={storageSlotPositionError}
              />
              <button type="submit" className="btn w-full py-2 bg-black text-white rounded-md">
                Read
              </button>
            </form>
          </div>

          <div className="text-l sm:text-2xl font-bold mt-2 text-center h-5">
            {isLoading && <span>Reading the slot (✿◡‿◡)</span>}
          </div>

          {hexValue !== "" && (
            <ResultTable
              hexValue={hexValue}
              numberValue={numberValue}
              stringValue={stringValue}
              addressValue={addressValue}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default App;
