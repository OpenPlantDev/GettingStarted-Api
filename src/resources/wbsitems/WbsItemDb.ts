import sqlite3 from "sqlite3";
import {SqliteService} from "../../services/Sqlite.service";
import {IWbsItem} from "./IWbsItem";
import {IWbsItemRepositoryGetActionResult, 
        IWbsItemRepositoryAddActionResult,
        IWbsItemRepositoryDeleteActionResult,
        IWbsItemRepository} from "./IWbsItemRepository";
import { IQueryOptions } from "../../services/QueryOptions.service";


const tableName = "WbsItems";

const rowToItem = (row: any) : IWbsItem => {
    return {
        id: row.id,        
        class: row.class,
        name: row.name,
        properties: row.properties ? JSON.parse(row.properties) : [],
    }
}

const rowsToItemArray = (rows: Array<any>) : Array<IWbsItem> => {
    let items = new Array<IWbsItem>();

    if(!rows) {
        return items;
    }

    rows.forEach((row) => {
        let comp = rowToItem(row);
        console.log(comp);
        items.push(rowToItem(row));
    });

    return items;
}

export class WbsItemDb implements IWbsItemRepository {

    sqliteService: SqliteService;
    constructor(db: sqlite3.Database) {
        this.sqliteService = new SqliteService(db);
    }

    async GetItems(options?: IQueryOptions) : Promise<IWbsItemRepositoryGetActionResult> {
        const query = this.sqliteService.getQuery(tableName, options ? options : {});
        console.log(`query = ${query}`);
        try {
            let rows = await this.sqliteService.dbAll(query, []);
            return({err: undefined, data: rowsToItemArray(rows)});
        }
        catch (err) {
            throw err;
        }
    }

    async GetItemById(id: string) : Promise<IWbsItemRepositoryGetActionResult> {
        const query = `Select * from WbsItems where id=${id}`;
        try {
            let rows = await this.sqliteService.dbAll(query, []);
            if(rows.length <= 0) {
                return({err: `WbsItem with id [${id}] was not found`, data: undefined});
            } else {
                return({err: undefined, data: rowToItem(rows[0])});
            }
        }
        catch (err) {
            throw err;
        }
    }

    async AddItem(comp: IWbsItem) : Promise<IWbsItemRepositoryAddActionResult> {
        const compClass = comp.class ? comp.class.trim() : "";
        const compName = comp.name ? comp.name.trim() : "";
        const compProps = comp.properties ? JSON.stringify(comp.properties) : "";
        if(compClass.length == 0) {
            return({ err: "class not defined", data: {id: ""} });
        } else if(compName.length == 0) {
            return({ err: "name not defined", data: {id: ""} });
        } else {
            const query = `Insert into WbsItems (class, name, properties) Values
                            ('${compClass}', '${compName}', '${compProps}')`;
            try {
                let result = await this.sqliteService.dbRun(query, []);
                return({err: undefined, data: {id: result.lastId}});

            }
            catch (err) {
                throw err;
            }
        }
    }

    async DeleteItem(id: string) : Promise<IWbsItemRepositoryDeleteActionResult> {
        const query = `Delete from WbsItems where id=${id}`;
        try {
            let result = await this.sqliteService.dbRun(query, []);
            if(result.rowsAffected == 0) {
                return {err: `WbsItem with id [${id}] was not found`};
            } else {
                return {err: undefined};
            }
        }
        catch (err) {
            throw err;
        }
    }

}

