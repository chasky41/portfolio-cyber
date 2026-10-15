# Portfolio cybersécurité · Charaf-Eddine BERHILI

Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion. Bilingue FR/EN, thème sombre/clair, mode recruteur, terminal interactif.

## Lancer en local

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Modifier le contenu

Tout le contenu est dans **`src/data/profile.ts`** (champs `{ fr, en }`). Les libellés d'interface sont dans `src/data/ui.ts`.
Les `TODO` dans `profile.ts` sont à compléter (téléphone, liens GitHub des projets, cyber industrielle). Un lien projet vide n'est pas affiché.
Téléphone : renseignez `phone` et passez `showPhone` à `true`.

## Remplacer la photo et les CV

- Photo : remplacez `public/profile.jpg` (carré, 600×600 conseillé).
- CV : remplacez `public/cv/cv-pentest.pdf` (même nom) puis changez `?v=3` en `?v=4` dans `src/data/profile.ts` pour forcer le rechargement. Pour ajouter un CV, ajoutez une ligne dans `cvs`.
  Attention : ces PDF sont publics, retirez-en les informations que vous ne voulez pas exposer (téléphone, adresse).

## Formulaire de contact

Créez un formulaire sur formspree.io, puis définissez `NEXT_PUBLIC_FORMSPREE_ID` (Vercel > Settings > Environment Variables, puis redéployez). Sans cette variable, le formulaire ouvre un `mailto:`.

## Déployer

```bash
vercel --prod
```

## Ajouter un nom de domaine

1. Vercel > Project > Settings > Domains > Add, puis suivez les DNS indiqués chez votre registrar.
2. Mettez à jour `site.url` dans `src/data/profile.ts` et `Canonical` / `Policy` dans `public/.well-known/security.txt`.
3. Renouvelez la date `Expires` de `security.txt` au moins une fois par an.
4. Redéployez.

## Sécurité

La CSP (nonce par requête, `strict-dynamic`) est définie dans `src/proxy.ts`, les autres en-têtes dans `next.config.ts`. Si vous ajoutez une origine externe (script, image, API), autorisez-la explicitement dans la CSP. Vérifiez avec `npm audit --omit=dev` avant chaque mise en ligne et testez sur securityheaders.com.
