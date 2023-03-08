const { json, select, selectAll, geoOrthographic, geoPath, geoGraticule } = d3;

const globeSize = {
    width: window.innerWidth / 3,
    height: window.innerHeight,
};

let geoJsonData, globe, projection, path, graticule, infoPanel;

json("https://terra.deno.dev/")
    .then(data => init(data));

const init = data => {
    geoJsonData = data;
    drawGlobe();
    drawGraticule();
    renderInfoPanel();
};

const drawGlobe = () => {
    globe = select("body")
        .append("svg")

    projection = geoOrthographic()
        .fitSize([globeSize.width, globeSize.height], geoJsonData)
        .translate([window.innerWidth - globeSize.width / 1.5, window.innerHeight / 2]);
    
    path = geoPath()
        .projection(projection);

    globe.selectAll("path")
        .data(geoJsonData.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("fill", "#ffffff")
        .style("stroke", "#000000")
        .attr("class", "country");
};

const drawGraticule = () => {
    graticule = geoGraticule();

    globe.append("path")
        .attr("class", "graticula")
        .attr("d", path(graticule()))
        .style("fill", "none")
        .style("stroke", "grey")
};

const renderInfoPanel = () => {};