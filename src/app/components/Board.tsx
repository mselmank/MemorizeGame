import React from "react";

interface ImageData {
  url: string;
  uuid: string;
  title: string;
  content_type: string;
  placeholderUrl: string;
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
      <div key={colIndex} className="flex-1 border border-gray-300  h-32">
        {isLoading ? (
          <div>Cargando...</div>
        ) : image ? (
          <img
            src={image.url}
            alt={image.title}
            onError={(e) => {
              e.currentTarget.src = image.placeholderUrl;
            }}
            className="w-32 h-32 object-cover"
          />
        ) : (
          <div className="text-4xl font-bold text-center flex items-center justify-center h-full">
            ?
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-6 gap-2">
      {[...Array(rows * cols)].map((_, index) => {
        const rowIndex = Math.floor(index / cols);
        const colIndex = index % cols;
        return renderCell(rowIndex, colIndex);
      })}
    </div>
  );
};

export default Board;
