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

  associations: Association[] = [
    {
      name: 'Image',
      description: 'Junior entreprise de l\'ISIMA',
      role: 'Vice-président (10/2025 - actuel)',
      logo: 'assos/image.png',
      details: [
        'Aide au relancement de l\'association'
      ]
    },
    {
      name: 'DreZZing',
      description: 'Association de textile et goodies de l\'ISIMA',
      role: 'Trésorier (02/2025 - actuel)',
      logo: 'assos/drezzing.png',
      details: [
        'Assurer la stabilité financière de l\'association',
        'Gestion des projets'
      ]
    },
    {
      name: 'Shared',
      description: 'Club caritatif de l\'ISIMA',
      role: 'Responsable de la communication interne (03/2025 - actuel)',
      logo: 'assos/shared.png',
      details: [
        'Membre fondateur du club',
        'Communication des actions caritatives auprès des étudiants de l\'ISIMA',
        'Travail avec des associations',
        'Organisation de la partie associative de l\'événement ZZevent organisé par le BDE ISIMA'
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
        'Débutant',
        'Assurer l\'ambiance des soirées'
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
    { titre: 'Outils', skills: ['Microsoft Office', 'Visual Studio', 'UNIX', 'GIT'] },
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
}