import { ComponentType } from "@angular/cdk/portal";

export class TabInterface{
    id: string = '';
    title: string = '';
    icon?:string;
    componentRef?: ComponentType<any>;
    active: boolean = false;
    data?: any;
    closable: boolean = false;
    multiple?:boolean;
    
}