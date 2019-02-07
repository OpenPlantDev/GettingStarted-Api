import {Api} from "./api";
import sqlite3 from "sqlite3";


import {IComponentRouter} from "./resources/components/IComponentRouter";
import {IComponentController} from "./resources/components/IComponentController";
import {IComponentRepository} from "./resources/components/IComponentRepository";

import {ComponentRouter} from "./resources/components/ComponentRouter";
import {ComponentController} from "./resources/components/ComponentController";
import {ComponentFakeDb} from "./resources/components/ComponentFakeDb";
import {ComponentDb} from "./resources/components/ComponentDb";


const getComponentRepository = (repoType: string) : IComponentRepository=> {
    if(repoType == 'sqlite') {
        const db = new sqlite3.Database('model.db');
        return new ComponentDb(db);
    }
    return new ComponentFakeDb();
}

const componentRepository : IComponentRepository = getComponentRepository('sqlite');  // or fake


const  componentController : IComponentController = new ComponentController(componentRepository);
let componentRouter : IComponentRouter = new ComponentRouter(componentController);


const api = new Api(componentRouter);

api.Start();
