// Configuración
const GITHUB_USERNAME = 'Yop007N';
const GITHUB_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;

// Mapeo de lenguajes a colores
const languageColors = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Python': '#3572A5',
    'Java': '#b07219',
    'PHP': '#4F5D95',
    'Ruby': '#701516',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'Swift': '#ffac45',
    'Kotlin': '#A97BFF',
    'C++': '#f34b7d',
    'C#': '#178600',
    'Shell': '#89e051',
    'Vue': '#41b883',
    'React': '#61dafb',
    'Angular': '#dd0031'
};

// Proyectos destacados (mostrar primero)
const featuredProjects = [
    'pagopy-billing-system',
    'backendproelectris',
    'biblioteca-backend',
    'biblioteca-front-ang'
];

// Función para obtener el color del lenguaje
function getLanguageColor(language) {
    return languageColors[language] || '#8b949e';
}

// Función para crear una tarjeta de proyecto
function createProjectCard(repo) {
    const isFeatured = featuredProjects.includes(repo.name);

    // Usar la descripción del repositorio o un fallback genérico
    const description = repo.description ||
                       (repo.language ? `Proyecto desarrollado principalmente en ${repo.language}` : 'Proyecto de desarrollo');

    return `
        <div class="project-card ${isFeatured ? 'featured' : ''}">
            <div class="project-content">
                <h3 class="project-title">
                    ${repo.name}
                    ${isFeatured ? '<span class="featured-badge">⭐ Destacado</span>' : ''}
                </h3>
                <p class="project-description">
                    ${description}
                </p>
                ${repo.language ? `
                    <div class="project-tech">
                        <span class="tech-badge" style="border-left: 3px solid ${getLanguageColor(repo.language)}">
                            ${repo.language}
                        </span>
                    </div>
                ` : ''}
                <div class="project-stats">
                    ${repo.stargazers_count > 0 ? `<span>⭐ ${repo.stargazers_count}</span>` : ''}
                    ${repo.forks_count > 0 ? `<span>🔄 ${repo.forks_count}</span>` : ''}
                    ${repo.size ? `<span>📦 ${(repo.size / 1024).toFixed(1)} MB</span>` : ''}
                    ${repo.updated_at ? `<span>📅 ${new Date(repo.updated_at).toLocaleDateString('es-PY')}</span>` : ''}
                </div>
                <div class="project-links">
                    <a href="${repo.html_url}" target="_blank" class="project-link">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                        </svg>
                        Ver Código
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Función para cargar los proyectos
async function loadProjects() {
    const projectsContainer = document.getElementById('projects-container');

    try {
        const response = await fetch(GITHUB_API);
        const repos = await response.json();

        // Filtrar repositorios válidos (excluir forks y repo de perfil)
        const validRepos = repos.filter(repo =>
            !repo.fork &&
            repo.name !== GITHUB_USERNAME &&
            repo.name !== `${GITHUB_USERNAME}.github.io`
        );

        // Actualizar contador de proyectos
        document.getElementById('projects-count').textContent = validRepos.length + '+';

        // Ordenar: primero los destacados, luego por fecha de actualización
        validRepos.sort((a, b) => {
            const aFeatured = featuredProjects.includes(a.name);
            const bFeatured = featuredProjects.includes(b.name);

            if (aFeatured && !bFeatured) return -1;
            if (!aFeatured && bFeatured) return 1;

            return new Date(b.updated_at) - new Date(a.updated_at);
        });

        // Generar HTML de los proyectos
        const projectsHTML = validRepos.map(repo => createProjectCard(repo)).join('');

        projectsContainer.innerHTML = projectsHTML;

    } catch (error) {
        console.error('Error al cargar proyectos:', error);
        projectsContainer.innerHTML = `
            <div class="error">
                <p>No se pudieron cargar los proyectos. Por favor, intenta más tarde.</p>
            </div>
        `;
    }
}

// Smooth scroll para los enlaces del menú
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

// Cargar proyectos al cargar la página
document.addEventListener('DOMContentLoaded', loadProjects);
