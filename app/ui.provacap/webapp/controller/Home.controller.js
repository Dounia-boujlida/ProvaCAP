sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,
	JSONModel, Fragment) {
        "use strict";

        return Controller.extend("ui.provacap.controller.Home", {
            onInit: async function () {
                var oPr= new sap.ui.model.json.JSONModel();
                //nome entity set
                var aPr = await this._getHanaData("/DoniaProvaTabella2");
                oPr.setData(aPr);
                this.getView().setModel(oPr, "Prodotti");
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
                onAdd: function () {
                    if (!this.pDialog) {
                      this.pDialog = this.loadFragment({
                          name: "ui.provacap.view.Fragments.form"
                      });
                  } 
                  this.pDialog.then(function(oDialog) {
                      oDialog.open();
                  });
                  },
                  closeOnPress: function(oEvent){
                    // var oDialog = this.getView().byId("helloDialog");
                    oEvent.getSource().getParent().close();
                  },
                  addEmployee: async function (e) {
                    var oDialog = e.getSource().getParent();
                    var oModel = oDialog.getModel("formModel");
                    var oData = oModel.getData();
                    var xsoDataModelReport = this.getOwnerComponent().getModel();
                    xsoDataModelReport.create("/DoniaProvaTabella2", {id: parseInt(oData.id), name: oData.name , date: oData.date}
                    , {
                        success: async (oNew, response) => {
                            debugger;
                            this.getOwnerComponent().getModel().refresh()

                            //vecchio metodo
                        //     let oPr = new JSONModel();
                        //     const aPr = await this._getHanaData("/DoniaProvaTabella2");
                        //    oPr.setProperty("/", aPr)
                        //     this.getView().setModel(oPr, "Prodotti");
                        },
                        error: async (e) => {
                          console.log(e);
      
                        },
                      });


                
                  },
        
                //   removeEmployee: function(e) {
                //     var oDialog = e.getSource().getParent();
                //     var oModel = oDialog.getModel("formModel");
                //     var oData = oModel.getData();
                //     var id = oData.id;
                //     var xsoDataModelReport = this.getOwnerComponent().getModel();
                //     var deleteUrl = `/DoniaProvaTabella2(id=${id})`;
                //     xsoDataModelReport.remove(deleteUrl);
                //   },
                removeEmployee: async function(oEvent) {
                    debugger;
                    const oModel = this.getView().getModel();
                const oLine = oEvent.getSource().getBindingContext().getObject();
                const sKey = oLine.id;
                console.log(sKey);
                const sPath = `/DoniaProvaTabella2(${sKey})`;
                oModel.remove(sPath)

                // per fare il refresh
                var oPr= new sap.ui.model.json.JSONModel();
                //nome entity set
                var aPr = await this._getHanaData("/DoniaProvaTabella2");
                oPr.setData(aPr);
                this.getView().setModel(oPr, "Prodotti");
                },
        
                  updateEmployee: function(e) {
                    debugger;
                    Fragment.load({
                        name: "ui.provacap.view.Fragments.form",
                        controller: this
                    })
                    .then(oDialog=>{
                        this.getView().addDependent(oDialog)
                        oDialog.open()
                    })

                    // var oDialog = e.getSource().getParent();
                    // var oModel = oDialog.getModel("Prodotti");
                    // var oData = oModel.getData();
                    // var id = oData.id;
                    // var xsoDataModelReport = this.getOwnerComponent().getModel();
                    // var updateUrl = `/DoniaProvaTabella2(id=${id})`;
                    // xsoDataModelReport.update(updateUrl, {id: oData.id, name: oData.name , date: oData.date})
                  },
            })
        })
            