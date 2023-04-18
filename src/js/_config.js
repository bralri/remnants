import * as THREE from 'three';
import {variables} from './_variables.js';

const v = variables[0];
const scale = 1;
const vol = 1;

export const assets = [
    // room 0 - Entrance
    [
        // Portal
        {
            type: "door",
            x: 0, y: -930
        },
        // Scene - Lane
        {
            type: "glb",
            id: "scene",
            src: v.laneGLB,
            x: 0, y: 0, z: 0,
            o: 1, t: false, scale: scale
        }
    ],
    // room 1 - Alex Pearl and Speculative Geologies
    [
        // Portal
        {
            type: "door",
            x: 0, y: -930
        },
        // Speculative Geologies
        {
            type: "glb",
            id: "SpeculativeGeologies",
            src: v.geo57GLB,
            artist: "Speculative Geologies by Jason Urban & Leslie Mutchler",
            title: "A rock or mineral that translates languages",
            info: "3D Model",
            x: 200, y: 8, z: -100,
            o: 1, t: false, scale: scale
        },
        {
            type: "glb",
            id: "SpeculativeGeologies",
            src: v.geo57fGLB,
            artist: "Speculative Geologies by Jason Urban & Leslie Mutchler",
            title: "A rock or mineral that can highlight relevant texts",
            info: "3D Model",
            x: 100, y: 8, z: -100,
            o: 1, t: false, scale: scale
        },
        {
            type: "glb",
            id: "SpeculativeGeologies",
            src: v.geo63ccGLB,
            artist: "Speculative Geologies by Jason Urban & Leslie Mutchler",
            title: "A rock or mineral that accumulates oils, smudges, and fingerprints",
            info: "3D Model",
            x: 0, y: 8, z: -100,
            o: 1, t: false, scale: scale
        },
        {
            type: "glb",
            id: "SpeculativeGeologies",
            src: v.geo51GLB,
            artist: "Speculative Geologies by Jason Urban & Leslie Mutchler",
            title: "A rock or mineral triangulates locations",
            info: "3D Model",
            x: -100, y: 8, z: -100,
            o: 1, t: false, scale: scale
        },
        {
            type: "glb",
            id: "SpeculativeGeologies",
            src: v.geo60aaGLB,
            artist: "Speculative Geologies by Jason Urban & Leslie Mutchler",
            title: "A rock or mineral that generates images",
            info: "3D Model",
            x: -200, y: 8, z: -100,
            o: 1, t: false, scale: scale
        },
        // Alex Pearl
        {
            type: "video",
            id: "Long",
            src: v.longWEBM,
            audio: v.longMP3,
            width: 1080, height: 1620,
            artist: "Alex Pearl",
            title: "Corpse",
            info: "Digital collage",
            geometry: new THREE.PlaneGeometry(20, 40),
            transparency: true,
            volume: vol, ref: 1,
            line: new THREE.CatmullRomCurve3([
                new THREE.Vector3(660, 5, 690),
                new THREE.Vector3(890, 5, 160),
                new THREE.Vector3(1210, 5, 240),
                new THREE.Vector3(980, 5, 440),
                new THREE.Vector3(730, 5, 430),
                new THREE.Vector3(500, 5, 110),
                new THREE.Vector3(90, 5, 170),
                new THREE.Vector3(-130, 5, 530),
                new THREE.Vector3(50, 5, 760),
                new THREE.Vector3(450, 5, 960)
            ], true, "centripetal"),
            colour: new THREE.Color(0xECFF00)
        },
        {
            type: "video",
            id: "Picnic",
            src: v.picnicWEBM,
            audio: v.picnicMP3,
            width: 1080, height: 1620,
            artist: "Alex Pearl",
            title: "Corpse",
            info: "Digital collage",
            geometry: new THREE.PlaneGeometry(15, 30),
            transparency: true,
            volume: vol, ref: 1,
            line: new THREE.CatmullRomCurve3([
                new THREE.Vector3(-700, 3, -700),
                new THREE.Vector3(-680, 3, -490),
                new THREE.Vector3(-520, 3, -380),
                new THREE.Vector3(-150, 3, -170),
                new THREE.Vector3(-300, 3, -20),
                new THREE.Vector3(-760, 3, -60),
                new THREE.Vector3(-950, 3, -235),
                new THREE.Vector3(-1110, 3, -540),
                new THREE.Vector3(-890, 3, -770)
            ], true, "centripetal"),
            colour: new THREE.Color(0xFF0000)
        },
        {
            type: "video",
            id: "Heat",
            src: v.heatWEBM,
            audio: v.heatMP3,
            width: 1080, height: 1620,
            artist: "Alex Pearl",
            title: "Corpse",
            info: "Digital collage",
            geometry: new THREE.PlaneGeometry(15, 30),
            transparency: true,
            volume: vol, ref: 1,
            line: new THREE.CatmullRomCurve3([
                new THREE.Vector3(230, 2, -470),
                new THREE.Vector3(870, 2, -840),
                new THREE.Vector3(1040, 2, -480),
                new THREE.Vector3(620, 2, -80),
                new THREE.Vector3(330, 2, -80),
                new THREE.Vector3(170, 2, -340)
            ], true, "centripetal"),
            colour: new THREE.Color(0x0000FF)
        }
    ],
    // Room 2 - Christoph
    [
        // Portal
        {
            type: "door",
            x: -120, y: -250
        },
        // Scene - Underpass
        {
            type: "glb",
            id: "scene",
            src: v.underpassBlueGLB,
            x: 0, y: 0, z: 0,
            o: 1, t: false, scale: scale
        },
        {
            type: "video",
            id: "Christoph",
            src: v.christophM4V,
            audio: v.christophMP3,
            width: 720, height: 480,
            artist: "Christoph Jones",
            title: "The Void, Suicide and The Sorrowing of Man",
            info: "CW// Contains discussions of suicide, death and depression",
            geometry: new THREE.BoxGeometry(2, 35, 60),
            transparency: true,
            x: -50, y: 20, z: -730,
            volume: vol, ref: 1
        }
    ],
    // Room 3 - Lęïfańg
    [
        // Portal
        {
            type: "door",
            x: 250, y: -50
        },
        // Scene - Aquaduct
        {
            type: "glb",
            id: "scene",
            src: v.aquaductGLB,
            x: 0, y: 0, z: 0,
            o: 1, t: false, scale: scale
        },
        // Pearls
        {
            type: "glb",
            id: "Lęïfańg",
            src: v.pearlsGLBnew,
            artist: "Katherine Platts & Phoebe Bray",
            title: "Lęïfańg",
            info: "Click to listen to the Lęïfańg",
            x: 0, y: 0, z: 0,
            o: 1, t: false, scale: scale
        },
        {
            type: "image",
            id: "Lęïfańg",
            src: v.leifangImage1,
            artist: "Katharine Platts & Phoebe Bray",
            title: "Lęïfańg",
            info: "Text/Image",
            x: 25, y: 11, z: -100,
        },
        {
            type: "image",
            id: "Lęïfańg",
            src: v.leifangImage2,
            artist: "Katharine Platts & Phoebe Bray",
            title: "Lęïfańg",
            info: "Text/Image",
            x: 0, y: 11, z: -100,
        },
        {
            type: "image",
            id: "Lęïfańg",
            src: v.leifangImage3,
            artist: "Katharine Platts & Phoebe Bray",
            title: "Lęïfańg",
            info: "Text/Image",
            x: -25, y: 11, z: -100,
        },
    ],
    // Room 4 - Molly Erin McCarthy
    [
        // Portal
        {
            type: "door",
            x: -240, y: -700
        },
        // Scene - Aquaduct
        {
            type: "glb",
            id: "scene",
            src: v.underpassGreyGLB,
            x: 0, y: 0, z: 0,
            o: 1, t: false, scale: scale
        },
        // Molly
        {
            type: "glb",
            id: "Molly",
            src: v.dockGLB,
            artist: "Molly Erin McCarthy",
            title: "Dock",
            info: "3D Model WIP",
            x: 0, y: 0, z: 0,
            o: 1, t: false, scale: scale
        },
        {
            type: "glb",
            id: "Molly",
            src: v.doorGLB,
            artist: "Molly Erin McCarthy",
            title: "Door",
            info: "3D Model WIP",
            x: 0, y: 0, z: 0,
            o: 1, t: false, scale: scale
        },
        {
            type: "glb",
            id: "Molly",
            src: v.graveGLB,
            artist: "Molly Erin McCarthy",
            title: "Grave",
            info: "3D Model WIP",
            x: 0, y: 0, z: 0,
            o: 1, t: false, scale: scale
        },
        {
            type: "glb",
            id: "Molly",
            src: v.pennywortGLB,
            artist: "Molly Erin McCarthy",
            title: "Pennywort",
            info: "3D Model WIP",
            x: 0, y: 0, z: 0,
            o: 1, t: false, scale: scale
        },
        {
            type: "glb",
            id: "Molly",
            src: v.trinityGLB,
            artist: "Molly Erin McCarthy",
            title: "Trinity",
            info: "3D Model WIP",
            x: 0, y: 0, z: 0,
            o: 1, t: false, scale: scale
        }
    ]
]