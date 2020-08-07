'use strict';
import { sidebar } from './data.js';

(async () => {
  // Populate sidebar
  document.getElementById('sidebar-items').innerHTML = sidebar.map((name) => `<a href="#${name}">${name}</a>`).join('');

  // Sidebar content import
  const getContent = async (content) => {
    return await fetch(`assets/pages/${content}.html`)
      .then((response) => response.text())
      .catch((error) => {
        throw new Error(error);
      });
  };

  // Initial Page load
  document.getElementById('content').innerHTML = await getContent(sidebar[0]);

  document.getElementById('sidebar-items').addEventListener('click', async (event) => {
    const selectedSidebar = event.target.innerText;
    const content = await getContent(selectedSidebar);
    document.getElementById('content').innerHTML = content;
  });
})();
