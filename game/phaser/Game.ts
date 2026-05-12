import Phaser from 'phaser'; import { HexMapScene } from './scenes/HexMapScene';
export const createGame=(parent:string,onHexClick:(q:number,r:number)=>void)=> new Phaser.Game({type:Phaser.AUTO,parent,width:900,height:700,backgroundColor:'#0f0c09',scene:[new HexMapScene(onHexClick)]});
