import bodyParser from "body-parser";
import express from "express";
import { IComponentRouter } from "./resources/components/ComponentRouter";
import { IWbsItemRouter } from "./resources/wbsitems/WbsitemsRouter";

export class Api {
    componentRouter: IComponentRouter;
    wbsItemRouter: IWbsItemRouter

    constructor(componentRouter: IComponentRouter, wbsItemRouter: IWbsItemRouter) {
        this.componentRouter = componentRouter;
        this.wbsItemRouter = wbsItemRouter;
    }

    public Start() {

        const api = express();

        api.use(bodyParser.json()); // support json encoded bodies
        api.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

        api.get("/api", (req, res) => {
            return res.send("Hello from our API");

        });

        // Components
        api.use("/api/components", this.componentRouter.Routes());

        // WBS Items
        api.use("/api/wbsitems", this.wbsItemRouter.Routes());


        // Start the server

        const port = process.env.PORT || 3000;

        api.listen(port, () => {
            console.log(`Api is listening on http://localhost:${port}`);
        });

    }
}
