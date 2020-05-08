import * as THREE from "./three.js"
import "./perlin.js"
import "./Vector.js"
import "./seedrandom.js"
import "./isMobile.min.js"
//import FXHandler from "./FXHandler.js"
import VizHandler from "./VizHandler.js"


export default class Main {
  constructor(){
    this.initScene()
  }

  initScene() {
    let scene, camera, renderer;
    const width = window.innerWidth;
    const height = window.innerHeight;

    let aspectRatio, fieldOfView, nearPlane, farPlane;
    var clock;

    function init() {

      VizHandler.init();
      //FXHandler.init();
      //controls = new OrbitControls(camera);
      clock = new THREE.Clock;
    }

    function loop() {
      requestAnimationFrame(loop, canvas);
      GameGlobal.events.emit("update");
    }

    init();
    loop();
  }
} 
