/** Production environment configuration. */
export const environment = {
  production: true,

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  googleAnalyticsToken: window.location.hostname === 'portal.hubmapconsortium.org' ? 'G-1WRJHN9FM6' : 'G-J9HWV9QPJ4'
};
