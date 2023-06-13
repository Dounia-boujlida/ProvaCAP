using { prova.db as myDoDB } from '../db/schema';
service DoniaService2 { 
  entity DoniaProvaTabella2 as projection on myDoDB.AltraTabella;
}