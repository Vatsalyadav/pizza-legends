class Sprite {
    // sprite has different states for our character depending on the direction he is moving
    constructor(config) {
        // we are setting animations up so that any GameObject can pass its own definition of animation and have flexibility
        /* Configure animation and initial state */
        this.animations = config.animations || {
            idleDown: [[0,0]]
        }
        this.currentAnimation = config.currentAnimation || "idleDown";
        this.currentAnimationFrame = 0;

    }
}