<template>
	<div class="dev-car">2134567</div>
	<!-- pro放开 -->

	<!-- <div class="box">
		<div style="text-align: center">
			<span class="colorPicker">
				<input id="body-color" type="color" value="#ff0000" />
				<br />
				车身颜色
			</span>
			<span class="colorPicker">
				<input id="details-color" type="color" value="#ffffff" />
				<br />
				座椅轮毂等颜色
			</span>
			<span class="colorPicker">
				<input id="glass-color" type="color" value="#ffffff" />
				<br />
				玻璃颜色
			</span>
		</div>

		<div id="container" ref="initCanvas"></div>
	</div> -->
</template>

<!-- <script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

// const container = ref(null);

const initCanvas = ref<HTMLElement | null>(null);
const scene = new THREE.Scene();
const wheels = [];

const camera = new THREE.PerspectiveCamera(
	40,
	window.innerWidth / window.innerHeight,
	0.1,
	100
);
camera.position.set(4.25, 1.4, -4.5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.85;

const stats = new Stats();
let controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.maxDistance = 9;
controls.target.set(0, 0.5, 0);
controls.update();

const bodyMaterial = new THREE.MeshPhysicalMaterial({
	color: 0xff0000,
	metalness: 1.0,
	roughness: 0.5,
	clearcoat: 1.0,
	clearcoatRoughness: 0.03,
	sheen: 0.5,
});

const detailsMaterial = new THREE.MeshStandardMaterial({
	color: 0xffffff,
	metalness: 1.0,
	roughness: 0.5,
});

const glassMaterial = new THREE.MeshPhysicalMaterial({
	color: 0xffffff,
	metalness: 0.25,
	roughness: 0,
	transmission: 1.0,
});

const render = () => {
	controls.update();
	stats.update();
	renderer.render(scene, camera);
	requestAnimationFrame(render);
	// renderer.setAnimationLoop(render);
};

onMounted(() => {
	initCanvas.value?.appendChild(renderer.domElement);
	initCanvas.value?.appendChild(stats.dom);
	renderer.setClearColor('#000');
	// renderer.setAnimationLoop(render);

	// scene.background = new THREE.Color("#ccc");
	scene.background = new THREE.Color(0x333333);
	// 光照信息的环境 hdr 图
	scene.environment = new RGBELoader().load('./hdr/venice_sunset_1k.hdr');
	scene.environment.mapping = THREE.EquirectangularReflectionMapping;
	scene.fog = new THREE.Fog(0x333333, 10, 15);

	const grid = new THREE.GridHelper(20, 40, 0xffffff, 0xffffff);
	grid.material.opacity = 0.2;
	grid.material.depthWrite = false;
	grid.material.transparent = true;
	scene.add(grid);
	const loader = new GLTFLoader();
	const dracoLoader = new DRACOLoader();
	dracoLoader.setDecoderPath('./draco/gltf/');
	loader.setDRACOLoader(dracoLoader);

	loader.load('./models/gltf/ferrari.glb', (gltf) => {
		const carModel = gltf.scene.children[0];
		console.log(carModel);
		carModel.getObjectByName('body').material = bodyMaterial;
		carModel.getObjectByName('rim_fl').material = detailsMaterial;
		carModel.getObjectByName('rim_fr').material = detailsMaterial;
		carModel.getObjectByName('rim_rr').material = detailsMaterial;
		carModel.getObjectByName('rim_rl').material = detailsMaterial;
		carModel.getObjectByName('trim').material = detailsMaterial;
		carModel.getObjectByName('glass').material = glassMaterial;
		wheels.push(
			carModel.getObjectByName('wheel_fl'),
			carModel.getObjectByName('wheel_fr'),
			carModel.getObjectByName('wheel_rl'),
			carModel.getObjectByName('wheel_rr')
		);

		const mesh = new THREE.Mesh(
			new THREE.PlaneGeometry(0.655 * 4, 1.3 * 4),
			new THREE.MeshBasicMaterial({
				// map: shadow,
				blending: THREE.MultiplyBlending,
				toneMapped: false,
				transparent: true,
			})
		);
		mesh.rotation.x = -Math.PI / 2;
		mesh.renderOrder = 2;
		carModel.add(mesh);
		scene.add(carModel);
	});

	const bodyColorInput: any = document.getElementById('body-color');
	bodyColorInput.addEventListener('input', function () {
		bodyMaterial.color.set(this.value);
	});

	const detailsColorInput: any = document.getElementById('details-color');
	detailsColorInput.addEventListener('input', function () {
		detailsMaterial.color.set(this.value);
	});

	const glassColorInput = document.getElementById('glass-color');
	glassColorInput.addEventListener('input', function () {
		glassMaterial.color.set(this.value);
	});
	render();
});
</script> -->

<style scoped>
@import './Car3d.scss';
.dev-car {
	width: 100%;
	height: 100vh;
	background-color: yellowgreen;
}
</style>
