// punya kim
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//setup scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 100); //buat mengatur posisi
camera.lookAt(0, 0, 0); //buat camera melihat ke mana 

//Orbit Control
var controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 5, 0);
controls.update();

//Light
//Directional Light
var light = new THREE.DirectionalLight(0xFFFFFF, 0.5);
light.position.set(0,10,0);
light.target.position.set(-5, 0, 0);
scene.add(light);
scene.add(light.target);

//Hemisphere Light
light = new THREE.HemisphereLight(0xB1E1FF, 0xB97A20, 0.5);
scene.add(light);

//Point Light
light = new THREE.PointLight(0xFFFF00, 50);
light.position.set(0, 10, 0);
scene.add(light);

//Spot Light
light = new THREE.SpotLight(0xFF0000, 50);
light.position.set(10, 10, 0);
scene.add(light);

//geometry
const objects = [];

//plane
// {
// var planeGeo = new THREE.PlaneGeometry(40, 40);
// var planeMat = new THREE.MeshPhongMaterial({
//   color : 0x888888,
//   side : THREE.DoubleSide
// });
// var mesh = new THREE.Mesh(planeGeo, planeMat);
// mesh.rotation.x = Math.PI * -0.5;
// scene.add(mesh);
// }

//Cube
// {
// var cubeGeo = new THREE.BoxGeometry(4, 4, 4);
// var cubeMat = new THREE.MeshPhongMaterial({color : '#8AC'});
// var mesh = new THREE.Mesh(cubeGeo, cubeMat);
// mesh.position.set(5, 3.5, 0);
// scene.add(mesh);
// }

//Sphere
// {
// var sphereGeo = new THREE.SphereGeometry(3, 32, 16);
// var sphereMat = new THREE.MeshPhongMaterial({color: '#CA8'});
// var mesh = new THREE.Mesh(sphereGeo, sphereMat);
// mesh.position.set(-4, 5, 0);
// scene.add(mesh);
// }

const onProgress = function ( xhr ) {

  if ( xhr.lengthComputable ) {

   const percentComplete = xhr.loaded / xhr.total * 100;
   console.log( percentComplete.toFixed( 2 ) + '% downloaded' );

  }

};

//carnival mtl and obj
// new MTLLoader()
// 					.setPath( 'resources/' )
// 					.load( 'carnival.mtl', function ( materials ) {

// 						materials.preload();

// 						new OBJLoader()
// 							.setMaterials( materials )
// 							.setPath( 'resources/' )
// 							.load( 'carnival.obj', function ( object ) {

// 								// object.position.y = -0.95;
// 								object.scale.setScalar( 15 );
// 								scene.add( object );

// 							}, onProgress );

// 					} );

//hutan brantara glb
const loader = new GLTFLoader();

loader.load( 'resources1/untitled.gltf', function ( gltf ) {
	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

//kuromi
// loader.load( 'resources/kuromi.glb', function ( gltf ) {

// 	scene.add( gltf.scene );

// }, undefined, function ( error ) {

// 	console.error( error );

// } );

var time_prev = 0;
function animate(time) {
  var dt = time - time_prev;
  dt *= 0.1;

  // cube.rotation.x += 0.01 * dt;
  // cube.rotation.y += 0.01 * dt;

  objects.forEach((obj)=> {
    obj.rotation.z += dt * 0.01;
  })

  renderer.render(scene, camera);

  time_prev = time;
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);