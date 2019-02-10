import {Api} from "./api";
import sqlite3 from "sqlite3";


import {IComponentRouter, ComponentRouter} from "./resources/components/ComponentRouter";
import {IComponentController, ComponentController} from "./resources/components/ComponentController";
import {IComponentRepository} from "./resources/components/IComponentRepository";
import {ComponentFakeDb} from "./resources/components/ComponentFakeDb";
import {ComponentDb} from "./resources/components/ComponentDb";

import { IWbsItemController, WbsItemController } from "./resources/wbsitems/WbsItemController";
import { IWbsItemRouter, WbsItemRouter } from "./resources/wbsitems/WbsitemsRouter";
import { IWbsItemRepository } from "./resources/wbsitems/IWbsItemRepository";
import {WbsItemDb} from "./resources/wbsitems/WbsItemDb";
import {WbsItemFakeDb} from "./resources/wbsitems/WbsItemFakeDb";


interface IModelRepository   {
    componentRepository : IComponentRepository;
    wbsItemRepository: IWbsItemRepository;
}


const getModelRepository = (repoType: string) : IModelRepository=> {
    if(repoType == 'sqlite') {
        const db = new sqlite3.Database('model.db');
        return ({
            componentRepository: new ComponentDb(db),
            wbsItemRepository: new WbsItemDb(db)
        });
    } else {
        return ({
            componentRepository: new ComponentFakeDb(),
            wbsItemRepository: new WbsItemFakeDb()
        });
    }
}

const modelRepository = getModelRepository('sqlite'); // or fake

const  componentController : IComponentController = new ComponentController(modelRepository.componentRepository);
let componentRouter : IComponentRouter = new ComponentRouter(componentController);

const  wbsItemController : IWbsItemController = new WbsItemController(modelRepository.wbsItemRepository);
let wbsItemRouter : IWbsItemRouter = new WbsItemRouter(wbsItemController);

const api = new Api(componentRouter, wbsItemRouter);

api.Start();
