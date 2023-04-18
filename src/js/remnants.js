import * as THREE from 'three';
import {GLTFLoader} from 'three/GLTFLoader.js';
import {PointerLockControls} from 'three/PointerLockControls.js';
import {Water2} from 'three/Water2.js';
import {assets} from './_config.js';

let camera, scene, renderer, controls, object, videoScreen, videoTexture, path;

let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const up = new THREE.Vector3(0, 0, 1);
const axis = new THREE.Vector3();
let fraction = 0;

let sceneReady = false, exitRoom = false;

const urlParams = new URLSearchParams(window.location.search);
let roomNumb = parseInt(urlParams.get('room')) > assets.length ? '0' : parseInt(urlParams.get('room')) <= assets.length ? parseInt(urlParams.get('room')) : 0;
let door;

const loading = document.getElementById('loading');
const overlay = document.getElementById('overlay');
const title = document.getElementById('title');

let objID = [], objInfo = [];
let playVideos = [], playSounds = []; let playing = false;
let screensToPath = [], paths = [];
let modelRotation = [];
let leifangSounds = [], leifangID = [];
let leifang_X, leifang_Y, leifang_Z;

const darkGrey = new THREE.Color(0x1A1A1A).convertSRGBToLinear();
const medGrey = new THREE.Color(0x404040).convertSRGBToLinear();
const white = new THREE.Color(0xffffff).convertSRGBToLinear();
const waterColour = new THREE.Color(0x001e0f);

const userHeight = 10;

function setupScene () {

    // Scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 4000);

    scene.background = darkGrey;
    scene.fog = new THREE.FogExp2(scene.background, 0.003);

    // Controls
    controls = new PointerLockControls(camera, document.body);
    controls.getObject().position.set(0, userHeight, 0);
    controls.addEventListener('lock', function () {
        overlay.style.display = 'none';
    });
    controls.addEventListener('unlock', function () {
        overlay.style.display = 'block';
    });
    overlay.addEventListener('click', function () {
        if (sceneReady) {
            controls.lock();
            playSoundsVideos();
        }
    }, false);
    scene.add(controls.getObject());

    const onKeyDown = function (event) {
        switch (event.code) {
            case 'ArrowUp': case 'KeyW': moveForward = true; break;
            case 'ArrowLeft': case 'KeyA': moveLeft = true; break;
            case 'ArrowDown': case 'KeyS': moveBackward = true; break;
            case 'ArrowRight': case 'KeyD': moveRight = true; break;
        }
    };

    const onKeyUp = function (event) {
        switch (event.code) {
            case 'ArrowUp': case 'KeyW': moveForward = false; break;
            case 'ArrowLeft': case 'KeyA': moveLeft = false; break;
            case 'ArrowDown': case 'KeyS': moveBackward = false; break;
            case 'ArrowRight': case 'KeyD': moveRight = false; break;
        }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    // Renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true, 
        alpha: true
    });
    renderer.compile(scene, camera);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize);

    // Lighting
    const ambLight = new THREE.AmbientLight(medGrey);
    scene.add(ambLight);

    const hemLight = new THREE.HemisphereLight(white, darkGrey);
    scene.add(hemLight);

    const flashlight = new THREE.SpotLight(white, 1, 100);
    camera.add(flashlight);
    flashlight.position.set(0,0,1);
    flashlight.target = camera;

    // Water
    const waterGeometry = new THREE.PlaneGeometry(5000, 5000);
    const water = new Water2(waterGeometry, {
        color: waterColour,
        scale: 10,
        flowDirection: new THREE.Vector2(1, 1),
        textureWidth: 1024,
        textureHeight: 1024
    });
    water.renderOrder = 1;
    water.position.y = -10;
    water.rotation.x = -Math.PI / 2;
    scene.add(water);

    sceneReady = true;
    exitRoom = true;

    overlay.classList.remove('loading');
}

function loadAssets() {
    const currentRoom = assets[roomNumb];
    const manager = new THREE.LoadingManager();

    for (let i = 0; i < currentRoom.length; i++) {
        if (currentRoom[i].type === "door") {

            const obj = currentRoom[i];

            const doorGeometry = new THREE.BoxGeometry(50, 75, 25);
            const doorMaterial = new THREE.MeshBasicMaterial({
                color: 0xffff00,
                side: THREE.DoubleSide
            });
            door = new THREE.Mesh(doorGeometry, doorMaterial);
            door.position.set(obj.x, 10, obj.y);
            scene.add(door);
        }
    }

    // Audio Loader
    const audioLoader = new THREE.AudioLoader(manager);
    const audioListener = new THREE.AudioListener();
    camera.add(audioListener);

    // Load Models
    const loader = new GLTFLoader(manager);
    for (let i = 0; i < currentRoom.length; i++) {
        if (currentRoom[i].type === "glb") {

            const obj = currentRoom[i];
            loader.load(
                
                obj.src, 
                
                function (glb) {

                object = glb.scene;
                object.position.set(obj.x, obj.y, obj.z);
                object.scale.set(obj.scale, obj.scale, obj.scale);
                scene.add(object);
                
                if (obj.id !== "scene") {
                    for (var i in object.children) {
                        objID.push(object.children[i].id);
                        objInfo.push([
                            object.children[i].id,
                            `
                                <span class="artist">${obj.artist}</span><br>
                                <i>${obj.title}</i>, 2022<br>
                                <span class="info">${obj.info}</span>
                            `
                        ])
                    }
                }
    
                if (obj.id === "SpeculativeGeologies") {
                    modelRotation.push(object);
                }
    
                if (obj.id === "Lęïfańg") {
                    for (var i in object.children) {
                        leifangID.push(object.children[i].id);
                    }
                    for (i = 0; i < 5; i++) {
                        const sound = new THREE.PositionalAudio(audioListener);
                        audioLoader.load(`assets/sounds/leifang/${i + 1}.mp3`, function (buffer) {
                            sound.setBuffer(buffer);
                            sound.setLoop(false);
                            sound.setRefDistance(3);
                            sound.setVolume(2);
                            sound.setDirectionalCone(360, 360, 0);
                        });
    
                        leifangSounds.push(sound);
                        object.add(sound);
                    }
                }
            })
        }
    }

    // Load Videos
    for (let i = 0; i < currentRoom.length; i++) {
        if (currentRoom[i].type === "video") {

            const obj = currentRoom[i];

            const video = document.createElement('video');
            video.src = obj.src; video.id = obj.id;
            video.width = obj.width; video.height = obj.height;
            video.style.display = "none"; video.loop = true;
            video.playsInline = true; video.muted = true; video.preload = true;
            videoTexture = new THREE.VideoTexture(video);
            videoTexture.encoding = THREE.sRGBEncoding
            videoScreen = new THREE.Mesh(
                obj.geometry,
                new THREE.MeshStandardMaterial({
                    map: videoTexture,
                    side: THREE.DoubleSide,
                    emissive: white,
                    emissiveIntensity: 1,
                    emissiveMap: videoTexture,
                    transparent: obj.transparency,
                    opacity: 1
                })
            );
            videoScreen.position.set(obj.x, obj.y, obj.z);
            videoScreen.renderOrder = 2;
    
            if (obj.id === "Christoph") {
                videoScreen.rotation.y = Math.PI / 2;
            }
    
            if (obj.audio) {
                const sound = new THREE.PositionalAudio(audioListener);
                audioLoader.load(obj.audio, function (buffer) {
                    sound.setBuffer(buffer);
                    sound.setLoop(true);
                    sound.setRefDistance(obj.ref);
                    sound.setVolume(obj.volume);
                    sound.setDirectionalCone(360, 360, 0);
                });

                playSounds.push(sound);
                videoScreen.add(sound);
            }

            scene.add(videoScreen);
            playVideos.push(video);

            if (obj.title === "Corpse") {
                screensToPath.push(videoScreen);
                path = obj.line;
                paths.push(path)
            }
    
            objID.push(videoScreen.id);
            objInfo.push(
                [videoScreen.id, 
                    `
                    <span class="artist">${obj.artist}</span><br>
                    <i>${obj.title}</i>, 2022<br>
                    <span class="info">${obj.info}</span>
                    `
                ]
            );

            document.getElementById('videos').appendChild(video);
        }
    };

    // Load Images
    for (let i = 0; i < currentRoom.length; i++) {
        if (currentRoom[i].type === "image") {

            const obj = currentRoom[i];

            let texture = new THREE.TextureLoader(manager).load(obj.src);
            texture.encoding = THREE.sRGBEncoding;
            const geometry = new THREE.BoxGeometry(20, 35, 1);
            const material = new THREE.MeshBasicMaterial({map: texture});
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set((i * 25) + -270 , 11, -227);
    
            scene.add(cube);
    
            objID.push(cube.id);
            objInfo.push(
                [cube.id, 
                    `
                    <span class="artist">${obj.artist}</span><br>
                    <i>${obj.title}</i>, 2022<br>
                    <span class="info">${obj.info}</span>
                    `
                ]
            )
        }
    };

    // Draw Paths
    for (let i = 0; i < currentRoom.length; i++) {
        if (currentRoom[i].title === "Corpse") {

            let path = currentRoom[i].line;
            let colour = currentRoom[i].colour;
            let vertices = path.getSpacedPoints(80);
            const line = new THREE.Line(
                new THREE.BufferGeometry().setFromPoints(vertices), 
                new THREE.LineBasicMaterial({color: colour, visible: true}));
            scene.add(line);
        }
    };
}

function playSoundsVideos() {
    if (!playing) {
        for (let i = 0; i < playVideos.length; i++) {
            playVideos[i].play();
        }
        for (let i = 0; i < playSounds.length; i++) {
            console.log(playSounds)
            playSounds[i].play();
        }
    }
    playing = true;
}

function playLeifangSound() {
    for (let i = 0; i < leifangSounds.length; i++) {
        leifangSounds[i].position.set(leifang_X, leifang_Y, leifang_Z);
    }
    let numb = Math.floor(Math.random() * leifangSounds.length);
    leifangSounds[numb].play();
}

function animate() {
    requestAnimationFrame(animate);

    if (controls.isLocked === true) {
        // Display captions
        let objIntersections = (new THREE.Raycaster(
            camera.position, 
            camera.getWorldDirection(new THREE.Vector3()))).intersectObjects(scene.children, true);

        if (objIntersections[0] && objID.indexOf(objIntersections[0].object.id) !== -1) {
            for (let i = 0; i < objInfo.length; i++) {
                if (objIntersections[0].object.id === objInfo[i][0]) {
                    document.querySelector('#artwork-caption p').innerHTML = objInfo[i][1];
                }
            }
            document.getElementById('artwork-caption').style.display = 'block';
        } else {
            document.getElementById('artwork-caption').style.display = 'none';
        }

        // Play leifang sounds - rewrite this
        if (objIntersections[0] && leifangID.indexOf(objIntersections[0].object.id) !== -1) {
            leifang_X = objIntersections[0].object.position.x;
            leifang_Y = objIntersections[0].object.position.y;
            leifang_Z = objIntersections[0].object.position.z;
            document.addEventListener('click', playLeifangSound);
        } else {
            document.removeEventListener('click', playLeifangSound);
        }

        // Transport to the next room
        if (camera.position.z >= door.position.z - 20 && camera.position.z <= door.position.z + 20 
            && camera.position.x >= door.position.x - 45 && camera.position.x <= door.position.x + 45) {
            controls.unlock();
            overlay.classList.add('fade');
            loading.classList.remove('fade');
            if ((roomNumb + 1) === assets.length) {
                roomNumb = 0;
            } else {
                roomNumb++;
            }
            setTimeout(function () {
                window.location.href = `/?room=${roomNumb}`;
            }, 1200)
        }

        // Controls
        const time = performance.now();
        const delta = (time - prevTime) / 1000;
        velocity.x -= velocity.x * 5.0 * delta;
        velocity.z -= velocity.z * 5.0 * delta;
        direction.z = Number(moveForward) - Number(moveBackward);
        direction.x = Number(moveRight) - Number(moveLeft);
        direction.normalize();
        if (moveForward || moveBackward) velocity.z -= direction.z * 200.0 * delta;
        if (moveLeft || moveRight) velocity.x -= direction.x * 200.0 * delta;
        controls.moveRight(-velocity.x * delta);
        controls.moveForward(-velocity.z * delta);
        prevTime = time;
    }

    // Move screen along path
    for (let i = 0; i < screensToPath.length; i++) {
        const position = paths[i].getPoint(fraction);
        const tangent = paths[i].getTangent(fraction);
        screensToPath[i].position.copy(position);
        axis.crossVectors(up, tangent).normalize();
        const radians = Math.acos(up.dot(tangent));
        screensToPath[i].quaternion.setFromAxisAngle(axis, radians);
    }

    // Corpse video movement speed
    fraction += 0.00001;
    if (fraction > 1) {
        fraction = 0;
    }

    // Model rotation - change this to model animations
    for (let i = 0; i < modelRotation.length; i++) {
        let speed = 0.003;
        modelRotation[i].rotation.y += speed;
    }

    if (videoTexture) {
        videoTexture.needsUpdate = true;
    }

    document.querySelector('.co-ord').innerHTML = Math.round(controls.getObject().position.x) + ", " + Math.round(controls.getObject().position.z);

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.onload = function() {
    setupScene();
    loadAssets();
    setTimeout(animate, 1000);
    setTimeout(function() {
        loading.classList.add('fade');
        if (roomNumb !== 0) {
            controls.lock()
        }
    }, 1000);

    console.log(`Room ${roomNumb}: Ready`);
}