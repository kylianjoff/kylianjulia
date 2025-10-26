import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface BlogPost {
  title: string;
  thumbnail?: string;
  date: string;
  author: string;
  file: string;
  excerpt: string;
}

interface ProjetPost {
  title: string;
  thumbnail?: string;
  date: string;
  author: string;
  file: string;
  excerpt: string;
}

interface ConsoleLine {
  type: 'command' | 'result' | 'ls';
  prompt?: string;
  command?: string;
  result?: string;
  lsResults?: Array<{ name: string; type: string }>;
  animated?: boolean;
  displayedCommand?: string;
  isTyping?: boolean;
  isClearCommand?: boolean; // Nouveau: pour identifier la commande clear
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {
  blogPosts: BlogPost[] = [];
  projetPosts: ProjetPost[] = [];
  nbrBlog: number = 0;
  nbrProjet: number = 0;

  // Variables pour l'animation console
  lines: ConsoleLine[] = [
    { type: 'command', prompt: 'kylian@pc:~$ ', command: 'cd trucsInutile/', animated: true },
    { type: 'command', prompt: 'kylian@pc:~/trucsInutile$ ', command: './meilleurDev', animated: true },
    { type: 'result', result: '-bash: ./meilleurDev: Aucun fichier ou dossier de ce type' },
    { type: 'command', prompt: 'kylian@pc:~/trucsInutile$ ', command: './bestDev', animated: true },
    { type: 'result', result: '-bash: ./bestDev: Aucun fichier ou dossier de ce type' },
    { type: 'command', prompt: 'kylian@pc:~/trucsInutile$ ', command: 'ls', animated: true },
    { 
      type: 'ls', 
      lsResults: [
        { name: 'Banque', type: 'folder' },
        { name: 'Cours', type: 'folder' },
        { name: 'CV_Kylian_Julia.pdf', type: 'file-pdf' },
        { name: 'kylian', type: 'file' },
        { name: 'Projets', type: 'folder' },
        { name: 'resume_Kylian_Julia.pdf', type: 'file-pdf' }
      ]
    },
    { type: 'command', prompt: 'kylian@pc:~/trucsInutile$ ', command: './kylian', animated: true },
    { type: 'result', result: 'Segmentation fault (core dumped)' },
    { type: 'command', prompt: 'kylian@pc:~/trucsInutile$ ', command: 'cd ../ && clear', animated: true, isClearCommand: true }
  ];

  visibleLines: ConsoleLine[] = [];
  currentLineIndex = 0;
  currentCharIndex = 0;
  
  private animationTimeout: any;
  private typingSpeed = 80; // ms par caractère
  private delayBetweenLines = 500; // ms entre les lignes
  private delayBeforeClear = 2000; // ms avant la dernière commande (clear)

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Chargement des données blog et projets
    this.http.get<ProjetPost[]>('').subscribe(data => {
      this.projetPosts = data.sort((a, b) => {
        const [dayA, monthA, yearA] = a.date.split('/').map(Number);
        const [dayB, monthB, yearB] = b.date.split('/').map(Number);

        const dateA = new Date(yearA, monthA, dayA);
        const dateB = new Date(yearB, monthB, dayB);

        return dateB.getTime() - dateA.getTime();
      }).slice(0,2);
    });

    this.http.get<BlogPost[]>('assets/blog-index.json').subscribe(data => {
      this.blogPosts = data.sort((a, b) => {
        const [dayA, monthA, yearA] = a.date.split('/').map(Number);
        const [dayB, monthB, yearB] = b.date.split('/').map(Number);

        const dateA = new Date(yearA, monthA - 1, dayA);
        const dateB = new Date(yearB, monthB - 1, dayB);

        return dateB.getTime() - dateA.getTime();
      }).slice(0,2);
    });

    this.http.get<ProjetPost[]>('').subscribe(data => {
      this.nbrProjet = data.length;
    });

    this.http.get<BlogPost[]>('assets/blog-index.json').subscribe(data => {
      this.nbrBlog = data.length;
    });

    // Démarrer l'animation console
    this.startAnimation();
  }

  ngOnDestroy() {
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }
  }

  // Méthodes pour l'animation console
  startAnimation() {
    this.animateNextLine();
  }

  animateNextLine() {
    if (this.currentLineIndex >= this.lines.length) {
      // Toutes les lignes sont affichées, recommencer
      this.resetAnimation();
      return;
    }

    const currentLine = this.lines[this.currentLineIndex];

    // Si c'est la commande clear, ajouter un délai avant de la taper
    if (currentLine.isClearCommand) {
      this.animationTimeout = setTimeout(() => {
        this.animateTyping(currentLine);
      }, this.delayBeforeClear);
    } else if (currentLine.type === 'command' && currentLine.animated) {
      this.animateTyping(currentLine);
    } else {
      this.visibleLines.push({ ...currentLine });
      this.currentLineIndex++;
      this.animationTimeout = setTimeout(() => {
        this.animateNextLine();
      }, this.delayBetweenLines);
    }
  }

  animateTyping(line: ConsoleLine) {
    if (!line.command) return;

    if (this.currentCharIndex === 0) {
      // Ajouter la ligne avec le texte vide au début
      this.visibleLines.push({ 
        ...line, 
        displayedCommand: '',
        isTyping: true 
      });
    }

    if (this.currentCharIndex < line.command.length) {
      // Mettre à jour le texte affiché de la dernière ligne
      const lastIndex = this.visibleLines.length - 1;
      this.visibleLines[lastIndex].displayedCommand = line.command.substring(0, this.currentCharIndex + 1);
      this.currentCharIndex++;
      
      this.animationTimeout = setTimeout(() => {
        this.animateTyping(line);
      }, this.typingSpeed);
    } else {
      // Fin de la ligne
      const lastIndex = this.visibleLines.length - 1;
      this.visibleLines[lastIndex].displayedCommand = line.command;
      this.visibleLines[lastIndex].isTyping = false;
      
      this.currentCharIndex = 0;
      this.currentLineIndex++;
      
      // Si c'est la commande clear, nettoyer immédiatement l'écran
      if (line.isClearCommand) {
        this.animationTimeout = setTimeout(() => {
          this.resetAnimation();
        }, 200); // Très court délai pour simuler l'exécution du clear
      } else {
        this.animationTimeout = setTimeout(() => {
          this.animateNextLine();
        }, this.delayBetweenLines);
      }
    }
  }

  resetAnimation() {
    this.visibleLines = [];
    this.currentLineIndex = 0;
    this.currentCharIndex = 0;
    this.startAnimation();
  }
}