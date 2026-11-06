export type DesignYear = '2003' | '2006' | '2008';
const designs = {
 '2003': {
  source:'Archivo de 2003', fontSize:10, heading:'heading: 14 px en negrita · subheading: 11 px', text:'#333300',
  colors:[['#2C708F','Fondo'],['#E59E0F','Superficie principal'],['#325E7A','Panel azul'],['#FFFFCC','Noticias'],['#F2D673','Promoción'],['#333300','Texto']],
  background:'#2C708F', pattern:'/habbo-2003/habbo/images/common/habbo_background.gif',
  structure:'Tablas de ancho fijo y GIF que forman las esquinas, bordes y cabeceras. Los ejemplos conservan sus proporciones originales.',
  backgroundNote:'Fondo estampado de la web de octubre de 2003.',
  css:'/habbo-2003/habbo/jsp/default/includes/habbo_style_all.css',
 },
 '2006': {
  source:'Archivo de 2006', fontSize:11, heading:'Cabeceras v2box: 11 px en negrita', text:'#000000',
  colors:[['#083940','Fondo base'],['#3D7AA4','Fondo de Habbo USA'],['#47839D','Enlaces azules'],['#D75C03','Enlaces cálidos'],['#F3F3F3','Superficie darker'],['#E4E4E4','Superficie darkest']],
  background:'#3D7AA4', pattern:'',
  structure:'Paneles v2box, maskbox y portlet-scale compuestos por capas de HTML y sprites GIF. Las cabeceras y los bordes dependen de los recursos de cada variante.',
  backgroundNote:'El CSS base define #083940 y un patrón; style_custom_com.css sustituye el fondo por #3D7AA4 sin patrón en la edición USA.',
  css:'/habbo-2006/_external/images.habbohotel.com/web/web-1.0.1_b39/styles/style.css',
 },
 '2008': {
  source:'HoloCMS · CSS local', fontSize:11, heading:'h2.title: 14 px en negrita · altura de línea: 17 px', text:'#000000',
  colors:[['#E3E3DB','Fondo base'],['#BCE0EE','Cabecera'],['#FC6204','Enlaces y título base'],['#FFFFFF','Superficie'],['#3BA800','Acción positiva'],['#E2001A','Error y cancelación']],
  background:'#E3E3DB', pattern:'/habbo-2008/holocms/web-gallery/v2/images/bg.png',
  structure:'Cards cbb/cb y bordes generados por Rounder (bt, bb, i1, i2 e i3). Botones y ventanas usan sprites; el catálogo adapta sus tamaños sin modificar los CSS fuente.',
  backgroundNote:'Fondo y patrón de la hoja style.css de HoloCMS. Esta fuente local no implica que todas sus modificaciones pertenezcan a la build oficial de 2008.',
  css:'/habbo-2008/holocms/web-gallery/v2/styles/style.css',
 },
};
/** Same foundation sections and presentation for every historical edition. */
export function DesignFoundations({year}:{year:DesignYear}) {
 const design=designs[year];
 return <section id="foundations" className="ds-section ds-foundations"><div className="ds-heading"><h2>Fundamentos</h2><span className="ds-badge original">{design.source}</span></div><p className="ds-description">La base visual de Habbo {year}: colores, tipografía, fondos y estructura, según las hojas de estilo de esta edición.</p><h3>Colores</h3><div className="ds-swatches">{design.colors.map(([color,label])=><div key={color}><span style={{background:color}}/><strong>{label}</strong><code>{color}</code></div>)}</div><h3>Tipografía</h3><p className="ds-muted">Verdana, Arial, Helvetica, sans-serif · Texto base: {design.fontSize} px.<br/>{design.heading}.</p><div className="ds-foundation-type" style={{fontFamily:'Verdana, Arial, Helvetica, sans-serif',fontSize:design.fontSize,color:design.text}}><p>¡Bienvenido al hotel! Un lugar para conocer amigos.</p><p><strong>Texto en negrita</strong> · Texto de muestra con la tipografía de esta edición.</p></div><h3>Fondos y estructura</h3><div className="ds-foundation-background" role="img" aria-label={'Muestra del fondo de Habbo '+year} style={{backgroundColor:design.background,backgroundImage:design.pattern?`url("${design.pattern}")`:'none'}}/><p className="ds-muted">{design.backgroundNote}</p><p className="ds-description">{design.structure}</p><h3>Hoja de estilos</h3><p className="ds-muted"><a href={design.css} target="_blank" rel="noreferrer">Consultar CSS de esta edición ↗</a></p><pre className="ds-install"><code>{`font-family: Verdana, Arial, Helvetica, sans-serif;\nfont-size: ${design.fontSize}px;`}</code></pre><p className="ds-muted">Las hojas históricas incluyen estilos globales; los ejemplos se muestran en documentos aislados.</p></section>;
}
