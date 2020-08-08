'use strict';
import { name, sidebar, experiences } from './data.js';

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
  await loadContent(initialPageName);

  document.getElementById('sidebar-items').addEventListener('click', async (event) => {
    await loadContent(event.target.innerText);
  });

  async function loadContent(pageName) {
    document.getElementById('content').innerHTML = '';
    document.getElementById('webtitle').innerHTML = `${webtitle_name} | ${pageName}`;
    document.getElementById('content').innerHTML = await getContent(pageName);
    try {
      eval(pageName + 'FN()');
    } catch (e) {
      console.error(pageName + 'FN() does not exist!');
    }
  }

  async function experienceFN() {
    const position_date = (workdate) => `
      <div class="position_date">
            <div>${workdate.to}</div>
            <div><i class="fas fa-angle-up fa-sm"></i></div>
            <div>${workdate.from}</div>
      </div>
    `;
    const eachposition = (positions) => {
      return positions
        .map((position) => {
          const workdetails = position.workdetails.map((eachworkdetails) => `<li>${eachworkdetails}</li>`).join('');
          return `
          <div class="position_container">
          <div class="position_name">${position.name} <span>(${position.workdate.from} – ${position.workdate.to})</span></div>
            <div class="position_details">
              <ul>
                ${workdetails !== '' ? workdetails : '<li>None</li>'}
              </ul>
            </div>
          </div>
        `;
        })
        .join('');
    };
    const eachcompany = (data) => {
      return `
        <div class="eachcompany">
          <div class="company_name">${data.company}</div>
          ${eachposition(data.positions)}
        </div>
      `;
    };

    document.getElementById('position_list').innerHTML = experiences
      .map((experience) => {
        return `
        <div class="eachexperience">
          ${position_date(experience.workdate())}
          ${eachcompany(experience)}
        </div>
      `;
      })
      .join('');
  }
})();
