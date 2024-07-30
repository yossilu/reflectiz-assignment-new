export const isValidDomain = (domain: string) => {
    const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+.[a-zA-Z]{2,11}?$/;
    return domainRegex.test(domain);
  };
  