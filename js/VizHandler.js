import * as THREE from "./three.js"
import OrbitControls from "./OrbitControls.js"
import Boid from "./viz/Boid.js"

// import Generator from "./viz/Generator.js"
import { TweenLite, Linear, Expo, Back } from "./TweenMax.min.js"
//import { isMobile } from "./isMobile.min.js"
import "./seedrandom.js"

let ctx = canvas.getContext('webgl')

var isMobile = {any: true, phone: true};


var Shards = function () {
    var groupHolder;
    var multiMaterial

    var drewNewShape = false;
    var scl = 0;
    var full;
    var spd = 0;
    var mod = 0;
    var speed = .035;
    var back = false;
    var main;
    var timeout
    var flotilla = []
    
    var plane;
    var rings = []
    var material
    var time = 0
    var number
    function init() {

        //init event listeners
        GameGlobal.events.on("update", update);
        GameGlobal.events.on("onBeat", onBeat);

        var shininess = 50, specular = 0xffffff, bumpScale = .055, shading = THREE.SmoothShading;
        //var reflectionCube = Assets.getCubeMap(12)
        //reflectionCube.format = THREE.RGBFormat;
        var roughness = .5;
        var metalness = .7;
        //var diffuseColor = new THREE.Color(.1,.1,.1);
        material = new THREE.MeshPhongMaterial({
            //fog: false,
            vertexColors: THREE.VertexColors,
            //metalness: metalness,
            //fog: false,
            //roughness: roughness,
            shininess: 100,
            shading: THREE.FlatShading,
            //envMap: Assets.getCubeMap(),
            //side: THREE.DoubleSide,
            //map: new THREE.TextureLoader().load("2708diffuse.jpg"),
            //alphaMap: new THREE.TextureLoader().load("textures/op.png"),
            //transparent:true,
            //normalMap: new THREE.TextureLoader().load("2708normal.jpg"),
            //bumpMap: texture,
            //emissive: 0x111111,
            //metalnessMap:texture,
            //lightMap:texture,
            //depthWrite:false,
            //depthTest:false,
            //blendEquation:THREE.MinEquation
        })
    }

    function reload(r, r2) {

        number = {random: new Math.seedrandom(r)};

        if (full) {
            VizHandler.getScene().remove(full);
            full.geometry.dispose();
            full = null;
        }

        var geo = new THREE.BoxGeometry(.1, .1, .1, 1, 1, 1)

        var group = new THREE.Object3D();

        var side = 15

        // rocks
        var center = new THREE.Vector3()
        var color = new THREE.Color().setHSL(Math.random(), .3, .5);
        var color2 = new THREE.Color().setHSL(Math.random(), .3, .5);

        for (var j = 0; j < 20; j++) {
            var mainPos = new THREE.Vector3();
            var r = 1000
            while (mainPos.distanceTo(center) < 150) {
                mainPos.set((number.random() - .5) * r, (number.random() - .5) * r / 5 + 60, (number.random() - .5) * r)
            }
            Generator.colorGeometry(geo, {radiusSegments: 7, color: color, color2: color2})

            var spread = 50 + Math.random() * 100
            var mod = Math.random() * .1

            for (var n = 0; n < 10; n++) {
                var geom = geo.clone()

                for (var i = 0; i < geom.vertices.length; i++) {
                    var v = geom.vertices[i]
                    v.x += (number.random() - .5) * mod
                    v.y += (number.random() - .5) * mod
                    v.z += (number.random() - .5) * mod
                }

                var cube = new THREE.Mesh(geom, material)
                cube.position.x = mainPos.x + Math.random() * spread;
                cube.position.y = 0
                cube.position.z = mainPos.z + Math.random() * spread;

                var scr0 = (0.2 + number.random()) * 100
                var scr1 = (0.2 + number.random()) * 100
                var scr2 = (0.2 + number.random()) * 100
                cube.scale.set(scr0, scr1, scr2)
                group.add(cube)
                cube.castShadow = true;
                cube.receiveShadow = true;

            }
        }

        var color = new THREE.Color().setHSL(Math.random(), .3, .5);
        var color2 = new THREE.Color().setHSL(Math.random(), .3, .5);

        for (var j = 0; j < 20; j++) {
            var mainPos = new THREE.Vector3();
            var r = 1000
            while (mainPos.distanceTo(center) < 150) {
                mainPos.set((number.random() - .5) * r, (number.random() - .5) * r / 5 + 60, (number.random() - .5) * r)
            }
            Generator.colorGeometry(geo, {radiusSegments: 7, color: color, color2: color2})

            var spread = 50 + Math.random() * 100
            var mod = Math.random() * .1

            for (var n = 0; n < 10; n++) {
                var geom = geo.clone()

                /*for (var i = 0; i < geom.vertices.length; i++) {
                 var v = geom.vertices[i]
                 v.x += (number.random() - .5) * mod
                 v.y += (number.random() - .5) * mod
                 v.z += (number.random() - .5) * mod
                 }*/

                var cube = new THREE.Mesh(geom, material)
                cube.position.x = mainPos.x + Math.random() * spread;
                cube.position.y = 0
                cube.position.z = mainPos.z + Math.random() * spread;

                var scr0 = (0.2 + number.random()) * 50
                var scr1 = (0.2 + number.random()) * 500
                var scr2 = (0.2 + number.random()) * 50
                cube.scale.set(scr0, scr1, scr2)
                group.add(cube)
                cube.castShadow = true;
                cube.receiveShadow = true;

            }
        }


        var geo = new THREE.CylinderGeometry(3, 3, 3, 3+Math.random()*6, 1)

        var color = new THREE.Color().setHSL(Math.random(), .3, .5);
        var color2 = new THREE.Color().setHSL(Math.random(), .3, .5);

        for (var j = 0; j < 10 + Math.random() * 20; j++) {
            var mainPos = new THREE.Vector3();
            var r = 1000
            while (mainPos.distanceTo(center) < 150) {
                mainPos.set((number.random() - .5) * r, (number.random() - .5) * r / 5 + 60, (number.random() - .5) * r)
            }
            Generator.colorGeometry(geo, {radiusSegments: 3+Math.floor(Math.random()*6), color: color, color2: color2})

            var spread = 50 + Math.random() * 100
            var mod = Math.random() * .1

            for (var n = 0; n < 3 + Math.random() * 13; n++) {
                var geom = geo.clone()

                /*for (var i = 0; i < geom.vertices.length; i++) {
                 var v = geom.vertices[i]
                 v.x += (number.random() - .5) * mod
                 v.y += (number.random() - .5) * mod
                 v.z += (number.random() - .5) * mod
                 }*/

                var cube = new THREE.Mesh(geom, material)
                cube.position.x = mainPos.x + Math.random() * spread;
                cube.position.y = 0
                cube.position.z = mainPos.z + Math.random() * spread;

                var scr0 = (0.2 + number.random()) * 2
                var scr1 = (0.2 + number.random()) * 2
                var scr2 = (0.2 + number.random()) * 3
                cube.scale.set(scr0, scr2, scr0)
                group.add(cube)
                cube.castShadow = true;
                cube.receiveShadow = true;

            }
        }

        /*// tiny
         
         for (var _x = -side; _x < side; _x++) {
         for (var _z = -side; _z < side; _z++) {
         var r = 20
         var tpos = new THREE.Vector3()
         tpos.set((_x) * r * 2, 0 * r * 2, (_z) * r * 2)
         //var r = Math.PI * 3 * 2 * noise.simplex3((mesh.position.x + screenID * screenDistanceInSquares) / scale, mesh.position.y / scale, noiseTimeProgress);
         var n = noise.simplex3(_x, _z, 0)
         if (n == 0) {
         for (var j = 0; j < 5; j++) {
         var geom = geo.clone()
         
         var mod = .1
         for (var i = 0; i < geom.vertices.length; i++) {
         var v = geom.vertices[i]
         v.x += (number.random() - .5) * mod
         v.y += (number.random() - .5) * mod
         v.z += (number.random() - .5) * mod
         }
         
         var cube = new THREE.Mesh(geom, material)
         var r = 20 + 40 * number.random()
         cube.position.set((number.random() - .5) * r, Math.abs((number.random() - .5) * r), (number.random() - .5) * r)
         cube.position.add(tpos)
         var scr0 = (.2 + number.random()) * 20
         var scr1 = (.2 + number.random()) * 20
         var scr2 = (.2 + number.random()) * 20
         cube.scale.set(scr0, scr1, scr2)
         group.add(cube)
         cube.castShadow = true;
         cube.receiveShadow = true;
         }
         }
         }
         }*/

        // laarge

        /*for (var j = 0; j < 30; j++) {
         var r = 2000
         var tpos = new THREE.Vector3()
         while (tpos.distanceTo(group.position) < 150) {
         tpos.set((number.random() - .5) * r, 0, (number.random() - .5) * r)
         }
         tpos.y = (number.random()) * r / 10
         for (var i = 0; i < 1; i++) {
         var geom = geo.clone()
         
         var mod = .05
         for (var i = 0; i < geom.vertices.length; i++) {
         var v = geom.vertices[i]
         v.x += (number.random() - .5) * mod
         v.y += (number.random() - .5) * mod
         v.z += (number.random() - .5) * mod
         }
         
         var cube = new THREE.Mesh(geom, material)
         cube.position.copy(tpos)
         
         var scr0 = (.5 + number.random()) * 2000
         var scr1 = (.5 + number.random()) * 2000
         var scr2 = (.5 + number.random()) * 2000
         cube.scale.set(scr0, scr1, scr2)
         cube.scale.multiplyScalar(1 + number.random())
         group.add(cube)
         cube.castShadow = true;
         cube.receiveShadow = true;
         }
         }*/


        var geom = new THREE.Geometry()
        for (var i = 0; i < group.children.length; i++) {
            group.children[i].updateMatrix();
            geom.merge(group.children[i].geometry, group.children[i].matrix);
        }

        geom.computeFaceNormals();
        geom.computeVertexNormals();

        full = new THREE.Mesh(geom, material)
        full.castShadow = true;
        full.receiveShadow = true;
        VizHandler.getScene().add(full)

        VizHandler.getRenderer().shadowMap.needsUpdate = true;
    }

    function update() {
    }

    function onBeat() {
    }

    function generate() {
    }

    return {
        init: init,
        update: update,
        onBeat: onBeat,
        generate: generate,
        reload: reload,
    }

}
();
var Forest = function () {

    var globalGeometry = new THREE.Geometry();
    var globalBones = [];
    var globalCount = 0;
    var globalNum = 0;
    var globalMesh;

    var scene, number

    var tweenTarget = new THREE.Vector3();
    var soundVizArray = [0, 0, 0]

    var radius = 400
    var updatedOnce = false;

    function init() {

        //init event listeners
        GameGlobal.events.on("update", update);
        GameGlobal.events.on("onBeat", onBeat);

        scene = VizHandler.getScene();
    }

    function rebuild(seed) {
        updatedOnce = false;
        number = {random: new Math.seedrandom(seed)};

        if (globalMesh) {
            scene.remove(globalMesh)
            globalMesh.geometry.dispose()
            globalMesh.material.dispose()
            globalMesh = null;
        }

        //skeletonHelpers = [];

        globalGeometry = new THREE.Geometry();
        globalBones = [];
        globalCount = 0;
        globalNum = 0;

        for (var j = 0; j < 3; j++) {
            var material = new THREE.MeshPhongMaterial({
                //fog: false,
                shininess: 100,
                skinning: true,
                side: THREE.DoubleSide,
                shading: THREE.FlatShading,
                vertexColors: THREE.VertexColors,
            });

            var color = new THREE.Color().setHSL(number.random(), .3, .7);
            var color2 = new THREE.Color().setHSL(number.random(), 0, .8);

            var max = 30
            //if (isMobile.any)
            //    max = 70;

            var radiusSegments = 3 + Math.floor(Math.random() * 4)
            var segmentHeight = 10 + Math.floor(Math.random() * 20)
            var radius = .2 + Math.random()
            var pointyTop = Math.random() < .5
            for (var i = 0; i < max; i++) {
                var segmentHeight = segmentHeight//Math.floor(number.random() * 20) + 5
                var segmentCount = Math.floor(number.random() * 4) + 1
                var height = segmentHeight * segmentCount;
                var halfHeight = height * 0.5;
                var radiusBottom = Math.floor(radius * 15 + Math.random() * 2)
                var radiusTop = radiusBottom;
                if (pointyTop)
                    radiusTop = 0

                var sizing = {
                    color: color,
                    color2: color2,
                    segmentHeight: segmentHeight,
                    segmentCount: segmentCount,
                    height: height,
                    halfHeight: halfHeight,
                    radiusBottom: radiusBottom,
                    radiusTop: radiusTop,
                    radiusSegments: radiusSegments,
                    i: i
                };

                var geometry = createGeometry(sizing, i % 4);
                globalGeometry.merge(geometry)

                globalCount += segmentCount + 1;
                globalNum += 1;

                createBones(sizing);
            }
        }

        globalMesh = createMesh(globalGeometry, globalBones, material);
        globalMesh.castShadow = true;
        globalMesh.receiveShadow = true;
        globalMesh.frustumCulled = false;
        scene.add(globalMesh);

    }

    function createMesh(geometry, bones, material) {

        var mesh = new THREE.SkinnedMesh(geometry, material);
        var skeleton = new THREE.Skeleton(bones);

        for (var i = 0; i < bones.length; i++) {
            if (bones[i].top)
                mesh.add(bones[ i ]);
        }
        mesh.bind(skeleton);

        //var skeletonHelper = new THREE.SkeletonHelper(mesh);
        //skeletonHelper.material.linewidth = 2;
        //VizHandler.getScene().add(skeletonHelper);
        //skeletonHelpers.push(skeletonHelper)

        return mesh;

    }

    function createGeometry(sizing, geoType) {
        geoType = 0

        var geometry = new THREE.CylinderGeometry(
                sizing.radiusTop, // radiusTop
                sizing.radiusBottom, // radiusBottom
                sizing.height, // height
                sizing.radiusSegments, // radiusSegments
                sizing.segmentCount, // heightSegments
                false                     // openEnded
                );

        if (geoType == 1)
            geometry = new THREE.TetrahedronGeometry(sizing.radiusBottom, 1)
        if (geoType == 2)
            geometry = new THREE.OctahedronGeometry(sizing.radiusBottom, 1)
        if (geoType == 3)
            geometry = new THREE.BoxGeometry(sizing.radiusBottom, sizing.radiusBottom, sizing.radiusBottom)

        //geometry = new THREE.BoxGeometry(sizing.radiusBottom, sizing.radiusBottom * 10, sizing.radiusBottom,1,5,1)

        for (var i = 0; i < geometry.vertices.length; i++) {
            var turbulence = 0//Math.random() * 3

            var vertex = geometry.vertices[ i ];
            var y = (vertex.y + sizing.halfHeight);

            var skinIndex = Math.floor(y / sizing.segmentHeight);
            var skinWeight = (y % sizing.segmentHeight) / sizing.segmentHeight;

            //vertex.x -= (.5 - Math.random()) * turbulence * (0 + sizing.radiusBottom) / 2
            //vertex.z -= (.5 - Math.random()) * turbulence * (0 + sizing.radiusBottom) / 2
            vertex.x *= 1 + Math.random() * turbulence

            vertex.x += (Math.random() - .5) * turbulence
            vertex.z *= 1 + Math.random() * turbulence

            //console.log(vertex)

            geometry.skinIndices.push(new THREE.Vector4(globalCount + skinIndex, globalCount + skinIndex + 1, 0, 0));
            geometry.skinWeights.push(new THREE.Vector4(1 - skinWeight, skinWeight, 0, 0));

        }

        colorGeometry(geometry, sizing)

        return geometry;

    }

    function colorGeometry(geometry, sizing) {
        var c = new THREE.Color(sizing.color);
        var f;
        var faceIndices = ['a', 'b', 'c'];
        for (var i = 0; i < geometry.faces.length; i++) {
            f = geometry.faces[ i ];
            c = new THREE.Color(sizing.color);
            if (Math.sin(i * .3) > .5)
                c = new THREE.Color(sizing.color2);

            for (var j = 0; j < 3; j++) {
                let vertexIndex = f[ faceIndices[ j ] ];
                let p = geometry.vertices[ vertexIndex ];
                f.vertexColors[ j ] = c;
            }
        }
    }

    function createBones(sizing) {

        var bones = [];

        var prevBone = new THREE.Bone();
        prevBone.top = true;
        prevBone.i = sizing.i;
        bones.push(prevBone);
        globalBones.push(prevBone);
        prevBone.position.y = -sizing.halfHeight;

        for (var i = 0; i < sizing.segmentCount; i++) {

            var bone = new THREE.Bone();
            bone.position.y = sizing.segmentHeight;
            bone.i = sizing.i;
            globalBones.push(bone);
            bones.push(bone);
            prevBone.add(bone);
            prevBone = bone;

        }

        return bones;

    }

    function animate(array, col, noteScales) {
        for (var i = 0; i < 16; i++) {
            if (array[i] != -1 && col % noteScales[i] == 0) {
                soundVizArray[i] = 1
            }
        }
    }

    function update() {
        if (!globalMesh)
            return;

        if (isMobile.any && updatedOnce)
            return;

        var time = Date.now() * 0.0001;
        var cursorPosition = new THREE.Vector3()//Mecha.cursorPosition();

        TweenLite.to(tweenTarget, .3, {x: cursorPosition.x, y: cursorPosition.y, z: cursorPosition.z});

        var positions = []
        var creatures = Mecha.getCreatures();
        positions.push(tweenTarget)
        for (var i = 0; i < creatures.length; i++) {
            positions.push(creatures[i].movement.position)
        }

        var mod
        var addedMod
        var mesh = globalMesh
        var topPosition;
        var t = new THREE.Vector3()
        for (var k = 0; k < mesh.skeleton.bones.length; k++) {
            var i = mesh.skeleton.bones[ k ].i
            var r = Math.sin(Math.PI * 4 * i / 1000)
            if (mesh.skeleton.bones[ k ].top) {
                var radius = Math.abs(Math.cos(Math.PI + i * 1000)) * 450+20;
                
                mesh.skeleton.bones[ k ].position.x = radius * Math.sin(1.7 * k + 2 * Math.PI * r);
                mesh.skeleton.bones[ k ].position.y = 0;
                mesh.skeleton.bones[ k ].position.z = radius * Math.cos(3.2 * k + 2 * Math.PI * r);

                topPosition = mesh.skeleton.bones[ k ].position;

                mod = 0;
                addedMod = 0;
                for (var i = 0; i < positions.length; i++) {
                    var dis = mesh.skeleton.bones[ k ].position.distanceTo(positions[i])
                    mod += 50 - dis
                    if (mod < 0)
                        mod = 0
                    if (mod > 70)
                        mod = 70
                    mod *= .025
                    addedMod += mod
                }
                if (addedMod > .75)
                    addedMod = .75
                //addedMod=1
            } else {
                t.x = addedMod * 10 * Math.sin(-k + 1 + 3 * time)
                t.z = addedMod * 10 * Math.cos(-k + 1 + 2 * time)
                //var mod = topPosition.distanceTo(scene.position) / 2
                //if (Math.random() < .01)
                //console.log(mod)
                //var abs = soundVizArray[i % 16]//Math.abs(mod - (1 - soundVizArray[i % Sequencer.channels]))
                //if (abs < .3) {
                //t.x *= 1 + .5 * (abs / .3) * Math.sin(k + time * 4 / 5)// + Math.sin(k) * 3
                //t.z *= 1 + .5 * (abs / .3) * Math.cos(k + time * 4 / 5)// + Math.cos(k) * 3
                //}
                TweenLite.to(mesh.skeleton.bones[ k ].position, .1, {x: t.x, z: t.z})
                //if()
            }
        }

        if (isMobile.any)
            updatedOnce = true;
    }

    function onBeat() {
    }

    return {
        init: init,
        animate: animate,
        update: update,
        rebuild: rebuild,
        onBeat: onBeat,
    }

}
();

var Birds = function () {

    var boidCount = 200, sharkCount = 2;
    var fishTypeCount = 0;

    var scene, renderer, camera;
    var goahead = false
    var targets = []
    var groupsNum = 3;
    var sgroup, bgroup;
    var trackingShark, trackingBoid;
    var mouse, clock, count;
    var boids, sharks;
    var sharkMaterial, boidMaterial;

    function init() {

        //init event listeners
        GameGlobal.events.on("update", update);

        scene = VizHandler.getScene();
        renderer = VizHandler.getRenderer();
        camera = VizHandler.getCamera();

        trackingShark = false;
        trackingBoid = false;
        mouse = new THREE.Vector2();

        clock = new THREE.Clock();

        count = 0;

        for (var i = 0; i < groupsNum; i++) {
            targets.push(new THREE.Vector3(0, 100, 0))
        }
        //loadBoids();
    }

    function boidMouseUp() {
        if (boidCount > boids.length) {
            var count = boidCount - boids.length;
            for (var i = 0; i != count; i++) {
                addBoid();
            }
        } else if (boidCount < boids.length) {
            var count = boids.length - boidCount;
            for (var i = 0; i != count; i++) {
                removeBoid();
            }
        }
    }

    function sharkMouseUp() {
        if (sharkCount > sharks.length) {
            var count = sharkCount - sharks.length;
            for (var i = 0; i != count; i++) {
                addShark();
            }
        } else if (sharkCount < sharks.length) {
            var count = sharks.length - sharkCount;
            for (var i = 0; i != count; i++) {
                removeShark();
            }
        }
    }

    function initBoids(amountPerc) {
        //
        // Using https://github.com/OwenMcNaughton/Boids.js/tree/master by Owen McNaughton
        //

        boidCount = Math.floor(amountPerc * 300);
        if (isMobile.phone)
            boidCount = Math.floor(amountPerc * 250);

        fishTypeCount = 1 + 5 * amountPerc

        if (sgroup) {
            scene.remove(sgroup);
            scene.remove(bgroup);
            sgroup = null;
            bgroup = null;
        }

        boids = [];
        sharks = [];
        bgroup = new THREE.Group();
        sgroup = new THREE.Group();

        var geoType = Math.floor(Math.random() * 4)

        var sharkGeometry = new THREE.BoxBufferGeometry(1 + 10 * Math.random(), 1 + 20 * Math.random(), 1 + 10 * Math.random())
        if (geoType == 1)
            sharkGeometry = new THREE.ConeBufferGeometry(1 + 10 * Math.random(), 1 + 10 * Math.random(), 3 + 6 * Math.random())
        if (geoType == 2)
            sharkGeometry = new THREE.OctahedronBufferGeometry(1 + 8 * Math.random(), 1)
        if (geoType == 3)
            sharkGeometry = new THREE.TetrahedronBufferGeometry(1 + 8 * Math.random(), 0)

        var color = new THREE.Color().setHSL(Math.random(), .7, .7);
        sharkMaterial = new THREE.MeshPhongMaterial({color: color, shininess: 60, shading: THREE.FlatShading});

        for (var i = 0; i < sharkCount; i++) {
            var posx = Math.random() * 300 - 150;
            var posy = Math.random() * 300 - 150;
            var posz = Math.random() * 300 - 150;

            var rotx = 0;
            var roty = 0;
            var rotz = 0;

            var pos = new THREE.Vector3(posx, posy, posz);
            var rot = new THREE.Vector3(rotx, roty, rotz);
            var vel = new THREE.Vector3(Math.random() * 10 - .5,
                    Math.random() * 10 - .5,
                    Math.random() * 10 - .5);

            var boid = new Boid(pos, rot, vel, true);
            var mesh = new THREE.Mesh(sharkGeometry, sharkMaterial);
            mesh.castShadow = true
            mesh.receiveShadow = true

            mesh.position.x = pos.x;
            mesh.position.y = pos.y;
            mesh.position.z = pos.z;

            mesh.rotation.x = rot.x;
            mesh.rotation.y = rot.y;
            mesh.rotation.z = rot.z;

            sharks.push(boid);
            sgroup.add(mesh);
        }

        for (var j = 0; j < fishTypeCount; j++) {
            var geoType = Math.floor(Math.random() * 5)

            var boidGeometry = new THREE.BoxBufferGeometry(1 + 3 * Math.random(), 1 + 6 * Math.random(), 1 + 3 * Math.random())
            if (geoType == 1)
                boidGeometry = new THREE.TetrahedronBufferGeometry(1 + 3 * Math.random(), 0)
            if (geoType == 2)
                boidGeometry = new THREE.OctahedronBufferGeometry(1 + 3 * Math.random(), 0)
            if (geoType == 3)
                boidGeometry = new THREE.ConeBufferGeometry(1 + 5 * Math.random(), 0, 3 + 6 * Math.random())
            if (geoType == 4)
                boidGeometry = new THREE.ConeBufferGeometry(1 + 5 * Math.random(), 1 + 5 * Math.random(), 3 + 6 * Math.random())

            var color = new THREE.Color().setHSL(Math.random(), .7, .7);
            boidMaterial = new THREE.MeshPhongMaterial({color: color, shininess: 60, shading: THREE.FlatShading});
            for (var i = 0; i < boidCount / fishTypeCount; i++) {
                var posx = Math.random() * 300 - 150;
                var posy = 100 + Math.random() * 300 - 150;
                var posz = Math.random() * 300 - 150;

                var rotx = 0;
                var roty = 0;
                var rotz = 0;

                var pos = new THREE.Vector3(posx, posy, posz);
                var rot = new THREE.Vector3(rotx, roty, rotz);
                var vel = new THREE.Vector3(Math.random() * 10 - .5,
                        Math.random() * 10 - .5,
                        Math.random() * 10 - .5);


                var boid = new Boid(pos, rot, vel, false, 10 + 3 * j, 8 + 2 * j, 10 + 5 * j);
                var mesh = new THREE.Mesh(boidGeometry, boidMaterial);
                mesh.castShadow = true
                mesh.receiveShadow = true

                mesh.position.x = pos.x;
                mesh.position.y = pos.y;
                mesh.position.z = pos.z;

                mesh.rotation.x = rot.x;
                mesh.rotation.y = rot.y;
                mesh.rotation.z = rot.z;

                boids.push(boid);
                bgroup.add(mesh);
            }
        }
        goahead = true;

        scene.add(sgroup);
        scene.add(bgroup);
    }

    function addBoid() {
        var mesh = new THREE.Mesh(boidGeometry, boidMaterial);
        var posx = Math.random() * 100 - 50;
        var posy = Math.random() * 100 - 50;
        var posz = Math.random() * 100 - 50;

        var rotx = 0;
        var roty = 0;
        var rotz = 0;

        var pos = new THREE.Vector3(posx, posy, posz);
        var rot = new THREE.Vector3(rotx, roty, rotz);
        var vel = new THREE.Vector3(Math.random() * 10 - .5,
                Math.random() * 10 - .5,
                Math.random() * 10 - .5);

        mesh.position.x = pos.x;
        mesh.position.y = pos.y;
        mesh.position.z = pos.z;

        mesh.rotation.x = rot.x;
        mesh.rotation.y = rot.y;
        mesh.rotation.z = rot.z;

        var boid = new Boid(pos, rot, vel);

        boids.push(boid);
        bgroup.add(mesh);
    }

    function addShark() {
        var mesh = new THREE.Mesh(sharkGeometry, sharkMaterial);
        var posx = Math.random() * 100 - 50;
        var posy = Math.random() * 100 - 50;
        var posz = Math.random() * 100 - 50;

        var rotx = 0;
        var roty = 0;
        var rotz = 0;

        var pos = new THREE.Vector3(posx, posy, posz);
        var rot = new THREE.Vector3(rotx, roty, rotz);
        var vel = new THREE.Vector3(Math.random() * 10 - .5,
                Math.random() * 10 - .5,
                Math.random() * 10 - .5);

        mesh.position.x = pos.x;
        mesh.position.y = pos.y;
        mesh.position.z = pos.z;

        mesh.rotation.x = rot.x;
        mesh.rotation.y = rot.y;
        mesh.rotation.z = rot.z;

        var boid = new Boid(pos, rot, vel);

        sharks.push(boid);
        sgroup.add(mesh);
    }

    function removeShark() {
        sharks.pop();
        sgroup.children.pop();
    }

    function removeBoid() {
        boids.pop();
        bgroup.children.pop();
    }
    var time = 0
    function update() {
        if (!goahead)
            return;
        var lastFoodGem = Mecha.lastFoodGem()
        var foodGems = Mecha.foodGems()
        time += .01

        var mousePoint = Mecha.mousePoint()
        for (var i = 0; i < groupsNum; i++) {
            var target = targets[i]
            if (foodGems[i]) {
                target.x = foodGems[i].position.x
                target.y = foodGems[i].position.y
                target.z = foodGems[i].position.z
            } else {
                target.x = 300 * Math.sin(time + 3.14 * i / groupsNum)
                target.y = 100
                target.z = 300 * Math.cos(time + 3.14 * i / groupsNum)
                //console.log(target)
            }
            if (mousePoint) {
                target.copy(mousePoint)
                target.y += 50;
            }
        }

        for (var i = 0; i < boidCount; i++) {
            var groupID = Math.floor(groupsNum * i / boidCount)
            var target = targets[groupID]
            boids[i].update(boids, target, sharks);

            bgroup.children[i].position.x = boids[i].pos.x;
            bgroup.children[i].position.y = boids[i].pos.y;
            bgroup.children[i].position.z = boids[i].pos.z;

            bgroup.children[i].rotation.x = boids[i].rot.x;
            bgroup.children[i].rotation.y = boids[i].rot.y;
            bgroup.children[i].rotation.z = boids[i].rot.z;
        }

        for (var i = 0; i < sharkCount; i++) {
            sharks[i].update(boids, target, sharks);

            sgroup.children[i].position.x = sharks[i].pos.x;
            sgroup.children[i].position.y = sharks[i].pos.y;
            sgroup.children[i].position.z = sharks[i].pos.z;

            sgroup.children[i].rotation.x = sharks[i].rot.x;
            sgroup.children[i].rotation.y = sharks[i].rot.y;
            sgroup.children[i].rotation.z = sharks[i].rot.z;
        }


    }
    return {
        init: init,
        update: update,
        initBoids: initBoids,
    }

}
();


var Generator = function () {
    var number;
    var material, material2

    var spd, center, position, centerTween, centerTweenObject, legsNum, bonesPositions, bonesPositionsTween, mesh, bodyBone, j, r;

    var big = true;
    var colorinit, color2init;
    var bones;

    function init() {
        //var reflectionCube = Assets.getCubeMap(0)
        //reflectionCube.format = THREE.RGBFormat;
        var roughness = .5;
        var metalness = .3;
        material = new THREE.MeshPhongMaterial({
            skinning: true,
            color: 0xFFFFFF,
            //metalness: metalness,
            //roughness: roughness,
            shininess: 50,
            //fog: false,
            //map: new THREE.TextureLoader().load( "textures/stickers.png" ),
            reflectivity: 1,
            shading: THREE.FlatShading,
            side: THREE.DoubleSide,
            //envMap: reflectionCube,
            vertexColors: THREE.VertexColors,
            emissive: 0
        })
        material2 = material.clone()
        material2.skinning = false
    }

    function create(id, position) {
        big = Math.random() < .05

        number = {random: new Math.seedrandom(id)};

        if (!colorinit || number.random() < .07) {
            //console.log('change color')
            colorinit = number.random() - .2
            color2init = number.random() - .2
        }

        var segmentHeight = (Math.floor(number.random() * 8) + 5);
        var segmentCount = 2;
        var height = segmentHeight * segmentCount;
        var spread = (3 + number.random() * 20);

        if (big)
            spread = 30 + Math.random() * 20

        var legs = Math.floor(number.random() * 5) + 3;

        if (big)
            legs = 8

        var radiusBottom = (.1 + colorinit + .2 * number.random()) * segmentHeight * spread * .03 + .5;
        var radiusTop = (.1 + color2init + .2 * number.random()) * radiusBottom;
        var radiusSegments = 3 + number.random() * 5;
        var color = new THREE.Color().setHSL(colorinit + .2 * number.random(), .7, .5);
        var color2 = new THREE.Color().setHSL(color2init + .2 * number.random(), .3, .5);
        var size = spread * (segmentHeight + (radiusTop + radiusBottom) * .01) / 15;
        var sizeBias = .5;
        var ankleSpread = .2 + .6 * number.random();
        var ankleHeight = .2 + .6 * number.random();
        if (big)
            ankleHeight *= 5
        var turbulence = number.random() * 1.5;
        var speed = .05 + .2 * number.random()//(segmentHeight - 2) / 20
        if (big)
            speed *= 2

        big = false;

        var ankle = 0;
        while (Math.abs(ankle) < .3)
            ankle = -.6 + number.random() * 1.5;

        var polygonNum = Math.round(height * .2 + ankle);

        var stepHeight = ankleHeight * (.3 + .2 * number.random())///2//.2 + number.random() * .1;

        //

        var sizing = {
            id: id,
            color: color,
            color2: color2,
            segmentHeight: segmentHeight,
            segmentCount: segmentCount,
            height: height,
            halfHeight: height * 0.5,
            radiusTop: radiusTop,
            radiusBottom: radiusBottom,
            radiusSegments: radiusSegments,
            speed: speed,
            spread: spread,
            legs: legs,
            ankle: ankle,
            ankleSpread: ankleSpread,
            ankleHeight: ankleHeight,
            polygonNum: polygonNum,
            stepHeight: stepHeight,
            turbulence: turbulence,
            initialPosition: position.clone()
        };

        var centerTweenObject = new THREE.Object3D();
        centerTweenObject.position.copy(position);

        var movement = {
            center: position.clone(),
            centerTween: centerTweenObject,
            position: position
        }

        var meshes = []
        var positions = []
        var bonesPositions = []
        var bonesPositionsTween = []

        var geometry = createGeometry(sizing, turbulence, sizing.legs, size, sizeBias);
        var bones = createBones(sizing, sizing.legs);
        var mesh = createMesh(geometry, bones, sizing.legs);
        mesh.frustumCulled = false;

        meshes.push(mesh)

        var pos = position.clone();
        positions.push(pos)

        for (var i = 0; i < sizing.legs; i++) {
            var posAnimating = pos.clone()
            posAnimating.animating = false;
            bonesPositions.push(pos.clone())
            bonesPositionsTween.push(pos.clone())
        }

        return {id: id, random: Math.random(), meshes: meshes, sizing: sizing, movement: movement, positions: positions, bonesPositions: bonesPositions, bonesPositionsTween: bonesPositionsTween}
    }

    function updateCreature(creature, des, mod, mouseControl, meshes, targetPosition, newlyCreated) {
        spd = creature.sizing.speed;
        if (newlyCreated)
            spd = 0;
        center = creature.movement.center;
        position = creature.movement.position;
        centerTween = creature.movement.centerTween.position;
        centerTweenObject = creature.movement.centerTween;
        legsNum = creature.sizing.legs
        bonesPositions = creature.bonesPositions
        bonesPositionsTween = creature.bonesPositionsTween
        mesh = meshes[0]
        bodyBone = mesh.skeleton.bones[legsNum * 3]

        if (mouseControl) {
            des.x = targetPosition.x;
            des.z = targetPosition.z;
        }
        TweenLite.to(center, center.distanceTo(des) * spd, {
            x: des.x,
            //y: 0,
            z: des.z,
            ease: Linear.easeNone
        })
        //console.log(bodyBone,legsNum * 3,mesh.skeleton.bones)
        if (newlyCreated) {
            bodyBone.lookAt(center)
        } else {
            TweenLite.to(centerTween, spd * 5, {x: center.x, y: center.y, z: center.z, ease: Linear.easeNone});
            centerTweenObject.lookAt(center)
            bodyBone.rotation.copy(centerTweenObject.rotation)
        }

        for (j = 0; j < legsNum; j++) {
            if ((mesh.skeleton.bones[ 2 + j * 3 ].position.z == 0 || Math.random() < .0005 || bonesPositions[j].distanceTo(center) > creature.sizing.spread * 1.4) && !bonesPositionsTween[j].animating) {
                r = 2 * Math.PI * j / legsNum - Math.atan2(centerTween.z - center.z, centerTween.x - center.x)// + Math.random() * .1

                bonesPositions[j].x = center.x + Math.sin(r) * creature.sizing.spread
                bonesPositions[j].y = 0
                bonesPositions[j].z = center.z + Math.cos(r) * creature.sizing.spread

                bonesPositionsTween[j].animating = true;

                TweenLite.killTweensOf(bonesPositionsTween[j])
                TweenLite.to(bonesPositionsTween[j], spd * 2, {x: bonesPositions[j].x, z: bonesPositions[j].z})
                TweenLite.to(bonesPositionsTween[j], spd, {y: creature.sizing.height * creature.sizing.stepHeight})
                TweenLite.to(bonesPositionsTween[j], spd, {delay: spd, y: bonesPositions[j].y})
                TweenLite.delayedCall(spd * 3, finishAnimating, [j, bonesPositionsTween])
            }
            mod.y = creature.sizing.height * creature.sizing.ankleHeight

            mesh.skeleton.bones[ 0 + j * 3 ].position.copy(centerTween)
            mesh.skeleton.bones[ 0 + j * 3 ].position.add(mod)
            mesh.skeleton.bones[ 0 + j * 3 ].position.y += des.y

            mesh.skeleton.bones[ 1 + j * 3 ].position.set(bonesPositionsTween[j].x * creature.sizing.ankleSpread, mod.y * creature.sizing.ankle + bonesPositionsTween[j].y * creature.sizing.ankleSpread, bonesPositionsTween[j].z * creature.sizing.ankleSpread)
            mesh.skeleton.bones[ 1 + j * 3 ].position.sub(centerTween.clone().multiplyScalar(creature.sizing.ankleSpread))
            mesh.skeleton.bones[ 1 + j * 3 ].position.y -= des.y

            mesh.skeleton.bones[ 2 + j * 3 ].position.set(bonesPositionsTween[j].x * (1 - creature.sizing.ankleSpread), -mod.y * (1 + creature.sizing.ankle) + bonesPositionsTween[j].y * (1 - creature.sizing.ankleSpread), bonesPositionsTween[j].z * (1 - creature.sizing.ankleSpread))
            mesh.skeleton.bones[ 2 + j * 3 ].position.sub(centerTween.clone().multiplyScalar(1 - creature.sizing.ankleSpread))
        }

        position.copy(centerTween)
        position.add(mod)
        position.y += des.y

        bodyBone.position.copy(position)
    }

    function finishAnimating(j, bonesPositionsTween) {
        bonesPositionsTween[j].animating = false
    }

    function createGeometry(sizing, turbulence, legsNum, size, sizeBias) {
        var geometry = new THREE.CylinderGeometry(
                sizing.radiusTop, // radiusTop
                sizing.radiusBottom, // radiusBottom
                sizing.height, // height
                sizing.radiusSegments, // radiusSegments
                sizing.segmentCount * sizing.polygonNum, // heightSegments
                false                     // openEnded
                );
        for (var j = 0; j < legsNum - 1; j++) {
            var singleGeometry = new THREE.CylinderGeometry(
                    sizing.radiusTop, // radiusTop
                    sizing.radiusBottom, // radiusBottom
                    sizing.height, // height
                    sizing.radiusSegments, // radiusSegments
                    sizing.segmentCount * sizing.polygonNum, // heightSegments
                    false                     // openEnded
                    );
            geometry.merge(singleGeometry)
        }

        for (var i = 0; i < geometry.vertices.length; i++) {

            var vertex = geometry.vertices[ i ];
            var y = (vertex.y + sizing.halfHeight);

            var skinIndex = Math.floor(y / sizing.segmentHeight);
            var skinWeight = (y % sizing.segmentHeight) / sizing.segmentHeight;
            for (var j = 1; j < legsNum; j++) {
                if (i / geometry.vertices.length >= j / legsNum)
                    skinIndex += 3;
            }

            vertex.x -= (.5 - number.random()) * turbulence * (sizing.radiusTop + sizing.radiusBottom) / 2
            vertex.z -= (.5 - number.random()) * turbulence * (sizing.radiusTop + sizing.radiusBottom) / 2
            if (vertex.y == -sizing.segmentHeight) {
                vertex.x = vertex.z = 0;
            }

            geometry.skinIndices.push(new THREE.Vector4(skinIndex, skinIndex + 1, 0, 0));
            geometry.skinWeights.push(new THREE.Vector4(1 - skinWeight, skinWeight, 0, 0));

        }

        var body = createBody(sizing, size, sizeBias);
        body.position.y = -sizing.height / 2
        body.updateMatrix();

        for (var i = 0; i < body.geometry.vertices.length; i++) {
            var vertex = geometry.vertices[ i ];
            geometry.skinIndices.push(new THREE.Vector4(legsNum * 3, 0, 0, 0));
            geometry.skinWeights.push(new THREE.Vector4(1, 0, 0, 0));
        }
        geometry.merge(body.geometry, body.matrix)

        colorGeometry(geometry, sizing)

        return geometry;

    }

    function randomizeGeometry(geometry, size, vertical) {
        size *= .1;
        for (var i = 0; i < geometry.vertices.length; i++) {

            var vertex = geometry.vertices[ i ];
            var mod = Math.abs(vertex.x) + vertex.y + vertex.z
            vertex.x += Math.sin(mod) * size;
            vertex.y += Math.sin(mod) * size;
            vertex.z += Math.sin(mod) * size;

        }

        return geometry;

    }

    function colorGeometry(geometry, sizing) {
        var c = new THREE.Color(sizing.color);
        var f;
        var faceIndices = ['a', 'b', 'c'];
        for (var i = 0; i < geometry.faces.length; i++) {
            f = geometry.faces[ i ];
            if (i % Math.floor(sizing.radiusSegments) == 0) {
                c = new THREE.Color(sizing.color);
                if (Math.sin(i * .3) > .5)
                    c = new THREE.Color(sizing.color2);
            }
            for (var j = 0; j < 3; j++) {
                let vertexIndex = f[ faceIndices[ j ] ];
                let p = geometry.vertices[ vertexIndex ];
                f.vertexColors[ j ] = c;

            }

        }
    }

    function createBones(sizing, legsNum) {

        bones = [];

        for (var j = 0; j < legsNum; j++) {

            var prevBone = new THREE.Bone();
            bones.push(prevBone);
            prevBone.position.y = -sizing.halfHeight;

            for (var i = 0; i < sizing.segmentCount; i++) {

                var bone = new THREE.Bone();
                bone.position.y = sizing.segmentHeight;
                bones.push(bone);
                prevBone.add(bone);
                prevBone = bone;

            }
        }

        var headBone = new THREE.Bone();
        headBone.position.y = -sizing.halfHeight;
        bones.push(headBone);

        return bones;

    }

    function createMesh(geometry, bones, legsNum) {

        var mesh = new THREE.SkinnedMesh(geometry, material);
        var skeleton = new THREE.Skeleton(bones);

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        for (var i = 0; i < legsNum; i++) {
            mesh.add(bones[ i * 3 ]);
        }
        mesh.add(bones[ legsNum * 3 ]);
        mesh.bind(skeleton);

        /*var skeletonHelper = new THREE.SkeletonHelper(mesh);
         skeletonHelper.material.linewidth = 2;
         //groupHolder.add(skeletonHelper);
         skeletonHelpers.push(skeletonHelper)*/

        return mesh;

    }

    function createBody(sizing, size, sizeBias) {
        var container = new THREE.Object3D()

        size *= .5

        var geoms = [new THREE.BoxGeometry(
                    size * (sizeBias * number.random() + 1 - sizeBias),
                    size * (sizeBias * number.random() + 1 - sizeBias),
                    size * (sizeBias * number.random() + 1 - sizeBias)
                    ),
            new THREE.OctahedronGeometry(size * (sizeBias * number.random() + 1 - sizeBias), 1),
            new THREE.TetrahedronGeometry(size * (sizeBias * number.random() + 1 - sizeBias), 1),
            new THREE.TetrahedronGeometry(size * (sizeBias * number.random() + 1 - sizeBias), 0)]

        for (var i = 0; i < 5; i++) {
            var g = geoms[Math.floor(number.random() * geoms.length)]
            var mesh = new THREE.Mesh(g, null)
            var roz = size * 2

            mesh.position.x = (number.random() - .5) * roz
            mesh.position.y = (number.random() - .5) * roz
            mesh.position.z = (number.random() - .5) * roz

            container.add(mesh)


            var mesh2 = mesh.clone()
            mesh2.geometry = mesh2.geometry.clone()
            for (var j = 0; j < mesh2.geometry.vertices.length; j++) {
                mesh2.geometry.vertices[j].x = -mesh2.geometry.vertices[j].x
            }

            for (var j = 0; j < mesh2.geometry.faces.length; j++) {
                var a = mesh2.geometry.faces[j].a
                mesh2.geometry.faces[j].a = mesh2.geometry.faces[j].b
                mesh2.geometry.faces[j].b = a
            }
            mesh2.position.copy(mesh.position)
            mesh2.position.x = -mesh2.position.x

            container.add(mesh2)

        }


        var geom = new THREE.Geometry()
        for (var i = 0; i < container.children.length; i++) {
            if (container.children[i].geometry) {
                container.children[i].updateMatrix();
                geom.merge(container.children[i].geometry, container.children[i].matrix, 0);
            }
        }
        var body = new THREE.Mesh(geom, material2);

        colorGeometry(body.geometry, sizing)
        randomizeGeometry(body.geometry, size, true)
        body.castShadow = true;
        body.receiveShadow = true;

        return body;
    }
    return {
        init: init,
        create: create,
        createGeometry: createGeometry,
        createBones: createBones,
        createMesh: createMesh,
        colorGeometry: colorGeometry,
        randomizeGeometry: randomizeGeometry,
        createBody: createBody,
        updateCreature: updateCreature,
    };

}();

var Mecha = function () {
    var scene;

    var targetPosition = new THREE.Vector3()
    var finalTargetPosition = new THREE.Vector3()
    var mouseControl = false, finalControl = false;
    var meshes = []

    var numCreaturesSqrt = 1;
    var numCreatures = numCreaturesSqrt * numCreaturesSqrt;
    var creatures = [];

    var material, material2;

    var cursors = {};
    var max = 120, maxGems = 20;
    var times = [];
    var mods = []
    var cylGeo = new THREE.CylinderGeometry(10, 5, .5, 32)

    var smokeMaterial = new THREE.MeshPhongMaterial({color: 0xcccccc, shading: THREE.FlatShading})
    var smokePiece = new THREE.OctahedronBufferGeometry(5, 1)
    var crackMaterial = new THREE.MeshPhongMaterial({color: 0xcccccc, shading: THREE.FlatShading})
    var crackPiece = new THREE.TetrahedronBufferGeometry(5, 0)
    var gemMaterial = new THREE.MeshPhongMaterial({color: 0xcccccc, fog: true, shininess: 50, specular: 0xFFFFFF, shading: THREE.FlatShading})
    var gemPiece = new THREE.TetrahedronBufferGeometry(5, 0)
    var rayMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF, shading: THREE.FlatShading})
    var rayPiece = new THREE.BoxBufferGeometry(2, 20, 2)

    var mouseMoved = false;
    var mouseEvent = {}
    var preMouse = new THREE.Vector2();

    var foodGems = []
    var crystal;
    var crystalClicked = false;
    var plane;

    function init() {

        //init event listeners
        GameGlobal.events.on("update", update);
        scene = VizHandler.getScene()

        initBones();

        document.addEventListener("mousemove", onDocumentMouseMove, false);
        document.addEventListener("touchmove", onDocumentTouchMove, false);
        document.addEventListener("mousedown", onDocumentMouseDown, false);
        document.addEventListener("touchstart", onDocumentTouchStart, false);

        TweenLite.delayedCall(10, crystalBounce)
    }

    function crystalBounce() {
        if (crystalClicked)
            return;
        var time = 1
        console.log(crystal.scale)
        TweenLite.killTweensOf(crystal.scale)
        TweenLite.killTweensOf(crystal)
        TweenLite.killDelayedCallsTo(crystalBounce)
        TweenLite.to(crystal.scale, time, {x: 4, y: 4, z: 4, ease: Expo.easeIn})
        TweenLite.to(crystal.scale, time, {delay: time, x: 3, y: 3, z: 3, ease: Expo.easeOut})
        TweenLite.delayedCall(2, crystalBounce)
    }

    function onDocumentTouchMove(event) {
        if (event.touches.length === 1) {
            var mouse = new THREE.Vector2();
            mouse.x = (event.touches[ 0 ].pageX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.touches[ 0 ].pageY / window.innerHeight) * 2 + 1;
            findFromRay(mouse)
        }
    }

    function onDocumentMouseMove(event) {
        var mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        findFromRay(mouse)
    }

    function onDocumentTouchStart(event) {
        if (event.touches.length === 1) {
            var mouse = new THREE.Vector2();
            mouse.x = (event.touches[ 0 ].pageX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.touches[ 0 ].pageY / window.innerHeight) * 2 + 1;
            findFromRay(mouse, true)
            Mecha.onRelease()
        }
    }

    function onDocumentMouseDown(event) {
        var mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        findFromRay(mouse, true)

        Mecha.onRelease()
    }

    function onDocumentTouchEnd(event) {
        VizHandler.getControls().enableRotate = true;
        document.body.style.cursor = "auto";
        selected = null
    }

    function onDocumentMouseUp(event) {
        VizHandler.getControls().enableRotate = true;
        document.body.style.cursor = "auto";
        selected = null
        Mecha.onRelease()
    }

    /*function onDocumentTouchMove() {
     if (!mouseEvent.mouse)
     return;
     //console.log(preMouse.distanceTo(mouseEvent.mouse))
     if (preMouse.distanceTo(mouseEvent.mouse) > 0.03) {
     mouseMoved = true
     }
     }
     
     function onDocumentMouseMove() {
     if (!mouseEvent.mouse)
     return;
     //console.log(preMouse.distanceTo(mouseEvent.mouse))
     if (preMouse.distanceTo(mouseEvent.mouse) > 0.03) {
     mouseMoved = true
     }
     }
     
     function onDocumentTouchStart() {
     if (!mouseEvent.mouse)
     return;
     preMouse.copy(mouseEvent.mouse)
     mouseMoved = false
     }
     function onDocumentMouseDown() {
     if (!mouseEvent.mouse)
     return;
     preMouse.copy(mouseEvent.mouse)
     mouseMoved = false
     }*/

    function lookAround() {
        if (!plane)
            return;
        var raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouseEvent.mouse, VizHandler.getCamera());
        var intersects = raycaster.intersectObjects([plane, crystal]);
        if (intersects[ 0 ]) {
            if (intersects[ 0 ].object == crystal) {
                document.body.style.cursor = "pointer";
            } else {
                document.body.style.cursor = "auto";
                var p = intersects[ 0 ].point
                targetPosition = p;
                mouseControl = true
                TweenLite.killDelayedCallsTo(regainControl)
                TweenLite.delayedCall(.3, regainControl)
            }

        }
    }

    function onRelease() {
        //console.log(mouseMoved)
        if (mouseMoved || !mouseEvent.mouse)
            return;

        var raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouseEvent.mouse, VizHandler.getCamera());
        var intersects = raycaster.intersectObjects([plane, crystal]);
        if (intersects[ 0 ]) {

            //if (mouseEvent.click) {
            //var id = Math.floor(Math.random() * 10000);
            //spawn(p.x, p.y, p.z, id);
            //sendClick(p.x, p.y, p.z, id);
            if (intersects[ 0 ].object == crystal) {
                crystalClicked = true;
                VizHandler.playMusic();
                VizHandler.dayNight();

                var num = Math.floor(Math.random() * 5) + 1
                var place = "desert";
                if (VizHandler.getMode() == 1)
                    place = "underwater_new"
                var sound = new Audio('music/pling_' + place + num + '.mp3');
                sound.play();

            } else {
                var p = intersects[ 0 ].point
                addGem(p)
            }
        }
    }

    function addGem(p) {

        var minDist = 10000
        for (var g = 0; g < foodGems.length; g++) {
            var dist = p.distanceTo(foodGems[g].position)
            if (dist < minDist) {
                minDist = dist
            }
        }
        if (minDist < 16) {
            return;
        }

        var num = Math.floor(Math.random() * 5) + 1
        var place = "desert";
        if (VizHandler.getMode() == 1)
            place = "underwater_new"
        var sound = new Audio('music/pling_' + place + num + '.mp3');
        sound.play();

        var gem = new THREE.Mesh(gemPiece, gemMaterial)
        gem.position.x = p.x
        gem.position.y = -5
        gem.position.z = p.z
        TweenLite.to(gem.position, 1, {y: 15, ease: Back.easeOut});
        TweenLite.from(gem.rotation, .6, {x: Math.random() * 6 - 3, y: Math.random() * 6 - 3, z: Math.random() * 6 - 3});
        gem.castShadow = true;
        gem.receiveShadow = true;

        scene.add(gem)
        foodGems.push(gem)

        if (foodGems.length > maxGems) {
            var last = foodGems[0];
            removeGem(last)
        }
    }

    function removeGem(last) {
        foodGems = foodGems.filter(function (item) {
            return item !== last
        })
        TweenLite.to(last.scale, .5, {x: 0, y: 0, z: 0, onComplete: removeFromStage, onCompleteParams: [last]});
    }

    function hideCrystals() {
        if (!crystal)
            return;
        
        TweenLite.killTweensOf(crystal.scale)
        TweenLite.killTweensOf(crystal)
        TweenLite.killDelayedCallsTo(crystalBounce)
        
        TweenLite.to(crystal.scale, .3, {x: 0.01, y: 0.01, z: 0.01})
        for (var i = 0; i < foodGems.length; i++) {
            var last = foodGems[i]
            TweenLite.to(last.scale, .5, {x: 0, y: 0, z: 0, onComplete: removeFromStage, onCompleteParams: [last]});
        }
        foodGems = [];
    }

    function removeFromStage(cursor) {
        scene.remove(cursor)
    }

    function findFromRay(mouse, click) {
        mouseEvent.mouse = mouse
        mouseEvent.click = click

        if (!click)
            lookAround()
    }

    function regainControl() {
        mouseControl = false;
    }

    function initBones() {
        Generator.init();
        clearSpace()
    }

    function clearSpace() {
        for (var i = 0; i < meshes.length; i++) {
            scene.remove(meshes[i])
        }

        creatures = []
        meshes = []

        numCreatures = creatures.length;
        numCreaturesSqrt = Math.sqrt(numCreatures)

    }

    function spawn(x, y, z, id, creatorsName) {
        if (!scene)
            return;
        var meshesAddition = []

        // CONFIG

        var creature = Generator.create(id, new THREE.Vector3(x, y, z))
        //explode(creature.movement.position)
        creature.creatorsName = creatorsName;

        for (var j = 0; j < creature.meshes.length; j++) {
            scene.add(creature.meshes[j]);

            /*skeletonHelper = new THREE.SkeletonHelper(creature.meshes[j]);
             skeletonHelper.material.linewidth = 2;
             scene.add(skeletonHelper);*/

            meshesAddition.push(creature.meshes[j])
        }

        var mod = new THREE.Vector3(0, -30, 0)
        TweenLite.to(mod, 1, {y: 0})

        creatures.push(creature)
        meshes.push(meshesAddition)
        mods.push(mod)
        times.push(0)

        if (creatures.length > max) {
            var creature = creatures[0]

            for (var j = 0; j < creature.meshes.length; j++) {
                scene.remove(creature.meshes[j]);
            }

            //explode(creature.movement.position)

            creatures.shift();
            meshes.shift();
            mods.shift();
            times.shift();
        }


        numCreatures = creatures.length;
        numCreaturesSqrt = Math.sqrt(numCreatures)

        update()
    }

    function update() {
        for (var i = 0; i < foodGems.length; i++) {
            foodGems[i].rotation.x += .03
            foodGems[i].rotation.y += .03
        }
        if (crystal) {
            crystal.rotation.x += .01
            crystal.rotation.y += .01
        }

        var creature, midDist, bestChoice, dist;
        for (var i = 0; i < numCreatures; i++) {
            times[i] += .0007;

            creature = creatures[i];

            finalTargetPosition.copy(targetPosition)
            finalTargetPosition.x += Math.sin(i) * 50 * i / numCreatures
            finalTargetPosition.z += Math.cos(i) * 50 * i / numCreatures
            var finalControl = mouseControl
            if (finalControl && creature.movement.position.distanceTo(targetPosition) > 300) {
                finalControl = false
            }
            if (foodGems.length > 0) {
                var minDist = 10000
                for (var g = 0; g < foodGems.length; g++) {
                    dist = creature.movement.position.distanceTo(foodGems[g].position)
                    if (dist < minDist) {
                        minDist = dist
                        bestChoice = foodGems[g];
                    }
                }
                if (minDist < 300) {
                    finalTargetPosition.copy(bestChoice.position)
                    finalControl = true;
                }
                if (minDist < 7) {
                    ray(bestChoice.position);
                    removeGem(bestChoice)
                    //AudioHandler.playGem()
                }
            }

            var time = times[i];
            var des = new THREE.Vector3(
                    Math.sin(1.1 * creature.random * 6 + 1 * time + i) * 300,
                    (-Math.sin(1.1 * creature.random * 6 + 30 * time) / 2 + .5) * creature.sizing.height / 3,
                    Math.sin(1.9 * creature.random * 6 + 1 * time) * 300
                    )
            //var mod = new THREE.Vector3(40 * (.5 - numCreaturesSqrt / 2 + i % numCreaturesSqrt), 0, 40 * (.5 - numCreaturesSqrt / 2 + Math.floor(i / numCreaturesSqrt)));
            var mod = new THREE.Vector3();
            //des.y += mod.y;

            Generator.updateCreature(creature, des, mod, finalControl, meshes[i], finalTargetPosition)
        }
    }

    function hit(position) {
        var creature;
        for (var i = numCreatures - 1; i >= 0; i--) {
            creature = creatures[i];
            if (creature.movement.position.distanceTo(position) < 40) {
                explode(creature.movement.position)

                for (var j = 0; j < creature.meshes.length; j++) {
                    scene.remove(creature.meshes[j]);
                }

                creatures.splice(i, 1);
                meshes.splice(i, 1);
                mods.splice(i, 1);
                times.splice(i, 1);
                numCreatures--

                var roz = 500
                var id = Math.random()
                Mecha.spawn((Math.random() - .5) * roz, 0, (Math.random() - .5) * roz, id)
            }
        }
    }

    function animate(array, col, noteScales) {
        for (var i = 0; i < mods.length; i++) {
            var n = mods.length % i
            if (array[n] == -1 && col % noteScales[n] == 0) {
                TweenLite.to(mods[i], .05, {y: -7});
            } else {
                TweenLite.to(mods[i], 1, {y: 0});
            }
        }
    }

    function explode(position, scale) {
        if (!scale)
            scale = 1
        for (var k = 0; k < 5; k++) {
            var c = new THREE.Mesh(smokePiece, smokeMaterial)
            c.castShadow = true;
            c.receiveShadow = true;
            c.position.copy(position)
            c.position.x += (Math.random() * 10 - 5) * scale
            c.position.y += (Math.random() * 5) * scale
            c.position.z += (Math.random() * 10 - 5) * scale
            c.scale.set(scale, scale, scale)
            scene.add(c)
            var d = Math.random() * 20 * scale
            var a = Math.random() * Math.PI * 2
            var tpos = new THREE.Vector3(Math.sin(a) * d, 0, Math.cos(a) * d)
            tpos.add(c.position)
            var d = Math.random() * .5
            TweenLite.to(c.rotation, 1 + d, {delay: 0, x: 5 * (Math.random() - .5), y: 5 * (Math.random() - .5), z: 5 * (Math.random() - .5)})
            TweenLite.to(c.position, 1 + d, {delay: 0, x: tpos.x, z: tpos.z, onComplete: removeFromStage, onCompleteParams: [c]})
            TweenLite.to(c.position, 1 + d, {delay: 0, y: (Math.random() * 20 + 5) * scale})
            var s = (1 + Math.random()) * scale
            TweenLite.to(c.scale, .7 + d * .7, {delay: 0, x: s, y: s, z: s})
            TweenLite.to(c.scale, .3 + d * .3, {delay: 0 + .7 + d * .7, x: 0.0001, y: 0.0001, z: 0.0001})
        }
    }

    function ray(position, scale) {
        var name = (1 + Math.floor(Math.random() * 5))

        if (VizHandler.getMode() == 1)
            name += "_underwater"
        var sound = new Audio('music/creature' + name + '.mp3');
        sound.play();

        return;

        if (!scale)
            scale = 1
        for (var k = 0; k < 1; k++) {
            var c = new THREE.Mesh(rayPiece, rayMaterial)
            c.position.copy(position)
            c.scale.set(scale, scale, scale)
            scene.add(c)
            var tpos = new THREE.Vector3(0, 300, 0)
            tpos.add(c.position)
            TweenLite.to(c.position, 1, {delay: 0, x: tpos.x, y: tpos.y, z: tpos.z, onComplete: removeFromStage, onCompleteParams: [c]})
            var s = (1 + Math.random()) * scale
            TweenLite.to(c.scale, .7, {delay: 0, x: s, y: s, z: s})
            TweenLite.to(c.scale, .3, {delay: 0 + .7, x: 0.0001, y: 0.0001, z: 0.0001})
        }
    }

    function setColors(r, r2) {
        crackMaterial.color = new THREE.Color().setHSL(r, .7, .5);
        smokeMaterial.color = new THREE.Color().setHSL(r2, 0, .7);
        gemMaterial.color = new THREE.Color().setHSL(r, .7, .5);
        if (plane)
            scene.remove(plane)
        plane = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000, 10 + Math.random() * 10, 10 + Math.random() * 10), new THREE.MeshPhongMaterial({
            color: 0xFFFFFF,
            //metalness: metalness,
            //roughness: roughness,
            shininess: 70,
            //fog: false,
            //map: new THREE.TextureLoader().load( "textures/stickers.png" ),
            reflectivity: 1,
            shading: THREE.FlatShading,
            side: THREE.DoubleSide,
            //envMap: reflectionCube,
            vertexColors: THREE.VertexColors,
            emissive: 0
        }));
        var color = new THREE.Color().setHSL(r, .3, .5);
        var color2 = new THREE.Color().setHSL(r2, .3, .5);
        Generator.colorGeometry(plane.geometry, {radiusSegments: 7, color: color, color2: color2})
        plane.rotation.x = -Math.PI / 2
        plane.receiveShadow = true;
        scene.add(plane);

        if (crystal)
            scene.remove(crystal)
        var geom = new THREE.TetrahedronGeometry(5, 1)
        var mod = 5
        for (var i = 0; i < geom.vertices.length; i++) {
            var v = geom.vertices[i]
            v.x += (Math.random() - .5) * mod
            v.y += (Math.random() - .5) * mod
            v.z += (Math.random() - .5) * mod
        }
        var color = new THREE.Color().setHSL(Math.random(), .3, .5);
        var color2 = new THREE.Color().setHSL(Math.random(), .3, .5);
        Generator.colorGeometry(geom, {radiusSegments: 7, color: color, color2: color2})
        crystal = new THREE.Mesh(geom, new THREE.MeshPhongMaterial({
            color: 0xFFFFFF,
            //metalness: metalness,
            //roughness: roughness,
            shininess: 50,
            fog: false,
            //map: new THREE.TextureLoader().load( "textures/stickers.png" ),
            reflectivity: 1,
            shading: THREE.FlatShading,
            side: THREE.DoubleSide,
            //envMap: reflectionCube,
            vertexColors: THREE.VertexColors,
            //emissive: 0xFFFFFF
            specular: 0xFFFFFF
        }));
        crystal.castShadow = true;
        crystal.receiveShadow = true;
        crystal.scale.set(3, 3, 3)
        crystal.position.y = 100
        scene.add(crystal)
        TweenLite.from(crystal.scale, 1, {delay: .5, x: 0.01, y: 0.01, z: 0.01})

        /*var crystalLight = new THREE.Mesh(new THREE.CylinderBufferGeometry(3,3,100,5),new THREE.MeshBasicMaterial({transparent:true,opacity:.5}))
         crystalLight.position.y=50;
         scene.add(crystalLight)*/

    }

    function crack(position, scale) {
        if (isMobile.any)
            return;
        if (!scale)
            scale = 1
        var c
        for (var k = 0; k < 5; k++) {
            if (Math.random() < .5) {
                c = new THREE.Mesh(crackPiece, crackMaterial)
            } else {
                c = new THREE.Mesh(crackPiece, smokeMaterial)
            }
            c.castShadow = true;
            c.receiveShadow = true;
            c.userData.ySpeed = 1 + Math.random() * 1.5;
            c.position.copy(position)
            c.position.x += (Math.random() * 10 - 5) * scale
            c.position.y += (Math.random() * 5) * scale
            c.position.z += (Math.random() * 10 - 5) * scale
            c.scale.set(scale * (.5 + Math.random()), scale * (.5 + Math.random()), scale * (.5 + Math.random()))
            scene.add(c)
            var d = Math.random() * 60 * scale
            var a = Math.random() * Math.PI * 2
            var tpos = new THREE.Vector3(Math.sin(a) * d, 0, Math.cos(a) * d)
            tpos.add(c.position)
            var d = Math.random() * .5
            TweenLite.to(c.rotation, 1 + d, {delay: 0, x: 15 * (Math.random() - .5), y: 15 * (Math.random() - .5), z: 15 * (Math.random() - .5)})
            TweenLite.to(c.position, 1 + d, {delay: 0, x: tpos.x, z: tpos.z, onUpdate: bounce, onUpdateParams: [c], onComplete: removeFromStage, onCompleteParams: [c]})
            var s = (1 + Math.random()) * scale
            TweenLite.to(c.scale, .7 + d * .7, {delay: 0, x: s, y: s, z: s})
            TweenLite.to(c.scale, .3 + d * .3, {delay: 0 + .7 + d * .7, x: 0.0001, y: 0.0001, z: 0.0001})
        }
    }
    function bounce(c) {
        c.position.y += c.userData.ySpeed
        if (c.userData.ySpeed < 0 && c.position.y < 1 * c.scale.y)
            c.userData.ySpeed = -c.userData.ySpeed * .5
        c.userData.ySpeed -= .1
    }
    function removeAll() {
        while (creatures.length > 0) {
            var creature = creatures[0]

            for (var j = 0; j < creature.meshes.length; j++) {
                scene.remove(creature.meshes[j]);
            }

            //explode(creature.movement.position)

            creatures.shift();
            meshes.shift();
            mods.shift();
            times.shift();
        }
    }

    return {
        init: init,
        update: update,
        setColors: setColors,
        hit: hit,
        spawn: spawn,
        explode: explode,
        crack: crack,
        animate: animate,
        max: max,
        getCreatures: function () {
            return creatures
        },
        findFromRay: findFromRay,
        onRelease: onRelease,
        lastFoodGem: function () {
            return foodGems[foodGems.length - 1]
        },
        foodGems: function () {
            return foodGems
        },
        mousePoint: function () {
            if (mouseControl) {
                return targetPosition;
            }
        },
        removeAll: removeAll,
        hideCrystals: hideCrystals
    }

}();


var VizHandler = function () {

    var camera, scene, renderer, controls, fullscreen = false;
    var mobile;
    var directionalLight;
    var lights = [];
    var usePointLights = false;
    var useDirectionalLights = !usePointLights;
    var resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);
    var postEnabled = false//!isMobile.any;
    var vizParams = {intensity: 0, lightHue: 0, lightMod: 0, tint: 0}
    var timeAddon = 0;
    var sunrise = {y: 1};
    var mod = 0;
    var number, ambient

    var target = {offset: 70, multiplier: 0}

    var baseFBO, shiftFBO, tiltShiftFBO, shiftShader, tiltShiftShader, finalShader, orthoScene, orthoCamera, orthoQuad;
    var mode = 1;

    var oceanAudio = new Audio() 
    oceanAudio.loop = true
    oceanAudio.src  = 'https://demo.marpi.pl/ocean_desert/music/ocean.mp3'
    var desertAudio = new Audio() 
    desertAudio.loop = true
    desertAudio.src  = 'https://demo.marpi.pl/ocean_desert/music/desert.mp3'

    var fog;
    var transitioning = false;

    var firstIntro = true;
    var introCamMod = 0;

    function init() {

        var id = parseInt(window.location.hash.substr(1))
        if (!id)
            id = 1

        GameGlobal.events.on("update", update);
        // var container = document.getElementById('viz')
        //document.body.appendChild(container);

        var container = document.createElement('div');
        document.body.appendChild(container);
        //RENDERER

        renderer = new THREE.WebGLRenderer({canvas: canvas, context: ctx, antialias: true});
        //if (isMobile.any)
        //    renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xFFFFFF)
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap //BasicShadowMap // default THREE.PCFShadowMap
        document.body.appendChild(renderer.domElement);
        //renderer.sortObjects = false;
        container.appendChild(renderer.domElement);
        scene = new THREE.Scene();
        //3D SCENE
        //camera = new THREE.PerspectiveCamera( 70, 800 / 600, 50, 30000 );
        camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 100, 5000);
        camera.position.z = 1060;
        camera.position.y = 350;
        //scene.add(camera);

        //controls = new THREE.TrackballControls(camera);
        controls = new OrbitControls(camera);
        controls.target.set(0, 0, 0);
        //controls.enabled = false;
        controls.autoRotate = true;
        controls.enablePan = false;
        controls.enableZoom = false;
        //controls.minZoom = 2
        //controls.maxZoom = 2
        //controls.enableRotate = false
        controls.enableDamping = true;
        controls.dampingFactor = .2;
        controls.rotateSpeed = .15;
        controls.autoRotateSpeed = .05;
        //controls.minDistance = 3;
        //controls.maxDistance = 3;
        controls.minPolarAngle = Math.PI / 2 - 1
        //controls.maxPolarAngle = Math.PI;
        controls.maxPolarAngle = Math.PI / 2 - 0.5;
        //Assets.init();
        var hue = Math.random()
        fog = new THREE.Fog(new THREE.Color().setHSL(hue, .5, 1), -500, 500)
        fog.hue = hue;
        fog.saturation = .5;
        fog.lightness = 1;
        scene.fog = fog

        var lightsNum = 1
        var lightness = 1
        /*if (isMobile.any) {
         lightsNum = 1
         lightness = 2
         }*/
        ambient = new THREE.AmbientLight(0xaaaaaa)
        scene.add(ambient)

        if (useDirectionalLights) {
            var c = new THREE.Color()
            //c.setHSL(i / 10, 1, .7)
            directionalLight = new THREE.DirectionalLight(new THREE.Color().setHSL(Math.random(), .7, .5), lightness);
            directionalLight.position.x = -.6
            directionalLight.position.z = .3
            directionalLight.position.y = 1
            directionalLightOrg.copy(directionalLight.position)
            directionalLight.hue = hue;
            directionalLight.saturation = .5;
            directionalLight.lightness = 1;

            directionalLight.castShadow = true;
            //directionalLight.shadowDarkness = .1
            var roz = 200
            directionalLight.shadow.camera.near = -roz * 2
            directionalLight.shadow.camera.far = roz * 20
            directionalLight.shadow.camera.left = -roz * 2
            directionalLight.shadow.camera.right = roz * 2
            directionalLight.shadow.camera.top = roz * 2
            directionalLight.shadow.camera.bottom = -roz * 2
            directionalLight.shadow.mapSize.width = 1024;
            directionalLight.shadow.mapSize.height = 1024;
            directionalLight.shadow.bias = 0//-0.0001
            scene.add(directionalLight);
            lights.push(directionalLight)

            //var helper=new THREE.CameraHelper( directionalLight.shadow.camera )
            //scene.add(helper)

        }
        if (usePointLights) {
            var geom = new THREE.BoxGeometry(1, 1, 1)
            for (var i = 0; i < 2; i++) {
                var c = new THREE.Color()
                var light = new THREE.PointLight(c, 1, 7000);
                light.castShadow = true;
                light.shadow.bias = 0.1;
                light.shadow.mapSize.width = 1024;
                light.shadow.mapSize.height = 1024;
                //scene.add(light);

                var sphere = new THREE.Mesh(geom, new THREE.MeshBasicMaterial({color: c}))
                sphere.add(light)
                scene.add(sphere)

                lights.push(sphere)
            }
        }
        //scene.add(new THREE.CameraHelper(directionalLight.shadow.camera))

        //scene.add(new THREE.AmbientLight(0x333126));

        //var hemiLight = new THREE.HemisphereLight(0, 0xffffff, .3);
        //hemiLight.color.setHSL(0.6, 1, 0.6);
        //hemiLight.groundColor.setHSL(0.095, 1, 0.75);
        //scene.add(hemiLight);

        //var helper = new THREE.CameraHelper(directionalLight.shadow.camera);
        //scene.add(helper);

        var activeViz = [Shards, Mecha, Birds, Forest]//MechaMerged,, MechaMerged,//Shards, Titles,  Mecha, SequencerVisual, Forest

        var activeVizCount = activeViz.length;
        for (var j = 0; j < activeVizCount; j++) {
            activeViz[j].init(mode);
        }


        //window.addEventListener('deviceorientation', setOrientationControls, true);

        if (postEnabled)
            initPostprocessing()

        window.requestAnimationFrame(dayNight);
    }

    function show(name) {
        number = {random: new Math.seedrandom(name)};
        mod = number.random()
    }

    function initPostprocessing() {
        /*// Setup render pass
         var renderPass = new THREE.RenderPass(scene, camera);
         effectComposer = new THREE.EffectComposer(renderer);
         
         // Setup depth pass
         depthMaterial = new THREE.MeshDepthMaterial();
         depthMaterial.depthPacking = THREE.RGBADepthPacking;
         depthMaterial.side = THREE.DoubleSide
         depthMaterial.blending = THREE.NoBlending;
         depthMaterial.skinning = true
         
         var pars = {minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, stencilBuffer: false};
         depthRenderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, pars);
         
         // Setup Anti Aliasing pass
         //msaaRenderPass = new THREE.ManualMSAARenderPass(scene, camera);
         //msaaRenderPass.unbiased = false;
         //msaaRenderPass.sampleLevel = 2;
         
         // Setup Ambient Occlusion pass
         ssaoPass = new THREE.ShaderPass(THREE.SSAOShader);
         ssaoPass.renderToScreen = true;
         ssaoPass.uniforms[ 'tDepth' ].value = depthRenderTarget.texture;
         ssaoPass.uniforms[ 'size' ].value.set(window.innerWidth, window.innerHeight);
         ssaoPass.uniforms[ 'cameraNear' ].value = camera.near;
         ssaoPass.uniforms[ 'cameraFar' ].value = camera.far;
         ssaoPass.uniforms[ 'onlyAO' ].value = false;
         ssaoPass.uniforms[ 'aoClamp' ].value = 1.0;
         ssaoPass.uniforms[ 'lumInfluence' ].value = 0.7;
         
         effectComposer.addPass(renderPass);
         // effectComposer.addPass(msaaRenderPass);
         effectComposer.addPass(ssaoPass);*/

        baseFBO = createRenderTarget();
        shiftFBO = createRenderTarget();
        tiltShiftFBO = createRenderTarget();
        shiftShader = new THREE.RawShaderMaterial({
            uniforms: {
                inputTexture: {type: 't', value: baseFBO.texture},
                pixelRatio: {type: 'f', value: window.devicePixelRatio},
                resolution: {type: 'v2', value: resolution},
            },
            vertexShader: document.getElementById('ortho-vs').textContent,
            fragmentShader: document.getElementById('shift-fs').textContent,
        });
        tiltShiftShader = new THREE.RawShaderMaterial({
            uniforms: {
                inputTexture: {type: 't', value: shiftFBO.texture},
                resolution: {type: 'v2', value: new THREE.Vector2()},
                blur: {type: 'f', value: 1},
            },
            vertexShader: document.getElementById('ortho-vs').textContent,
            fragmentShader: document.getElementById('tilt-shift-fs').textContent,
        });
        finalShader = new THREE.RawShaderMaterial({
            uniforms: {
                inputTexture: {type: 't', value: tiltShiftFBO.texture},
                resolution: {type: 'v2', value: resolution},
                pixelRatio: {type: 'f', value: window.devicePixelRatio},
                boost: {type: 'f', value: 1.3},
                reduction: {type: 'f', value: .9},
                amount: {type: 'f', value: .05},
                time: {type: 'f', value: 0}
            },
            vertexShader: document.getElementById('ortho-vs').textContent,
            fragmentShader: document.getElementById('final-fs').textContent,
        });
        orthoScene = new THREE.Scene();
        orthoCamera = new THREE.OrthographicCamera(1 / -2, 1 / 2, 1 / 2, 1 / -2, .00001, 1000);
        orthoQuad = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1), finalShader);
        orthoScene.add(orthoQuad);
    }
    function createRenderTarget() {

        return new THREE.WebGLRenderTarget(1, 1, {
            wrapS: THREE.ClampToEdgeWrapping,
            wrapT: THREE.ClampToEdgeWrapping,
            format: THREE.RGBAFormat,
            stencilBuffer: false,
            depthBuffer: true
        });
    }

    function setOrientationControls(e) {
        if (!e.alpha) {
            return;
        }

        controls.enabled = false
        controls = new THREE.DeviceOrientationControls(camera, true);
        controls.connect();
        controls.update();
        window.removeEventListener('deviceorientation', setOrientationControls, true);
        if (renderer.domElement) {
            renderer.domElement.addEventListener('click', function () {

                if (this.requestFullscreen) {
                    this.requestFullscreen();
                } else if (this.msRequestFullscreen) {
                    this.msRequestFullscreen();
                } else if (this.mozRequestFullScreen) {
                    this.mozRequestFullScreen();
                } else if (this.webkitRequestFullscreen) {
                    this.webkitRequestFullscreen();
                }
                fullscreen = true;
            });
            mobile = true;
        }
    }

    function animateCamera(up) {
        if (up) {
//TweenLite.to(targetAddon, .5 * 60, {y: 600, useFrames: true})
//TweenLite.to(camera.position, .5 * 60, {x: 0, z: 760, y: 250, useFrames: true})
            TweenLite.to(lights[0], .45, {delay: .4, intensity: 0})
            if (lights[1])
                TweenLite.to(lights[1], .45, {delay: .4, intensity: 0})
            TweenLite.to(sunrise, .9, {y: 0, intensity: 0})
        } else {
//TweenLite.to(targetAddon, .5 * 60, {y: 0, useFrames: true})
//TweenLite.to(camera.position, .5 * 60, {x: 0, z: 760, y: 250, useFrames: true})
            TweenLite.to(lights[0], 1 * 60, {intensity: 1, useFrames: true})
            if (lights[1])
                TweenLite.to(lights[1], 1 * 60, {intensity: 1, useFrames: true})
            TweenLite.to(sunrise, .85 * 60, {y: 1, useFrames: true})
        }
    }

    function zoomOut() {
        //console.log(camera)
        //var time = 0
        ///TweenLite.to(camera.position, time, {delay: 1, z: 1060, y: 350, ease: Expo.easeInOut, onComplete: function () {
        //        controls.enabled = true
        //    }})
        //TweenLite.to(controls, time, {delay: 1, maxPolarAngle: Math.PI / 2 - 0.2, ease: Expo.easeInOut})
    }

    function dayNight() {

        if (transitioning)
            return;
        transitioning = true;
        //TweenLite.to(directionalLight.color, 1, {r: .2, g: .2, b: 1})
        //TweenLite.to(crystal.scale, .3, {x: 0.01, y: 0.01, z: 0.01, ease: Back.easeIn})
        /*var num = Math.floor(Math.random() * 5) + 1
         var place = "desert";
         if (VizHandler.getMode() == 1)
         place = "underwater"
         var sound = new Audio('music/pling_' + place + num + '.mp3');
         sound.play();*/

        Mecha.hideCrystals();
        //TweenLite.to(directionalLight, 1, {intensity: 0})
        TweenLite.to(ambient, 1, {intensity: 0})
        TweenLite.to(directionalLight.position, 1, {x: -.7, z: .4})
        TweenLite.delayedCall(1, regenerate)
        TweenLite.to(fog, 1, {near: -500, far: 500, hue: Math.random(), onUpdate: updateFog})
        //console.log(fog)
    }

    function updateFog() {
        fog.color = new THREE.Color().setHSL(fog.hue, fog.saturation, fog.lightness)
    }

    function regenerate() {

        number = {random: new Math.seedrandom(track)};
        var track = Math.random();
        Forest.rebuild(number.random());
        Shards.reload(ground, ground2);
        var faunaPerc = Math.random()

        Birds.initBoids(1 - faunaPerc);
        Mecha.removeAll();
        var ground = number.random();
        var ground2 = number.random();
        Mecha.setColors(ground, ground2);

        var max = 60 * faunaPerc
        if (isMobile.phone)
            max = 45 * faunaPerc

        for (var i = 0; i < max; i++) {
            var roz = 700
            var id = number.random()
            Mecha.spawn((number.random() - .5) * roz, 0, (number.random() - .5) * roz, id);
        }
        VizHandler.show(track);
        VizHandler.zoomOut();

        if (oceanAudio.paused && location.hash.substr(1)=="") {
            introCamMod = 130;
        } else {
            introCamMod = 0;
        }

        mode = 1 - mode;

        window.requestAnimationFrame(animateOut);
    }

    function animateOut() {
        var delay = 0;
        if (firstIntro) {
            delay = 1;
        }

        directionalLightMod.x = 0
        directionalLightMod.z = 0

        var perc = mode;
        TweenLite.to(oceanAudio, 1, {volume: perc})
        TweenLite.to(desertAudio, 1, {volume: 1 - perc})
        TweenLite.to(ambient, 1, {intensity: 1})
        if (!oceanAudio.paused || !firstIntro || location.hash.substr(1)!="") {
            if (mode == 1) {
                TweenLite.to(target, .1, {multiplier: 1})
                TweenLite.to(directionalLight, 1, {intensity: 1, hue: Math.random(), saturation: .7, lightness: .5, onUpdate: updateLight})
                TweenLite.to(directionalLightOrg, 1, {x: -.7, z: .4})
                TweenLite.to(fog, 1, {near: 900, far: 2000, hue: Math.random(), saturation: .5, lightness: .7, onUpdate: updateFog, onComplete: function () {
                        transitioning = false
                    }})
            } else {
                TweenLite.to(target, .1, {multiplier: .3})
                TweenLite.to(directionalLight, 1 + delay, {intensity: 1, hue: Math.random(), saturation: .5, lightness: .8, onUpdate: updateLight})
                TweenLite.to(directionalLightOrg, 1 + delay, {x: -.6, z: .3})
                TweenLite.to(fog, 1 + delay * 2, {delay: delay, near: 1000, far: 2200, hue: Math.random(), saturation: .5, lightness: .7, onUpdate: updateFog, onComplete: function () {
                        transitioning = false
                    }})
            }
        } else {
            transitioning = false
            mode = 1 - mode;
        }

        firstIntro = false;
    }

    function updateLight() {
        directionalLight.color = new THREE.Color().setHSL(directionalLight.hue, directionalLight.saturation, directionalLight.lightness)
        //console.log(directionalLight.color)
    }

    var directionalLightMod = new THREE.Vector3();
    var directionalLightOrg = new THREE.Vector3();

    function update() {
        var time = Date.now() * 0.0001

        directionalLight.position.copy(directionalLightOrg)
        if (mode == 1) {
            directionalLightMod.x = Math.sin(time * 5 + 2.4) * .3;
            directionalLightMod.z = Math.sin(time * 5 * 1.3) * .3;
            directionalLight.position.x += Math.floor(256 * directionalLightMod.x) / 256
            directionalLight.position.z += Math.floor(256 * directionalLightMod.z) / 256
        }


//camera.position.z = 560 * (.6 + .40 * Math.sin(time * 2.7));
//camera.position.y = 480 * (.7 + .30 * Math.sin(time * 4.5));

//controls.target.y = -80 * (.7 + .30 * Math.sin(time * 4.5));

        controls.autoRotateSpeed = Math.sin(time) / 40 * target.multiplier;
        controls.target.set(Math.sin(time) * 10 * target.multiplier, Math.sin(time * 2.12) * 10 * target.multiplier + 20 - 70 + introCamMod, Math.sin(time * 1.245 + 2) * 10 * target.multiplier)
        camera.lookAt(controls.target)
        controls.update();
        /*if (Math.random() < vizParams.intensity * .15) {
         timeAddon = Math.random()
         TweenLite.to(vizParams, 0, {lightMod: Math.random()})
         TweenLite.to(vizParams, 1, {lightMod: 0})
         }*/

        /*var s = .9 * (1 - vizParams.intensity) + .1 * vizParams.tint
         var l = .8 - .05 * vizParams.tint
         l *= 1 - vizParams.intensity * vizParams.lightMod;
         
         lights[0].color.setHSL(vizParams.lightHue, s, l)
         if (lights[1])
         lights[1].color.setHSL(vizParams.lightHue - .1, s, l)*/

        if (postEnabled) {
            tiltShiftShader.uniforms.blur.value = 1 + vizParams.tint;
            finalShader.uniforms.amount.value = 0.05 + vizParams.intensity * .05
            finalShader.uniforms.boost.value = 1.3 + vizParams.intensity * .6
            finalShader.uniforms.reduction.value = 1.3 + vizParams.intensity * 1
        }


        var time = Date.now() * 0.0001// + timeAddon * Math.PI * 2;
        var pos = camera.position.clone().normalize()
        //pos.x = 0
        //pos.z/=2
        for (var i = 0; i < lights.length; i++) {
            var light = lights[i]
            //light.position.copy(pos)

        }


        if (!postEnabled) {
            renderer.render(scene, camera);
            /*scene.overrideMaterial = depthMaterial;
             renderer.render(scene, camera, depthRenderTarget, true);
             scene.overrideMaterial = null;
             effectComposer.render();*/
        } else {
            renderer.render(scene, camera, baseFBO);
            orthoQuad.material = shiftShader;
            renderer.render(orthoScene, orthoCamera, shiftFBO);
            orthoQuad.material = tiltShiftShader;
            renderer.render(orthoScene, orthoCamera, tiltShiftFBO);
            finalShader.uniforms.time.value = 0.00001 * performance.now();
            orthoQuad.material = finalShader;
            renderer.render(orthoScene, orthoCamera);
        }
        /*if (useDirectionalLights) {
         
         var roz = camera.position.distanceTo(scene.position) * .15;
         directionalLight.shadow.camera.near = -roz * 2
         directionalLight.shadow.camera.far = roz * 2
         directionalLight.shadow.camera.left = -roz
         directionalLight.shadow.camera.right = roz
         directionalLight.shadow.camera.top = roz
         directionalLight.shadow.camera.bottom = -roz
         directionalLight.shadow.camera.updateProjectionMatrix()
         }*/

        /*var screenNum=3;
         var width=window.innerWidth
         var height=window.innerHeight
         for (var i = 0; i < screenNum; i++) {
         renderer.setViewport(i * width / screenNum, 0, width / screenNum + 1, height);
         
         //camera.position.set(cameraPosition.x + cameraDiff.x, cameraPosition.y + cameraDiff.y, cameraPosition.z + cameraDiff.z)
         
         renderer.render(scene, camera);
         
         }*/

//renderer.render(scene, camera);
    }


    function onResize() {

        /*camera.aspect = window.innerWidth / window.innerHeight;
         camera.updateProjectionMatrix();
         
         renderer.setSize(window.innerWidth, window.innerHeight);*/

        var w = window.innerWidth;
        var h = window.innerHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        if (postEnabled) {
            var dPR = window.devicePixelRatio;
            resolution.set(w * dPR, h * dPR);
            baseFBO.setSize(w * dPR, h * dPR);
            shiftFBO.setSize(w * dPR, h * dPR);
            tiltShiftFBO.setSize(w * dPR, h * dPR);
            orthoQuad.scale.set(w, h, 1);
            orthoCamera.left = -w / 2;
            orthoCamera.right = w / 2;
            orthoCamera.top = h / 2;
            orthoCamera.bottom = -h / 2;
            orthoCamera.updateProjectionMatrix();
        }
    }

    return {
        init: init,
        update: update,
        getCamera: function () {
            return camera;
        },
        getScene: function () {
            return scene;
        },
        getLight: function () {
            return directionalLight;
        },
        getRenderer: function () {
            return renderer;
        },
        getCubeCameras: function () {
            return [cubeCameraRead, cubeCameraWrite]
        },
        getControls: function () {
            return controls;
        },
        onResize: onResize,
        isFullscreen: function () {
            return fullscreen;
        },
        isMobile: function () {
            return mobile;
        },
        setLightColors: function (r) {
            TweenLite.to(vizParams, 0, {lightHue: r})
        },
        setIntensity: function (r) {
            TweenLite.to(vizParams, 0, {intensity: r})
        },
        setColors: function (r) {
            TweenLite.to(vizParams, 0, {tint: r})
        },
        animateCamera: animateCamera,
        show: show,
        zoomOut: zoomOut,
        dayNight: dayNight,
        getMode: function () {
            return mode;
        },
        playMusic: function () {
            oceanAudio.play();
            desertAudio.play();
        }
    };
}();

module.exports = VizHandler