export interface IWbsItemId {
    id: string;
}

export interface IWbsItem extends IWbsItemId {
    class: string,
    name: string
    properties: any
}


