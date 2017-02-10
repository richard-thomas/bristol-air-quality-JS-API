// global variables useful while testing/debugging because the browser's
// developer console can be used to interact with the map.
var map;
require([
    "esri/map",
    "esri/arcgis/utils", // for "esri/arcgis/utils"::createMap method
    "esri/dijit/Legend",
    "esri/dijit/HomeButton",
    "esri/dijit/BasemapGallery",
    "esri/dijit/LayerList",
    "dojo/parser",
    "dojo/on",

    "dijit/layout/BorderContainer",
    "dijit/layout/TabContainer",
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
        LayerList,
        parser,
        on
    ) {
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
        
        // Handle presses on Basemap button
        on(document.getElementById('btnBasemap'), "click", function() {
            console.log('Basemap button was clicked!');
            document.getElementById('sideBarR').style.display = 'block';
            document.getElementById('basemapGallery').style.display = 'block';
            document.getElementById('legend').style.display = 'none';
            document.getElementById('layerList').style.display = 'none';
        });

        // Handle presses on Legend button
        on(document.getElementById('btnLegend'), "click", function() {
            console.log('Legend button was clicked!');
            document.getElementById('sideBarR').style.display = 'block';
            document.getElementById('legend').style.display = 'block';
            document.getElementById('basemapGallery').style.display = 'none';
            document.getElementById('layerList').style.display = 'none';
        });

        // Handle presses on Layers button
        on(document.getElementById('btnLayers'), "click", function() {
            console.log('Layers button was clicked!');
            document.getElementById('sideBarR').style.display = 'block';
            document.getElementById('layerList').style.display = 'block';
            document.getElementById('basemapGallery').style.display = 'none';
            document.getElementById('legend').style.display = 'none';
        });

        // Handle presses on Close button ('X')
        on(document.getElementById('btnClose'), "click", function() {
            console.log('Close button was clicked!');
            document.getElementById('sideBarR').style.display = 'none';
        });

        //add the basemap gallery, in this case we'll display maps from ArcGIS.com including bing maps
        var basemapGallery = new BasemapGallery({
            showArcGISBasemaps: true,
            map: map
            }, "basemapGallery");
        basemapGallery.startup();
        basemapGallery.on("error", function(msg) {
            console.log("basemap gallery error:  ", msg);
            });

        var legend = new Legend({
            map: map,
            layerInfos:(arcgisUtils.getLegendLayers(response))
        }, "legend");
        legend.startup(); 
        
        var layerList = new LayerList({
            map: map,
            layerInfos:(arcgisUtils.getLayerList(response))
        }, "layerList");
        layerList.startup(); 
        
    });
});

