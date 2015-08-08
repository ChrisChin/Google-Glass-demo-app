(function() {

d3.menu = function() {
   d3.select("svg").remove();
    d3.json("seacon.json",function(data){
        var min =0; //Min used to calculate the shifts
        var panelx = 525; //x for the panels
        var panelTextOffset = 50; //Offset of the text
        var panelGap = 500; //distance between each panel
        var panelNum = 1; //Number of panels shown
        var y = 250; //y for the panels
        var r = 200; // radius for the panels

        //Creates the svg
        var canvas = d3.select("body")
                .append("svg")
                .attr("width",width)
                .attr("height",height);

        //Sets the background to the menu image
        d3.select("body")
            .attr("background","menu.jpg");

        //Draws the transparent glass
        var bg = canvas.append("rect")
                .attr("width",width)
                .attr("height",height)
                .style("fill-opacity", glassOpacity)
                .style("fill", "black");

        //Creates the Pizza button circle
        var pizzaButton= canvas.append("circle")
            .attr("r", r)
            .attr("cx", panelx)
            .attr("cy",y)
            .attr("fill", "blue")
            .on("click", function() {
                if(min==0)
                d3.pizza()
            });

        //Creates the Sea Condition button circle
        var seaConButton= canvas.append("circle")
            .attr("r", r)
            .attr("cx", panelx + panelGap)
            .attr("cy",y)
            .attr("fill", "blue")
            .on("click", function() {
                if(min==-1)
                d3.seacon()
            });

        //Creates the Pizza button text
        var pizzaText= canvas.append("text")
            .attr("x", panelx-panelTextOffset)
            .attr("y",y)
            .attr("fill", "white")
            .text("Pizza Toppings App")
            .on("click", function() {
                if(min==0)
                d3.pizza()
            });

        //Creates the Sea Condition button text
        var seaConText= canvas.append("text")
            .attr("x", panelx- panelTextOffset + panelGap)
            .attr("y",y)
            .attr("fill", "white")
            .text("Sea Condition App")
            .on("click", function() {
                if(min==-1)
                d3.seacon()
            });

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
                    if(min>panelNum-2){
                        min--;
                        update();
                    }
                    break;
            }
        });

        //update function to translate the panels when the user press left or right
        function update(){
            canvas.selectAll("circle")
                .transition()
                .duration(1000)
                .attr("transform", "translate(" + (min*( panelGap)) + ",0)");

            canvas.selectAll("text")
                .transition()
                .duration(1000)
                .attr("transform", "translate(" + (min*( panelGap)) + ",0)");
        }
    })
}
})();