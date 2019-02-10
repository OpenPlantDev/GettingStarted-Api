import sqlite3 from "sqlite3";
import {SqliteService} from "../../services/Sqlite.service";
import {IComponent} from "./IComponent";
import {IComponentRepositoryGetActionResult, 
        IComponentRepositoryAddActionResult,
        IComponentRepositoryDeleteActionResult,
        IComponentRepository} from "./IComponentRepository";
import { IQueryOptions } from "../../services/QueryOptions.service";


const tableName = "components";

const rowToComp = (row: any) : IComponent => {
    return {
        id: row.id,        
        class: row.class,
        name: row.name,
        properties: row.properties ? JSON.parse(row.properties) : [],
        graphics: row.graphics ? JSON.parse(row.graphics) : []
    }
}

const rowsToCompArray = (rows: Array<any>) : Array<IComponent> => {
    let comps = new Array<IComponent>();

    if(!rows) {
        return comps;
    }

    rows.forEach((row) => {
        let comp = rowToComp(row);
        console.log(comp);
        comps.push(rowToComp(row));
    });

    return comps;
}

export class ComponentDb implements IComponentRepository {

    sqliteService: SqliteService;
    constructor(db: sqlite3.Database) {
        this.sqliteService = new SqliteService(db);
    }

    async GetComponents(options?: IQueryOptions) : Promise<IComponentRepositoryGetActionResult> {
        const query = this.sqliteService.getQuery(tableName, options ? options : {});
        console.log(`query = ${query}`);
        try {
            let rows = await this.sqliteService.dbAll(query, []);
            return({err: undefined, data: rowsToCompArray(rows)});
        }
        catch (err) {
            throw err;
        }
    }

    async GetComponentById(id: string) : Promise<IComponentRepositoryGetActionResult> {
        const query = `Select * from components where id=${id}`;
        try {
            let rows = await this.sqliteService.dbAll(query, []);
            if(rows.length <= 0) {
                return({err: `Component with id [${id}] was not found`, data: undefined});
            } else {
                return({err: undefined, data: rowToComp(rows[0])});
            }
        }
        catch (err) {
            throw err;
        }
    }

    async AddComponent(comp: IComponent) : Promise<IComponentRepositoryAddActionResult> {
        const compClass = comp.class ? comp.class.trim() : "";
        const compName = comp.name ? comp.name.trim() : "";
        const compProps = comp.properties ? JSON.stringify(comp.properties) : "";
        const compGraphics = comp.graphics ? JSON.stringify(comp.graphics) : "";
        if(compClass.length == 0) {
            return({ err: "class not defined", data: {id: ""} });
        } else if(compName.length == 0) {
            return({ err: "name not defined", data: {id: ""} });
        } else {
            const query = `Insert into components (class, name, properties, graphics) Values
                            ('${compClass}', '${compName}', '${compProps}', '${compGraphics}')`;
            try {
                let result = await this.sqliteService.dbRun(query, []);
                return({err: undefined, data: {id: result.lastId}});

            }
            catch (err) {
                throw err;
            }
        }
    }

    async DeleteComponent(id: string) : Promise<IComponentRepositoryDeleteActionResult> {
        const query = `Delete from components where id=${id}`;
        try {
            let result = await this.sqliteService.dbRun(query, []);
            if(result.rowsAffected == 0) {
                return {err: `Component with id [${id}] was not found`};
            } else {
                return {err: undefined};
            }
        }
        catch (err) {
            throw err;
        }
    }

}

