import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}    

    let SelectScene1 = true;
    let SelectScene2 = false; 
    let SelectScene3 = false;

function selectScene1(){ 
    SelectScene1 = true;
    SelectScene2 = false; 
    SelectScene3 = false;
    console.log("Scene 1 selectd");
}

function selectScene2(){
    SelectScene1 = false;
    SelectScene2 = true; 
    SelectScene3 = false;
    console.log("Scene 2 selectd");
}

function selectScene3(){
    SelectScene1 = false;
    SelectScene2 = false; 
    SelectScene3 = true;
    console.log("Scene 3 selectd");
}

document.getElementById("b1").onclick = function() {selectScene1()};
document.getElementById("b2").onclick = function() {selectScene2()};
document.getElementById("b3").onclick = function() {selectScene3()};

function main() {
    const gltfLoader = new GLTFLoader();
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({alpha: false, antialias: true, canvas});
    renderer.setSize(sizes.width,sizes.height);
    const fov = 75;
    const aspect = sizes.width / sizes.height;  // the canvas default
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;
    const scene1 = new THREE.Scene();
    const scene2 = new THREE.Scene();
    const scene3 = new THREE.Scene();
    
    const sky_tex = new THREE.TextureLoader().load('sky.jpg');
    
    scene1.background = sky_tex;
    scene2.background = sky_tex;
    scene3.background = sky_tex;
    

    const geometry1 = new THREE.SphereGeometry(0.5);
    const geometry2 = new THREE.BoxGeometry(1, 2, 1);
    const geometry3 = new THREE.BoxGeometry(0.5, 1, .5);
    const material1 = new THREE.MeshPhongMaterial({color: 0x336688});
    const material2 = new THREE.MeshPhongMaterial({color: 0x44aa88});
    const material3 = new THREE.MeshPhongMaterial({color: 0x44aa00});
    const cube1 = new THREE.Mesh(geometry1, material1);
    const cube2 = new THREE.Mesh(geometry2, material2);
    const cube3 = new THREE.Mesh(geometry3, material3);
    scene1.add(cube1);
    scene2.add(cube2);
    scene3.add(cube3);
    const color = 0xFFFFFF;
    const intensity = 6;
    const light1 = new THREE.DirectionalLight(color, intensity);
    light1.position.set(-2, 4, 4);
    scene1.add(light1);


    function render(time) {
        time *= 0.001;  // convert time to seconds

        //ball.rotation.y = time*2;

        cube1.rotation.x = time;
        cube1.rotation.y = time;

        if(SelectScene1 === true)
        {    
            renderer.render(scene1, camera);
        }
        if(SelectScene2 === true)
        {    
            renderer.render(scene2, camera);
        }
        if(SelectScene3 === true)
        {    
            renderer.render(scene3, camera);
        }
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}
main();
