if (window.location.pathname.startsWith('/design-system-2003')) {
  import('./design-system-2003');
} else if (window.location.pathname.startsWith('/design-system-2008')) {
  import('./design-system-2008');
} else if (window.location.pathname.startsWith('/design-system')) {
  import('./design-system');
} else {
  import('./version-index');
}
