export interface CreateCompanyDTO {
  name: string;
  pib: string;
  registrationNumber: string;
  registrationDate: Date; // ili Date, zavisi šta backend očekuje
  companyStatus: String;
  createdByUserId: number;
  ownerUcn: string;
}