import { useEffect, useRef } from "react";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { Mesh } from "three";
import { useScroll } from "@react-three/drei";
import { PrimitiveProps } from "@react-three/fiber";

export const VisionPro = () => {
    const gtlf = useLoader(GLTFLoader, "models/apple_vision_pro/scene.gltf");
    const scroll = useScroll()
    const model = useRef<PrimitiveProps | null>(null)
    const { viewport } = useThree()


    useEffect(() => {

        gtlf.scene.position.set(0, 0, 0);
        gtlf.scene.rotation.set(0.1, -1.6, 0);
        if (viewport.width < 4) {
            gtlf.scene.scale.set(2, 2, 2);
        } else {
            gtlf.scene.scale.set(3, 3, 3);
        }


        gtlf.scene.traverse((object) => {
            if ((object as Mesh).isMesh) {
                object.castShadow = true;
                object.receiveShadow = true;

            }
        });

    }, [gtlf, viewport.width]);

    useFrame(() => {
        const r1 = scroll.range(0, 2 / 6)
        const r2 = scroll.range(3 / 6, 1)

        if (model.current === null) return

        model.current.rotation.y = -1.6 - (Math.PI * 0.25) * r1

        model.current.position.z = 2 + -0.5 * r1
        if (viewport.width > 5) {

            model.current.position.x = 1.5 * r1 - r2 * 5.4
        } else if (viewport.width > 3) {

            model.current.position.x = 1 * r1 - r2 * 3
        } else {

            model.current.position.x = 0.5 * r1 - r2 * 1
        }

    })

    return (
        <primitive object={gtlf.scene} ref={model} />
    )

}