declare namespace ShareButton {
  interface Props {
    type?: string;
    text?: string;
    socialType: string;
    accounts: string[];
    postLink: string;
    title: string;
    description: string;
    hashtags?: string[];
  }
}
