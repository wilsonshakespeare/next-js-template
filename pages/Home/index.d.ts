import { PageHooksProps, PageViewProps, PageProps as BasePageProps } from '@definitions/PageBase.d';

export interface ContainerHooksProps extends PageHooksProps {}

export interface PageProps extends BasePageProps {}

export interface ViewProps extends PageViewProps<PageProps, ContainerHooksProps> {}
