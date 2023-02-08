import {React, useEffect, useRef} from "react";
import * as THREE from 'three';

export function Account({createAccount, user}) {
    const canvas = useRef(null);
    useEffect(() => {
        // Sizes
        const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
        };

        // Scene
        const scene = new THREE.Scene();

        // Camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 10000);
        camera.position.z = 10;

        scene.add(camera);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        const directionLight = new THREE.DirectionalLight(0xffffff, 2);
        directionLight.position.set(-2, 1, 2);

        scene.add(ambientLight, directionLight);

        // Renderer
        const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
        });

        renderer.setSize(sizes.width, sizes.height);
        renderer.render(scene, camera);
        canvas.current.appendChild(renderer.domElement);

        // Canvas Size Settings
        const sizeSetting = () => {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;

        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }

        // Interacting With Mesh
        const clock = new THREE.Clock();
        const speed = [];
        const negpos = [-1, 1];
        const meshes = [];

        const randomNumber = (max) => {
        return Math.floor(Math.random() * max);
        }

        (function createMeshes() {
        for (let i = 0; i < 10; i++) {
            let positionX = randomNumber(10) + 1;
            let positionY = randomNumber(10) + 1;
            let positionZ = randomNumber(2) + 1;
            const s = randomNumber(3) + 1;

            positionX *= negpos[Math.floor(Math.random() * 2)];
            positionY *= negpos[Math.floor(Math.random() * 2)];
            positionZ *= negpos[Math.floor(Math.random() * 2)];

            const mesh = new THREE.Mesh(
                new THREE.BoxGeometry(s, s, s),
                new THREE.MeshPhongMaterial({color: '#3498db'})
            );

            mesh.position.set(positionX, positionY, positionZ);
            meshes[i] = mesh;
            speed[i] = (randomNumber(8) + 1) / 10;

            scene.add(meshes[i]);
        }
        })();

        const animateMeshes = () => {
        const elapsedTime = clock.getElapsedTime();

        meshes.forEach((mesh, index) => {
            mesh.rotation.x = Math.sin(elapsedTime * 0.6) * speed[index];
            mesh.rotation.z = Math.cos(elapsedTime * 0.6) * speed[index];
        });

        window.requestAnimationFrame(animateMeshes);
        }

        // Initialization
        const init = () => {
        renderer.render(scene, camera);

        window.requestAnimationFrame(init);
        };

        window.addEventListener('resize', sizeSetting, false);
        init();
        animateMeshes();

        return () => renderer.domElement.parentNode.removeChild(renderer.domElement);
    }, []);

    return (
        <div className="container">
            <div className="container-box">
                <h3>Set up an account</h3>
                <form
                onSubmit={(event) => {
                    
                    event.preventDefault();

                    const formData = new FormData(event.target);
                    const address = formData.get("address")
                    const name = formData.get("name")
                    const lastName = formData.get("lastName")
                    const email = formData.get("email")
                    const accountType = formData.get("typeAccount")

                    if (address && name && lastName && email && accountType) {
                        createAccount(address, name, lastName, email, accountType)
                    }

                }}
                >
                    <div className="form-group">
                        <label>Address</label>
                        <input className="form-control" type="text" name="address" required/>
                    </div>
                    <div className="form-group">
                        <label>Name</label>
                        <input className="form-control" type="text" name="name" required />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input className="form-control" type="text" name="lastName" required />
                    </div>
                    <div className="form-group">
                        <label>E-mail</label>
                        <input className="form-control" type="email" name="email" required />
                    </div>
                    
                    <div className="form-group" >
                        <label>Account type</label>
                    
                        <select className="form-select" name="typeAccount" height="60px" required >
                            <option value="1" >PRACOWNIK</option>
                        {user >= 1 &&(
                            <option value="2">HR</option>
                        )}
                        {user >= 2 &&(
                            <option value="3">ADMIN</option>
                        )}
                        </select>
                    </div>
                    <div className="form-group btn">
                        <input className="button" type="submit" value="Register"/>
                    </div>
                </form>
            </div>
            <div className="canvas"ref={canvas}></div>
        </div>
    )
}
/**/