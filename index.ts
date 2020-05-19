interface JSONComplexFilter {
    Type: 'Complex',    
    Operation: 'AND' | 'OR',
    LeftNode: JSONFilter,
    RightNode: JSONFilter
}

interface JSONStringFilter {
    Type: 'String', 
    Operation: 'Contains' | 'StartWith' | 'EndWith' | 'IsEqual' | 'IsNotEqual' | 'IsEmpty' | 'IsNotEmpty',
    Values: [string]
}

interface JSONIntegerFilter {
    Type: 'Integer',
    Operation: '>' | '<' | '=' | '>=' | '<=' | '!=' | 'Between'| 'IsEmpty'| 'IsNotEmpty',
    Values: [string]
}

type JSONRegularFilter = JSONStringFilter | JSONIntegerFilter;
type JSONFilter = JSONComplexFilter | JSONRegularFilter;

interface ApiSearchParams {
    fields: [string],
    pageSize?: number,
    filter?: JSONFilter
};

interface ApiSearchResult {
    /**
     * 
     */
    objects: [object],
    count: number
};

type Bridge = (params: any) => Promise<any>

export default function(bridge: Bridge) {
    async function bridgeToCPI(func: string, params: any): Promise<any> {
        params['function'] = func;
        return await bridge(params);
    }

    const clientApi = {
        api: {
            transactions: {
                get: function (params: any) {
                    return bridgeToCPI('pepperi.api.transactions.get', params);
                },
                update: function (params: any) {
                    return bridgeToCPI('pepperi.api.transactions.update', params);
                },
                search: function (params: ApiSearchParams): Promise<ApiSearchResult> {
                    return bridgeToCPI('pepperi.api.transactions.search', params);
                },
                addLines: function (params: any) {
                    return bridgeToCPI('pepperi.api.transactions.addLines', params);
                },
                removeLines: function (params: any) {
                    return bridgeToCPI('pepperi.api.transactions.removeLines', params);
                }
            },
            activities: {
                get: function (params: any) {
                    return bridgeToCPI('pepperi.api.activities.get', params);
                },
                update: function (params: any) {
                    return bridgeToCPI('pepperi.api.activities.update', params);
                },
                search: function (params: ApiSearchParams): Promise<ApiSearchResult> {
                    return bridgeToCPI('pepperi.api.activities.search', params);
                }
            },
            accounts: {
                get: function (params: any) {
                    return bridgeToCPI('pepperi.api.accounts.get', params);
                },
                update: function (params: any) {
                    return bridgeToCPI('pepperi.api.accounts.update', params);
                },

                search: function (params: ApiSearchParams): Promise<ApiSearchResult> {
                    return bridgeToCPI('pepperi.api.accounts.search', params);
                }
            },
            transactionLines: {
                get: function (params: any) {
                    return bridgeToCPI('pepperi.api.transactionLines.get', params);
                },
                update: function (params: any) {
                    return bridgeToCPI('pepperi.api.transactionLines.update', params);
                },
                search: function (params: ApiSearchParams): Promise<ApiSearchResult> {
                    return bridgeToCPI('pepperi.api.transactionLines.search', params);
                }
            },
            users: {
                get: function (params: any) {
                    return bridgeToCPI('pepperi.api.users.get', params);
                },
                search: function (params: ApiSearchParams): Promise<ApiSearchResult> {
                    return bridgeToCPI('pepperi.api.users.search', params);
                }
            },
            contacts: {
                get: function (params: any) {
                    return bridgeToCPI('pepperi.api.contacts.get', params);
                },
                update: function (params: any) {
                    return bridgeToCPI('pepperi.api.contacts.update', params);
                },
                search: function (params: ApiSearchParams): Promise<ApiSearchResult> {
                    return bridgeToCPI('pepperi.api.contacts.search', params);
                }
            },
            items: {
                get: function (params: any) {
                    return bridgeToCPI('pepperi.api.items.get', params);
                },
                search: function (params: ApiSearchParams): Promise<ApiSearchResult> {
                    return bridgeToCPI('pepperi.api.items.search', params);
                }
            },
            catalogs: {
                get: function (params: any) {
                    return bridgeToCPI('pepperi.api.catalogs.get', params);
                },
                search: function (params: ApiSearchParams): Promise<ApiSearchResult> {
                    return bridgeToCPI('pepperi.api.catalogs.search', params);
                }
            },
            allActivities: {
                search: function (params: ApiSearchParams): Promise<ApiSearchResult> {
                    return bridgeToCPI('pepperi.api.allActivities.search', params);
                }
            },
            attachments: {
                get: function (params: any) {
                    return bridgeToCPI('pepperi.api.attachments.get', params);
                },
                search: function (params: ApiSearchParams): Promise<ApiSearchResult> {
                    return bridgeToCPI('pepperi.api.attachments.search', params);
                }
            },
            userDefinedTables: {
                get: function (params: any) {
                    return bridgeToCPI('pepperi.api.userDefinedTables.get', params);
                },
                upsert: function (params: any) {
                    return bridgeToCPI('pepperi.api.userDefinedTables.upsert', params);
                },
                getList: function (params: any) {
                    return bridgeToCPI('pepperi.api.userDefinedTables.getList', params);
                }
            },
            transactionScopeItems: {
                get: function (params: any) {
                    return bridgeToCPI('pepperi.api.transactionScopeItems.get', params);
                },
                search: function (params: ApiSearchParams): Promise<ApiSearchResult> {
                    return bridgeToCPI('pepperi.api.transactionScopeItems.search', params);
                },
                update: function (params: any) {
                    return bridgeToCPI('pepperi.api.transactionScopeItems.update', params);
                }
            }
        },
        app: {
            transactions: {
                update: function (params: any) {
                    return bridgeToCPI('pepperi.app.transactions.update', params);
                },
                add: function (params: any) {
                    return bridgeToCPI('pepperi.app.transactions.add', params);
                },
                addLines: function (params: any) {
                    return bridgeToCPI('pepperi.app.transactions.addLines', params);
                },
                removeLines: function (params: any) {
                    return bridgeToCPI('pepperi.app.transactions.removeLines', params);
                }
            },
            activities: {
                update: function (params: any) {
                    return bridgeToCPI('pepperi.app.activities.update', params);
                },
                add: function (params: any) {
                    return bridgeToCPI('pepperi.app.activities.add', params);
                }
            },
            accounts: {
                update: function (params: any) {
                    return bridgeToCPI('pepperi.app.accounts.update', params);
                },
                add: function (params: any) {
                    return bridgeToCPI('pepperi.app.accounts.add', params);
                }
            },
            transactionLines: {
                update: function (params: any) {
                    return bridgeToCPI('pepperi.app.transactionLines.update', params);
                }
            },
            contacts: {
                update: function (params: any) {
                    return bridgeToCPI('pepperi.app.contacts.update', params);
                },
                add: function (params: any) {
                    return bridgeToCPI('pepperi.app.contacts.add', params);
                }
            },
            transactionScopeItems: {
                update: function (params: any) {
                    return bridgeToCPI('pepperi.app.transactionScopeItems.update', params);
                }
            }
        }
    }

    return clientApi;
}