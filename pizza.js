(function() {
d3.pizza = function() {
    d3.select("svg").remove();
    d3.json("pizza.json",function(data){
        var min = 0; //Min used to calculate the shifts
        var panelGap = 50; //distance between each panel
        var panelSize = 300; //width and height of each panel
        var panelTextOffset = 50; //Offset of the text
        var xOffset = 20; //Offset for x from the edge
        var panelNum = 3; //Number of panels shown

        //Creates the svg
        var canvas = d3.select("body")
                .append("svg")
                .attr("width",width)
                .attr("height",height);

        //Sets the background to the pizza image
        d3.select("body").attr("background","pizza.jpg");

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

        var title = canvas.append("text")
            .attr("class", "title")
            .attr("dy", ".71em")
            .text("Pizza Toppings App")
            .attr("x", xTitle)
            .attr("y",yTitle);

        //Draws the Panel rectangles
        var panelRect = canvas.selectAll()
                .data(data)
                .enter()
                .append("rect")
                .attr("width", panelSize)
                .attr("height",panelSize)
                .attr("x",function(d,i){return xOffset + i*(panelSize + panelGap);})
                .attr("y", 300)
                .attr("fill",function(d){
                    if(d.vegetarian)
                        return "green";
                    return "blue";
                })
                .attr("class","panel")
                .attr("id", function(d,i){return "panel"+i});

        //Draws the Text for the name of the pizza
        var panelText = canvas.selectAll()
                .data(data)
                .enter()
                .append("text")
                .attr("fill", "white")
                .attr("x", function (d, i) {return i * (panelSize + panelGap) + panelTextOffset;})
                .attr("y", panelSize + panelTextOffset)
                .text(function (d) {
                    return d.name;
                })
                .attr("class","panelText");

        //Iterates through all the ingredients creating text
        for(var ind = 0; ind< data.length ; ind++) {
            for (var j = 0; j < data[ind].ingre.length; j++) {
                canvas.append("text")
                        .attr("fill", "white")
                        .attr("x", function () {return ind * (panelSize + panelGap) + panelTextOffset;})
                        .attr("y", panelSize + panelTextOffset*2 + 20*j)
                        .text(function () {
                            if(j <data[ind].ingre.length)
                                return  (j+1) + ". " + data[ind].ingre[j];
                        })
                        .attr("class","panelText")
            }
        }

        //Manages the left and right arrow press
        window.focus();
        d3.select(window).on("keydown", function() {
            switch (d3.event.keyCode) {
                case 37:
                        if(min<0){
                            min++;
                            update();
                        }
                        break;
                case 39:
                        if(min>panelNum-data.length){
                            min--;
                            update();
                        }
                        break;
            }
        });

        //update function to translate the panels when the user press left or right
        function update(){
            canvas.selectAll("rect.panel")
                    .transition()
                    .duration(1000)
                    .attr("transform", "translate(" + (min*(panelSize + panelGap)) + ",0)");

            canvas.selectAll("text.panelText")
                    .transition()
                    .duration(1000)
                    .attr("transform", "translate(" + (min*(panelSize + panelGap)) + ",0)");
        }
    })
}
})();