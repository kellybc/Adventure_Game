export type TerrainType = 'grassland'|'forest'|'hills'|'mountains'|'water'|'ruins'|'swamp'|'desert'|'corrupted'|'camp'|'unknown';
export interface HexCell { q:number; r:number; terrain:TerrainType; explored:boolean; visible:boolean; encounterId?:string|null; encounterCompleted:boolean; }
