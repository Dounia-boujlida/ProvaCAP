using { sap } from '@sap/cds/common';
namespace prova.db;

entity TabellaProva {
    key Id : Int16;
        name : String;
        date : Timestamp;
}

entity AltraTabella {
    key id:Int16;
        name:String;
        date: Timestamp;
}