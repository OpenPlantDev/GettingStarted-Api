export interface IQueryOptions {
    columns? : string | undefined;
    filter? : string | undefined;
    limit? : number | undefined;
}

export  class QueryOptions {

    public static get = (queryParams: any) : IQueryOptions => {
        let limit = undefined;
        if(queryParams.limit) {
            let limitNum = Number(queryParams.limit);
            if(!isNaN(limitNum)) {
                limit = limitNum;
            }
        }
        return {
            columns: queryParams.columns ? queryParams.columns : undefined,
            filter: queryParams.filter ? queryParams.filter : undefined,
            limit: limit
        }
    }
}


