// components/CustomChainForm.tsx
import React, { FormEvent, useState } from "react";
import { CustomChain } from "../models/CustomChain";

interface CustomChainFormProps {
  onSave: (customChain: CustomChain) => void;
}

const CustomChainForm: React.FC<CustomChainFormProps> = ({ onSave }) => {
  const [chainName, setChainName] = useState("");
  const [rpcUrl, setRpcUrl] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const customChain: CustomChain = {
      id: Date.now(),
      name: chainName,
      rpcUrl: rpcUrl,
    };
    onSave(customChain);
    setChainName("");
    setRpcUrl("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <label htmlFor="chainName" className="text-lg font-semibold">
          Custom Chain Name
        </label>
        <input
          type="text"
          id="chainName"
          placeholder="Enter custom chain name"
          className="input w-full bg-gray-700 rounded-none"
          value={chainName}
          onChange={e => setChainName(e.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="rpcUrl" className="text-lg font-semibold">
          RPC URL
        </label>
        <input
          type="text"
          id="rpcUrl"
          placeholder="Enter custom chain RPC URL"
          className="input w-full bg-gray-700 rounded-none"
          value={rpcUrl}
          onChange={e => setRpcUrl(e.target.value)}
        />
      </div>
      <button type="submit" className="btn w-full py-2 bg-black text-white rounded-md">
        Save Custom Chain
      </button>
    </form>
  );
};

export default CustomChainForm;
