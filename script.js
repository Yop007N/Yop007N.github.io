const GITHUB_USERNAME = 'Yop007N';
const GITHUB_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;

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
    Ionic: '#3880FF',
    RxJS: '#B7178C',
    Redis: '#DC382D'
};

const featuredProjects = [
    'pagopy-billing-system',
    'ttn-iot-dashboard',
    'ttn-mqtt',
    'proelectris-backend-api',
    'microservices-energy-platform',
    'biblioteca-backend',
    'biblioteca-front-ang'
];

const excludedRepos = ['Orrey-System'];

const projectMetadata = {
    'pagopy-billing-system': {
        description: 'Sistema SaaS de pagos y facturacion electronica para MIPYMEs. Stack: Angular, NestJS, PostgreSQL e Ionic.',
        stack: ['Angular', 'TypeScript', 'NestJS', 'PostgreSQL', 'Ionic']
    },
    'ttn-iot-dashboard': {
        description: 'Frontend para monitoreo LoRaWAN. Stack: Angular 17, TypeScript y RxJS con dashboard en tiempo real.',
        stack: ['Angular', 'TypeScript', 'RxJS']
    },
    'ttn-mqtt': {
        description: 'Gateway MQTT para telemetria IoT con API backend y persistencia en PostgreSQL/Redis.',
        stack: ['TypeScript', 'PostgreSQL', 'Redis', 'Docker']
    },
    'proelectris-backend-api': {
        description: 'API REST para gestion comercial con autenticacion, validaciones y PostgreSQL.',
        stack: ['TypeScript', 'Express', 'PostgreSQL']
    },
    'microservices-energy-platform': {
        description: 'Plataforma de microservicios para dominio energetico basada en Java y Spring Boot.',
        stack: ['Java', 'Docker']
    },
    'app-study': {
        description: 'API para gestion de contenidos academicos por materias, topicos y seguimiento.',
        stack: ['JavaScript', 'PostgreSQL']
    },
    'app-study-ionic-client': {
        description: 'Cliente Ionic Angular de App Study con vistas moviles y flujo autenticado.',
        stack: ['Angular', 'TypeScript', 'Ionic']
    },
    'user-auth-jwt-api': {
        description: 'Servicio de autenticacion con registro/login JWT y persistencia PostgreSQL.',
        stack: ['JavaScript', 'Express', 'PostgreSQL']
    },
    'person-crud-api-nodejs': {
        description: 'API CRUD de personas con Express, TypeScript y Sequelize.',
        stack: ['TypeScript', 'Express', 'PostgreSQL']
    },
    'react-task-crud-app': {
        description: 'Aplicacion React para gestion de tareas con operaciones CRUD y rutas dedicadas.',
        stack: ['React', 'JavaScript']
    },
    'my-portfolio-enri': {
        description: 'Portfolio personal estatico desarrollado con HTML, CSS y JavaScript.',
        stack: ['HTML', 'CSS', 'JavaScript']
    },
    'alura-latam-logic-exercises': {
        description: 'Coleccion de ejercicios de logica de programacion en JavaScript.',
        stack: ['JavaScript', 'HTML', 'CSS']
    }
};

function escapeHtml(value = '') {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

function getLanguageColor(label) {
    return languageColors[label] || '#7b8790';
}

function buildTechBadges(repo, metadata) {
    const stack = metadata?.stack?.length
        ? metadata.stack
        : repo.language
            ? [repo.language]
            : [];

    if (!stack.length) {
        return '';
    }

    const badges = stack.map((tech) => {
        const safeTech = escapeHtml(tech);
        return `
            <span class="tech-badge" style="border-left: 3px solid ${getLanguageColor(tech)};">
                ${safeTech}
            </span>
        `;
    }).join('');

    return `<div class="project-tech">${badges}</div>`;
}

function createProjectStats(repo) {
    const stats = [];

    if (repo.stargazers_count > 0) {
        stats.push(`<span>Stars ${repo.stargazers_count}</span>`);
    }

    if (repo.forks_count > 0) {
        stats.push(`<span>Forks ${repo.forks_count}</span>`);
    }

    if (repo.size) {
        stats.push(`<span>Size ${(repo.size / 1024).toFixed(1)} MB</span>`);
    }

    if (repo.updated_at) {
        const formattedDate = new Date(repo.updated_at).toLocaleDateString('es-PY');
        stats.push(`<span>Updated ${formattedDate}</span>`);
    }

    if (!stats.length) {
        return '';
    }

    return `<div class="project-stats">${stats.join('')}</div>`;
}

function createProjectCard(repo) {
    const isFeatured = featuredProjects.includes(repo.name);
    const metadata = projectMetadata[repo.name];

    const description = metadata?.description
        || repo.description
        || (repo.language
            ? `Proyecto desarrollado principalmente en ${repo.language}.`
            : 'Proyecto de desarrollo de software.');

    return `
        <article class="project-card ${isFeatured ? 'featured' : ''}">
            <div class="project-content">
                <h3 class="project-title">
                    ${escapeHtml(repo.name)}
                    ${isFeatured ? '<span class="featured-badge">Destacado</span>' : ''}
                </h3>
                <p class="project-description">${escapeHtml(description)}</p>
                ${buildTechBadges(repo, metadata)}
                ${createProjectStats(repo)}
                <div class="project-links">
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="project-link">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                        </svg>
                        Ver codigo
                    </a>
                </div>
            </div>
        </article>
    `;
}

async function loadProjects() {
    const projectsContainer = document.getElementById('projects-container');
    const projectsCount = document.getElementById('projects-count');

    try {
        const response = await fetch(GITHUB_API);

        if (!response.ok) {
            throw new Error(`GitHub API status ${response.status}`);
        }

        const repos = await response.json();

        if (!Array.isArray(repos)) {
            throw new Error('Respuesta inesperada de GitHub API');
        }

        const validRepos = repos
            .filter((repo) => !repo.fork)
            .filter((repo) => repo.name !== GITHUB_USERNAME)
            .filter((repo) => repo.name !== `${GITHUB_USERNAME}.github.io`)
            .filter((repo) => !excludedRepos.includes(repo.name));

        projectsCount.textContent = `${validRepos.length}+`;

        validRepos.sort((a, b) => {
            const aFeatured = featuredProjects.includes(a.name);
            const bFeatured = featuredProjects.includes(b.name);

            if (aFeatured && !bFeatured) {
                return -1;
            }

            if (!aFeatured && bFeatured) {
                return 1;
            }

            return new Date(b.updated_at) - new Date(a.updated_at);
        });

        projectsContainer.innerHTML = validRepos
            .map((repo) => createProjectCard(repo))
            .join('');
    } catch (error) {
        console.error('Error al cargar proyectos:', error);
        projectsContainer.innerHTML = `
            <div class="error">
                <p>No se pudieron cargar los proyectos. Intenta nuevamente en unos minutos.</p>
            </div>
        `;
    }
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const targetId = anchor.getAttribute('href');
            const target = targetId ? document.querySelector(targetId) : null;

            if (!target) {
                return;
            }

            event.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}

function initHeaderScrollEffect() {
    const siteHeader = document.querySelector('.site-header');

    if (!siteHeader) {
        return;
    }

    const updateHeaderState = () => {
        if (window.scrollY > 12) {
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }
    };

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState);
}

function initFadeUpReveal() {
    const revealTargets = document.querySelectorAll('.fade-up');

    if (!revealTargets.length) {
        return;
    }

    if (!('IntersectionObserver' in window)) {
        revealTargets.forEach((target) => target.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
        });
    }, {
        threshold: 0.14
    });

    revealTargets.forEach((target) => observer.observe(target));
}

document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initHeaderScrollEffect();
    initFadeUpReveal();
    loadProjects();
});
