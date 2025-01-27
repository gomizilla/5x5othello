"use client"
import Image from "next/image";
import { useState } from "react";

export default function Home() {

  const [grid, setGrid] = useState(
    Array(5)
      .fill(null)
      .map(() => Array(5).fill(null))
  );

  const handleClick = (row: number, col: number) => {
    const eventTypes = [null, "white", "black"];
    const currentIndex = eventTypes.indexOf(grid[row][col]);
    const nextEvent = eventTypes[(currentIndex + 1) % eventTypes.length];
    const newGrid = grid.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? nextEvent : cell
      )
    );
    setGrid(newGrid);
  };

  return (
      <div className="min-h-screen flex items-center justify-center flex-col bg-gray-400">
      <h1 className="text-7xl mb-10">Dean&apos;s Othello Game</h1>
        <div className="relative w-[700px] h-[700px]">
          {/* Background Image */}
          <Image
            src="/othelloBoard.png"
            alt="Background"
            layout="fill"
            priority
            className="relative inset-0 z-0"
          />
          {/* Grid Overlay */}
          <div className="absolute inset-0 grid grid-cols-5 z-10">
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="flex items-center justify-center cursor-pointer"
                  onClick={() => handleClick(rowIndex, colIndex)}
                >
                  {cell === "white" && <div className="absolute w-20 h-20 bg-white rounded-full border-2 border-black" />}
                  {cell === "black" && <div className="absolute w-20 h-20 bg-black rounded-full border-2 border-gray-300" />}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
  );
}
