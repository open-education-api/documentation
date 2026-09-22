(function () {
  let resizeHandler;

  function rightMenuPlugin(hook) {
    hook.doneEach(function () {
      const existingToc = document.getElementById('page-toc');
      if (existingToc) {
        existingToc.remove();
      }

      if (resizeHandler) {
        window.removeEventListener('resize', resizeHandler);
        resizeHandler = null;
      }

      document.body.classList.remove('has-page-toc');
      document.body.classList.remove('page-toc-expanded');

      const page = document.body.dataset.page || '';

      // Do not show the right-hand page menu on changelog pages.
      if (page.endsWith('changelog/changelog.md')) {
        return;
      }

      const route = window.location.hash.split('?')[0];
      const headings = document.querySelectorAll('.markdown-section h2, .markdown-section h3');

      if (headings.length < 6) {
        return;
      }

      const toc = document.createElement('nav');
      toc.id = 'page-toc';
      toc.setAttribute('aria-label', 'On this page');

      const toggle = document.createElement('button');
      toggle.id = 'page-toc-toggle';
      toggle.type = 'button';
      toggle.textContent = 'On this page';
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-controls', 'page-toc-list');

      const list = document.createElement('ul');
      list.id = 'page-toc-list';

      headings.forEach(function (heading) {
        const item = document.createElement('li');
        item.className = 'toc-level-' + heading.tagName.substring(1);

        const link = document.createElement('a');
        link.textContent = heading.textContent;
        link.href = route + '?id=' + heading.id;

        item.appendChild(link);
        list.appendChild(item);
      });

      function setTocState() {
        const expanded = window.innerWidth >= 1400;
        document.body.classList.toggle('page-toc-expanded', expanded);
        toggle.setAttribute('aria-expanded', String(expanded));
      }

      toggle.addEventListener('click', function () {
        const expanded = document.body.classList.toggle('page-toc-expanded');
        toggle.setAttribute('aria-expanded', String(expanded));
      });

      toc.appendChild(toggle);
      toc.appendChild(list);
      document.body.appendChild(toc);
      document.body.classList.add('has-page-toc');

      resizeHandler = setTocState;
      setTocState();
      window.addEventListener('resize', resizeHandler);
    });
  }

  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = [].concat(
    window.$docsify.plugins || [],
    rightMenuPlugin
  );
})();
