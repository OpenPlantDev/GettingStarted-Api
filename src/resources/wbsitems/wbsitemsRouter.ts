import {Router} from "express";
import {IWbsItemController} from "./WbsItemController";

export interface IWbsItemRouter {
    Routes: () => Router;
}

// The job of the Router is to pass the given request to the proper method on the given controller
// The routes in WbsItemRouter are relative to "/api/WbsItems" due to the way the router is used in api.ts:
//      api.use("/api/wbsItems", this.WbsItemRouter.Routes());
// so in the WbsItemRouter a route defined for "/:id" has a full route of "/api/wbsitem/:id"
// Note that the WbsItemController calls return Promise<Response> because they are async due to reading/writing to db

export class WbsItemRouter implements IWbsItemRouter {

    router: Router;
    WbsItemController: IWbsItemController;

    constructor(compController: IWbsItemController) {
        this.router = Router();
        this.WbsItemController = compController;
    }

    Routes() : Router {
        // for a get request with route "/api/WbsItems" call the GetWbsItems method on the controller
        this.router.get("/", async (req, res) => {
            try {
                const result = await this.WbsItemController.GetItems(req, res);
                return result;
            }
            catch(err) {
                throw err;
            }
        });

        // for a get request with route "/api/WbsItems/:id" call the GetWbsItemById method on the controller
        this.router.get("/:id", async (req, res) => {
            try {
                const result = this.WbsItemController.GetItemById(req, res);
                return result;
            }
            catch(err) {
                throw err;
            }
        });

        // for a post request with route"/api/WbsItems" call the AddWbsItem method on the controller
        this.router.post("/", async (req, res) => {
            try {
                const result = this.WbsItemController.AddItem(req, res);
                return result;
            }
            catch(err) {
                return err;
            }
        });

        // for a delete request with route"/api/WbsItems/:id" call the DeleteWbsItem method on the controller
        this.router.delete("/:id", async (req, res) => {
            try {
                const result = this.WbsItemController.DeleteItem(req, res);
                return result;
            }
            catch(err) {
                return err;
            }
        });


        return this.router;
    }
}