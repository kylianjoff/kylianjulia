import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  contactForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
    botField: new FormControl(''), // honeypot : doit rester vide
  });

  envoiEnCours = false;
  envoiReussi = false;
  envoiEchoue = false;

  private readonly FORMSPREE_ID = 'xdawzlnd';
  private readonly DELAI_MIN_MS = 3000; // 3s minimum avant soumission
  private readonly MAX_SOUMISSIONS = 3;
  private readonly FENETRE_MS = 10 * 60 * 1000; // 10 minutes

  private formOuvertA = Date.now();
  private soumissions: number[] = [];

  isRequired(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
    return control?.hasValidator(Validators.required) ?? false;
  }

  async envoyerFormulaire(): Promise<void> {
    const { firstName, lastName, email, subject, message } = this.contactForm.value;

    const body = new URLSearchParams({
      'form-name': 'contact',
      'bot-field': '',
      firstName: firstName ?? '',
      lastName: lastName ?? '',
      email: email ?? '',
      subject: subject ?? '',
      message: message ?? '',
    });

    // Priorité 1 : Netlify Forms
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (response.ok) {
        this.envoiReussi = true;
        this.contactForm.reset();
        return;
      }
    } catch { /* Netlify indisponible, on passe au fallback */ }

    // Fallback : Formspree
    try {
      const response = await fetch(`https://formspree.io/f/${this.FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: body,
      });
      if (response.ok) {
        this.envoiReussi = true;
        this.contactForm.reset();
        return;
      }
    } catch { /* Les deux services sont indisponibles */ }

    this.envoiEchoue = true;
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.invalid) {
      alert('Veuillez remplir tous les champs du formulaire qui ont une étoile rouge !');
      return;
    }

    // Anti-bot honeypot : le champ doit être vide
    if (this.contactForm.value.botField) {
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
    await this.envoyerFormulaire();
    this.envoiEnCours = false;
  }
}
