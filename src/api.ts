import bodyParser from "body-parser";
import express from "express";
import { ComponentRouter } from "./resources/components/componentRouter";
import { WbsItemsRouter } from "./resources/wbsitems/wbsitemsRouter";

export class Api {

    public static Start() {

        const api = express();

        api.use(bodyParser.json()); // support json encoded bodies
        api.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

        api.get("/api", (req, res) => {
            return res.send("Hello from our API");

        });

        // Components
        let componentRouter = new ComponentRouter();
        api.use("/api/components", componentRouter.Routes());

        // WBS Items
        let wbsItemsRouter = new WbsItemsRouter();
        api.use("/api/wbsitems", wbsItemsRouter.Routes());


        // Start the server

        const port = process.env.PORT || 3000;

        api.listen(port, () => {
            console.log(`Api is listening on http://localhost:${port}`);
        });

    }
}
