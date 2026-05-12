export class SeededRng { constructor(private seed:number){} next(){ this.seed = (this.seed * 1664525 + 1013904223) >>> 0; return this.seed / 4294967296; } }
export const hashString=(input:string)=>Array.from(input).reduce((a,c)=>((a<<5)-a+c.charCodeAt(0))|0,0)>>>0;
