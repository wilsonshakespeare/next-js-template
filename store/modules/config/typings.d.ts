// Theme options for the app
export interface BrandingOption {
  companyName: string;
  favicon: string;
  logo: string;
}

export interface ThemeOption {
  primaryColor: string;
  primaryColorHover: string;
  primaryColorActive: string;
  primaryColorLight: string;
  primaryColorText: string;
  secondaryColor: string;
  secondaryColorHover: string;
  secondaryColorText: string;
  tertiaryColor?: string;
  tertiaryColorHover?: string;
  tertiaryColorText?: string;
  linkColor: string;
  linkColorHover: string;
}

export interface Config {
  branding: BrandingOption;
  theme: ThemeOption;
}

export type ReducerFunction = (state: Config, action: any) => Config;
