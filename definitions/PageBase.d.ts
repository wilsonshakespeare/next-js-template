import { AppPropsBase, CommonHooksOption, CommonHooksProps } from './Application.d';

export interface PageHooksOptions extends CommonHooksOption {
  // Example SEO and OG key for reference to retrieve data
}

export interface PageHooksProps extends CommonHooksProps {
  // Will have seo and og info, page configurable props
}

export interface PageViewOptions {
  title: string;
  // And other view option, example, hasCurrencySwitcher, or hasLanguageSwitcher
  // Certain pages do not need them
  // For example, Checkout Page in which currency already determined
}

export interface PageProps extends AppPropsBase {}

export interface PageViewProps<T extends PageProps, ContainerHooks extends PageHooksProps = {}>
  extends T {
  // Props Sent Through PageBase
  containerValues?: ContainerHooks;
}
