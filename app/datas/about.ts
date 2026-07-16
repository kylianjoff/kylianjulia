interface Association {
    name: string;
    description: string;
    role: string;
    logo: string;
    details?: string[];
}

interface CVInfo {
    lang: string;
    file: string;
}

interface Formation {
    nom: string;
    lieu: string;
    ecole: string;
    description?: string;
    periode: string;
}

interface Experience {
    nom: string;
    lieu: string;
    details?: string[];
    periode: string;
}

interface Skill {
    titre: string;
    logo?: string;
}

interface Skills {
    titre: string;
    skills: Skill[];
}

const associations: Association[] = [
    {
        name: 'Sigmix',
        description: 'Association de mix de Sigma Clermont et ISIMA',
        role: 'Responsable de la communication (02/2026 - actuel) | DJ (05/2025 - actuel)',
        logo: 'images/assos/sigmix.png',
        details: [
            'DJ en soirée.',
            'Assurer l\'ambiance des soirées à l\'ISIMA et à Sigma Clermont.',
            'Fait parti d\'une équipe de trois responsables de la communication.',
            'Relaye principalement la communication auprès des étudiants de l\'ISIMA.',
            'Amélioration de la communication entre plusieurs écoles.'
        ]
    },
    {
        name: 'Image',
        description: 'Junior entreprise de l\'ISIMA',
        role: 'Vice-président (10/2025 - 02/2026)',
        logo: 'images/assos/image.png',
        details: [
            'Aide au relancement de l\'association.',
            'Responsable du lien entre les projets et les étudiants.'
        ]
    },
    {
        name: 'DreZZing',
        description: 'Association de textile et goodies de l\'ISIMA',
        role: 'Trésorier (02/2025 - 02/2026)',
        logo: 'images/assos/drezzing.png',
        details: [
            'Assurer la stabilité financière de l\'association.',
            'Gestion des projets.',
            'Hausse de la trésorerie de l\'association de 223% en un an.'
        ]
    },
    {
        name: 'Shared',
        description: 'Club caritatif de l\'ISIMA',
        role: 'Responsable de la communication interne (03/2025 - 02/2026)',
        logo: 'images/assos/shared.png',
        details: [
            'Membre fondateur du club.',
            'Communication des actions caritatives auprès des étudiants de l\'ISIMA.',
            'Travail avec des associations.',
            'Organisation de la partie associative de l\'événement ZZevent organisé par le BDE ISIMA.'
        ]
    },
    {
        name: 'Isimalt',
        description: 'Club de bière de l\'ISIMA',
        role: 'Responsable de la communication (02/2025 - 02/2026)',
        logo: 'images/assos/isimalt.png',
        details: [
            'Communication des événements de l\'association auprès des étudiants de l\'ISIMA.',
            'Organisation de la cuvée de bière pour le week-end d\'intégration de l\'ISIMA.'
        ]
    }
]

const CVInfos: CVInfo[] = [
    {lang: 'fr', file: ''},
    {lang: 'en', file: ''}
]

const formations: Formation[] = [
    {
        nom: 'Diplôme d\'ingénieur informatique de l\'ISIMA',
        ecole: 'INP ISIMA',
        lieu: 'Aubière, France',
        description: '2ème année d\'ingénieur. Spécialisation en réseaux et sécurité informatique.',
        periode: '09/2024 - En cours'
    },
    {
        nom: 'Licence informatique mention informatique',
        ecole: 'UCA',
        lieu: 'Aubière, France',
        description: 'Validation d\'une équivalence L3 informatique durant ma première année d\'ingénieur à l\'ISIMA.',
        periode: '09/2024 - 07/2025'
    },
    {
        nom: 'CPGE, PTSI PT',
        ecole: 'Lycée Dhuoda',
        lieu: 'Nîmes, France',
        description: '2 années en Classe Préparatoire aux Grandes Ecoles en Physique, Technologie et Sciences de l\'Ingénieur.',
        periode: '09/2022 - 07/2024'
    },
    {
        nom: 'Baccalauréat, Mathématiques et Sciences de l\'Ingénieur',
        ecole: 'Lycée Condorcet',
        lieu: 'Saint-Priest, France',
        periode: '09/2019 - 06/2022'
    }
]

const experiences: Experience[] = [
    {
        nom: 'Développeur Fullstack',
        lieu: 'Bitrustee | Saint-Ouen, France | Stagiaire',
        details: [
            'Amélioration de l\'application MDM (Mobile Device Management) de Bitrustee.',
            'Amélioration de fonctionnalités existantes et ajout de nouvelles fonctionnalités.',
            'Utilisation de React pour le développement frontend et de RUST pour le développement backend.'
        ],
        periode: '03/2026 - En cours'
    },
    {
        nom: 'Vice-président de l\'association Im@ge',
        lieu: 'Aubière, France',
        details: [
            'Junior entreprise de l\'ISIMA.',
            'Participation à la renaissance de la junior entreprise de l\'ISIMA.',
            'Responsable des étudiants dans la réalisation des projets.'
        ],
        periode: '10/2025 - 02/2026',
    },
    {
        nom: 'Trésorier de l\'association DreZZing',
        lieu: 'Aubière, France',
        details: [
            'Association de textiles et de goodies de l\'ISIMA.',
            'Assurer la stabilité financière de l\'association.',
            'Gestion des projets.'
        ],
        periode: '02/2025 - 02/2026'
    },
    {
        nom: 'Préparateur de commande',
        lieu: 'UPS | Saint-Quentin-Fallavier, France | Intérimaire',
        details: [
            'Contrôle des commandes.',
            'Mise en carton des commandes.'
        ],
        periode: '07/2025'
    },
    {
        nom: 'Agent d\'entretien des espaces verts',
        lieu: 'Montpellier Méditérranée Métropole | Vendargues, France | Saisonnier',
        details: [
            'Entretien et nettoyage des espaces verts.',
            'Soufflage et rammassage des feuilles.',
            'Entretien des surfaces : tonte, désherbage, balayage, ratissage et arrosage.'
        ],
        periode: '07/2023'
    }
]

const skills: Skills[] = [
    {
        titre: 'Langages de programmation',
        skills: [
            {titre: 'C', logo: 'https://cdn.simpleicons.org/c/A8B9CC'},
            {titre: 'Java', logo: 'https://cdn.simpleicons.org/openjdk/ED8B00'},
            {titre: 'C++', logo: 'https://cdn.simpleicons.org/cplusplus/00599C'},
            {titre: 'JavaScript', logo: 'https://cdn.simpleicons.org/javascript/F7DF1E'},
            {titre: 'HTML', logo: 'https://cdn.simpleicons.org/html5/E34F26'},
            {titre: 'CSS', logo: 'https://cdn.simpleicons.org/css3/1572B6'},
            {titre: 'Python', logo: 'https://cdn.simpleicons.org/python/3776AB'},
            {titre: 'PHP', logo: 'https://cdn.simpleicons.org/php/777BB4'},
        ],
    },
    {
        titre: 'Web',
        skills: [
            {titre: 'Angular', logo: 'https://cdn.simpleicons.org/angular/DD0031'},
            {titre: 'Next.js', logo: 'https://cdn.simpleicons.org/nextdotjs/FFFFFF'},
            {titre: 'Colyseus'},
            {titre: 'ASP.NET', logo: 'https://cdn.simpleicons.org/dotnet/512BD4'},
        ],
    },
    {
        titre: 'Bases de données',
        skills: [
            {titre: 'MySQL', logo: 'https://cdn.simpleicons.org/mysql/4479A1'},
            {titre: 'PostgreSQL', logo: 'https://cdn.simpleicons.org/postgresql/4169E1'},
        ],
    },
    {
        titre: 'Outils',
        skills: [
            {titre: 'Microsoft Office', logo: 'https://cdn.simpleicons.org/microsoftoffice/D83B01'},
            {titre: 'Microsoft Azure', logo: 'https://cdn.simpleicons.org/microsoftazure/0078D4'},
            {titre: 'Visual Studio', logo: 'https://cdn.simpleicons.org/visualstudio/5C2D91'},
            {titre: 'UNIX', logo: 'https://cdn.simpleicons.org/linux/FFFFFF'},
            {titre: 'GIT', logo: 'https://cdn.simpleicons.org/git/F05032'},
            {titre: 'Docker', logo: 'https://cdn.simpleicons.org/docker/2496ED'},
        ],
    },
    {
        titre: 'Cybersécurité',
        skills: [
            {titre: 'OWASP', logo: 'https://cdn.simpleicons.org/owasp/000000'},
            {titre: 'Pentesting'},
        ],
    }
]

const profileDescription: string[] = [
    "Etudiant ingénieur en informatique spécialisé en réseaux et sécurité informatique.",
    "Passionné par le développement et la cybersécurité.",
    "Toujours occupé par des projets personnels.",
]

export { associations, CVInfos, formations, experiences, skills, profileDescription }
export type { Association, CVInfo, Formation, Experience, Skills }