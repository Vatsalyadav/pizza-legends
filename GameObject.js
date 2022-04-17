class GameObject {
    constructor(config) {
        this.isMounted = false;
        this.x = config.x || 0; // x position, config.x else 0
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        this.sprite = new Sprite({
            gameObject: this, // gameObject will have access to the properties like x and y
            src: config.src || "/images/characters/people/hero.png", // src with a default value
        }); // sprite has different states for our character depending on the direction he is moving

    }

    mount(map) {
        this.isMounted = true;
        map.addWall(this.x, this.y);
    }

    // for movement, Person will extend it and provide movement details while other game objects will stay static
    update() {

    }
}