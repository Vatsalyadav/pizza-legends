class DirectionInput {
    constructor() {
        this.heldDirections = []; // directions input array

        this.map = {
            "ArrowUp": "up",
            "ArrowDown": "down",
            "ArrowLeft": "left",
            "ArrowRight": "right",
            "KeyW": "up",
            "KeyS": "down",
            "KeyA": "left",
            "KeyD": "right"
        };
    }

    get direction() {
        return this.heldDirections[0];
    }

    init() {
        document.addEventListener("keydown", ev => { // keypress events listener
            console.log(ev.code);
            const dir = this.map[ev.code];
            if (dir && this.heldDirections.indexOf(dir) === -1) {
                this.heldDirections.unshift(dir); // to look at the beginning of the array
            }
        });

        document.addEventListener("keyup", ev => { // keypress events listener
            const dir = this.map[ev.code];
            const index = this.heldDirections.indexOf(dir);
            if (index > -1) {
                this.heldDirections.splice(index, 1); // removing from the array
            }
        });

    }
}