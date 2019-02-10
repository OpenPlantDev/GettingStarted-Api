import {IComponentId, IComponent} from './IComponent';
import {IQueryOptions} from "../../services/QueryOptions.service";

export interface IComponentRepositoryGetActionResult {
    err: string | undefined;
    data: IComponent | Array<IComponent> | undefined;
}

export interface IComponentRepositoryAddActionResult {
    err: string | undefined;
    data: IComponentId;
}

export interface IComponentRepositoryDeleteActionResult {
    err: string | undefined;
}

export interface IComponentRepository {
    GetComponents : (query?: IQueryOptions) => Promise<IComponentRepositoryGetActionResult>;
    GetComponentById : (id: string) => Promise<IComponentRepositoryGetActionResult>;
    AddComponent : (comp: IComponent) => Promise<IComponentRepositoryAddActionResult>;
    DeleteComponent : (id: string) => Promise<IComponentRepositoryDeleteActionResult>;
}

