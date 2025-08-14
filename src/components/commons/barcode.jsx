"use client";

import React from "react";

export default function Barcode({
  value = "TICKET123",
  width = 250,
  height = 60,
  className = "",
}) {
  function generateBars() {
    const bars = [];
    const barCount = Math.floor(width / 3);

    for (let i = 0; i < barCount; i++) {
      const thickness = [1, 2, 3, 4][(i + value.length) % 4];

      const isDark = (i + value.length) % 3 !== 0;

      bars.push({
        x: i * 3,
        width: thickness,
        height: isDark ? height : height * 0.15,
      });
    }

    return bars;
  }

  const bars = generateBars();
  const totalWidth =
    bars.length > 0
      ? bars[bars.length - 1].x + bars[bars.length - 1].width
      : width;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg
        width={width}
        height={height + 20}
        viewBox={`0 0 ${totalWidth} ${height + 20}`}
        style={{ maxWidth: "100%", height: "auto" }}
      >
        {bars.map((bar, index) => (
          <rect
            key={index}
            x={bar.x}
            y={0}
            width={bar.width}
            height={bar.height}
            fill={bar.height > height * 0.5 ? "black" : "transparent"}
          />
        ))}

        <text
          x={totalWidth / 2}
          y={height + 15}
          textAnchor="middle"
          fontSize="10"
          fill="black"
          fontFamily="monospace"
        >
          {value}
        </text>
      </svg>
    </div>
  );
}
