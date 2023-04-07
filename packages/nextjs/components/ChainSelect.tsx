import React from "react";

interface ChainSelectProps {
  selectedChain: string;
  setSelectedChain: (value: string) => void;
}

const ChainSelect: React.FC<ChainSelectProps> = ({ selectedChain, setSelectedChain }) => {
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
        <option value={`https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`}>Sepolia</option>
        <option value={`https://goerli.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`}>Goerli</option>
        <option value={`https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`}>Mainnet</option>
      </select>
    </div>
  );
};

export default ChainSelect;
