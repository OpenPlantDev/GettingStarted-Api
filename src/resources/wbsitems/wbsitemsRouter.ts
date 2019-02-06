import {Router} from "express";

const wbsItems = [
    { id: "1", class: "unit", name: "U1" },
    { id: "2", class: "unit", name: "U2" },
    { id: "3", class: "service", name: "S1" },
    { id: "4", class: "area", name: "A1" },

];


export class WbsItemsRouter {

    router: Router;

    constructor() {
        this.router = Router();
    }

    findWbsItem = (id: string) => {
        let index = -1;
        let currIndex = 0;
        for ( const wbsItem of wbsItems) {
            if (wbsItem.id === id) {
                index = currIndex;
                break;
            }
            currIndex++;
        }
        return index;
    };


    Routes() : Router {

        this.router.get("/", (req, res) => {
            return res.json(wbsItems);
        });

        this.router.get("/:id", (req, res) => {
            const index = this.findWbsItem(req.params.id);
            if (index > -1) {
                return res.json(wbsItems[index]);
            }
            return res.sendStatus(404);
        });

        this.router.post("/", (req, res) => {
            wbsItems.push({
                id: req.body.id,
                class: req.body.class,
                name: req.body.name
            });
            return res.sendStatus(201);

        });

        this.router.delete("/:id", (req, res) => {
            // return res.send(`should wbs item comp with id = ${req.params.id}`);
            const index = this.findWbsItem(req.params.id);
            if (index > -1) {
                wbsItems.splice(index, 1);
                return res.sendStatus(200);
            }
            return res.sendStatus(404);

        });


        return this.router;
    }
}