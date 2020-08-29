'use strict';
import { name, sidebar, experiences } from './data.js';

(async () => {
    // Populate sidebar
    document.getElementById('sidebar-items').innerHTML = sidebar
        .map((name, index) => {
            let active = '';
            if (index === 0) active = ` class="active"`;
            return `<a href="#${name}"${active}>${name}</a>`;
        })
        .join('');

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

    // selected item on sidebar
    document.getElementById('sidebar-items').addEventListener('click', async (event) => {
        await loadContent(event.target.innerText);
        [...event.target.parentElement.children].forEach((eachItem) => {
            eachItem.removeAttribute('class', 'active');
        });
        event.target.setAttribute('class', 'active');
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
          <div class="company_date">
            <div class="position_date">
              <div>${data.workdate().to}</div>
              <div><i class="fas fa-angle-up fa-sm"></i></div>
              <div>${data.workdate().from}</div>
            </div>
            <div class="company_name">${data.company}</div>
          </div>
          ${eachposition(data.positions)}
        </div>
      `;
        };

        document.getElementById('position_list').innerHTML = experiences
            .map((experience) => {
                return `
        <div class="eachexperience">
          ${eachcompany(experience)}
        </div>
      `;
            })
            .join('');
    }

    // menu button animation
    const menuBtn = document.querySelector('.menu-btn');
    if (menuBtn) {
        let menuOpen = false;
        menuBtn.addEventListener('click', () => {
            if (!menuOpen) {
                menuBtn.classList.add('open');
                menuOpen = true;
            } else {
                menuBtn.classList.remove('open');
                menuOpen = false;
            }
        });
    }
})();
