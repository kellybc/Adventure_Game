import { NextRequest, NextResponse } from 'next/server'; import { getSupabaseServerClient } from '@/lib/supabase/server'; import { terrainFor } from '@/game/systems/TerrainGenerator'; import { neighbors } from '@/game/systems/HexGrid'; import { encounterFor } from '@/game/systems/EncounterSystem';
export async function POST(req:NextRequest){ const {worldId,playerId,q,r,seed,resolveEncounter,choiceMade}=await req.json(); const sb=getSupabaseServerClient();
if(resolveEncounter){ const event=resolveEncounter; let aiText:string|null=null; try{ const narr=await fetch(new URL('/api/ai/narrate', req.url),{method:'POST',body:JSON.stringify(event),headers:{'content-type':'application/json'}}).then(r=>r.json()); aiText=narr.aiText;}catch{}
const {data:evt}=await sb.from('world_events').insert({world_id:worldId,player_id:playerId,hex_q:q,hex_r:r,event_type:event.type,title:event.eventTitle,description:event.description,choice_made:choiceMade,outcome:event.outcome,ai_text:aiText}).select('*').single();
if(event.outcome.discoveredFact){await sb.from('discovered_facts').insert({world_id:worldId,player_id:playerId,fact_type:'lore',title:event.eventTitle,body:event.outcome.discoveredFact,source_event_id:evt.id});}
await sb.from('hexes').update({encounter_completed:true}).eq('world_id',worldId).eq('q',q).eq('r',r); return NextResponse.json({ok:true,aiText}); }
const terrain=terrainFor(seed,q,r); const encounter=encounterFor(seed,q,r);
await sb.from('hexes').upsert({world_id:worldId,q,r,terrain,explored:true,visible:true,encounter_id:encounter?.id ?? null,encounter_completed:!encounter},{onConflict:'world_id,q,r'});
for(const n of neighbors(q,r)){ await sb.from('hexes').upsert({world_id:worldId,q:n.q,r:n.r,terrain:terrainFor(seed,n.q,n.r),visible:true,explored:false,encounter_completed:false},{onConflict:'world_id,q,r'}); }
await sb.from('player_state').update({current_q:q,current_r:r,updated_at:new Date().toISOString()}).eq('world_id',worldId).eq('player_id',playerId);
return NextResponse.json({terrain,encounter}); }
