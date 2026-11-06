# Fuente histórica y límites de fidelidad

Referencia: Habbo USA, diciembre de 2006, build web-1.0.1_b39, conservada en https://habbo.dek.cx/app/dl/habbohotel2006.zip.

La página inicial sirve el HTML archivado desde `apps/playground/public/habbo-2006/index.html`. Usa las hojas originales style.css, boxes.css, ads.css y style_custom_com.css. No se aplican el reset ni los estilos modernos del playground anterior. Se conservan dimensiones fijas, imágenes, contenido en inglés y estructura original.

Cambios de conservación: rutas CSS de Wayback convertidas a archivos locales; recursos ausentes en una carpeta se resuelven contra otras versiones incluidas en el mismo archivo, registrados en resource-repairs.json. Se eliminaron scripts archivados y eventos inline, incluidos anuncios externos. Los formularios históricos no envían información. El archivo conserva páginas estáticas; no restaura los servicios de Habbo ni el cliente Flash. Las promociones que dependían de JavaScript no rotan.

La librería importa las hojas históricas con sus imágenes locales. Panel reproduce la estructura v2box original. Button, Window y Tabs conservan las recreaciones previas: no son componentes originales extraídos de Flash y no deben describirse como réplicas exactas.

La fidelidad de la página está basada en el código archivado, pero no se ha verificado igualdad píxel por píxel contra una captura contemporánea. Las imágenes faltantes en el archivo pueden impedir esa igualdad.

Los recursos históricos son de terceros. Uso local de estudio; no se publicó ni desplegó el archivo.
