import {useEffect} from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { Mesh } from "three";



export const VisionPro = () => {
    const gtlf = useLoader(GLTFLoader, "models/apple_vision_pro/scene.gltf");


    useEffect(() => {
      
        gtlf.scene.position.set(0, 0, 0);
        gtlf.scene.scale.set(3, 3, 3);
        gtlf.scene.traverse((object) => {
            if ((object as Mesh).isMesh) {
                object.castShadow = true;
                object.receiveShadow = true;

            }
        });
    }, [gtlf]); 

    return (
        <primitive object={gtlf.scene} />
    ) 
   
}