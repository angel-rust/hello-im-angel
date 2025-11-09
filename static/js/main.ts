import * as THREE from 'three';

/**
 * Neon 3D Scene for Portfolio
 * Eye-catching neon wireframe with glowing particles
 * Optimized for mobile performance
 */

class Scene3D {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private particles: THREE.Points;
    private geometry: THREE.Mesh;
    private secondaryGeometry: THREE.Mesh;
    private animationId: number | null = null;
    private time: number = 0;

    constructor() {
        // Create scene
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x000000, 0.0008);

        // Create camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 35;

        // Create renderer
        const container = document.getElementById('canvas-container');
        if (!container) {
            throw new Error('Canvas container not found');
        }

        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: window.innerWidth > 768,
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(this.renderer.domElement);

        // Create main neon geometry (icosahedron)
        this.geometry = this.createMainGeometry();

        // Create secondary rotating geometry for depth
        this.secondaryGeometry = this.createSecondaryGeometry();

        // Create glowing particles
        this.particles = this.createParticles();

        // Add intense lighting
        this.setupLighting();

        // Event listeners
        window.addEventListener('resize', () => this.onWindowResize());

        // Start animation
        this.animate();
    }

    private createMainGeometry(): THREE.Mesh {
        const geometry = new THREE.IcosahedronGeometry(10, 0);
        const material = new THREE.MeshPhongMaterial({
            color: 0xD4AF37,        // Rich gold
            emissive: 0xFFD700,     // Bright gold glow
            emissiveIntensity: 0.4, // Luxurious gold effect
            wireframe: true,
            transparent: true,
            opacity: 0.8,           // More visible gold
            shininess: 100,
        });

        const mesh = new THREE.Mesh(geometry, material);
        this.scene.add(mesh);
        return mesh;
    }

    private createSecondaryGeometry(): THREE.Mesh {
        const geometry = new THREE.OctahedronGeometry(6, 0);
        const material = new THREE.MeshPhongMaterial({
            color: 0xFFFFFF,        // Pure white
            emissive: 0xC0C0C0,     // Silver glow
            emissiveIntensity: 0.2,
            wireframe: true,
            transparent: true,
            opacity: 0.5,
        });

        const mesh = new THREE.Mesh(geometry, material);
        this.scene.add(mesh);
        return mesh;
    }

    private createParticles(): THREE.Points {
        // Adjust particle count for performance
        const particleCount = window.innerWidth < 768 ? 500 : 1200;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            // Spread particles in a sphere
            positions[i] = (Math.random() - 0.5) * 120;
            positions[i + 1] = (Math.random() - 0.5) * 120;
            positions[i + 2] = (Math.random() - 0.5) * 120;

            // Gold/white particles with elegant variation
            const colorMix = Math.random();
            if (colorMix > 0.3) {
                // Gold particles (#D4AF37)
                colors[i] = 0.83;       // R
                colors[i + 1] = 0.69;   // G
                colors[i + 2] = 0.22;   // B
            } else {
                // White/silver particles
                colors[i] = 1.0;        // R
                colors[i + 1] = 1.0;    // G
                colors[i + 2] = 1.0;    // B
            }
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: window.innerWidth < 768 ? 1.2 : 1.5,  // Smaller, more subtle
            transparent: true,
            opacity: 0.6,                                // Subtle modern effect
            blending: THREE.AdditiveBlending,            // Soft glow
            vertexColors: true,
            sizeAttenuation: true,
        });

        const points = new THREE.Points(geometry, material);
        this.scene.add(points);
        return points;
    }

    private setupLighting(): void {
        // Ambient light for overall brightness
        const ambientLight = new THREE.AmbientLight(0xFFD700, 0.3);
        this.scene.add(ambientLight);

        // Primary gold light
        const pointLight1 = new THREE.PointLight(0xD4AF37, 1.5, 150);
        pointLight1.position.set(20, 20, 20);
        this.scene.add(pointLight1);

        // Secondary white/silver accent light
        const pointLight2 = new THREE.PointLight(0xFFFFFF, 1.2, 100);
        pointLight2.position.set(-15, -15, 15);
        this.scene.add(pointLight2);

        // Rim light for depth with warm gold
        const pointLight3 = new THREE.PointLight(0xFFD700, 1, 120);
        pointLight3.position.set(0, 30, -30);
        this.scene.add(pointLight3);
    }

    private onWindowResize(): void {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    private animate = (): void => {
        this.animationId = requestAnimationFrame(this.animate);
        this.time += 0.01;

        // Rotate main geometry
        this.geometry.rotation.x += 0.002;
        this.geometry.rotation.y += 0.003;

        // Floating motion - figure-8 orbital pattern
        const orbitRadius = 5;
        this.geometry.position.x = Math.sin(this.time * 0.5) * orbitRadius;
        this.geometry.position.y = Math.sin(this.time * 0.3) * orbitRadius * 0.7;
        this.geometry.position.z = Math.cos(this.time * 0.4) * orbitRadius * 0.5;

        // Pulsing scale effect
        const scale = 1 + Math.sin(this.time * 2) * 0.08;
        this.geometry.scale.set(scale, scale, scale);

        // Secondary geometry moves in opposite pattern
        this.secondaryGeometry.rotation.x -= 0.0015;
        this.secondaryGeometry.rotation.y -= 0.002;
        this.secondaryGeometry.position.x = -Math.sin(this.time * 0.4) * orbitRadius * 0.6;
        this.secondaryGeometry.position.y = -Math.cos(this.time * 0.5) * orbitRadius * 0.5;
        this.secondaryGeometry.position.z = Math.sin(this.time * 0.3) * orbitRadius * 0.4;

        // Rotate and animate particles
        this.particles.rotation.y += 0.0008;
        this.particles.rotation.x += 0.0003;

        // Dynamic particle drift with wave motion
        const positions = this.particles.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
            positions[i + 1] += Math.sin(this.time + i) * 0.02;
        }
        this.particles.geometry.attributes.position.needsUpdate = true;

        this.renderer.render(this.scene, this.camera);
    }

    public destroy(): void {
        if (this.animationId !== null) {
            cancelAnimationFrame(this.animationId);
        }
        this.renderer.dispose();
        window.removeEventListener('resize', () => this.onWindowResize());
    }
}

// Initialize scene when DOM is ready
let scene3d: Scene3D | null = null;

// Only initialize if we're on a page that needs 3D
if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    // Use Intersection Observer to lazy load 3D scene
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !scene3d) {
                scene3d = new Scene3D();
                console.log('✨ Neon 3D scene initialized');
            }
        });
    });

    const container = document.getElementById('canvas-container');
    if (container) {
        observer.observe(container);
    }
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (scene3d) {
        scene3d.destroy();
    }
});

// Typewriter effect for hero description
function typewriter(element: HTMLElement, text: string, speed: number = 80) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typewriter on homepage
if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    window.addEventListener('DOMContentLoaded', () => {
        const typewriterElement = document.getElementById('typewriter');
        if (typewriterElement) {
            // Start after a brief delay for dramatic effect
            setTimeout(() => {
                typewriter(
                    typewriterElement,
                    'Full Stack Rust Engineer | Critical Thinker | Problem Solver',
                    60
                );
            }, 800);
        }
    });
}

// Export for potential future use
export { Scene3D };
