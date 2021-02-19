import React from 'react'
import { MapIndicator } from './MapIndicator'

export function WorldMap({ locations }) {
  console.log(locations)
  return <div style={{
    width: '100%',
    paddingBottom: '100%',
    border: '2px solid #353535',
    borderRadius: '50%',
    overflow: 'hidden',
    position: 'relative',
  }}>
    <MapIndicator size={2} color='white' x={0} y={0}>+</MapIndicator>
    {locations.map(({ x, y }) => <MapIndicator
     key={`${x},${y}`}
     size={10}
     x={x}
     y={y}
     color='#dedede' />)}
  </div>
}