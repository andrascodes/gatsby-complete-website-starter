declare module 'netlify-cms-core' {
  import React, { ComponentType } from 'react';
  import { Map } from 'immutable';

  export interface CmsSelectWidgetOptionObject {
    label: string;
    value: any;
  }

  export type CmsFilesExtension =
    | 'yml'
    | 'yaml'
    | 'toml'
    | 'json'
    | 'md'
    | 'markdown'
    | 'html'
    | string;

  export interface CmsField {
    name: string;
    label?: string;
    widget?: string;
    required?: boolean;
    hint?: string;
    pattern?: [string, string];
    default?: any;

    /** If widget === "code" */
    default_language?: string;
    allow_language_selection?: boolean;
    keys?: { code: string; lang: string };
    output_code_only?: boolean;

    /** If widget === "datetime" */
    format?: string;
    dateFormat?: boolean | string;
    timeFormat?: boolean | string;
    pickerUtc?: boolean;

    /** If widget === "file" || widget === "image" */
    media_library?: CmsMediaLibrary;
    allow_multiple?: boolean;
    config?: any;

    /** If widget === "object" || widget === "list" */
    fields?: CmsField[];
    collapsed?: boolean;

    /** If widget === "list" */
    field?: CmsField;
    allow_add?: boolean;
    summary?: string;
    minimize_collapsed?: boolean;
    label_singular?: string;
    types?: CmsField[];

    /** If widget === "map" */
    decimals?: number;
    type?: CmsMapWidgetType;

    /** If widget === "markdown" */
    minimal?: boolean;
    buttons?: CmsMarkdownWidgetButton[];
    editorComponents?: string[];

    /** If widget === "number" */
    valueType?: 'int' | 'float' | string;
    step?: number;

    /** If widget === "number" || widget === "select" */
    min?: number;
    max?: number;

    /** If widget === "relation" || widget === "select" */
    multiple?: boolean;

    /** If widget === "relation" */
    collection?: string;
    valueField?: string;
    searchFields?: string[];
    file?: string;
    displayFields?: string[];
    optionsLength?: number;

    /** If widget === "select" */
    options?: string[] | CmsSelectWidgetOptionObject[];
  }

  export interface CmsCollection {
    name: string;
    label: string;
    label_singular?: string;
    description?: string;
    folder?: string;
    files?: CmsCollectionFile[];
    identifier_field?: string;
    summary?: string;
    slug?: string;
    preview_path?: string;
    preview_path_date_field?: string;
    create?: boolean;
    delete?: boolean;
    editor?: {
      preview?: boolean;
    };
    format?: CmsCollectionFormatType;
    extension?: CmsFilesExtension;
    frontmatter_delimiter?: string[] | string;
    fields?: CmsField[];
    filter?: { field: string; value: any };
    path?: string;
    media_folder?: string;
    public_folder?: string;
    sortableFields?: string[];
  }

  export interface EditorComponentOptions {
    id: string;
    label: string;
    fields: EditorComponentField[];
    pattern: RegExp;
    fromBlock: (match: RegExpMatchArray) => any;
    toBlock: (data: any) => string;
    toPreview: (data: any) => string;
  }

  type GetAssetFunction = (
    asset: string,
  ) => { url: string; path: string; field?: any; fileObj: File };

  export type PreviewTemplateComponentProps = {
    entry: Map<string, any>;
    collection: Map<string, any>;
    widgetFor: (
      name: any,
      fields?: any,
      values?: any,
      fieldsMetaData?: any,
    ) => JSX.Element | null;
    widgetsFor: (name: any) => any;
    getAsset: GetAssetFunction;
    boundGetAsset: (collection: any, path: any) => GetAssetFunction;
    fieldsMetaData: Map<string, any>;
    config: Map<string, any>;
    fields: List<Map<string, any>>;
    isLoadingAsset: boolean;
  };

  export interface CMS {
    getBackend: (name: string) => CmsRegistryBackend | undefined;
    getEditorComponents: () => Map<string, ComponentType<any>>;
    getLocale: (locale: string) => CmsLocalePhrases | undefined;
    getMediaLibrary: (name: string) => CmsMediaLibrary | undefined;
    getPreviewStyles: () => PreviewStyle[];
    getPreviewTemplate: (
      name: string,
    ) => ComponentType<PreviewTemplateComponentProps> | undefined;
    getWidget: (name: string) => CmsWidget | undefined;
    getWidgetValueSerializer: (
      widgetName: string,
    ) => CmsWidgetValueSerializer | undefined;
    init: (options?: InitOptions) => void;
    registerBackend: (name: string, backendClass: CmsBackendClass) => void;
    registerEditorComponent: (options: EditorComponentOptions) => void;
    registerLocale: (locale: string, phrases: CmsLocalePhrases) => void;
    registerMediaLibrary: (
      mediaLibrary: CmsMediaLibrary,
      options?: CmsMediaLibraryOptions,
    ) => void;
    registerPreviewStyle: (
      filePath: string,
      options?: PreviewStyleOptions,
    ) => void;
    registerPreviewTemplate: (
      name: string,
      component: ComponentType<PreviewTemplateComponentProps>,
    ) => void;
    registerWidget: (
      widget: string | CmsWidgetParam,
      control?: ComponentType<any>,
      preview?: ComponentType<any>,
    ) => void;
    registerWidgetValueSerializer: (
      widgetName: string,
      serializer: CmsWidgetValueSerializer,
    ) => void;
    resolveWidget: (name: string) => CmsWidget | undefined;
  }
}
/**
 * See https://www.netlifycms.org/docs/configuration-options/#collections
 */
declare type CmsCollection = import('netlify-cms-core').CmsCollection;
declare type CmsField = import('netlify-cms-core').CmsField;
declare type CmsCollectionFile = import('netlify-cms-core').CmsCollectionFile;
declare type CMS = import('netlify-cms-core').CMS;
declare type PreviewTemplateComponentProps = import('netlify-cms-core').PreviewTemplateComponentProps;
declare type EditorComponentOptions = import('netlify-cms-core').EditorComponentOptions;
declare type CmsFilesExtension = import('netlify-cms-core').CmsFilesExtension;
declare type CmsSelectWidgetOptionObject = import('netlify-cms-core').CmsSelectWidgetOptionObject;
