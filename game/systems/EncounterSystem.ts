import { encounterTemplates } from '@/data/encounterTemplates'; import { hashString, SeededRng } from './SeededRng';
export function encounterFor(seed:string,q:number,r:number){const rng=new SeededRng(hashString(`${seed}:enc:${q}:${r}`));return rng.next()<0.55?encounterTemplates[Math.floor(rng.next()*encounterTemplates.length)]:null;}
