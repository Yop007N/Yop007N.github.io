// Configuration
const GITHUB_USERNAME = 'Yop007N';
const GITHUB_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;

// Language colors
const languageColors = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Python: '#3572A5',
    Java: '#b07219',
    PHP: '#4F5D95',
    Ruby: '#701516',
    Go: '#00ADD8',
    Rust: '#dea584',
    Swift: '#ffac45',
    Kotlin: '#A97BFF',
    'C++': '#f34b7d',
    'C#': '#178600',
    Shell: '#89e051',
    Vue: '#41b883',
    React: '#61dafb',
    Angular: '#dd0031',
    PostgreSQL: '#336791',
    MySQL: '#4479A1',
    NestJS: '#E0234E',
    Express: '#8b949e',
    Docker: '#2496ED',
    Ionic: '#3880FF'
};

// Featured projects shown first
const featuredProjects = [
    'pagopy-billing-system',
    'ttn-iot-dashboard',
    'ttn-mqtt',
    'proelectris-backend-api',
    'microservices-energy-platform',
    'biblioteca-backend',
    'biblioteca-front-ang'
];

// Repositories to exclude from the cards
const excludedRepos = ['Orrey-System'];

// Curated metadata to keep descriptions aligned with the actual stack
const projectMetadata = {
    'pagopy-billing-system': {
        description: 'Sistema SaaS de pagos y facturacion electronica para MIPYMEs. Stack: Angular, NestJS, PostgreSQL, Ionic.',
        stack: ['Angular', 'TypeScript', 'NestJS', 'PostgreSQL']
    },
    'ttn-iot-dashboard': {
        description: 'Frontend para monitoreo LoRaWAN. Stack: React, TypeScript, Tailwind CSS y React Router.',
        stack: ['React', 'TypeScript', 'CSS']
    },
    'ttn-mqtt': {
        description: 'Gateway MQTT para telemetria IoT con API backend y persistencia. Stack: Node.js, TypeScript, PostgreSQL, Redis.',
        stack: ['TypeScript', 'PostgreSQL']
    },
    'proelectris-backend-api': {
        description: 'API REST para gestion de clientes y productos. Stack: Node.js, Express, TypeScript, PostgreSQL.',
        stack: ['TypeScript', 'Express', 'PostgreSQL']
    },
    'microservices-energy-platform': {
        description: 'Plataforma de microservicios para dominio energetico. Stack: Java, Spring Boot, Maven.',
        stack: ['Java']
    },
    'app-study': {
        description: 'API para organizacion de contenidos academicos por materias y topicos.',
        stack: ['JavaScript', 'PostgreSQL']
    },
    'app-study-ionic-client': {
        description: 'Cliente Ionic Angular para App Study con navegacion y vistas moviles.',
        stack: ['Angular', 'TypeScript', 'Ionic']
    },
    'user-auth-jwt-api': {
        description: 'Backend de autenticacion con registro/login y JWT usando PostgreSQL.',
        stack: ['JavaScript', 'Express', 'PostgreSQL']
    },
    'person-crud-api-nodejs': {
        description: 'API CRUD de personas con Express, TypeScript y Sequelize.',
        stack: ['TypeScript', 'Express', 'PostgreSQL']
    },
    'react-task-crud-app': {
        description: 'Aplicacion React para gestion de tareas CRUD con rutas de creacion y actualizacion.',
        stack: ['React', 'JavaScript']
    },
    'my-portfolio-enri': {
        description: 'Portfolio personal estatico. Stack: HTML, CSS y JavaScript.',
        stack: ['HTML', 'CSS', 'JavaScript']
    },
    'alura-latam-logic-exercises': {
        description: 'Coleccion de ejercicios y practicas de logica de programacion (Alura LATAM).',
        stack: ['JavaScript', 'HTML', 'CSS']
    }
};

function getLanguageColor(label) {
    return languageColors[label] || '#8b949e';
}

function buildTechBadges(repo, metadata) {
    const stack = metadata?.stack?.length
        ? metadata.stack
        : (repo.language ? [repo.language] : []);

    if (!stack.length) return '';

    const badges = stack.map((tech) => `
        <span class="tech-badge" style="border-left: 3px solid ${getLanguageColor(tech)}">
            ${tech}
        </span>
    `).join('');

    return `<div class="project-tech">${badges}</div>`;
}

function createProjectCard(repo) {
    const isFeatured = featuredProjects.includes(repo.name);
    const metadata = projectMetadata[repo.name];
    const description = metadata?.description ||
        repo.description ||
        (repo.language ? `Proyecto desarrollado principalmente en ${repo.language}` : 'Proyecto de desarrollo');

    return `
        <div class="project-card ${isFeatured ? 'featured' : ''}">
            <div class="project-content">
                <h3 class="project-title">
                    ${repo.name}
                    ${isFeatured ? '<span class="featured-badge">Destacado</span>' : ''}
                </h3>
                <p class="project-description">${description}</p>
                ${buildTechBadges(repo, metadata)}
                <div class="project-stats">
                    ${repo.stargazers_count > 0 ? `<span>? ${repo.stargazers_count}</span>` : ''}
                    ${repo.forks_count > 0 ? `<span>? ${repo.forks_count}</span>` : ''}
                    ${repo.size ? `<span>?? ${(repo.size / 1024).toFixed(1)} MB</span>` : ''}
                    ${repo.updated_at ? `<span>?? ${new Date(repo.updated_at).toLocaleDateString('es-PY')}</span>` : ''}
                </div>
                <div class="project-links">
                    <a href="${repo.html_url}" target="_blank" class="project-link">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                        </svg>
                        Ver Codigo
                    </a>
                </div>
            </div>
        </div>
    `;
}

async function loadProjects() {
    const projectsContainer = document.getElementById('projects-container');

    try {
        const response = await fetch(GITHUB_API);
        const repos = await response.json();

        const validRepos = repos.filter((repo) =>
            !repo.fork &&
            repo.name !== GITHUB_USERNAME &&
            repo.name !== `${GITHUB_USERNAME}.github.io` &&
            !excludedRepos.includes(repo.name)
        );

        document.getElementById('projects-count').textContent = `${validRepos.length}+`;

        validRepos.sort((a, b) => {
            const aFeatured = featuredProjects.includes(a.name);
            const bFeatured = featuredProjects.includes(b.name);

            if (aFeatured && !bFeatured) return -1;
            if (!aFeatured && bFeatured) return 1;
            return new Date(b.updated_at) - new Date(a.updated_at);
        });

        projectsContainer.innerHTML = validRepos.map((repo) => createProjectCard(repo)).join('');
    } catch (error) {
        console.error('Error al cargar proyectos:', error);
        projectsContainer.innerHTML = `
            <div class="error">
                <p>No se pudieron cargar los proyectos. Por favor, intenta mas tarde.</p>
            </div>
        `;
    }
}

// Smooth scroll for menu links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
});

document.addEventListener('DOMContentLoaded', loadProjects);
