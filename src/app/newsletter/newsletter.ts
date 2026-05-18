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

  isRequired(controlName: string): boolean {
    const control = this.newsletterForm.get(controlName);
    return control?.hasValidator(Validators.required) ?? false;
  }

  async onSubmit(): Promise<void> {
    if (this.newsletterForm.invalid) {
      return;
    }

    if (this.newsletterForm.value.botField) {
      return;
    }

    this.envoiEnCours = true;
    this.envoiReussi = false;
    this.envoiEchoue = false;

    const body = new URLSearchParams({
      'form-name': 'newsletter',
      'bot-field': '',
      email: this.newsletterForm.value.email ?? '',
    });

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (response.ok) {
        this.envoiReussi = true;
        this.newsletterForm.reset();
      } else {
        this.envoiEchoue = true;
      }
    } catch {
      this.envoiEchoue = true;
    } finally {
      this.envoiEnCours = false;
    }
  }
}

