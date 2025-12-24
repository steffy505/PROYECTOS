# 🚀 Despliegue en Netlify - La Casita de las Primas

Sigue estos pasos para tener tu tienda online gratis hoy mismo:

## 1. Antes de subir (Muy Importante)
Abre el archivo `components/CartSidebar.tsx` y realiza estos dos cambios:
- **Línea 25**: Cambia la URL de `qrImageUrl` por el enlace de tu propio código QR de Yape.
- **Línea 40**: Cambia el `phoneNumber` por tu número de WhatsApp (incluyendo el código de país, ej: `51900000000`).

## 2. Publicación con Netlify Drop
1. Guarda todos tus archivos en una carpeta llamada `mi-tienda`.
2. Ve a [app.netlify.com/drop](https://app.netlify.com/drop) (No necesitas registrarte primero, puedes hacerlo al final).
3. Arrastra tu carpeta `mi-tienda` al recuadro azul.
4. En 5 segundos, Netlify te dará una URL pública (ej: `https://tienda-prima-123.netlify.app`).

## 3. ¿Cómo cambiar el nombre del link?
Una vez subido el sitio:
1. Haz clic en **"Site configuration"**.
2. Busca el botón **"Change site name"**.
3. Escribe el nombre que quieras (ej: `lacasitadelasprimas`) y guarda.

---
**Nota:** Este proyecto usa módulos nativos de navegador (ESM), por lo que **NO** necesita comandos de instalación (`npm install`) ni de construcción (`npm build`). Funciona directo al subirlo.
