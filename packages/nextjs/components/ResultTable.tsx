import React from "react";

interface ResultTableProps {
  hexValue: string;
  numberValue: string;
  stringValue: string;
  addressValue: string;
}

const ResultTable: React.FC<ResultTableProps> = ({ hexValue, numberValue, stringValue, addressValue }) => {
  return (
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
  );
};

export default ResultTable;
