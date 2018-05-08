export interface IAnswer {
    readonly id:number;
    readonly questionid:number;
    readonly answer:any;
    readonly session:any;
    readonly weight:number;
    readonly domain:string;
}