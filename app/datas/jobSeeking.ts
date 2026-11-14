interface JobSeeking {
    typeContrat: string;
    domaines: string[];
    langues: string[];
    localisations: string[];
    duree: string;
    disponibilite: string;
    description?: string[];
}

 const jobSeeking: JobSeeking = {
    typeContrat: 'Stage de fin d\'études',
    domaines: ['Développement', 'Réseaux', 'Cybersécurité'],
    langues: ['Français', 'Anglais'],
    localisations: ['Hors France'],
    duree: '6 mois',
    disponibilite: 'Avril 2027',
    description: [
        'Je suis actuellement à la recherche d\'un stage de fin d\'études dans le domaine du développement, des réseaux ou de la cybersécurité. Je suis ouvert à des opportunités à l\'étranger et je suis disponible à partir d\'avril 2027 pour une durée de 6 mois.',
        'I am currently seeking an end-of-study internship in the field of development, networks, or cybersecurity. I am open to opportunities abroad and available from April 2027 for a duration of 6 months.'
    ],
}

export { jobSeeking };
export type { JobSeeking };