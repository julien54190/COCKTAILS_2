## Cocktails – Angular + API Express/Sequelize

Petit projet Angular 17 (front) avec une API Node.js/Express + Sequelize (MySQL) pour gérer des cocktails et des utilisateurs.

### Structure
- `src/` : application Angular 17
- `server.ts` : serveur SSR (Angular Universal / Express)
- `api/` : API Express + Sequelize (MySQL) avec routes `cocktails`, `users`, `auth`
- `documentation/` : documentation Compodoc générée (`documentation/index.html`)

### Prérequis
- Node.js LTS et npm
- Angular CLI : `npm i -g @angular/cli`
- MySQL installé et accessible

### Configuration API (.env)
Créer un fichier `.env` dans `api/` :

```env
SERVER_PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=cocktails
DB_USER=root
DB_PASSWORD=motdepasse
JWT_SECRET=changeme
```

### Installation
1) À la racine (front) : `npm install`
2) Dans `api/` (back) : `npm install`

### Lancer en développement
- Front (Angular) : `npm start` puis ouvrir `http://localhost:4200/`
- Back (API) : depuis `api/` → `npm run dev` (ou `npm start`) → `http://localhost:3000/`

### Routes principales (API)
- `GET /` : ping serveur
- `POST /auth/login` : authentification
- `GET/POST/PUT/DELETE /cocktails` : gestion des cocktails
- `GET/POST/PUT/DELETE /users` : gestion des utilisateurs

### Build (front)
- `npm run build` → sortie dans `dist/`

### Documentation
- Scripts : `npm run compodoc`, `npm run compodoc:serve`
- Version statique : dossier `documentation/`

### Notes
- Angular 17 + SSR possible via `server.ts`
- API Express + Sequelize (MySQL), CORS et JSON activés

