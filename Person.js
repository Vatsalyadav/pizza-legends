class Person extends GameObject {
    constructor(config) {
        super(config);
        this.movingProgressRemaining = 0; // for maintaining grid movement

        this.isPlayerControlled = config.isPlayerControlled || false;
        // write movement instructions
        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1]
        };

    }

    update(state) {
        if (this.movingProgressRemaining > 0) {
            this.updatePosition();
        } else {

            // More cases for starting to walk will come here
            //
            //
            // case: we're keyboard ready and have an arrow pressed
            if (this.isPlayerControlled && state.arrow) { // if we have some movement left and also directions given as input
                this.startBehaviour(state, {
                    type: "walk",
                    direction: state.arrow
                })
            }
            this.updateSprite();
        }

    }

    startBehaviour(state, behaviour) {
        // set character direction to whatever behaviour has
        this.direction = behaviour.direction;
        if (behaviour.type === "walk") {
            // stop here if space is not free
            if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
                return;
            }
            this.movingProgressRemaining = 16;
        }
    }

    updatePosition() {
        const [property, change] = this.directionUpdate[this.direction];
        this[property] += change;
        this.movingProgressRemaining -= 1;
    }

    updateSprite() { // use sprite sheet to show movement animation

        if (this.movingProgressRemaining > 0) { // if the movement is left, then walk in the direction animation
            this.sprite.setAnimation("walk-" + this.direction);
            return;
        }
        this.sprite.setAnimation("idle-" + this.direction);

    }
}