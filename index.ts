import { JSONFilter } from '@pepperi-addons/pepperi-filters'

type TransactionIdentifier = { UUID: string } | { InternalID: number };
type ItemIdentifier = { UUID: string } | { InternalID: number } | { ExternalID: string };
type ObjectIdentifier = { UUID: string } | { InternalID: number };
type TypeIdentifier = { Name: string } | { InternalID: number };
type CatalogIdentifier = { Name: string } | { InternalID: number } | { UUID: string };

interface SuccessResult {
    success: true
}

interface ErrorResult {
    success: false
    error: {
        code: number;
        message: string;
    }
}

interface SearchParams<T extends string> {  
    fields: T[];
    page?: number;
    pageSize?: number;
    filter?: JSONFilter;
    sorting: { Field: string, Ascending: boolean}[]
};

interface SearchResult<T extends string> extends SuccessResult {
    objects: { [K in T]: any }[],
    count: number
    page: number
};

interface TransactionLinesSearchParams<T extends string> extends SearchParams<T> {
    transactionFilter?: JSONFilter
}

interface OrderCenterSearchParams<T extends string> extends SearchParams<T> {
    transaction: TransactionIdentifier
}

interface UpdateParams {
    objects: { 
        UUID: string,
        [key: string]: any 
    }[];
    save?: boolean;
}

interface UpdateStatus {
    id: string;
    status: 'updated' | 'failed' | 'added' | 'deleted';
    message: string
}

interface UpdateResult extends SuccessResult {
    result: UpdateStatus[]
}

interface OrderCenterUpdateParams {
    transaction: TransactionIdentifier
    objects: { 
        item: ItemIdentifier,
        [key: string]: any 
    }[];
    save?: boolean;
}

interface UDTGetParams {
    table: string;
    mainKey: string;
    secondaryKey: string;
    index?: number;
}

interface UDTGetResult extends SuccessResult {
    value: string
}

interface UDTGetListParams {
    table: string;
    mainKey?: string;
    secondaryKey?: string;
}

interface UDTGetListResult extends SuccessResult {
    objects: {
        mainKey: string;
        secondaryKey: string;
        value: string;
    }[]
}

interface UDTUpsertParams {
    table: string;
    mainKey: string;
    secondaryKey: string;
    index?: number;
    value: string;
}

interface GetParams<T extends string> {
    fields: T[],
    key: ObjectIdentifier
}

interface GetResult<T extends string> {
    object: { [K in T]: any }
}

interface OrderCenterGetParams<T extends string> {
    transaction: TransactionIdentifier
    item: ItemIdentifier
    fields: T[],
}

interface OrderCenterGetResult<T extends string> {
    object: { [K in T]: any }
}

interface CreateAccountParams {
    type?: TypeIdentifier
    object?: { [key: string]: any } 
}

interface CreateContactParams {
    type?: TypeIdentifier
    references: {
        account: ObjectIdentifier
    }
    object?: { [key: string]: any } 
}

interface CreateActivityParams {
    type: TypeIdentifier
    references: {
        account: ObjectIdentifier
    }
    object?: { [key: string]: any } 
}

interface CreateTransactionParams {
    type: TypeIdentifier
    references: {
        account: ObjectIdentifier;
        catalog?: CatalogIdentifier;
        originAccount?: ObjectIdentifier;
    }
    object?: { [key: string]: any } 
}

interface CreateResult extends SuccessResult, UpdateStatus {
    
}

interface AddTransactionLinesParams {
    transaction: TransactionIdentifier,
    lines: {
        item: ItemIdentifier,
        leadingLine?: ObjectIdentifier,
        lineData: {
            [key: string]: any
        }
    }[]
}

interface RemoveTransactionLinesParams {
    transaction: TransactionIdentifier,
    lines: ObjectIdentifier[]
}

type Bridge = (params: any) => Promise<any>

export default function(bridge: Bridge) {
    async function bridgeToCPI(func: string, params: any): Promise<any> {
        params['function'] = func;
        return await bridge(params);
    }

    function searchFunction(key: string) {
        return <T extends string>(params: SearchParams<T>): Promise<SearchResult<T> | ErrorResult> => {
            return bridgeToCPI(key, params);
        }
    }

    function getFunction(key: string) {
        return <T extends string>(params: GetParams<T>): Promise<GetResult<T> | ErrorResult> => {
            return bridgeToCPI(key, params);
        }
    }

    function updateFunction(key: string) {
        return (params: UpdateParams): Promise<UpdateResult | ErrorResult> => {
            return bridgeToCPI(key, params);
        }
    }

    const clientApi = {
        api: {
            transactions: {
                get: getFunction('pepperi.api.transactions.get'),
                update: updateFunction('pepperi.api.transactions.update'),
                search: searchFunction('pepperi.api.transactions.search'),
                addLines: (params: AddTransactionLinesParams): Promise<UpdateResult | ErrorResult> => {
                    return bridgeToCPI('pepperi.api.transactions.addLines', params);
                },
                removeLines: (params: RemoveTransactionLinesParams): Promise<UpdateResult | ErrorResult> => {
                    return bridgeToCPI('pepperi.api.transactions.removeLines', params);
                }
            },
            activities: {
                get: getFunction('pepperi.api.activities.get'),
                update: updateFunction('pepperi.api.activities.update'),
                search: searchFunction('pepperi.api.activities.search'),
            },
            accounts: {
                get: getFunction('pepperi.api.accounts.get'),
                update: updateFunction('pepperi.api.accounts.update'),
                search: searchFunction('pepperi.api.accounts.search'),
            },
            transactionLines: {
                get: getFunction('pepperi.api.transactionLines.get'),
                update: updateFunction('pepperi.api.transactionLines.update'),
                search: searchFunction('pepperi.api.transactionLines.search'),
            },
            users: {
                get: getFunction('pepperi.api.users.get'),
                search: searchFunction('pepperi.api.users.search'),
            },
            contacts: {
                get: getFunction('pepperi.api.contacts.get'),
                update: updateFunction('pepperi.api.contacts.update'),
                search: searchFunction('pepperi.api.contacts.search'),
            },
            items: {
                get: getFunction('pepperi.api.items.get'),
                search: searchFunction('pepperi.api.items.search'),
            },
            catalogs: {
                get: getFunction('pepperi.api.catalogs.get'),
                search: searchFunction('pepperi.api.catalogs.search'),
            },
            allActivities: {
                search: searchFunction('pepperi.api.allActivities.search'),
            },
            attachments: {
                get: getFunction('pepperi.api.attachments.get'),
                search: searchFunction('pepperi.api.attachments.search'),
            },
            userDefinedTables: {
                get: (params: UDTGetParams): Promise<UDTGetResult | ErrorResult> => {
                    return bridgeToCPI('pepperi.api.userDefinedTables.get', params);
                },
                upsert: (params: UDTUpsertParams): Promise<UpdateResult | ErrorResult> => {
                    return bridgeToCPI('pepperi.api.userDefinedTables.upsert', params);
                },
                getList: (params: UDTGetListParams): Promise<UDTGetListResult | ErrorResult> => {
                    return bridgeToCPI('pepperi.api.userDefinedTables.getList', params);
                }
            },
            transactionScopeItems: {
                get: getFunction('pepperi.api.transactionScopeItems.get'),
                search: searchFunction('pepperi.api.transactionScopeItems.search'),
                update: updateFunction('pepperi.api.transactionScopeItems.update'),
            }
        },
        app: {
            transactions: {
                update: updateFunction('pepperi.app.transactions.update'),
                add: (params: CreateTransactionParams): Promise<CreateResult | ErrorResult> => {
                    return bridgeToCPI('pepperi.app.transactions.add', params);
                },
                addLines: (params: AddTransactionLinesParams): Promise<UpdateResult | ErrorResult> => {
                    return bridgeToCPI('pepperi.app.transactions.addLines', params);
                },
                removeLines: (params: RemoveTransactionLinesParams): Promise<UpdateResult | ErrorResult> => {
                    return bridgeToCPI('pepperi.app.transactions.removeLines', params);
                }
            },
            activities: {
                update: updateFunction('pepperi.app.activities.update'),
                add: (params: CreateActivityParams): Promise<CreateResult | ErrorResult> => {
                    return bridgeToCPI('pepperi.app.activities.add', params);
                }
            },
            accounts: {
                update: updateFunction('pepperi.app.accounts.update'),
                add: (params: CreateAccountParams): Promise<CreateResult | ErrorResult> => {
                    return bridgeToCPI('pepperi.app.accounts.add', params);
                }
            },
            transactionLines: {
                update: updateFunction('pepperi.app.transactionLines.update'),
            },
            contacts: {
                update: updateFunction('pepperi.app.contacts.update'),
                add: (params: CreateContactParams): Promise<CreateResult | ErrorResult> => {
                    return bridgeToCPI('pepperi.app.contacts.add', params);
                }
            },
            transactionScopeItems: {
                update: updateFunction('pepperi.app.transactionScopeItems.update'),
            }
        }
    }

    return clientApi;
}