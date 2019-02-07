import {IComponent} from './IComponent';

export interface IComponentRepositoryActionResult {
    err: string | undefined;
    data: IComponent | Array<IComponent> | undefined;
}

export interface IComponentRepositoryQueryOptions {
    filter? : string;
    limit? : number;
}

export interface IComponentRepository {
    GetComponents : () => Promise<IComponentRepositoryActionResult>;
    GetComponentById : (id: string) => Promise<IComponentRepositoryActionResult>;
    AddComponent : (comp: IComponent) => Promise<IComponentRepositoryActionResult>;
    DeleteComponent : (id: string) => Promise<IComponentRepositoryActionResult>;
}

