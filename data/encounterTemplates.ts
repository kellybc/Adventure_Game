import { EncounterTemplate } from '@/game/types/encounter';
export const encounterTemplates: EncounterTemplate[] = [
{id:'cache',title:'Abandoned Cache',description:'A weather-beaten chest lies under roots.',choice:'Search it',type:'treasure'},
{id:'bramble',title:'Thorny Bramble',description:'A wall of cursed thorns blocks your route.',choice:'Push through',type:'hazard'},
{id:'shrine',title:'Ruined Shrine',description:'Weathered stones bear forgotten runes.',choice:'Study the markings',type:'shrine'},
{id:'traveler',title:'Lost Traveler',description:'An exhausted traveler begs for aid.',choice:'Help them',type:'traveler'},
{id:'fragment',title:'Strange Shard Fragment',description:'A crystal fragment thrums with power.',choice:'Touch it',type:'shard'}
];
