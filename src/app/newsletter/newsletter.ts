import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './newsletter.html',
  styleUrl: './newsletter.css',
})
export class Newsletter {
  newsletterForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    botField: new FormControl(''), // honeypot : doit rester vide
  });

  envoiEnCours = false;
  envoiReussi = false;
  envoiEchoue = false;

  private readonly DELAI_MIN_MS = 3000; // 3s minimum avant soumission
  private readonly MAX_SOUMISSIONS = 3;
  private readonly FENETRE_MS = 10 * 60 * 1000; // 10 minutes

  private formOuvertA = Date.now();
  private soumissions: number[] = [];

  isRequired(controlName: string): boolean {
    const control = this.newsletterForm.get(controlName);
    return control?.hasValidator(Validators.required) ?? false;
  }

  async onSubmit(): Promise<void> {
    if (this.newsletterForm.invalid) {
      alert('Veuillez remplir tous les champs du formulaire qui ont une étoile rouge !');
      return;
    }

    // Anti-bot honeypot : le champ doit être vide
    if (this.newsletterForm.value.botField) {
      return;
    }

    // Anti-bot délai minimum : un humain met au moins 3 secondes
    if (Date.now() - this.formOuvertA < this.DELAI_MIN_MS) {
      return;
    }

    // Anti-spam : max 3 soumissions par 10 minutes
    const maintenant = Date.now();
    this.soumissions = this.soumissions.filter(t => maintenant - t < this.FENETRE_MS);
    if (this.soumissions.length >= this.MAX_SOUMISSIONS) {
      this.envoiEchoue = true;
      alert('Trop de tentatives. Veuillez patienter quelques minutes avant de réessayer.');
      return;
    }
    this.soumissions.push(maintenant);

    this.envoiEnCours = true;
    this.envoiReussi = false;
    this.envoiEchoue = false;

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: this.newsletterForm.value.email }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      this.envoiReussi = true;
      this.newsletterForm.reset();
      this.formOuvertA = Date.now();
    } catch {
      this.envoiEchoue = true;
    } finally {
      this.envoiEnCours = false;
    }
  }
}
