import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  ecole: string,
  description?: string;
  periode: string;
}

interface Experience {
  nom: string;
  lieu: string;
  details?: string[];
  periode: string;
}

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {

  menuCV: boolean = false; 

  toggleMenuCV() {
    this.menuCV = !this.menuCV;
  }

  formation: Formation[] = [
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

  experience: Experience[] = [
    {
      nom: 'Vice-président de l\'association Image',
      lieu: 'Aubière, France',
      details: [
        'Junior entreprise de l\'ISIMA.',
        'Participation à la renaissance de la junior entreprise de l\'ISIMA.',
        'Responsable des étudiants dans la réalisation des projets.'
      ],
      periode: '10/2025 - En cours',
    },
    {
      nom: 'Trésorier de l\'association DreZZing',
      lieu: 'Aubière, France',
      details: [
        'Association de textiles et de goodies de l\'ISIMA.',
        'Assurer la stabilité financière de l\'association.',
        'Gestion des projets.'
      ],
      periode: '02/2025 - En cours'
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

  associations: Association[] = [
    {
      name: 'Image',
      description: 'Junior entreprise de l\'ISIMA',
      role: 'Vice-président (10/2025 - actuel)',
      logo: 'assos/image.png',
      details: [
        'Aide au relancement de l\'association.',
        'Responsable du lien entre les projets et les étudiants.'
      ]
    },
    {
      name: 'DreZZing',
      description: 'Association de textile et goodies de l\'ISIMA',
      role: 'Trésorier (02/2025 - actuel)',
      logo: 'assos/drezzing.png',
      details: [
        'Assurer la stabilité financière de l\'association.',
        'Gestion des projets.'
      ]
    },
    {
      name: 'Shared',
      description: 'Club caritatif de l\'ISIMA',
      role: 'Responsable de la communication interne (03/2025 - actuel)',
      logo: 'assos/shared.png',
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
      role: 'Responsable de la communication (02/2025 - actuel)',
      logo: 'assos/isimalt.jpg'
    },
    {
      name: 'Sigmix',
      description: 'Association de mix de Sigma Clermont et ISIMA',
      role: 'DJ (05/2025 - actuel)',
      logo: 'assos/sigmix.JPEG',
      details: [
        'Débutant.',
        'Assurer l\'ambiance des soirées à l\'ISIMA et à Sigma Clermont.'
      ]
    }
  ]

  selectedAsso?: Association;

  selectAsso(asso: Association) {
    this.selectedAsso = asso;
  }

  blocs = [
    { titre: 'Langages de programmation', skills: ['C', 'Java', 'C++', 'JavaScript', 'HTML', 'CSS', 'Python', 'PHP'] },
    { titre: 'Web', skills: ['Angular', 'Colyseus', 'ASP.NET'] },
    { titre: 'Bases de données', skills: ['PostgreSQL', 'MySQL'] },
    { titre: 'Outils', skills: ['Microsoft Office', 'Microsoft Azure', 'Visual Studio', 'UNIX', 'GIT', 'Docker'] },
    { titre: 'Cybersécurité', skills: ['OWASP', 'Pentesting'] }
  ];

  CV: CVInfo[] = [
    {lang: 'fr', file: ''},
    {lang: 'en', file: ''}
  ]

  modalCV: boolean = false;
  langCV: string = '';

  selectCV(cv: CVInfo) {
    this.langCV = cv.lang;
    this.modalCV = true;
  }

  closeModal() {
    this.modalCV = false;
    this.langCV = '';
  }

  ngAfterViewInit() {
    const lists = document.querySelectorAll<HTMLElement>('.list-competences');
    lists.forEach(list => {
      const children = Array.from(list.children);
      
      // Duplique le contenu 5 fois pour garantir que tout soit plein
      for (let i = 0; i < 5; i++) {
        children.forEach(child => {
          const clone = child.cloneNode(true) as HTMLElement;
          list.appendChild(clone);
        });
      }
    });
  }
}