import React from "react";

const coordinateToPercentage = (coordinate) => ((coordinate + 10000) / 20000) * 100

export function MapIndicator({ x, y, size, color, children }) {
  const xPercentage = coordinateToPercentage(x)
  const yPercentage = 100 - coordinateToPercentage(y)
  return (
    <div
      style={{
        position: "absolute",
        top: `${yPercentage}%`,
        left: `${xPercentage}%`,
        transform: 'translate(-50%, -50%)',
        margin: 0,
        padding: 0,
        lineHeight: 0,
        width: `${size}%`,
        height: `${size}%`,
        background: color,
        borderRadius: "50%",
      }}
    >
      {children}
    </div>
  );
}
