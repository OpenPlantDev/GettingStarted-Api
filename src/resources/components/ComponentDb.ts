import sqlite3 from "sqlite3";
import {IComponent} from "./IComponent";
import {IComponentRepositoryActionResult, IComponentRepositoryQueryOptions, IComponentRepository} from "./IComponentRepository";

export class ComponentDb implements IComponentRepository {

    db: sqlite3.Database;
    constructor(db: sqlite3.Database) {
        this.db = db;
    }

    GetComponents(options?: IComponentRepositoryQueryOptions) : Promise<IComponentRepositoryActionResult> {
        let whereClause = "";
        if(options) {
            if(options.filter) {
                whereClause = `Where ${options.filter}`;
            }
            if(options.limit) {
                whereClause = `${whereClause} Limit ${options.limit}`
            }
        }
        const query = `Select * from components ${whereClause}`;
        console.log(`query = ${query}`);
        return new Promise<IComponentRepositoryActionResult>((resolve, reject) => {
            this.db.all(query, [], (err, rows) => {
                if(err) {
                    console.log(`error running query = ${query}`);
                    console.log(err);
                    reject(err);
                } else {
                    resolve({err: undefined, data: rows});
                }

            });
    
        });

    }

    GetComponentById(id: string) : Promise<IComponentRepositoryActionResult> {
        return new Promise<IComponentRepositoryActionResult>((resolve, reject) => {
            const query = `Select * from components where id=${id}`;

            this.db.all(query, [], (err, rows) => {
                if(err) {
                    console.log(`error running query = ${query}`);
                    console.log(err);
                    reject(err);
                } else {
                    if(rows.length <= 0) {
                        resolve({err: `Component with id [${id}] was not found`, data: undefined});
                    } else {
                        resolve({err: undefined, data: rows[0]});
                    }
                }

            });
        });
    }

    AddComponent(comp: IComponent) : Promise<IComponentRepositoryActionResult> {
        const compClass = comp.class ? comp.class.trim() : "";
        const compName = comp.name ? comp.name.trim() : "";
        const compDesc = comp.desc ? comp.desc.trim() : "";
        return new Promise<IComponentRepositoryActionResult>((resolve, reject) => {
            if(compClass.length == 0) {
                resolve({ err: "class not defined", data: undefined });
            } else if(compName.length == 0) {
                resolve({ err: "name not defined", data: undefined });
            } else {
                const query = `Insert into components (class, name, desc) Values
                                ('${compClass}', '${compName}', '${compDesc}')`;

                this.db.run(query, [], (err) => {
                    if(err) {
                        console.log(`error running query = ${query}`);
                        console.log(err);
                        reject(err);
                    } else {
                        resolve({err: undefined, data: undefined});
                    }
    
                });
    
            }
        });
    }

    DeleteComponent(id: string) : Promise<IComponentRepositoryActionResult> {
        return new Promise<IComponentRepositoryActionResult>((resolve, reject) => {
            const query = `Delete from components where id=${id}`;

            this.db.run(query, [], (err) => {
                if(err) {
                    console.log(`error running query = ${query}`);
                    console.log(err);
                    reject(err);
                } else {
                    resolve({err: undefined, data: undefined});
                }

            });
        });
    }

}

