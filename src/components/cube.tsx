import React, { useRef, useState } from "react"


import { Canvas, MeshProps, useFrame } from "react-three-fiber"


const Box: React.FC<MeshProps> = (props) => {
  const mesh = useRef()

  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  useFrame(() => {
    if (!mesh.current) {return}
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  })
    
  return (
    <mesh
      {...props}
      onClick={event => setActive(!active)}
      onPointerOut={event => setHover(false)}
      onPointerOver={event => setHover(true)}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1,1]}    
    >
      <boxBufferGeometry args={[1,1,1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  )
}

const Cube = () => (
  <Canvas>
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <Box position={[-1.2, 0, 0]} />
    <Box position={[1.2, 0, 0]} />
  </Canvas>
)


export default Cube