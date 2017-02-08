// global variables useful while testing/debugging because the browser's
// developer console can be used to interact with the map.
var map;
require([
    "esri/map",
    "esri/arcgis/utils", // for "esri/arcgis/utils"::createMap method
    "esri/dijit/Legend",
    "esri/dijit/HomeButton",
    "esri/dijit/BasemapGallery",
    "dojo/parser",

    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane",
    "dijit/TitlePane",
    "dijit/form/Button",
    "dojo/domReady!"
    ], function(
        Map,
        arcgisUtils,
        Legend,
        HomeButton,
        BasemapGallery,
        parser
    ) {
//        parser.parse();

        arcgisUtils.createMap(
            "0e2ff6096b2344028db18914af62d51b", // Bristol Air Quality webmap
            //"1bf4e342273541d989bda03d4ee9276a", // Basemap offline test4
            "mapDiv").then(function (response) {
        map = response.map;
        
        // Add "Home" button: zoom/pan to default extent
        var home = new HomeButton({
            map: map
        }, "HomeButton");
        home.startup();

        //add the basemap gallery, in this case we'll display maps from ArcGIS.com including bing maps
        var basemapGallery = new BasemapGallery({
            showArcGISBasemaps: true,
            map: map
            }, "basemapGallery");
        basemapGallery.startup();
        basemapGallery.on("error", function(msg) {
            console.log("basemap gallery error:  ", msg);
            });

//        var legend = new Legend({
//            map: map,
//            layerInfos:(arcgisUtils.getLegendLayers(response))
//        }, "legend");
//
//        legend.startup();                
    });
});

