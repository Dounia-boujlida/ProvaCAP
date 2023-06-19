/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "ui/provacap/model/models",
        "sap/ui/model/json/JSONModel"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("ui.provacap.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                let oModel = new sap.ui.model.json.JSONModel({
                    id:"",
                    name:"",
                    date:""
                });

                 this.setModel(oModel ,"formModel");
            }
        });
    }
);