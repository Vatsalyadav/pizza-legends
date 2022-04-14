class Overworld {
 //   will monitor the states and act as top level component for the canvas tab
 constructor(config) {
   //  save the canvas details and context
   this.element = config.element;
   // gets the container and then access the game canvas within it
   this.canvas = this.element.querySelector(".game-canvas");
   this.ctx = this.canvas.getContext("2d");
 }

 init() {
     // 1. for canvas, an image needs to be loaded in memory so create an object. No need to inject it in dom
   const image = new Image();
   // 3. It'll load on our canvas using its context
   image.onload = () => {
     this.ctx.drawImage(image,0,0) // source, x, y coordinate
   };
   image.src = "/images/maps/DemoLower.png";
   // 2. Once the image is download -> 3


   const x = 5;
   const y = 6;

   const shadow = new Image();
   shadow.onload = () => {
    this.ctx.drawImage(
      shadow, 
      0, //left cut 
      0, //top cut,
      32, //width of cut
      32, //height of cut
      x * 16 - 8,
      y * 16 - 18,
      32,
      32
   )
   }
   shadow.src = "/images/characters/shadow.png";


   const hero = new Image();
   hero.onload = () => {
     this.ctx.drawImage(
       hero, 
       0, //left cut 
       0, //top cut,
       32, //width of cut
       32, //height of cut
       x * 16 - 8,
       y * 16 - 18,
       32,
       32
    )
   }
   hero.src = "/images/characters/people/hero.png";


 }

}