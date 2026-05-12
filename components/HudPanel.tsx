import { PlayerState } from '@/game/types/player';
export function HudPanel({player}:{player:PlayerState}){ return <aside className='panel' style={{padding:16,minWidth:260}}><h3>{player.name}</h3><p>HP {player.hp}/{player.maxHp}</p><p>Lvl {player.level} • XP {player.xp}</p><p>Gold {player.gold} • Shards {player.shards}</p><p>Pos ({player.currentQ},{player.currentR})</p></aside>; }
