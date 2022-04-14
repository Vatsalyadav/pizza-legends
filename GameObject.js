class GameObject {
    constructor(config) {
        this.x = config.x || 0; // x position, config.x else 0
        this.y = config.y || y;

        this.sprite = new Sprite({
            gameObject: this, // gameObject will have access to the properties like x and y
            src: config.src || "/images/characters/people/hero.png", // src with a default value
        }); // sprite has different states for our character depending on the direction he is moving

    }
}