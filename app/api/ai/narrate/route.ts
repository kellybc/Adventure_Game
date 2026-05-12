import { NextRequest, NextResponse } from 'next/server'; import { openai } from '@/lib/openai';
export async function POST(req:NextRequest){ const body=await req.json(); const fallback=`You record ${body.eventTitle} in ${body.terrain}, and the memory lingers like ash on the wind.`;
if(!openai) return NextResponse.json({aiText:fallback});
const prompt=`Write 1-3 atmospheric fantasy journal sentences. Event: ${body.eventTitle}. Choice: ${body.choiceMade}. Terrain: ${body.terrain}. Outcome: ${JSON.stringify(body.outcome)}.`;
const res=await openai.responses.create({model:'gpt-4.1-mini',input:prompt,temperature:0.8,max_output_tokens:120});
return NextResponse.json({aiText:res.output_text || fallback}); }
