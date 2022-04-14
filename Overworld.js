class Overworld {
    //   will monitor the states and act as top level component for the canvas tab
    constructor(config) {
        //  save the canvas details and context
        this.element = config.element;
        // gets the container and then access the game canvas within it
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
    }

    init() {
        /* Imp Info: The canvas draws things one over another by the order of arrival,
        so ordering of created image objects is important */
        // 1. for canvas, an image needs to be loaded in memory so create an object. No need to inject it in dom
        const image = new Image();
        // 3. It'll load on our canvas using its context
        image.onload = () => {
            this.ctx.drawImage(image, 0, 0) // source, x, y coordinate
        };
        image.src = "/images/maps/DemoLower.png";
        // 2. Once the image is download -> 3

        // 4. Place some Game Objects!
        const hero = new GameObject({
            x: 7,
            y: 9,
        })

        const npc1 = new GameObject({
            x: 5,
            y: 6,
            src: "/images/characters/people/npc1.png"
        })

        setTimeout(() => {
            hero.sprite.draw(this.ctx); // 5. this currently won't work because draw takes some time to draw and it'll fail hence moving to set timeout
            npc1.sprite.draw(this.ctx);
        }, 200)

    }

}