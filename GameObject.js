class GameObject {
    constructor(config) {
        this.id = null;
        this.isMounted = false;
        this.x = config.x || 0; // x position, config.x else 0
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        this.sprite = new Sprite({
            gameObject: this, // gameObject will have access to the properties like x and y
            src: config.src || "/images/characters/people/hero.png", // src with a default value
        }); // sprite has different states for our character depending on the direction he is moving

        this.behaviourLoop = config.behaviourLoop || [];
        this.behaviourLoopIndex = 0;

    }

    mount(map) {
        console.log("mounting!")
        this.isMounted = true;
        map.addWall(this.x, this.y);

        // If we have a behaviour kick off after a delay
        setTimeout(() => {
            this.doBehaviourEvent(map)
        }, 10)
    }

    // for movement, Person will extend it and provide movement details while other game objects will stay static
    update() {

    }

    async doBehaviourEvent(map) {

        // Don't do anything if there is a more important cutscene or I don't have config to do anything anyaway
        if (map.isCutScenePlaying || this.behaviourLoop.length === 0) {
            return;
        }

        let eventConfig = this.behaviourLoop[this.behaviourLoopIndex];
        // who defined this behaviour
        eventConfig.who = this.id;

        // OverworldEvent will contain the code that actually instructs the people to do the thing they need to do, music change, text event, instructional events
        const eventhandler = new OverworldEvent({map, event: eventConfig});
        await eventhandler.init(); // will return a promise to us and when the promise is resolved

        // Setting the next event to fire
        // below this will happen once await is complete
        this.behaviourLoopIndex += 1;
        if (this.behaviourLoopIndex === this.behaviourLoop.length) {
            this.behaviourLoopIndex = 0;
        }

        // do it again!
        this.doBehaviourEvent(map);
    }
}