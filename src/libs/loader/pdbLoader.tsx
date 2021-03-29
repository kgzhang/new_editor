import React, { Suspense, useMemo, useRef } from "react"
import { Vector3, Color, Mesh } from "three"
import { useMount } from "react-use"
import { Box, Html, Icosahedron, TrackballControls } from "@react-three/drei"
import { useFrame, useLoader } from "react-three-fiber"
import { Text } from "@chakra-ui/react"

import { PDBLoader } from "three/examples/jsm/loaders/PDBLoader"
import { ForwardContext } from "../utils"

// const url = "./5mps.pdb"
// const url = "./3dnb.pdb"
// const url = "./7boj.pdb"
const url = "./7c72.pdb"
// const url = "https://threejs.org/examples/models/pdb/caffeine.pdb"
const Atom: React.FC<{
  position: Vector3
  color: Color
  text: string
  textColor: string
}> = ({ position, color, text, textColor }) => (
  <>
    <mesh position={position} visible>
      {/* @ts-ignore */}
      <Icosahedron args={[1, 3]} attach="geometry">
        <meshPhongMaterial attach="material" color={color} />
      </Icosahedron>
      {/* <Html>
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="bold"
          marginLeft="10"
          textShadow="-1px 1px 1px rgb(0,0,0)"
          userSelect="none"
        >
          {text}
        </Text>
      </Html> */}
    </mesh>
  </>
)

const AtomBond: React.FC<{ start: Vector3; end: Vector3 }> = ({
  start,
  end,
}) => {
  const el = useRef<Mesh>()
  useMount(() => {
    el.current?.position.copy(start)
    el.current?.position.lerp(end, 0.5)
    el.current?.scale.set(5, 5, start.distanceTo(end))
    el.current?.lookAt(end)
  })


  return (
    <mesh ref={el} visible>
      {/* @ts-ignore */}
      <Box args={[0.05, 0.05, 1]} attach="geometry">
        <meshPhongMaterial color="#ffffff" />
      </Box>
    </mesh>
  )
}


const Molecule: React.FC = () => {
  const el = useRef<Mesh>()

  const { geometryAtoms, geometryBonds, json } = useLoader(PDBLoader, url)

  console.log(geometryAtoms, geometryBonds, json, "all")
  const atomPositions = geometryAtoms.getAttribute("position")
  const atomColors = geometryAtoms.getAttribute("color")
  const atoms = useMemo(() => Array.from({ length: atomPositions.count }, (_, i) => i).map(
    (idx) => {
      const position = new Vector3(
        atomPositions.getX(idx),
        atomPositions.getY(idx),
        atomPositions.getZ(idx)
      )

      const color = new Color(
        atomColors.getX(idx),
        atomColors.getY(idx),
        atomColors.getZ(idx)
      )

      const atom = json.atoms[idx]!
      const textColor = `rgb(${atom[3][0]}, ${atom[3][1]}, ${atom[3][2]})`

      return (
        <Atom
          color={color}
          key={idx}
          position={position.multiplyScalar(3)}
          text={atom[4]}
          textColor={textColor}
        />
      )
    }
  ), [atomPositions, atomColors, json])

  const bondPositions = geometryBonds.getAttribute("position")
  const bonds = useMemo(() => Array.from({ length: bondPositions.count / 2 }, (_, i) => i * 2).map(
    (idx) => {
      const start = new Vector3(
        bondPositions.getX(idx),
        bondPositions.getY(idx),
        bondPositions.getZ(idx)
      ).multiplyScalar(3)

      const end = new Vector3(
        bondPositions.getX(idx + 1),
        bondPositions.getY(idx + 1),
        bondPositions.getZ(idx + 1)
      ).multiplyScalar(3)

      return <AtomBond end={end} key={idx} start={start} />
    }

  ),[bondPositions])

        
  useFrame(() => {
    if (!el.current) {return}
    el.current.rotation.x = el.current.rotation.y += 0.01
  })


    
  return (
    <mesh ref={el}>
      { atoms }
      { bonds }
    </mesh>
  )
}


const BoxedMolucule = () => (
  <>
    <directionalLight args={[0xffffff, 0.8]} position={[1, 1, 1]} />
    <directionalLight args={[0xffffff, 0.5]} position={[-1, -1, 1]} />
    <ambientLight intensity={0.1} />
    <Molecule />
    
    <TrackballControls />
  </>
)


const PanelPointCloundData: React.FC = () => (
  <ForwardContext
    colorManagement={false}
  >
    <Suspense fallback={null}>
      <BoxedMolucule />
    </Suspense>
  </ForwardContext>
)

export default PanelPointCloundData