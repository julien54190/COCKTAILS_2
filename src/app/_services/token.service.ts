import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  clearTokenExpired() {
    throw new Error('Method not implemented.');
  }

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: any) { }

  // Vérifier si localStorage est disponible
  private isLocalStorageAvailable(): boolean {

    return isPlatformBrowser(this.platformId);
  }

  // Sauvegarder le token
  saveToken(token: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('token', token);
      this.router.navigate(['admin']);
    } else {
      console.error('localStorage n\'est pas disponible.');
    }
  }

  // Vérifier si l'utilisateur est connecté
  isLogged(): boolean {
    if (this.isLocalStorageAvailable()) {
      const token = localStorage.getItem('token');
      return !!token;
    } else {
      console.error('localStorage n\'est pas disponible.');
      return false;
    }
  }

  // Effacer le token
  clearToken(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    } else {
      console.error('localStorage n\'est pas disponible.');
    }
  }

  // Récupérer le token
  getToken(): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem('token');
    } else {
      console.error('localStorage n\'est pas disponible.');
      return null;
    }
  }
}
