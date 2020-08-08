'use strict';
import { experiences } from '/assets/js/data.js';
(async () => {
  const position_date = (from, to) => `
                  <div class="position_date">
                        <div>${to}</div>
                        <div><i class="fas fa-angle-up fa-sm"></i></div>
                        <div>${from}</div>
                  </div>
            `;
  const eachcompany = (data) => {
    const company_name = (name) => `<div class="company_name">${name}</div>`;
  };

  experiences.forEach((experience) => {
    console.log(experience);
  });
})();
