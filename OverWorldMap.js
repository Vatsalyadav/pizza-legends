class OverWorldMap {
    /* to draw OverWorld map dynamically*/

    constructor(config) {
        this.gameObjects = config.gameObjects;

        // floor
        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        // rooftop
        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;

    }
    // reposition map as per Hero's location
    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(this.lowerImage, utils.withGrid(10.5) - cameraPerson.x, utils.withGrid(6) - cameraPerson.y);
    }

    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(this.upperImage, utils.withGrid(10.5) - cameraPerson.x, utils.withGrid(6) - cameraPerson.y);
    }
}

window.OverWorldMaps = {
    DemoRoom: {
        lowerSrc: "/images/maps/DemoLower.png",
        upperSrc: "/images/maps/DemoUpper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(6)
            }),
            // npc1: new GameObject({
            //     x: utils.withGrid(4),
            //     y: utils.withGrid(5),
            //     src: "/images/characters/people/npc1.png"
            // })
        }
    },
    Kitchen: {
        lowerSrc: "/images/maps/KitchenLower.png",
        upperSrc: "/images/maps/KitchenUpper.png",
        gameObjects: {
            hero: new GameObject({
                x: 3,
                y: 7,
            }),
            npc1: new GameObject({
                x: 4,
                y: 4,
                src: "/images/characters/people/npc1.png"
            }),
            npc2: new GameObject({
                x: 9,
                y: 4,
                src: "/images/characters/people/npc2.png"
            })
        }
    }
}