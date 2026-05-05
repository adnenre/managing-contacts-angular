export interface Social {
  twitter: string;
  linkedin: string;
  codepen: string;
  github: string;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  img: string;
  img_header: string; // matches original JSON property
  social: Social;
}
