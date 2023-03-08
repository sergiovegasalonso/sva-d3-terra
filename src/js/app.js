const { json, select, selectAll, geoOrthographic, geoPath } = d3;
let geoJsonData, globe, projection, path;

json("https://terra.deno.dev/")
    .then(data => init(data));

const init = data => {
    geoJsonData = data;
    drawGlobe();
};

const drawGlobe = () => {
    globe = select("body")
        .append("svg")

    projection = geoOrthographic();
    path = geoPath().projection(projection);

    globe
        .selectAll("path")
        .data(geoJsonData.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("fill", "#ffffff")
        .style("stroke", "#000000")

};
