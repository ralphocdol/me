export const name = {
  firstname: 'Ralph',
  lastname: 'Ocdol',
  fullname: function () {
    return this.firstname + ' ' + this.lastname;
  },
};

export const sidebar = ['whoami', 'skills', 'experience'];

function workdate(data) {
  const position_length = data.positions.length;
  let returnval = {
    from: '',
    to: '',
  };
  if (position_length > 0) {
    returnval.from = data.positions[position_length - 1].workdate.from;
    returnval.to = data.positions[0].workdate.to;
  }
  if (position_length === 1) returnval.to = 'Present';
  return returnval;
}

export const experiences = [
  {
    company: 'Velox Networks Pte Ltd',
    positions: [
      {
        name: 'Software Engineer',
        workdate: {
          from: 'Jul 2020',
          to: 'Present',
        },
        workdetails: [,],
      },
    ],
    workdate: function () {
      return workdate(this);
    },
  },
  {
    company: 'Abacare Group Limited',
    positions: [
      {
        name: 'IT Executive',
        workdate: {
          from: 'Nov 2019',
          to: 'Jun 2020',
        },
        workdetails: [
          'Build web apps and website for the company',
          'Javascript, PHP, HTML and CSS for web development',
          'NodeJS for javascript security',
          'Git for version control with GitHub as repository',
          'RSA encryption for data/API security',
          'Maintains codebase for optimizing page performance',
          'Develop Excel apps with VBA scripts',
        ],
      },
      {
        name: 'Business Process Executive',
        workdate: {
          from: 'Apr 2019',
          to: 'Nov 2019',
        },
        workdetails: [
          'Ensure accuracy of commission data entry of payments and adjustments',
          'Work with Business Process Supervisors for commission resolution on any variances with payments',
          'Routine commission calculations, and support disputed inquiries from the business',
          'articipate in accounts reconciliation process to validate accuracy of data entry',
          'Provide automation in the form of macro using office tools',
        ],
      },
    ],
    workdate: function () {
      return workdate(this);
    },
  },
  {
    company: 'GeePacific Technology Services Inc',
    positions: [
      {
        name: 'Team Leader',
        workdate: {
          from: 'May 2018',
          to: 'Jun 2018',
        },
        workdetails: [],
      },
      {
        name: 'Data Encoder',
        workdate: {
          from: 'Nov 2017',
          to: 'May 2018',
        },
        workdetails: [],
      },
    ],
    workdate: function () {
      return workdate(this);
    },
  },
];
