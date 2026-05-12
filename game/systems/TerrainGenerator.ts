import { TerrainType } from '@/game/types/hex'; import { SeededRng, hashString } from './SeededRng'; import { hexDistance } from './HexGrid';
export function terrainFor(seed:string,q:number,r:number):TerrainType{ if(q===0&&r===0)return 'camp'; const d=hexDistance(q,r); const rng=new SeededRng(hashString(`${seed}:${q}:${r}`)); const roll=rng.next();
if(d<2) return roll<.5?'grassland':roll<.8?'forest':'hills';
if(roll < Math.min(0.05+d*0.01,0.22)) return 'mountains'; if(roll<0.09) return 'water'; if(roll<0.15) return 'swamp'; if(roll<0.23) return 'hills'; if(roll<0.35) return 'forest'; if(roll<0.42) return 'desert'; if(roll<0.47) return 'ruins'; if(roll<Math.min(0.49+d*0.01,0.62)) return 'corrupted'; return 'grassland'; }
