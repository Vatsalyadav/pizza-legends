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
        this.updatePosition();
        this.updateSprite(state);
        if (this.isPlayerControlled && this.movingProgressRemaining === 0 && state.arrow) { // if we have some movement left and also directions given as input
            this.direction = state.arrow;
            this.movingProgressRemaining = 16;

        }
    }

    updatePosition() {
        if (this.movingProgressRemaining > 0) {
            const [property, change] = this.directionUpdate[this.direction];
            this[property] += change;
            this.movingProgressRemaining -= 1;
        }
    }

    updateSprite(state) { // use sprite sheet to show movement animation

        if (this.isPlayerControlled && this.movingProgressRemaining === 0 && !state.arrow) {
            this.sprite.setAnimation("idle-" + this.direction);
            return;
        }
        if (this.movingProgressRemaining > 0) { // if the movement is left, then walk in the direction animation
            this.sprite.setAnimation("walk-" + this.direction);
        }
    }
}