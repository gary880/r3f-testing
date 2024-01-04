import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Scroll,
  ScrollControls,
  OrbitControls,
  useProgress,
  Html,
} from "@react-three/drei";
import { VisionPro } from "./VisionPro";
import { Suspense } from "react";
import description from "../public/description.json";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html>
      <span style={{ display: "flex", width: "200px" }}>
        {progress.toFixed(0)} %
      </span>
    </Html>
  );
}

const Text = (props: any) => {
  return (
    <>
      <div
        className="contentContainer"
        style={
          props.index >= description.length - 2
            ? { textAlign: "end", alignItems: "flex-end" }
            : {}
        }
      >
        <h2>{props.title}</h2>
        <p className="content">{props.content}</p>
      </div>
    </>
  );
};

const App = () => {
  return (
    <>
      <div className="canvas-container">
        <Canvas shadows camera={{ fov: 50 }}>
          <Suspense fallback={<Loader />}>
            <ScrollControls pages={6} damping={0.6}>
              <OrbitControls enableZoom={false} enableRotate={false} />
              <ambientLight />

              <directionalLight position={[0, 10, 0]} intensity={1} />
              <pointLight position={[10, 10, 10]} />

              <Environment preset="sunset" />

              <VisionPro />

              <Scroll html>
                <div style={{ width: "100vw" }}>
                  <h1
                    style={{
                      height: "100vh",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Apple Vision Pro
                  </h1>
                  {description.map((item, index) => {
                    return (
                      <Text
                        key={item.title}
                        index={index}
                        title={item.title}
                        content={item.content}
                      />
                    );
                  })}
                </div>
              </Scroll>
            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>
    </>
  );
};

export default App;
