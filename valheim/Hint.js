import React, { useMemo } from "react";

const directions = [
  "East",
  "Northeast",
  "North",
  "Northwest",
  "West",
  "Southwest",
  "South",
  "Southeast",
];

export function Hint({ locations }) {
  const { distanceInteger, direction } = useMemo(() => {
    const [x1, y1] = [0, 0];
    return locations
      .map(({ x: x2, y: y2 }) => {
        const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) / 1000;
        const distanceInteger = Math.round(distance);
        const angle = Math.atan2(y2 - y1, x2 - x1) + Math.PI * 2;
        const directionIndex = Math.round(angle / (Math.PI / 4)) % 8;
        const direction = directions[directionIndex];
        console.log(distance, direction, angle, distanceInteger)
        return { distance, direction, angle, distanceInteger };
      })
      .reduce((closest, current) => {
        if (current.distance < closest.distance) return current;
        return closest;
      });
  }, [locations]);

  console.log('Closest', distanceInteger, direction)

  if (distanceInteger === 0)
    return `You need not look far for a trader of great goods… just look to the ${direction}`;

  return `There has been talk about a trader to the ${direction} of a great rock formation with iron hooks… about ${distanceInteger} kilometer${
    distanceInteger === 1 ? "" : "s"
  } away.`;
}
