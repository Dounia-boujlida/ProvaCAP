sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("ui.provacap.controller.Home", {
            onInit: async function () {
                var oPr= new sap.ui.model.json.JSONModel();
                //nome entity set
                var aPr = await this._getHanaData("/DoniaProvaTabella2");
                oPr.setData(aPr);
                this.getView().setModel(oPr, "Prodotti");
                debugger
            },

            _getHanaData: function (Entity) {
                var xsoDataModelReport = this.getOwnerComponent().getModel();
                return new Promise(
                    function (resolve, reject) {
                        xsoDataModelReport.read(Entity, {
                           
                            success: function (oDataIn, oResponse) {
                                resolve(oDataIn.results);
                            },
                            error: function (error) {
                                reject(console.log(error))
                            }
                        });
                    });
                },
            })
        })