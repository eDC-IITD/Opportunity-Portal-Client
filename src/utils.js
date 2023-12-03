export const openLink = (link) => {
  if (!link.startsWith('http')) link = `http://${link}`;
  window.open(link, '_blank');
};
