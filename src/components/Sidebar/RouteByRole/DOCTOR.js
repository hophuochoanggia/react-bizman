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
      children: [
        {
          name: 'Manage',
          url: '/referral'
        },
        {
          name: 'New',
          url: '/referral/new'
        }
      ]
    }
  ]
};
