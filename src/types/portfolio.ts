export type PortfolioIdentity = {
  name: string;
  role: string;
};

export type PortfolioProject = {
  id: string;
  name: string;
  summary: string;
  href?: string;
  repository?: string;
  technologies: readonly string[];
};

export type PortfolioExperience = {
  id: string;
  organization: string;
  role: string;
  startDate: string;
  endDate?: string;
  summary: string;
};

export type Portfolio = {
  identity: PortfolioIdentity;
  projects: readonly PortfolioProject[];
  experience: readonly PortfolioExperience[];
};