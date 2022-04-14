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
            idleDown: [[0,0]]
        }
        this.currentAnimation = config.currentAnimation || "idleDown";
        this.currentAnimationFrame = 0;

        // Reference the game object
        this.gameObject = config.gameObject;
    }

    draw(ctx) {
        const x =this.gameObject.x * 16 - 8; // same as previous nudge
        const y =this.gameObject.y * 16 - 18;

        this.isShadowLoaded && ctx.drawImage(this.shadow, x, y)

        this.isLoaded && ctx.drawImage(this.image,
            0,0, // left and right cut
            32,32, // size
            x,y, // nudge
            32,32 // drawing size
            )
    }
}