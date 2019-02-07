import {Request, Response} from "express";

export interface IComponentController {
    GetComponents : (req: Request, res: Response) => Promise<Response>;
    GetComponentById : (req: Request, res: Response) => Promise<Response>;
    AddComponent : (req: Request, res: Response) => Promise<Response>;
    DeleteComponent : (req: Request, res: Response) => Promise<Response>;

}