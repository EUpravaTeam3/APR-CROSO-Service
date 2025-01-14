export interface InsuredPerson {
    id?: number; // ID je opcioni jer se generiše na backendu
    firstName: string;
    lastName: string;
    jmbg: string;
    employed: boolean;
    employerName?: string; // Opcioni jer nije obavezan za nezaposlene
    insuranceTypes: string[]; // Lista vrsta osiguranja
  }
  