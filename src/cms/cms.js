import CMS from 'netlify-cms-app';

// Fonts for the Previews
import 'typeface-fira-sans';
import 'typeface-playfair-display';

import collections from './collections';
import PostPreview from './preview-templates/PostPreview';
import RichImage from './editor-components/RichImage';
import Divider from './editor-components/Divider';

// import "typeface-poppins";
// import "assets/fonts/butler/main.css";

// import siteMetadata from "../../site-metadata.json";

/**
 * This variable can be used to render something different in runtime for example specific previews for components using static queries
 */
// @ts-ignore
window.NETLIFY_CMS = true;

/**
 * Registering, for each collection name, the custom preview
 * component
 */
CMS.registerPreviewTemplate('post', PostPreview);
// CMS.registerPreviewTemplate("news", PostPreview);
// CMS.registerPreviewTemplate("expertNetwork", ExpertNetworkPreview);
// CMS.registerPreviewTemplate("sectionsPage", SectionsPagePreview);
// CMS.registerPreviewTemplate(
//   "blog",
//   BlogPreview(post, (slug) => `content/pages/blog/${slug}/index.md`)
// );
// CMS.registerPreviewTemplate(
//   "newsroom",
//   BlogPreview(news, (slug) => `content/pages/newsroom/${slug}/index.md`)
// );

/**
 * Registering markdown widgets
 * See https://www.netlifycms.org/docs/custom-widgets/#registereditorcomponent
 */
CMS.registerEditorComponent(RichImage);
CMS.registerEditorComponent(Divider);

const isDevelopment = process.env.NODE_ENV === 'development';

const backend = isDevelopment
  ? {
      name: 'proxy',
      proxy_url: 'http://localhost:8081/api/v1',
    }
  : {
      name: 'github',
      repo: 'andrewszucs/gatsby-complete-website-starter',
      use_graphql: true,
    };

/**
 * See https://www.netlifycms.org/docs/beta-features/#manual-initialization
 */
CMS.init({
  config: {
    /**
     * URL to the published site
     * Used together with a collection's preview_path to create links to live content
     */
    site_url: isDevelopment ? 'http://localhost:8000' : 'siteMetadata.siteUrl',

    /**
     * Manipulate how filenames for entries are created and sanitized
     * sanitize_replacement: the replacement string used to substitue unsafe chars
     */
    // @ts-ignore
    slug: { encoding: 'ascii', clean_accents: true, sanitize_replacement: '-' },

    /** Ignore config file, because we're loading the whole config here */
    load_config_file: false,

    /**
     * Changing the logo displayed at the top of the login page
     * URL to the image file (relative to base of built site)
     */
    logo_url: '/icons/icon-512x512.png',

    /** Global Media Folder where media files for all collections are stored (relative to base of repo) */
    media_folder: 'content/uploads',
    /**
     * Where the files uploaded by the media library will be accessed (relative to base of built site)
     * Default: media_folder value
     * */
    public_folder: '',

    // @ts-ignore
    backend,

    /**
     * All editable content types should be defined here.
     * They will display in the left sidebar of the Editor UI
     */
    collections,

    /** Editorial Workflow - for tracking unpublished entries statuses */
    publish_mode: isDevelopment ? 'simple' : 'editorial_workflow',

    /**
     * A Deploy preview URL (root of deployed site) is provided by the backend
     * These can be disabled here.
     */
    show_preview_links: true,
  },
});
