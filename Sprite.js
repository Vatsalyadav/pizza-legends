class Sprite {
    // sprite has different states for our character depending on the direction he is moving
    constructor(config) {

        /* Set up the image*/
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true; // draw the image if this flag is true
        }

        // Shadow
        this.shadow = new Image();
        this.shadow.src = "/images/characters/shadow.png";
        this.useShadow = true;
        if (this.useShadow) {
            this.shadow.onload = () => {
                this.isShadowLoaded = true;
            }
        }


        // we are setting animations up so that any GameObject can pass its own definition of animation and have flexibility
        /* Configure animation and initial state */
        this.animations = config.animations || {
            "idle-down": [[0, 0]],
            "idle-right": [[0, 1]],
            "idle-up": [[0, 2]],
            "idle-left": [[0, 3]],
            "walk-down": [[1, 0], [0, 0], [3, 0], [0, 0]],
            "walk-right": [[1, 1], [0, 1], [3, 1], [0, 1]],
            "walk-up": [[1, 2], [0, 2], [3, 2], [0, 2]],
            "walk-left": [[1, 3], [0, 3], [3, 3], [0, 3]],

        }
        this.currentAnimation = config.currentAnimation || "idle-down"; // which animation we are gonna pull from
        this.currentAnimationFrame = 0; // which animation series we are gonna use from array

        this.animationFrameLimit = config.animationFrameLimit || 8; // number of frames ~ speed of character
        this.animationFrameProgress = this.animationFrameLimit;

        // Reference the game object
        this.gameObject = config.gameObject;
    }

    get frame() {
        return this.animations[this.currentAnimation][this.currentAnimationFrame];
    }

    setAnimation(key) { // for changing animation of the character
        if (this.currentAnimation !== key){
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameLimit;
        }
    }

    updateAnimationProgress() { // for changing frames in "walk-down/../...": [[1, 0], [0, 0], [3, 0], [0, 0]] array
        // downtick frame progress
        if (this.animationFrameProgress > 0) {
            this.animationFrameProgress -= 1;
            return;
        }

        // reset the progress/counter
        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame += 1;
        if (this.frame === undefined) {
            this.currentAnimationFrame = 0;
        }

    }

    draw(ctx) {
        const x = this.gameObject.x - 8; // same as previous nudge
        const y = this.gameObject.y - 18;

        this.isShadowLoaded && ctx.drawImage(this.shadow, x, y)

        const [frameX, frameY] = this.frame;

        this.isLoaded && ctx.drawImage(this.image,
            frameX * 32, frameY * 32, // left and right cut
            32, 32, // size
            x, y, // nudge
            32, 32 // drawing size
        )

        this.updateAnimationProgress();
    }
}