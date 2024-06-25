import { useAnimations, useGLTF, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Group } from "three"

useGLTF.preload("/mds.glb")

export default function Model() {
  const group = useRef<Group>(null)
  const { nodes, materials, animations, scene } = useGLTF(
    "/mds.glb"
  )
  const { actions, clips } = useAnimations(animations, scene)
  const scroll = useScroll()

  useEffect(() => {
    console.log(animations)
  }, [])


  useEffect(() => {
    console.log(actions)
    animations.forEach(frame => {
      //@ts-ignore
     actions[frame.name].play().paused = true
    })
    
  }, [])
  useFrame(
    () =>{
      animations.forEach(frame => {

        //@ts-ignore
        (actions[frame.name].time =
          //@ts-ignore
          (actions[frame.name].getClip().duration * scroll.offset))
      })
    }
  )
  return (
    <group scale={40} ref={group}>
      <primitive object={scene} />
    </group>
  )
}
