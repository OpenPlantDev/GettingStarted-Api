import {Router} from "express";
import {IComponentController} from "./IComponentController";
import {IComponentRouter} from "./IComponentRouter";


export class ComponentRouter implements IComponentRouter {

    router: Router;
    componentController: IComponentController;

    constructor(compController: IComponentController) {
        this.router = Router();
        this.componentController = compController;
    }

    Routes() : Router {

        this.router.get("/", (req, res) => {
            this.componentController.GetComponents(req, res)
                .then((result) => {
                    return result;
                })
                .catch((err) => {
                    return err;
                })
        });

        this.router.get("/:id", (req, res) => {
            this.componentController.GetComponentById(req, res)
                .then((result) => {
                    return result;
                })
                .catch((err) => {
                    return err;
                })
        });

        this.router.post("/", (req, res) => {
            this.componentController.AddComponent(req, res)
            .then((result) => {
                return result;
            })
            .catch((err) => {
                return err;
            })
        });

        this.router.delete("/:id", (req, res) => {
            this.componentController.DeleteComponent(req, res)
            .then((result) => {
                return result;
            })
            .catch((err) => {
                return err;
            })
        });


        return this.router;
    }
}