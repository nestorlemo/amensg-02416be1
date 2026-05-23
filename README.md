# AMENSG Landing (Vite + React)

Landing corporativa estática de AMENSG, construida con Vite + React y preparada para despliegue en AWS S3 + CloudFront.

## Desarrollo local

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Variables de entorno

Crear un `.env` local (no versionado) a partir de `.env.example`:

```bash
VITE_CONTACT_API_URL=
```

- `VITE_CONTACT_API_URL`: endpoint público de API Gateway para recepción de formularios de contacto.
- Si no está configurada, el formulario no rompe la página y muestra un error claro.

## Deploy manual a S3

```bash
aws s3 sync dist/ s3://NOMBRE_BUCKET --delete
```

## Invalidación de CloudFront

```bash
aws cloudfront create-invalidation --distribution-id DISTRIBUTION_ID --paths "/*"
```

## Notas CloudFront + S3

- Recomendado: bucket privado.
- Recomendado: Origin Access Control (OAC).
- Configurar respuestas de error SPA:
  - `403 -> /index.html` con status `200`
  - `404 -> /index.html` con status `200`
- Caché recomendada:
  - `/assets/*` con caché largo.
  - `/index.html` con caché corto.
