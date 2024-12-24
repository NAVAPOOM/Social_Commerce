// types/project/types.ts
export interface Project {
    id: string;
    name: string;
    logo?: string;
    type?: string;
    address?: string;
    social: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
      website?: string;
    };
  }
  
  export interface NewProject {
    name: string;
    logo: string | null;
    type: string;
    address: string;
    social: {
      facebook: string;
      instagram: string;
      twitter: string;
      website: string;
    };
  }
  