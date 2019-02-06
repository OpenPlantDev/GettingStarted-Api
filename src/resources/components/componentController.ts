import {Request, Response} from "express";
import { ComponentRepository } from './componentRepository';

export class ComponentController {

    componentRepository: ComponentRepository;

    constructor() {
        this.componentRepository = new ComponentRepository();
    }

    GetComponents(req: Request, res: Response) : Response {
        let result = this.componentRepository.GetComponents();
        if(result.err) {
            res.status(404);
            return res.send(result.err);
        }
        return res.json(result.data);
    }

    GetComponentById(req: Request, res: Response) : Response {
        let result = this.componentRepository.GetComponentById(req.params.id);
        if(result.err) {
            res.status(404);
            return res.send(result.err);
        }
        return res.json(result.data);
    }

    AddComponent(req: Request, res: Response) : Response {

        let comp = {
            id: req.body.id,
            class: req.body.class,
            name: req.body.name,
            desc: req.body.desc
        };

        let result = this.componentRepository.AddComponent(comp);
        if(result.err) {
            res.status(404);
            return res.send(result.err);
        }
        res.status(201);
        return res.json(result.data);
    }

    DeleteComponent(req: Request, res: Response) : Response {
        let result =  this.componentRepository.DeleteComponent(req.params.id);
        if(result.err) {
            res.status(404);
            return res.send(result.err);
        }

        return res.sendStatus(200);
    }
}