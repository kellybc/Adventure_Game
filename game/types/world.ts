import { HexCell } from './hex'; import { PlayerState } from './player';
export interface WorldLoadResponse { seed:string; hexes:HexCell[]; player:PlayerState; }
