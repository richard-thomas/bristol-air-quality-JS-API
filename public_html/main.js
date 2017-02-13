require([
    "esri/arcgis/utils",
    "esri/dijit/Legend",
    "esri/dijit/HomeButton",
    "esri/dijit/BasemapGallery",
    "esri/dijit/LayerList",
    "dojo/parser",
    "dojo/on",

    "esri/map",
    "dijit/layout/ContentPane",
    "dijit/form/Button",
    "dojo/domReady!"
    ], function(
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
            "mapDiv").then(function (response) {
        var map = response.map;

        // Add Legend (to right sidebar)
        var legend = new Legend({
            map: map,
            layerInfos:(arcgisUtils.getLegendLayers(response))
        }, "legend");
        legend.startup(); 
        
        // Add Basemap Gallery (to right sidebar)
        var basemapGallery = new BasemapGallery({
            showArcGISBasemaps: true,
            map: map
            }, "basemapGallery");
        basemapGallery.startup();
        basemapGallery.on("error", function(msg) {
            console.log("basemap gallery error:  ", msg);
            });

        // Add Layer List (to right sidebar)
        var layerList = new LayerList({
            map: map,
            layerInfos:(arcgisUtils.getLayerList(response))
        }, "layerList");
        layerList.startup(); 
                        
        // Add "Home" button: zoom/pan to default extent
        var home = new HomeButton({
            map: map
        }, "HomeButton");
        home.startup();
        
        // Handle presses on Basemap button
        on(document.getElementById('btnBasemap'), "click", function() {
            document.getElementById('sbHeaderLabel').innerHTML = 'Basemap';
            document.getElementById('sideBarR').style.display = 'block';
            document.getElementById('basemapGallery').style.display = 'block';
            document.getElementById('legend').style.display = 'none';
            document.getElementById('layerList').style.display = 'none';
        });

        // Handle presses on Legend button
        on(document.getElementById('btnLegend'), "click", function() {
            document.getElementById('sbHeaderLabel').innerHTML = 'Legend';
            document.getElementById('sideBarR').style.display = 'block';
            document.getElementById('legend').style.display = 'block';
            document.getElementById('basemapGallery').style.display = 'none';
            document.getElementById('layerList').style.display = 'none';
        });

        // Handle presses on Layers button
        on(document.getElementById('btnLayers'), "click", function() {
            document.getElementById('sbHeaderLabel').innerHTML = 'Layers';
            document.getElementById('sideBarR').style.display = 'block';
            document.getElementById('layerList').style.display = 'block';
            document.getElementById('basemapGallery').style.display = 'none';
            document.getElementById('legend').style.display = 'none';
        });

        // Handle presses on sidebar close button ('X')
        on(document.getElementById('btnClose'), "click", function() {
            document.getElementById('sideBarR').style.display = 'none';
        });
    });
});

