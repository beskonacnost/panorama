import * as React from 'react';
import * as THREE from 'three';

function App() {
    const canvas = document.querySelector('root');
    const scene = new THREE.Scene();

    let renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.innerHTML = '';
    document.body.appendChild(renderer.domElement);

    let geometry = new THREE.SphereGeometry( 500, 60, 40 );
	geometry.scale( - 1, 1, 1 );

	let material = new THREE.MeshBasicMaterial( {
		map: new THREE.TextureLoader().load( 'https://s3.amazonaws.com/im-production/users/EjJS0jEgw7/projects/CWLLEkqIjy/spins/CwtkyG1I1m/0/3dre/images/cubemaps/Pano-D712D599-7A22-474D-BDF3-612A4E351661.equirectangular.jpg' )
	} );
	const mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.target = new THREE.Vector3(0,0,0);   

    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth/window.innerHeight;
        camera.updateProjectionMatrix();
    })

    let onMouseDownX = 0, onMouseDownY = 0,
        onMouseDownLon = 0, onMouseDownLat = 0,
        lon = 0, lat = 0, phi = 0, theta = 0;
    let isUserInteracting: boolean = false;
    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'mouseup', onDocumentMouseUp, false );
	document.addEventListener( 'wheel', onDocumentMouseWheel, false );
    document.addEventListener( 'dblclick', onDocumentMouseClick, false);

    function onDocumentMouseDown(event){
        event.preventDefault();

		isUserInteracting = true;
        onMouseDownX = event.clientX;
		onMouseDownY = event.clientY;
        onMouseDownLon = lon;
		onMouseDownLat = lat;
    }

    function onDocumentMouseMove(event){
        if ( isUserInteracting === true ) {   
            lon = ( onMouseDownX - event.clientX ) * 0.1 + onMouseDownLon;
            lat = ( event.clientY - onMouseDownY ) * 0.1 + onMouseDownLat;
        }
    }

    function onDocumentMouseUp(event) {
        isUserInteracting = false;
    }

    function onDocumentMouseWheel(event) {
        camera.fov += event.deltaY * 0.05;
        camera.updateProjectionMatrix();
    }

    function onDocumentMouseClick(event){
        event.preventDefault();
        const pos = new THREE.Vector3();
        const mouse = new THREE.Vector3();
        const geometry = new THREE.SphereGeometry(0.01, 32, 32, 0, Math.PI*2, 0, Math.PI*2);
        const material = new THREE.MeshBasicMaterial({
            color: 'red',
        });
        const sphere = new THREE.Mesh(geometry, material);  
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        mouse.z = camera.position.z;
        mouse.unproject(camera);
        mouse.sub(camera.position).normalize();
        sphere.position.copy(mouse);
        scene.add(sphere);
    }

    const animate = () => {
        requestAnimationFrame(animate);
        update();
    }

    const update = () => {
        lat = Math.max(- 85, Math.min(85, lat));
		phi = THREE.Math.degToRad(90 - lat);
		theta = THREE.Math.degToRad(lon);

		camera.target.x = 500 * Math.sin(phi) * Math.cos(theta);
		camera.target.y = 500 * Math.cos(phi);
		camera.target.z = 500 * Math.sin(phi) * Math.sin(theta);

		camera.lookAt(camera.target);
        renderer.render(scene, camera);
    }

    animate();
    return(null);
}

export default App;