# APR-CROSO-Service
Service for APR and CROSO 

*******************************
## Insured Person Register REST API  
### Registracija osiguranika (POST /api/insured-persons/register):  
Zahtev (JSON):  
  
json  
{  
  "firstName": "Marko",  
  "lastName": "Marković",  
  "jmbg": "1234567890123",  
  "employed": true,  
  "employerName": "ABC Company",  
  "insuranceTypes": ["PENSION", "HEALTH", "UNEMPLOYMENT"]  
}  
  
### Preuzimanje svih osiguranika (GET /api/insured-persons):  
[  
  {  
    "id": 1,  
    "firstName": "Marko",  
    "lastName": "Marković",  
    "jmbg": "1234567890123",  
    "employed": true,   
    "employerName": "ABC Company",  
    "insuranceTypes": ["PENSION", "HEALTH"]  
  },  
  {  
    "id": 2,  
    "firstName": "Ana",  
    "lastName": "Anić",  
    "jmbg": "9876543210987",  
    "employed": false,  
    "employerName": null,  
    "insuranceTypes": ["HEALTH"]  
  }  
]  
  
### Preuzimanje osiguranika preko jedinstvenog ID:  
...  
### Brisanje osiguranika:  
...  
