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
      name: 'Referral',
      icon: 'icon-speech',
      url: '/referral'
    },
    {
      name: 'User',
      icon: 'icon-user-following',
      children: [
        {
          name: 'Manage',
          url: '/user'
        },
        {
          name: 'New',
          url: '/user/new'
        }
      ]
    },
    {
      name: 'Patient',
      icon: 'icon-screen-tablet',
      children: [
        {
          name: 'Patient',
          url: '/patient'
        },
        {
          name: 'New Patient',
          url: '/patient/new'
        }
      ]
    },
    {
      name: 'Setting',
      icon: 'icon-settings',
      children: [
        //{
        //  name: 'Event Type',
        //  url: '/eventType'
        //},
        {
          name: 'Referral',
          url: '/setting/referral'
        }
      ]
    }
  ]
};
