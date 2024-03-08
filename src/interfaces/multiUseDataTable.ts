export interface IDataTableHeaders{
    title: string;
    key: string;
    align: string;
    sortable: boolean;
};

export interface IExpandableItemActions{
    name: string;
    color: string;
    eventName: string;
    prependIcon?: string;
    appendIcon?: string;
};

export interface INoDataSlotOptions{
    text: string;
    color: string;
};