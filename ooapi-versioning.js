/*
 *  OOAPI Documentation Version Handling
 *  ------------------------------------------------------
    - Informational banner indicating a version that is not the latest, but may still be under maintenance
    - Banner is fixed at the top of the viewport
    - All alignment handled via CSS
    - Version selector overridden for clean URLs
 */

(function () {
  // Load versions.json once (synchronously) so Docsify (and the versioned plugin) can use it.
  const VERSIONS_CFG = (function () {
    try {
      const url = new URL('versions.json', (document.currentScript && document.currentScript.src) ? document.currentScript.src : window.location.href).toString();
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.send(null);
      if (xhr.status >= 200 && xhr.status < 300) return JSON.parse(xhr.responseText);
      return null;
    } catch (e) { return null; }
  })();

  /**
   * Get active version
   */
  function getActiveVersion() {
    if (!VERSIONS_CFG || !Array.isArray(VERSIONS_CFG.versions)) return null;
	  let activeVersion = VERSIONS_CFG.versions.find(versionEntry => (location.pathname + '/').startsWith(`/${versionEntry.folder}/`) );
    if (!activeVersion) activeVersion = VERSIONS_CFG.versions.find(versionEntry => (VERSIONS_CFG.current === versionEntry.label) );
    return activeVersion;
  }
    
  /**
   * Add current folder to versions for Docsify versioned plugin.
   */
    function toDocsifyVersions() {
    if (!VERSIONS_CFG || !Array.isArray(VERSIONS_CFG.versions)) return null;
    const activeVersion = getActiveVersion();
    if (!activeVersion) return null; // exit if no active version found
    return VERSIONS_CFG.versions
      .map(version => {
        return {
          folder: version.folder,
          label: version.label,
          default: version.folder === activeVersion.folder
        };
      });
  }

  /**
   * Render banner depending on version.
   * Layout wordt volledig door CSS gedaan.
   */
  function renderBanner() {
    const activeVersion = getActiveVersion();
    if (!activeVersion) return; // exit if no active version found
    let currentVersion = VERSIONS_CFG.versions.find(versionEntry => (VERSIONS_CFG.current === versionEntry.label) );
    if (!currentVersion) currentVersion = activeVersion // make current same as active to avoid errors
    const banner = document.getElementById('version-banner');
    if (!banner) return; // exit if no banner element
    if (activeVersion.status === 'current') { // Current version
      banner.style.display = 'none';
      document.body.classList.remove('with-banner');
      banner.className = '';
      banner.innerHTML = '';
    } else { // non current, start with assumption of unreleased, change if beta or old
      let className = 'banner-unreleased';
      let bannerContent = `<strong>OOAPI ${activeVersion.text}</strong>`;
      if (activeVersion.status === 'beta') {
        className = 'banner-beta';
        bannerContent = `<strong>OOAPI ${activeVersion.text}</strong> (beta) Latest stable: <a href="/${currentVersion.folder}/">${currentVersion.text}</a>`;
      } else if (activeVersion.status === 'old') {
        className = 'banner-old';
        bannerContent = `<strong>OOAPI ${activeVersion.text}</strong> (old) Latest stable: <a href="/${currentVersion.folder}/">${currentVersion.text}</a>`;
      }
      banner.className = className;
      banner.innerHTML = `<div class="version-banner-inner">${bannerContent}</div>`;
      banner.style.display = 'block';
      document.body.classList.add('with-banner');
    }
  }

  /**
   * Override Docsify Versioned Plugin to ensure stable URLs.
   */
  function initialiseVersionSwitch() {
    document.addEventListener(
      'change',
      function (event) {
        const el = event.target;
        if (!el || el.tagName !== 'SELECT') return;

        const folder = (el.value || '').replace(/^\/|\/$/g, '');
        if (!folder) return;

        event.stopImmediatePropagation();

        const hash = window.location.hash || '#/';
        const base = window.location.origin;

        window.location.href =
          base + '/' + folder + '/' + hash.replace(/^#?/, '#');
      },
      true
    );
  }

  function initialise() {
    // kleine delay zodat Docsify de layout klaar heeft
    setTimeout(renderBanner, 80);
    initialiseVersionSwitch();
  }

  // Apply config to Docsify versions (single source: versions.json).
  (function applyConfig() {
    if (window.$docsify) {
      const docsifyVersions = toDocsifyVersions();
      if (docsifyVersions && docsifyVersions.length) {
        window.$docsify.versions = docsifyVersions;
        window.$docsify.versionSelectorLabel = window.$docsify.versionSelectorLabel || 'Version';
      }
    }
  })();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialise);
  } else {
    initialise();
  }
})();
