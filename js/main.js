import * as THREE from "./three.js"
import OrbitControls from "./OrbitControls.js"
import "./perlin.js"
import Events from "./minivents.min.js"
GameGlobal.events = new Events()
let events = GameGlobal.events

import "./Vector.js"
import "./TweenMax.min.js"
import "./seedrandom.js"
import "./isMobile.min.js"
import FXHandler from "./FXHandler.js"
import VizHandler from "./VizHandler.js"

import "./viz/Birds.js"
import "./viz/Boid.js"
import "./viz/Forest.js"
import "./viz/Generator.js"
import "./viz/Mecha.js"
import "./viz/Objects.js"
import "./viz/Shards.js"
import "./viz/Tools.js"

// let instance

// class Music {
//   constructor() {
//     if ( instance )
//       return instance

//     instance = this

//     this.desert = new Audio()
//     this.desert.loop = true
//     this.desert.src  = 'music/desert.mp3'

//     this.ocean     = new Audio()
//     this.ocean.loop = true
//     this.ocean.src = 'music/ocean.mp3'
//   }
// }


let ctx = canvas.getContext('webgl')
let controls;


export default class Main {
  constructor(){
    this.initScene()
  }

  initScene() {
    let scene, camera, renderer;
    const width = window.innerWidth;
    const height = window.innerHeight;

    let aspectRatio, fieldOfView, nearPlane, farPlane;

    function init() {

      VizHandler.init();
      FXHandler.init();
      //controls = new OrbitControls(camera);
      clock = new THREE.Clock;
    }

    function loop() {
      requestAnimationFrame(loop, canvas);
      events.emit("update");
    }

    init();
    loop();
  }
} 
