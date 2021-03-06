import {Guid} from "guid-typescript";
import {IComponent} from "./IComponent";
import {IComponentRepositoryGetActionResult, 
        IComponentRepositoryAddActionResult,
        IComponentRepositoryDeleteActionResult,
        IComponentRepository} from "./IComponentRepository";

const components: Array<IComponent> = [
    {
        id: "1",
        class: "valve",
        name: "FV-100",
        properties: [ { desc: 'Gate Valve' }, { length: 50 }, { weight: 100 } ],
        graphics: [ 
          {type: 0, start: {x: 25, y:10}, end: {x: 75, y:10}},
          {type: 1, radius: 2, center: {x: 50, y:10}}
        ]
      },
    
      {
        id: "2",
        class: "pump",
        name: "FP-100",
        properties: [{desc:"Centrifugal Pump"}, {manufacturer: "ABC"}],
        graphics: [ 
          {type: 0, start: {x: 25, y:60}, end: {x: 75, y:60}},
          {type: 1, radius: 2, center: {x: 50, y:60}}
        ]
      },
    
      {
        id: "3",
        class: "tank",
        name: "FT-100",
        properties: [{desc:"Horizontal Tank"},{manufacturer: "XYZ"}],
        graphics: [ 
          {type: 0, start: {x: 25, y:100}, end: {x: 75, y:100}},
          {type: 1, radius: 2, center: {x: 50, y:100}}
        ]
      }
    
    ];

export class ComponentFakeDb implements IComponentRepository {

    constructor() {
    }

    GetComponents() : Promise<IComponentRepositoryGetActionResult> {
        return new Promise<IComponentRepositoryGetActionResult>((resolve) => {
            resolve({err: undefined, data: components});

        });
    }

    GetComponentById(id: string) : Promise<IComponentRepositoryGetActionResult> {
        return new Promise<IComponentRepositoryGetActionResult>((resolve, reject) => {
            let comp = components.find((comp) => comp.id === id);
            if (comp) {
                resolve({err: undefined, data: comp});
            } else {
                resolve({err: `Component with id [${id}] was not found`, data: undefined});
            }

        });
    }

    AddComponent(comp: IComponent) : Promise<IComponentRepositoryAddActionResult> {

        return new Promise<IComponentRepositoryAddActionResult> ((resolve, reject) => {
            comp.class = comp.class ? comp.class.trim() : "";
            comp.name = comp.name ? comp.name.trim() : "";

            if(comp.class.length == 0) {
                resolve({ err: "class not defined", data: {id: comp.id} });
            } else if(comp.name.length == 0) {
                resolve({ err: "name not defined", data: {id: comp.id} });
            } else {
                comp.id = Guid.create().toString();
                components.push(comp);
                resolve({err: undefined, data: comp});
            }

        });
    }

    DeleteComponent(id: string) : Promise<IComponentRepositoryDeleteActionResult> {
        return new Promise<IComponentRepositoryDeleteActionResult>((resolve, reject) => {
            const index = components.findIndex((comp) => comp.id === id);
            if (index < 0) {
                resolve({err: `Component with id [${id}] was not found`});
            } else {
                components.splice(index, 1);
                resolve({err: undefined});
            }

        });
    }

}