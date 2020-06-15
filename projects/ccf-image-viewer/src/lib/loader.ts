import { Loader, createZarrLoader, OMEZarrReader, createOMETiffLoader } from '@hubmap/vitessce-image-viewer';

export enum LoaderType {
  Zarr = 'zarr',
  OMEZarr = 'ome-zarr',
  StaticZarr = 'static',

  Tiff = 'tiff',
  Tiff2 = 'tiff 2',
  BFTiff = 'bf tiff',
  CovidTiff = 'covid tiff',
  StaticTiff = 'static tiff'
}

// createLoader info argument types
export type ZarrInfo = Parameters<typeof createZarrLoader>[0];
export interface OMEZarrInfo {
  url: string;
}
export interface TiffInfo {
  url: string;
  offsets?: string | number[];
}

// Copied from vitessce-image-viewer demo source
export async function createLoader(
  type: LoaderType,
  info: ZarrInfo | OMEZarrInfo | TiffInfo
): Promise<Loader> {
  switch (type) {
    case LoaderType.Zarr:
    case LoaderType.StaticZarr:
      return createZarrLoader(info as ZarrInfo);

    case LoaderType.OMEZarr: {
      const { url } = info as OMEZarrInfo;
      const reader = await OMEZarrReader.fromUrl(url);
      const { loader } = await reader.loadOMEZarr();
      return loader;
    }

    case LoaderType.Tiff:
    case LoaderType.Tiff2:
    case LoaderType.BFTiff:
    case LoaderType.CovidTiff:
    case LoaderType.StaticTiff: {
      const { url, offsets = [] } = info as TiffInfo;
      return createOMETiffLoader({ url, offsets: await loadOffsets(offsets) });
    }

    default:
      throw Error(`Pyramid type (${type}) is not supported`);
  }
}

async function loadOffsets(url: string | number[]): Promise<number[]> {
  if (typeof url !== 'string') { return url; }
  const res = await fetch(url);
  return res.status !== 404 ? await res.json() as number[] : [];
}
