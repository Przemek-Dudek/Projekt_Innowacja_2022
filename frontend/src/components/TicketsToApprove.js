import { useState, useEffect, useRef, React} from "react";
import * as THREE from 'three';
import "./TicketsToApprove.css"

export function TicketsToApprove({tickets}) {
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

    let isChecked = false
    function handleChange(e) {
        isChecked = true;
    }

    const [arr,setArr] = useState([tickets]);
    // console.log(arr);

    return (
        <div className="container">
            <div className="raports" >
                {
                    arr.map((val) =>
                        <h3 key="i">{val}</h3>
                    )
                }
            </div>
            <div className="form-group">
                <div className="info">
                    <div className="info-hay">
                        <b>Kwota: </b> <span className="info-hay-value"></span>
                    </div>
                    <div className="info-name">
                        <b>Imie i nazwisko: </b> <span className="info-name-value"></span>
                    </div>
                    <div className="info-reason">
                        <b>Uzasadnienie: </b> <span className="info-reason-value"></span>
                    </div>
                </div>
                <div className="radio">
                    <div>
                        <input type="checkbox" id="reject" name="reject" value="yes" onClick={
                            isChecked ? isChecked = false : isChecked = true
                        }/>
                        
                        <label htmlFor="reject">Reject</label>
                    </div>
                        
                </div>
                <div className="form-data">
                    <form action="">
                        <textarea name="reason" id="reason" cols="30" rows="10"></textarea>
                        <div className="btns">
                            <button className="reject">Reject</button>
                        </div>
                    </form >
                    <button className="approve">Approve</button>
                </div>  
            </div>
            <div className="canvas"ref={canvas}></div>
        </div>
    )
}
