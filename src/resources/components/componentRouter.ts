import {Router} from "express";
import {IComponentController} from "./IComponentController";
import {IComponentRouter} from "./IComponentRouter";

// The job of the Router is to pass the given request to the proper method on the given controller
// Note that The ComponentController calls return Promise<Response> because they are async due to reading/writing to db

export class ComponentRouter implements IComponentRouter {

    router: Router;
    componentController: IComponentController;

    constructor(compController: IComponentController) {
        this.router = Router();
        this.componentController = compController;
    }

    Routes() : Router {
        // for a get request with route "/api/components" call the GetComponents method on the controller
        this.router.get("/", async (req, res) => {
            try {
            const result = await this.componentController.GetComponents(req, res);
            return result;
            }
            catch(err) {
                return err;
            }
        });

        // for a get request with route "/api/components/:id" call the GetComponentById method on the controller
        this.router.get("/:id", async (req, res) => {
            try {
                const result = this.componentController.GetComponentById(req, res);
                return result;
            }
            catch(err) {
                return err;
            }
        });

        // for a post request with route"/api/components" call the AddComponent method on the controller
        this.router.post("/", async (req, res) => {
            try {
                const result = this.componentController.AddComponent(req, res);
                return result;
            }
            catch(err) {
                return err;
            }
        });

        // for a delete request with route"/api/components/:id" call the DeleteComponent method on the controller
        this.router.delete("/:id", async (req, res) => {
            try {
                const result = this.componentController.DeleteComponent(req, res);
                return result;
            }
            catch(err) {
                return err;
            }
        });


        return this.router;
    }
}