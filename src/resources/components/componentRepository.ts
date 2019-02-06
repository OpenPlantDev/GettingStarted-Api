import {IComponent} from './component';

const components: Array<IComponent> = [
    { id: "1", class: "valve", desc: "Gate Valve", name: "V-100"},
    { id: "2", class: "pump", desc: "Centrigual Pump", name: "P-100"},
    { id: "3", class: "tank", desc: "Horizontal Tank", name: "T-100"},
];

const findComponent = (id: string) => {
    let index = -1;
    let currIndex = 0;
    for ( const comp of components) {
        if (comp.id === id) {
            index = currIndex;
            break;
        }
        currIndex++;
    }
    return index;
};

export interface ComponentRepositoryActionResult {
    err: string | undefined;
    data: IComponent | Array<IComponent> | undefined;
}

export class ComponentRepository {

    GetComponents() : ComponentRepositoryActionResult {
        return({err: undefined, data: components});
    }

    GetComponentById(id: string) : ComponentRepositoryActionResult {
        const index = findComponent(id);
        if (index > -1) {
            return({err: undefined, data: components[index]});
        }
        return ({err: `Component with id [${id}] was not found`, data: undefined});
    }

    AddComponent(comp: IComponent) : ComponentRepositoryActionResult {
        if(!comp.id || !comp.class || !comp.name) {
            return { err: "Not enough data", data: undefined };
        }
        components.push(comp);
        return {err: undefined, data: comp};
    }

    DeleteComponent(id: string) : ComponentRepositoryActionResult {
        const index = findComponent(id);
        if (index < 0) {
            return ({err: `Component with id [${id}] was not found`, data: undefined});
        }
        components.splice(index, 1);
        return ({err: undefined, data: undefined});

    }

}