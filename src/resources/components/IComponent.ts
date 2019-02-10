export interface IComponentId {
    id: string;
}

export interface IComponent extends IComponentId {
    class: string,
    name: string
    properties: any,
    graphics: any
}


