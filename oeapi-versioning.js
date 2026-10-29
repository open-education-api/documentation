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
   * Set header background based on version status.
   */
  function updateHeaderColour() {
    const activeVersion = getActiveVersion();
    const header = document.querySelector('.topbar');
    if (!activeVersion || !header) return;

    const colours = {
      current: '#17233d',
      old: '#FFC400',
      beta: '#2CA1A3',
      unreleased: '#2CA1A3'
    };

    header.style.backgroundColor = colours[activeVersion.status] || colours.current;
  }

  /**
   * Initialise header version dropdown.
   */
  function initialiseVersionDropdown() {
    if (!VERSIONS_CFG || !Array.isArray(VERSIONS_CFG.versions)) return;

    const menu = document.querySelector('.version-menu');
    const button = document.getElementById('version-toggle');
    const dropdown = document.getElementById('version-dropdown');
    const activeVersion = getActiveVersion();

    if (!menu || !button || !dropdown || !activeVersion) return;

    button.textContent = activeVersion.label + ' ▾';
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-haspopup', 'true');

    dropdown.replaceChildren();

    VERSIONS_CFG.versions.forEach(version => {
      const link = document.createElement('a');
      link.href = '/' + version.folder + '/';
      link.textContent = version.label;

      if (version.folder === activeVersion.folder) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }

      dropdown.appendChild(link);
    });

    button.addEventListener('click', function () {
      const isOpen = menu.classList.toggle('open');
      button.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', function (event) {
      if (!menu.contains(event.target)) {
        menu.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        menu.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /**
   * Override Docsify Versioned Plugin to ensure stable URLs.
   */
  function initialiseVersionSwitch() {
    document.addEventListener(
      'change',
      function (event) {
        const select = event.target;
        if (!select || select.tagName !== 'SELECT') return;
        event.stopImmediatePropagation();
        fetch(window.location.origin + '/' + select.value + '/' + window.location.hash.replace(/^#\/?/, '') + '.md', { method: 'HEAD' })
          .then(function (result) { window.location.href = result.ok ? window.location.origin + '/' + select.value + '/' + window.location.hash : window.location.origin + '/' + select.value;})
          .catch(function () { window.location.href = window.location.origin + '/' + select.value; });
      },
      true
    );
  }

  function initialise() {
    // kleine delay zodat Docsify de layout klaar heeft
    setTimeout(renderBanner, 80);
    setTimeout(updateHeaderColour, 80);
    initialiseVersionSwitch();
    initialiseVersionDropdown();
  }

  /* --- Execution (side-effects) ------------------------------------------- */

  // Ensure current path folder exists in versions config.
  // If not, add it as an extra entry so the version selector always shows.
  if (VERSIONS_CFG && Array.isArray(VERSIONS_CFG.versions)) {
    const folder = (location.pathname || '/').split('/').filter(Boolean)[0];
    if (folder && !VERSIONS_CFG.versions.some(v => v && v.folder === folder)) {
      VERSIONS_CFG.versions.push({
        folder: folder,
        label: folder,
        text: folder,
        status: 'unreleased'
      });
    }
  }

  // Apply config to Docsify versions (single source: versions.json).
  if (window.$docsify) {
    const docsifyVersions = toDocsifyVersions();
    if (docsifyVersions && docsifyVersions.length) {
      window.$docsify.versions = docsifyVersions;
      window.$docsify.versionSelectorLabel = window.$docsify.versionSelectorLabel || 'Version';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialise);
  } else {
    initialise();
  }
})();
