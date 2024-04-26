import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

let sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}    
let aspect;

let b1 = document.getElementById("b1");
let b2 = document.getElementById("b2");
let b3 = document.getElementById("b3");

let range1 = document.getElementById('range1');
let range2 = document.getElementById('range2');

let Timer = 0;
let prevTime = 0;
let deltaTime = 0;

let SelectScene1 = true;
let SelectScene2 = false; 
let SelectScene3 = false;

let prevDeltaMouseX = 0;
let prevDeltaMouseY = 0;
let deltaMouseX = 0;
let deltaMouseY = 0;

let mouseisDown = false;

let isPause = true;

let moveForward = 0;
let moveSideward = 0;
let moveUpward = 0;

function selectScene1(){ 
    SelectScene1 = true;
    SelectScene2 = false; 
    SelectScene3 = false;
    console.log("Scene 1 selectd");
}

function selectScene2(){
    if( isPause === true){
        isPause = false;
    } else {
        isPause = true;
    }
}

function selectScene3(){
    SelectScene1 = false;
    SelectScene2 = false; 
    SelectScene3 = true;
    console.log("Scene 3 selectd");
}

function deltaMouse(event){
    deltaMouseX = event.movementX;
    deltaMouseY = event.movementY;
    //console.log("X: " + deltaMouseX + " Y: " + deltaMouseY);
}

function mouseDown(){
    mouseisDown = true;
}

function mouseUp(){
    mouseisDown = false;
}

function keyDown(event){
    if(event.keyCode == 87){
        moveForward = 1;
    } 
    else if(event.keyCode == 83){
        moveForward = -1;
    }
    else if(event.keyCode == 65){
        moveSideward = 1;
    }
    else if(event.keyCode == 68){
        moveSideward = -1;
    }
    else if(event.keyCode == 32){
        moveUpward = 1;
    }
    else if(event.keyCode == 16){
        moveUpward = -1;
    }
}

function keyUp(event){
    if(event.keyCode == 87 || event.keyCode == 83){
        moveForward = 0;
    }
    else if(event.keyCode == 65 || event.keyCode == 68){
        moveSideward = 0;
    }
    else if(event.keyCode == 32 || event.keyCode == 16){
        moveUpward = 0;
    }
    else if(event.keyCode == 27){
        if(isPause === true){
            isPause = false;
            b2.textContent = "no Pause";
            b2.classList.add("cursor");
        } else {
            isPause = true;
            b2.textContent = "Pause";    
            b2.classList.remove("cursor");
        }
    }
}

b1.onclick = function() {selectScene1()};
b2.onclick = function() {selectScene2()};
b3.onclick = function() {selectScene3()};

document.addEventListener("mousemove", deltaMouse);
document.addEventListener("mousedown", mouseDown);
document.addEventListener("mouseup", mouseUp);
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function main() {
    const gltfLoader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({alpha: false, antialias: true, canvas});
    renderer.setSize(sizes.width,sizes.height);
    const fov = 75;
    aspect = sizes.width / sizes.height;  // the canvas default
    const near = 0.1;
    const far = 100;
    let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    const controls = new OrbitControls(camera, canvas);
    camera.position.z = 2;
    camera.position.y = .5;
    
    const scene1 = new THREE.Scene();
    
    const sky_tex = textureLoader.load('sky.jpg');
    const pysanka_tex = textureLoader.load('pysanka.jpg');

    sky_tex.mapping = THREE.EquirectangularReflectionMapping;
    sky_tex.colorSpace = THREE.SRGBColorSpace;

    scene1.background = sky_tex;
    
    const geometry1 = new THREE.SphereGeometry(0.5);
    const material1 = new THREE.MeshPhongMaterial({map: pysanka_tex});
    const cube1 = new THREE.Mesh(geometry1, material1);

    const planegem= new THREE.PlaneGeometry(100,100);
    const planemat = new THREE.MeshPhongMaterial({color: 0x089c4a, side: THREE.DoubleSide});
    const plane1 = new THREE.Mesh(planegem,planemat);
    
    scene1.add(plane1);
    plane1.rotation.x = Math.PI / 2;

    scene1.add(cube1);
    cube1.position.y += 0.5;

    const color = 0xFFFFFF;
    const intensity = 5;
    const light1 = new THREE.SpotLight(color, intensity);
    const light2 = new THREE.DirectionalLight(color, intensity);
    light1.castShadow = true;
    light1.position.set(0, 4, 0);
    light2.position.set(0, 4, 0);
    scene1.add(light1);
    scene1.add(light2);

    function render(time) {
        time *= 0.001;  // convert time to seconds

        deltaTime = time - prevTime;
        Timer += deltaTime;
        b1.textContent = "Timer: " + Math.floor(Timer);


        if(isPause === false){
            cube1.rotation.x = time;
            cube1.rotation.y = time;

            cube1.position.y = 0.5 + Math.abs(Math.sin(time * range2.value)) * range1.value;
            cube1.position.z = Math.cos(time) * 4;

            camera.position.z += -moveForward * 0.01;
            camera.position.x += -moveSideward * 0.01;
            camera.position.y += moveUpward * 0.01;
        }

        deltaMouseX = 0;
        deltaMouseY = 0;

        renderer.render(scene1, camera);

        prevTime = time;

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
    
}
main();
