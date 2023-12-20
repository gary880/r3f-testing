import { Canvas, useFrame } from "@react-three/fiber"
import { ScrollControls, Text } from "@react-three/drei"
import { useRef } from "react"
import { OrbitControls, useScroll } from "@react-three/drei"


function Composition({ ...props }) {
  const scroll = useScroll()
  const sphere = useRef(null)
  useFrame((state, delta) => {
    const r1 = scroll.range(0, 1)
    // @ts-ignore
    sphere.current.rotation.x = (2 * Math.PI) * r1

    // @ts-ignore
    sphere.current.position.z = - r1 * 0.8

    // @ts-ignore
    sphere.current.position.x = - 2 * r1

    // @ts-ignore
    // sphere.current.rotation.y = (2 * Math.PI) * r1

  })
  return (
    <>

      <mesh
        {...props}
        ref={sphere}
        castShadow

      >

        <spotLight position={[0, 5, 10]} angle={0.3} penumbra={1} />
        <sphereGeometry args={[3, 16, 16]} />
        <meshStandardMaterial color={'white'} wireframe />
      </mesh>


    </>
  )
}


const TextMesh = ({ ...props }) => {
  const scroll = useScroll()
  const text = useRef(null)
  useFrame((state, delta) => {
    const r1 = scroll.range(0, 1)
    // @ts-ignore
    text.current.position.x = r1 * 2
    // @ts-ignore
    text.current.position.z = r1 * 0.8
  })

  return (
    <>
      <mesh
        {...props}
        ref={text}
        castShadow
        rotation={[0, -0.5, 0]}
      >
        <spotLight position={[0, 5, 10]} angle={0.3} penumbra={1} />
        <Text>sphere</Text>
      </mesh>
    </>
  )
}


const App = () => {


  return (
    <>

      <div className="canvas-container">
        <Canvas shadows>
          <ScrollControls pages={2} damping={0.5}>
            {/* <OrbitControls enableZoom={false} /> */}
            <ambientLight />

            <directionalLight position={[0, 10, 0]} intensity={1} />
            <pointLight position={[10, 10, 10]} />
            <TextMesh />
            <Composition />

          </ScrollControls>
        </Canvas>
      </div >
    </>
  )
}

export default App
