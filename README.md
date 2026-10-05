# Sitio web de Laura Cors

Primera maqueta de un sitio institucional y de capacitaciones para Laura Cors. Es un proyecto estático: no necesita instalar dependencias ni ejecutar una compilación.

## Ver localmente

Abrí `index.html` en el navegador o iniciá un servidor local desde esta carpeta:

```powershell
npx serve .
```

## Antes de publicar

1. Reemplazar las fotografías de prensa por archivos originales autorizados por Laura.
2. Validar con Laura los textos biográficos, la cronología y las tres propuestas de curso.
3. Agregar el correo oficial en `index.html`, en el atributo `data-contact-email` de la etiqueta `<html>`.
4. Añadir sus perfiles oficiales de redes sociales cuando estén confirmados.
5. Conectar el formulario a un servicio de correo o formularios si no se desea usar el enlace `mailto:` incluido.

## Estructura

- `index.html`: contenido, SEO y estructura de la página.
- `styles.css`: identidad visual, animaciones y diseño responsive.
- `script.js`: menú móvil, modales, navegación activa y formulario.
- `assets/images`: fotografías de demostración.

El sitio usa `basketball-concepts-logo-hd.png`, una reconstrucción en alta resolución del logo entregado. El archivo `basketball-concepts-logo.jpeg` se conserva intacto como respaldo.

Las versiones terminadas en `-nomask.png` son ediciones generativas realizadas para retirar el barbijo. Los JPG originales se conservan en la misma carpeta como respaldo.

## Fuentes del contenido

- Confederación Argentina de Básquet.
- Liga Nacional de Básquet.
- Secretaría de Deportes de la Nación.
- La Nueva, Página/12, TyC Sports e Infobae.

Las imágenes descargadas de medios se usan únicamente en esta maqueta. Deben reemplazarse o licenciarse antes de una publicación comercial.
