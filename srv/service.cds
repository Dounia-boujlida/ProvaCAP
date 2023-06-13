using { prova.db as myDoDB } from '../db/schema';
service DoniaService { 
  entity DoniaProvaTabella as projection on myDoDB.TabellaProva;
}