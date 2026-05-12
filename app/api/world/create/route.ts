import { NextRequest, NextResponse } from 'next/server'; import { getSupabaseServerClient } from '@/lib/supabase/server'; import { terrainFor } from '@/game/systems/TerrainGenerator'; import { neighbors } from '@/game/systems/HexGrid';
export async function POST(req:NextRequest){ const {anonymousId}=await req.json(); const sb=getSupabaseServerClient();
const { data: player } = await sb.from('players').upsert({anonymous_id:anonymousId},{onConflict:'anonymous_id'}).select('*').single();
const seed=`seed-${anonymousId}`; const { data: world } = await sb.from('worlds').insert({player_id:player.id,seed,name:'First Expedition'}).select('*').single();
await sb.from('player_state').insert({player_id:player.id,world_id:world.id});
const starter=[{q:0,r:0,terrain:'camp',explored:true,visible:true,encounter_completed:true},...neighbors(0,0).map(h=>({q:h.q,r:h.r,terrain:terrainFor(seed,h.q,h.r),explored:false,visible:true,encounter_completed:false}))];
await sb.from('hexes').insert(starter.map(h=>({...h,world_id:world.id})));
return NextResponse.json({playerId:player.id,worldId:world.id,seed}); }
