# Shards of Arventyr: Expedition

Persistent browser hex exploration game foundation using Next.js + Phaser + Supabase.

## Setup
1. Copy `.env.local.example` to `.env.local` and fill values.
2. Install deps: `npm install`.
3. Apply SQL in `supabase/migrations/202605120001_init.sql`.
4. Create Supabase Storage bucket: `game-assets` (public read suggested for terrain assets).
5. Run: `npm run dev` then open `/game`.

## Deployment (Vercel)
- Import GitHub repo in Vercel.
- Set env vars:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `OPENAI_API_KEY` (optional)
  - `NEXT_PUBLIC_GAME_ASSET_BUCKET`
- Deploy with default Next.js build command.

## Persistence model
- Client stores only `anonymous_id` in `localStorage`.
- Server routes create/load `players`, `worlds`, `player_state`.
- Hex exploration writes to `hexes`; movement writes `player_state.current_q/current_r`.
- Encounter outcomes write `world_events`; lore writes `discovered_facts`.

## Expanding content
- Add terrain: extend `TerrainType`, `terrainAssetMap`, and generator weights in `TerrainGenerator`.
- Add encounters: append template in `data/encounterTemplates.ts` and resolve outcome in `GameShell` choice handler / server route.

## Asset loading
- Foundation includes fallback assets in `/public/fallback-assets`.
- Recommended next step: query `game_assets` + Supabase Storage public URLs and override fallback map for matching terrain types.
