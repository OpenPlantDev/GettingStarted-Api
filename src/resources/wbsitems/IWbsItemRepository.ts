import {IWbsItemId, IWbsItem} from './IWbsItem';
import {IQueryOptions} from "../../services/QueryOptions.service";

export interface IWbsItemRepositoryGetActionResult {
    err: string | undefined;
    data: IWbsItem | Array<IWbsItem> | undefined;
}

export interface IWbsItemRepositoryAddActionResult {
    err: string | undefined;
    data: IWbsItemId;
}

export interface IWbsItemRepositoryDeleteActionResult {
    err: string | undefined;
}

export interface IWbsItemRepository {
    GetItems : (query?: IQueryOptions) => Promise<IWbsItemRepositoryGetActionResult>;
    GetItemById : (id: string) => Promise<IWbsItemRepositoryGetActionResult>;
    AddItem : (comp: IWbsItem) => Promise<IWbsItemRepositoryAddActionResult>;
    DeleteItem : (id: string) => Promise<IWbsItemRepositoryDeleteActionResult>;
}

