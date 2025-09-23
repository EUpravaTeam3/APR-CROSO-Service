import { Address } from "./address";

export class Company{
    id!: number;
    pib!: String;
    registrationNumber!: String;
    registrationDate!: Date;
    name!: String;
    companyStatus!: String;
    createdByUserId?: number;
    // address?: Address; // Dodato polje za adresu

}