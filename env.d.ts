declare module "@env" {
  export const API_URL: string;
}

declare module "expo-document-picker" {
  export interface DocumentPickerAsset {
    uri: string;
    name: string;
    size?: number;
    mimeType?: string;
    lastModified?: number;
    file?: File;
    output?: FileList | null;
  }

  export interface DocumentPickerResult {
    canceled: boolean;
    assets?: DocumentPickerAsset[];
  }

  export interface DocumentPickerOptions {
    type?: string | string[];
    copyToCacheDirectory?: boolean;
    multiple?: boolean;
  }

  export function getDocumentAsync(
    options?: DocumentPickerOptions
  ): Promise<DocumentPickerResult>;
}
