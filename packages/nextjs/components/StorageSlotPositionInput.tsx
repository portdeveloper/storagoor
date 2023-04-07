import React from "react";

interface StorageSlotPositionInputProps {
  storageSlotPosition: string;
  setStorageSlotPosition: (value: string) => void;
  storageSlotPositionError: string;
}

const StorageSlotPositionInput: React.FC<StorageSlotPositionInputProps> = ({
  storageSlotPosition,
  setStorageSlotPosition,
  storageSlotPositionError,
}) => {
  return (
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
        }}
      />
      {storageSlotPositionError && <div className="text-red-600 text-sm">{storageSlotPositionError}</div>}
    </div>
  );
};

export default StorageSlotPositionInput;
