import { N3Store } from 'triple-store-utils';

import { ImageViewerData } from './../interfaces';


export function getImageViewerData(id: string, store: N3Store): ImageViewerData {
  return { id, metadata: {} };
}
