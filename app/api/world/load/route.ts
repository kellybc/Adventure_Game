import { NextRequest, NextResponse } from 'next/server'; import { getSupabaseServerClient } from '@/lib/supabase/server';
export async function POST(req:NextRequest){ const {anonymousId}=await req.json(); const sb=getSupabaseServerClient();
const {data:player}=await sb.from('players').select('*').eq('anonymous_id',anonymousId).maybeSingle(); if(!player) return NextResponse.json({found:false});
const {data:world}=await sb.from('worlds').select('*').eq('player_id',player.id).order('created_at',{ascending:true}).limit(1).single();
const [{data:hexes},{data:state}] = await Promise.all([sb.from('hexes').select('*').eq('world_id',world.id), sb.from('player_state').select('*').eq('world_id',world.id).single()]);
return NextResponse.json({found:true,seed:world.seed,hexes,player:{playerId:player.id,worldId:world.id,name:player.display_name,hp:state.hp,maxHp:state.max_hp,xp:state.xp,level:state.level,gold:state.gold,shards:state.shards,currentQ:state.current_q,currentR:state.current_r}}); }
