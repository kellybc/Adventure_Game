export const HEX_SIZE=42;
const dirs=[[1,0],[1,-1],[0,-1],[-1,0],[-1,1],[0,1]];
export const neighbors=(q:number,r:number)=>dirs.map(([dq,dr])=>({q:q+dq,r:r+dr}));
export const axialToPixel=(q:number,r:number)=>({x:HEX_SIZE*Math.sqrt(3)*(q+r/2), y:HEX_SIZE*1.5*r});
export const key=(q:number,r:number)=>`${q},${r}`;
export const hexDistance=(q:number,r:number)=> (Math.abs(q)+Math.abs(r)+Math.abs(-q-r))/2;
