export const name = {
  firstname: 'Ralph',
  lastname: 'Ocdol',
  fullname: function () {
    return this.firstname + ' ' + this.lastname;
  },
};

export const sidebar = ['whoami', 'skills', 'experience'];
