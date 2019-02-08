import {Request, Response} from "express";
import { IComponentRepository } from './IComponentRepository';
import {IComponentController} from "./IComponentController";

// The job of the Controller is to parse the request and then to call the proper method on the given repository
// Note that The ComponentRepository calls return Promise<IComponentRepositoryActionResult> because they are async due to reading/writing to db
// The IComponentRepositoryActionResult is an object with an err property and a data property


export class ComponentController implements IComponentController {

    componentRepository: IComponentRepository;

    constructor(compRepo: IComponentRepository) {
        this.componentRepository = compRepo;
    }


    GetComponents(req: Request, res: Response) : Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            this.componentRepository.GetComponents()
            .then((result) => {
                if(result.err) {
                    res.status(400);
                    reject(res.send(result.err));
                } else {
                    resolve(res.json(result.data));
                }
            })
            .catch((err) => {
                res.status(500);
                reject(res.send(err));
        });

        });
    }

    GetComponentById(req: Request, res: Response) : Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            this.componentRepository.GetComponentById(req.params.id)
            .then((result) => {
                if(result.err) {
                    console.log(result.err);
                    res.status(404);
                    reject(res.send(result.err));
                } else {
                    resolve(res.json(result.data));
                }
            })
            .catch((err) => {
                res.status(500);
                reject(res.send(err));
            
            })

        });

    }

    AddComponent(req: Request, res: Response) : Promise<Response> {
        let comp = {
            id: "",
            class: req.body.class,
            name: req.body.name,
            properties: req.body.properties ? req.body.properties : "",
            graphics: req.body.graphics ? req.body.graphics : ""
        };

        return new Promise<Response>((resolve, reject) => {
            this.componentRepository.AddComponent(comp)
            .then((result) => {
                if(result.err) {
                    res.status(500);
                    resolve(res.send(result.err));
                } else {
                res.status(201);
                resolve(res.json(result.data));
                }
    
            })
            .catch((err) => {
                res.status(500);
                resolve(res.send(err));
            })
    
        });
    }

    DeleteComponent(req: Request, res: Response) : Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            this.componentRepository.DeleteComponent(req.params.id)
            .then((result) => {
                if(result.err) {
                    res.status(404);
                    reject(res.send(result.err));
                } else {
                    resolve(res.sendStatus(200));
                }
            })
            .catch((err) => {
                res.status(500);
                reject(res.send(err));
            })
        });
    }
} 
