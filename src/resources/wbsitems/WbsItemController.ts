import {Request, Response} from "express";
import { IWbsItemRepository } from './IWbsItemRepository';
import { QueryOptions } from "../../services/QueryOptions.service";


export interface IWbsItemController {
    GetItems : (req: Request, res: Response) => Promise<Response>;
    GetItemById : (req: Request, res: Response) => Promise<Response>;
    AddItem : (req: Request, res: Response) => Promise<Response>;
    DeleteItem : (req: Request, res: Response) => Promise<Response>;

}
// The job of the Controller is to parse the request and then to call the proper method on the given repository
// Note that The WbsItemRepository calls return Promise<IWbsItemRepositoryActionResult> because they are async due to reading/writing to db
// The IWbsItemRepositoryActionResult is an object with an err property and a data property

export class WbsItemController implements IWbsItemController {

    WbsItemRepository: IWbsItemRepository;

    constructor(compRepo: IWbsItemRepository) {
        this.WbsItemRepository = compRepo;
    }

    async GetItems(req: Request, res: Response) : Promise<Response> {
        try {
            const result = await this.WbsItemRepository.GetItems(QueryOptions.get(req.query));
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

    async GetItemById(req: Request, res: Response) : Promise<Response> {
        try {
            let result = await this.WbsItemRepository.GetItemById(req.params.id);
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

    async AddItem(req: Request, res: Response) : Promise<Response> {
        let comp = {
            id: "",
            class: req.body.class,
            name: req.body.name,
            properties: req.body.properties ? req.body.properties : "",
        };

        try {
            const result = await this.WbsItemRepository.AddItem(comp);
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

    async DeleteItem(req: Request, res: Response) : Promise<Response> {
        try {
            const result = await this.WbsItemRepository.DeleteItem(req.params.id);
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
