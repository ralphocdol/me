'use strict';
import { name, sidebar } from './data.js';

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
  const webtitle_name = `${name.fullname().toLowerCase().replace(/\s/g, '')}`;
  const urlHash = window.location.hash;
  const initialPageName = urlHash ? urlHash.substr(1) : sidebar[0];
  document.getElementById('content').innerHTML = await getContent(initialPageName);
  document.getElementById('webtitle').innerHTML = `${webtitle_name} | ${initialPageName}`;

  document.getElementById('sidebar-items').addEventListener('click', async (event) => {
    const selectedSidebar = event.target.innerText;
    document.getElementById('webtitle').innerHTML = `${webtitle_name} | ${selectedSidebar}`;
    const content = await getContent(selectedSidebar);
    document.getElementById('content').innerHTML = content;
  });
})();
