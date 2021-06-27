"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = require("three");
function App() {
    var canvas = document.querySelector('root');
    var scene = new THREE.Scene();
    var renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.innerHTML = '';
    document.body.appendChild(renderer.domElement);
    var geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);
    var material = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('https://s3.amazonaws.com/im-production/users/EjJS0jEgw7/projects/CWLLEkqIjy/spins/CwtkyG1I1m/0/3dre/images/cubemaps/Pano-D712D599-7A22-474D-BDF3-612A4E351661.equirectangular.jpg')
    });
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.target = new THREE.Vector3(0, 10, 20);
    window.addEventListener('resize', function () {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
    var onMouseDownX = 0, onMouseDownY = 0, onMouseDownLon = 0, onMouseDownLat = 0, lon = 0, lat = 0, phi = 0, theta = 0;
    var isUserInteracting = false;
    var isTheSamePosition = false;
    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);
    document.addEventListener('wheel', onDocumentMouseWheel, false);
    document.addEventListener('click', onDocumentMouseClick, false);
    function onDocumentMouseDown(event) {
        event.preventDefault();
        isUserInteracting = true;
        //if (onMouseDownX !== event.clientX || onMouseDownY !== event.clientY){
        onMouseDownX = event.clientX;
        onMouseDownY = event.clientY;
        //isTheSamePosition = false;
        // }else{
        //     isTheSamePosition = true;
        // }
        onMouseDownLon = lon;
        onMouseDownLat = lat;
    }
    // function makeSphere(x: number, y: number){
    //     animate();
    // }
    function onDocumentMouseMove(event) {
        if (isUserInteracting === true) {
            // if ( isTheSamePosition ){
            //     //makeSphere(event.clientX, event.clientY);
            // }else{
            isTheSamePosition = false;
            lon = (onMouseDownX - event.clientX) * 0.1 + onMouseDownLon;
            lat = (event.clientY - onMouseDownY) * 0.1 + onMouseDownLat;
            // }
        }
    }
    function onDocumentMouseUp(event) {
        isUserInteracting = false;
    }
    function onDocumentMouseWheel(event) {
        camera.fov += event.deltaY * 0.05;
        camera.updateProjectionMatrix();
    }
    function onDocumentMouseClick(event) {
        // const geometry = new THREE.SphereGeometry( 0.01, 32, 32, 0, Math.PI*2, 0, Math.PI*2);
        // const material = new THREE.MeshBasicMaterial({
        //     color: 'red',
        // });
        // const sphere = new THREE.Mesh( geometry, material );
        // sphere.position.set(
        //     (event.clientX / window.innerWidth) * 2 -1,
        //     - (event.clientY / window.innerHeight) *2 -1,
        //     0.5
        // );
        // scene.add( sphere );
        var raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
            console.log(intersects[0].points);
        }
    }
    var animate = function () {
        requestAnimationFrame(animate);
        update();
    };
    var update = function () {
        lat = Math.max(-85, Math.min(85, lat));
        phi = THREE.Math.degToRad(90 - lat);
        theta = THREE.Math.degToRad(lon);
        camera.target.x = 500 * Math.sin(phi) * Math.cos(theta);
        camera.target.y = 500 * Math.cos(phi);
        camera.target.z = 500 * Math.sin(phi) * Math.sin(theta);
        camera.lookAt(camera.target);
        renderer.render(scene, camera);
    };
    animate();
    return (null);
}
exports.default = App;
