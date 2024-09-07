import React from "react";

interface ImageData {
  url: string;
  uuid: string;
  title: string;
  content_type: string;
}

interface BoardProps {
  data: ImageData[];
  isLoading: boolean;
}

const Board: React.FC<BoardProps> = ({ data, isLoading }) => {
  const rows = 3;
  const cols = 6;

  const renderCell = (rowIndex: number, colIndex: number) => {
    const imageIndex = rowIndex * cols + colIndex;
    const image = data[imageIndex];

    return (
      <td key={colIndex} className="border border-gray-300 p-1">
        {isLoading ? (
          <div>Cargando...</div>
        ) : image ? (
          <img
            src={image.url}
            alt={image.title}
            onError={(e) => {
              e.currentTarget.src = image.url;
            }}
            className="w-32 h-32 object-cover"
          />
        ) : (
          <div className="text-4xl font-bold text-center">?</div>
        )}
      </td>
    );
  };

  return (
    <table className="w-full table-auto border-collapse">
      <tbody>
        {[...Array(rows)].map((_, rowIndex) => (
          <tr key={rowIndex} className="h-32">
            {[...Array(cols)].map((_, colIndex) =>
              renderCell(rowIndex, colIndex)
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Board;
