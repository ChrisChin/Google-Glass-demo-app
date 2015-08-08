(function() {

d3.seacon = function() {
   d3.select("svg").remove();
    d3.json("seacon.json",function(data){
        var min = 0; //Min used to calculate the shifts
        var panelGap = 50; //distance between each panel
        var panelSize = 150; //width of each panel
        var panelTextOffset = 20; //Offset of the text
        var xOffset = 50; //Offset for x from the edge
        var baseline = 600; //Offset for the bottom of the graph
        var textOffset = 15; //Offest to center the text in the panel
        var SeaConMultiplier = 75; //Multiplier for the sea con
        var panelNum = 5; //Number of panels shown
        var xLegend = 900; //x for legend
        var yLegend = 10; //y for legend
        var legendHeight = 100; //height for legend
        var legendWidth = legendHeight/4; //height for legend

        //Creates the svg
        var canvas = d3.select("body")
            .append("svg")
            .attr("width",width)
            .attr("height",height);

        //Sets the background to the ship image
        d3.select("body").attr("background","ship.jpg");

        //Draws the transparent glass
        var bg = canvas.append("rect")
            .attr("width",width)
            .attr("height",height)
            .style("fill-opacity", glassOpacity)
            .style("fill", "black");

        //Creates the back button circle
        var backButton= canvas.append("circle")
            .attr("r", radius)
            .attr("cx", cxBack)
            .attr("cy",cyBack)
            .attr("fill", "blue")
            .on("click", function() {
                d3.menu()
            });

        //Creates the back button Text
        var backText= canvas.append("text")
            .attr("x", radius)
            .attr("y",cyBack)
            .attr("fill", "white")
            .text("Back")
            .on("click", function() {
                d3.menu()
            });

        //Creates the title for the app
        var title = canvas.append("text")
            .attr("class", "title")
            .attr("dy", ".71em")
            .text("Sea Condition App")
            .attr("x", xTitle)
            .attr("y",yTitle);

        //Range of colors for the panels
        var color = d3.scale.linear()
            .domain([1,6])
            .range(["red","yellow"]);

        // sets up the legend for the color scale
        var gradient = canvas.append("svg:defs")
            .append("svg:linearGradient")
            .attr("id", "gradient")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "0%")
            .attr("y2", "100%")
            .attr("spreadMethod", "pad");

        gradient.append("svg:stop")
            .attr("offset", "0%")
            .attr("stop-color", "yellow")
            .attr("stop-opacity", 1);

        gradient.append("svg:stop")
            .attr("offset", "100%")
            .attr("stop-color", "red")
            .attr("stop-opacity", 1);

        canvas.append("svg:rect")
            .attr("x", xLegend)
            .attr("y",yLegend)
            .attr("width",legendWidth)
            .attr("height",legendHeight)
            .style("fill", "url(#gradient)");

        canvas.append("text")
            .attr("x", xLegend + 30)
            .attr("y",yLegend + 10)
            .text("Good")
            .attr("fill",'white');

        canvas.append("text")
            .attr("x",  xLegend + 30)
            .attr("y",legendHeight + yLegend)
            .text("Poor")
            .attr("fill",'white');

        canvas.append("text")
            .attr("x", xLegend-60)
            .attr("y",yLegend + 10)
            .text("Legend:")
            .attr("fill",'white');

        //Creates the rectangle panels
        var seaConPanel = canvas.selectAll()
            .data(data)
            .enter()
            .append("rect")
            .attr("width", panelSize)
            .attr("height",function(d){return d.seaCon * SeaConMultiplier;})
            .attr("x",function(d,i){return xOffset+ i*(panelSize + panelGap);})
            .attr("y", function(d){return baseline-d.seaCon*SeaConMultiplier;})
            .attr("fill",function(d){return color(d.seaCon);})
            .attr("class","panel")
            .on("click", function(d,i){clickFunction(d,i)} );

        //Text for the max gust
        var maxGustText = canvas.selectAll()
            .data(data)
            .enter()
            .append("text")
            .attr("fill", "black")
            .attr("x", function(d,i){return xOffset+ textOffset+ i*(panelSize + panelGap);})
            .attr("y", baseline - panelTextOffset*2)
            .text(function (d) {
                return "MaxGust: " +d.maxGust+ "kts";
            })
            .attr("class","panelText")
            .attr("id", function(d,i){return "maxGustText"+i})
            .on("click", function(d,i){clickFunction(d,i)} );

        //Text for the average wind
        var avgWindText = canvas.selectAll()
            .data(data)
            .enter()
            .append("text")
            .attr("fill", "black")
            .attr("x", function(d,i){return xOffset+ textOffset + i*(panelSize + panelGap);})
            .attr("y", baseline - panelTextOffset*3)
            .text(function (d) {
                return "Avg Wind: " +d.avgWind +"kts";
            })
            .attr("class","panelText")
            .attr("id", function(d,i){return "avgWindText"+i})
            .on("click", function(d,i){clickFunction(d,i)} );

        //Text for the wind direction
        var windDirText = canvas.selectAll()
            .data(data)
            .enter()
            .append("text")
            .attr("fill", "black")
            .attr("x", function(d,i){return xOffset+ textOffset+ i*(panelSize + panelGap);})
            .attr("y", baseline - panelTextOffset*4)
            .text(function (d) {
                return "Wind Dir: " +d.windDir;
            })
            .attr("class","panelText")
            .attr("id", function(d,i){return "windDirText"+i})
            .on("click", function(d,i){clickFunction(d,i)} );

        //Text for the swell height
        var swellHeight = canvas.selectAll()
            .data(data)
            .enter()
            .append("text")
            .attr("fill", "black")
            .attr("x", function(d,i){return xOffset+ textOffset+ i*(panelSize + panelGap);})
            .attr("y", baseline - panelTextOffset*5)
            .text(function (d) {
                return "Swell Height: " +d.swellHeight + "m";
            })
            .attr("class","panelText")
            .attr("id", function(d,i){return "swellHeight"+i})
            .on("click", function(d,i){clickFunction(d,i)} );


        //Text for the swell direction
        var swellDir = canvas.selectAll()
            .data(data)
            .enter()
            .append("text")
            .attr("fill", "black")
            .attr("x", function(d,i){return xOffset+ textOffset+ i*(panelSize + panelGap);})
            .attr("y", baseline - panelTextOffset*6)
            .text(function (d) {
                return "Swell Dir: " +d.swellDir;
            })
            .attr("class","panelText")
            .attr("id", function(d,i){return "swellDir"+i})
            .on("click", function(d,i){clickFunction(d,i)} );

        //Text for the time
        var timeText = canvas.selectAll()
            .data(data)
            .enter()
            .append("text")
            .attr("fill", "white")
            .attr("x", function(d,i){return xOffset+ textOffset+ i*(panelSize + panelGap);})
            .attr("y", function(d){return baseline-d.seaCon*SeaConMultiplier -10;})
            .text(function (d) {
                if(d.time >11) {
                    if (d.time == 12)
                        return "12 pm";
                    return (d.time - 12) + " pm";
                }
                return d.time + " am"
            })
            .attr("class","timeText");

        //More info text which is always on the middle panel
        var moreInfo = canvas.selectAll()
            .data(data)
            .enter()
            .append("text")
            .attr("fill", "black")
            .attr("x", function(d,i){return xOffset+ textOffset+ 2*(panelSize + panelGap);})
            .attr("y", function(d){return baseline - 10;})
            .text("More info")
            .attr("class","moreInfoText");

        //Create the Scale we will use for the Axis
        var axisScale = d3.scale.linear()
            .domain([6, 0])
            .range([0, 450]);

        //Create the Axis
        var yAxis = d3.svg.axis()
            .scale(axisScale)
            .tickValues([0,1,2,3,4,5,6])
            .orient('right');

        //Create an SVG group Element for the Axis elements and call the yAxis function
       var yAxisGroup = canvas.append("g")
           .attr("transform", "translate(10,150)")
           .call(yAxis);

        //Manages the left and right arrow press
        window.focus();
        d3.select(window).on("keydown", function() {
            switch (d3.event.keyCode) {
                case 37:
                    if(min<2){
                        min++;
                        update();
                    }
                    break;
                case 39:
                    if(min>panelNum-data.length -2){
                        min--;
                        update();
                    }
                    break;
            }
        });

        hide(); //hides info to start with

        //Function for when the user clicks on the middle panel
        function clickFunction(d,i){
            hide();
            if(i == 2-min) { //checks if middle panel
                canvas.select("#maxGustText" + i).style("fill-opacity", 1);
                canvas.select("#avgWindText" + i).style("fill-opacity", 1);
                canvas.select("#windDirText" + i).style("fill-opacity", 1);
                canvas.select("#swellHeight" + i).style("fill-opacity", 1);
                canvas.select("#swellDir" + i).style("fill-opacity", 1);
            }
        }

        //Hide function to hide all information
        function hide(){
            canvas.selectAll("text.panelText")
                .style("fill-opacity", 0);
        }

        //update function to translate the panels when the user press left or right
        function update(){
            hide();
            canvas.selectAll("rect.panel")
                .transition()
                .duration(1000)
                .attr("transform", "translate(" + (min*(panelSize + panelGap)) + ",0)");

            canvas.selectAll("text.panelText")
                .transition()
                .duration(1000)
                .attr("transform", "translate(" + (min*(panelSize + panelGap)) + ",0)");
            canvas.selectAll("text.timeText")
                .transition()
                .duration(1000)
                .attr("transform", "translate(" + (min*(panelSize + panelGap)) + ",0)");
        }
    })
}
})();