import React from "react";
import Blockies from "react-blockies";

interface ContractAddressInputProps {
  contractAddress: string;
  setContractAddress: (value: string) => void;
  isAddressValid: (address: string) => boolean;
  contractAddressError: string;
  setContractAddressError: (value: string) => void;
}

const ContractAddressInput: React.FC<ContractAddressInputProps> = ({
  contractAddress,
  setContractAddress,
  isAddressValid,
  contractAddressError,
  setContractAddressError,
}) => {
  return (
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
  );
};

export default ContractAddressInput;
