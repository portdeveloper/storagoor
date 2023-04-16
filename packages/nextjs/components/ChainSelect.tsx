// components/ChainSelect.tsx
import React, { useEffect, useState } from "react";
import { CustomChain } from "../models/CustomChain";

interface ChainSelectProps {
  selectedChain: string;
  setSelectedChain: (value: string) => void;
  customChains: CustomChain[];
}

const ChainSelect: React.FC<ChainSelectProps> = ({ selectedChain, setSelectedChain, customChains }) => {
  const [availableChains, setAvailableChains] = useState<string[]>([]);

  useEffect(() => {
    const defaultChains = [
      `https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
      `https://goerli.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
      `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
    ];
    const customRpcUrls = customChains.map(chain => chain.rpcUrl);
    setAvailableChains([...defaultChains, ...customRpcUrls]);
  }, [customChains]);

  return (
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
        {availableChains.map((chain, index) => (
          <option key={index} value={chain}>
            {customChains.find(customChain => customChain.rpcUrl === chain)?.name || `Chain ${index + 1}`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChainSelect;
