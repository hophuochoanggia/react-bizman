export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW'
      }
    },
    {
      name: 'User',
      icon: 'icon-menu',
      children: [
        {
          name: 'Manage',
          url: '/user',
          icon: 'icon-user-following'
        },
        {
          name: 'New',
          url: '/user/new',
          icon: 'icon-user-follow'
        }
      ]
    },
    {
      name: 'Patient',
      icon: 'icon-menu',
      children: [
        {
          name: 'Patient',
          url: '/Patient',
          icon: 'icon-user'
        },
        {
          name: 'New Patient',
          url: '/patient/new',
          icon: 'icon-plus'
        }
      ]
    }
  ]
};
