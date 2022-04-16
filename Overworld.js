class Overworld {
    //   will monitor the states and act as top level component for the canvas tab
    constructor(config) {
        //  save the canvas details and context
        this.element = config.element;
        // gets the container and then access the game canvas within it
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
    }

    startGameLoop() {
        const step = () => {

            // to clear canvas and smudge left from previous frame
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Draw Lower Layer
            this.map.drawLowerImage(this.ctx);

            // Draw Game Objects in between lower and upper layers
            Object.values(this.map.gameObjects).forEach(object => {
                // object.x += 1;
                object.update({
                    arrow: this.directionInput.direction
                });
                object.sprite.draw(this.ctx);
            })
            // iterate through all gameObjects and draw them

            // Draw Upper Layer
            this.map.drawUpperImage(this.ctx);

            requestAnimationFrame(() => { // in built function to help with calling every single frame
                step();
            })
        }
        step();
    }

    init() {
        this.map = new OverWorldMap(window.OverWorldMaps.DemoRoom);

        this.directionInput = new DirectionInput();
        this.directionInput.init();

        this.startGameLoop();
    }

}