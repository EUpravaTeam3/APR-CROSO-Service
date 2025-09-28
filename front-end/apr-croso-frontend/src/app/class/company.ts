import { Address } from "./address";

export class Company{
    id!: number;
    pib!: String;
    registrationNumber!: String;
    registrationDate!: Date;
    name!: String;
    companyStatus!: String;
    createdByUserId?: number;
    ownerUcn?: string;  
    // address?: Address; // Dodato polje za adresu

}