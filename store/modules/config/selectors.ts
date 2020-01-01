import { ApplicationState } from '@definitions/Application.d';

export const getConfig = (state: ApplicationState) => state.config;
export const getBrandingInfo = (state: ApplicationState) => state.config.branding;
export const getThemeInfo = (state: ApplicationState) => state.config.theme;
