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

            // Establish the Camera person
            const cameraPerson = this.map.gameObjects.hero;

            // update all objects
            Object.values(this.map.gameObjects).forEach(object => {
                // object.x += 1;
                object.update({
                    arrow: this.directionInput.direction,
                    map: this.map
                });
            })

            // Draw Lower Layer
            this.map.drawLowerImage(this.ctx, cameraPerson);

            // iterate through all gameObjects and draw them in order of northern character being drawn lower than southern
            Object.values(this.map.gameObjects).sort((a,b) => {
                return a.y - b.y;
            }).forEach(object => {
                object.sprite.draw(this.ctx, cameraPerson);
            })

            // Draw Upper Layer
            this.map.drawUpperImage(this.ctx, cameraPerson);

            requestAnimationFrame(() => { // in built function to help with calling every single frame
                step();
            })
        }
        step();
    }

    init() {
        this.map = new OverWorldMap(window.OverWorldMaps.DemoRoom);
        this.map.mountObjects()

        this.directionInput = new DirectionInput();
        this.directionInput.init();

        this.startGameLoop();

        // start a cutscene when game starts
        this.map.startCutscene([
            { who: "hero", type: "walk",  direction: "down" },
            { who: "hero", type: "walk",  direction: "down" },
            { who: "npcA", type: "walk",  direction: "left" },
            { who: "npcA", type: "walk",  direction: "left" },
            { who: "npcA", type: "stand",  direction: "up", time: 800 },
        ])
    }

}