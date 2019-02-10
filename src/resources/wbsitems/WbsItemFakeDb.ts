import {Guid} from "guid-typescript";
import {IWbsItem} from "./IWbsItem";
import {IWbsItemRepositoryGetActionResult, 
        IWbsItemRepositoryAddActionResult,
        IWbsItemRepositoryDeleteActionResult,
        IWbsItemRepository} from "./IWbsItemRepository";

const WbsItems: Array<IWbsItem> = [
        { id: "1", class: "unit", name: "U1", properties: [{desc: "Unit #1"}] },
        { id: "2", class: "unit", name: "U2", properties: [{desc: "Unit #2"}] },
        { id: "3", class: "service", name: "S1", properties: [{desc: "Service #1"}] },
        { id: "4", class: "area", name: "A1", properties: [{desc: "Area #1"}] },
    
    ];
    
    
export class WbsItemFakeDb implements IWbsItemRepository {

    constructor() {
    }

    GetItems() : Promise<IWbsItemRepositoryGetActionResult> {
        return new Promise<IWbsItemRepositoryGetActionResult>((resolve) => {
            resolve({err: undefined, data: WbsItems});

        });
    }

    GetItemById(id: string) : Promise<IWbsItemRepositoryGetActionResult> {
        return new Promise<IWbsItemRepositoryGetActionResult>((resolve, reject) => {
            let comp = WbsItems.find((comp) => comp.id === id);
            if (comp) {
                resolve({err: undefined, data: comp});
            } else {
                resolve({err: `WbsItem with id [${id}] was not found`, data: undefined});
            }

        });
    }

    AddItem(comp: IWbsItem) : Promise<IWbsItemRepositoryAddActionResult> {

        return new Promise<IWbsItemRepositoryAddActionResult> ((resolve, reject) => {
            comp.class = comp.class ? comp.class.trim() : "";
            comp.name = comp.name ? comp.name.trim() : "";

            if(comp.class.length == 0) {
                resolve({ err: "class not defined", data: {id: comp.id} });
            } else if(comp.name.length == 0) {
                resolve({ err: "name not defined", data: {id: comp.id} });
            } else {
                comp.id = Guid.create().toString();
                WbsItems.push(comp);
                resolve({err: undefined, data: comp});
            }

        });
    }

    DeleteItem(id: string) : Promise<IWbsItemRepositoryDeleteActionResult> {
        return new Promise<IWbsItemRepositoryDeleteActionResult>((resolve, reject) => {
            const index = WbsItems.findIndex((comp) => comp.id === id);
            if (index < 0) {
                resolve({err: `WbsItem with id [${id}] was not found`});
            } else {
                WbsItems.splice(index, 1);
                resolve({err: undefined});
            }

        });
    }

}