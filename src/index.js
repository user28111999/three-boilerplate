import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import Stats from "stats.js"

/**
 * Base
 */
const size = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}

const stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)

const canvas = document.querySelector("canvas")
const scene = new THREE.Scene()

const cameraProps = {
    fov: 80,
    aspect: size.aspectRatio,
    near: 0.1,
    far: 1000
}
const camera = new THREE.PerspectiveCamera(cameraProps)

const controls = new OrbitControls(camera, canvas)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    powerPreference: "high-performance",
    antialias: true
})

renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

scene.add(camera)

window.addEventListener("resize", () => {
    size.width = window.innerWidth
    size.height = window.innerHeight
    camera.aspect = size.width / size.height
    camera.updateProjectionMatrix()
    renderer.setSize(size.width, size.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Animate
 */
const animate = () => {
    stats.begin()
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)
    stats.end()
}

animate()
