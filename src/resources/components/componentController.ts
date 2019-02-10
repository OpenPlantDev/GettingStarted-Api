import {Request, Response} from "express";
import { IComponentRepository } from './IComponentRepository';
import { QueryOptions } from "../../services/QueryOptions.service";


export interface IComponentController {
    GetComponents : (req: Request, res: Response) => Promise<Response>;
    GetComponentById : (req: Request, res: Response) => Promise<Response>;
    AddComponent : (req: Request, res: Response) => Promise<Response>;
    DeleteComponent : (req: Request, res: Response) => Promise<Response>;

}
// The job of the Controller is to parse the request and then to call the proper method on the given repository
// Note that The ComponentRepository calls return Promise<IComponentRepositoryActionResult> because they are async due to reading/writing to db
// The IComponentRepositoryActionResult is an object with an err property and a data property

export class ComponentController implements IComponentController {

    componentRepository: IComponentRepository;

    constructor(compRepo: IComponentRepository) {
        this.componentRepository = compRepo;
    }

    async GetComponents(req: Request, res: Response) : Promise<Response> {
        try {
            const result = await this.componentRepository.GetComponents(QueryOptions.get(req.query));
            if(result.err) {
                res.status(400);
                return (res.send(result.err));
            } else {
                return(res.json(result.data));
            }
        }
        catch(err) {
            res.status(500);
            return (res.send(err));
        }

    }

    async GetComponentById(req: Request, res: Response) : Promise<Response> {
        try {
            let result = await this.componentRepository.GetComponentById(req.params.id);
            if(result.err) {
                console.log(result.err);
                res.status(404);
                return(res.send(result.err));
            } else {
                return(res.json(result.data));
            }
        }
        catch(err) {
            res.status(500);
            return(res.send(err));
        }
    }

    async AddComponent(req: Request, res: Response) : Promise<Response> {
        let comp = {
            id: "",
            class: req.body.class,
            name: req.body.name,
            properties: req.body.properties ? req.body.properties : "",
            graphics: req.body.graphics ? req.body.graphics : ""
        };

        try {
            const result = await this.componentRepository.AddComponent(comp);
            if(result.err) {
                res.status(500);
                return(res.send(result.err));
            } else {
            res.status(201);
            res.location(`${req.baseUrl}/${result.data.id}`)
            return(res.json(result.data));
            }
        }
        catch(err) {
            res.status(500);
            return(res.send(err));
        }
    }

    async DeleteComponent(req: Request, res: Response) : Promise<Response> {
        try {
            const result = await this.componentRepository.DeleteComponent(req.params.id);
            if(result.err) {
                res.status(404);
                return(res.send(result.err));
            } else {
                return(res.sendStatus(200));
            }
        }
        catch(err) {
            res.status(500);
            return(res.send(err));
        }
    }
} 
