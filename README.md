# Valheim Trader Finder

Find Haldor the merchant without all the stress.

## Instructions

- Go to http://valheim-trader-finder.vercel.app/
- Upload your world.db
- Get RPG-friendly instructions to the nearest trader from spawn
- Or, if you want, see a full map of all traders

## Development

- Clone repository
- `yarn install`
- `yarn dev`

## Key Files

- `valheim/Dropzone` has the logic for parsing locations
- `valheim/WorldMap` is the code for the map component
- `valheim/Hint` calculates the closest merchant and creates the text to send you there
