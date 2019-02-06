import {Router} from "express";
import {ComponentController} from "./componentController";
//import { IComponent } from "./component";

// for Middleware to be able to add comp to req
// declare global {
//     namespace Express {
//         interface Request {
//             comp: IComponent
//         }
//     }
// }

export class ComponentRouter {

    router: Router;
    componentController: ComponentController;

    constructor() {
        this.router = Router();
        this.componentController = new ComponentController();
    }



    Routes() : Router {

        // Middleware
        // this.router.use("/:id", (req, res, next) => {
        //     let comp = this.componentController.GetComponentById(req.params.id);
        //     if (comp) {
        //         req.comp = comp;
        //         return next();
        //     }
        //     return res.sendStatus(404);

        // });

        this.router.get("/", (req, res) => {
            return this.componentController.GetComponents(req, res);
        });

        this.router.get("/:id", (req, res) => {
            // using Middleware, I don't think it is applicable here, but just testing it out
            //return(res.json(req.comp));  

            return this.componentController.GetComponentById(req, res);
        });

        this.router.post("/", (req, res) => {
            return this.componentController.AddComponent(req, res);
        });

        this.router.delete("/:id", (req, res) => {
            // return res.send(`should delete comp with id = ${req.params.id}`);
            return this.componentController.DeleteComponent(req, res);
        });


        return this.router;
    }
}