import type { GeoCoordinates } from "shared/types/map";

export type MapDestinationKind = "bin" | "center";

export interface MapDestination {
  id: string;
  name: string;
  address: string;
  coordinates: GeoCoordinates;
  kind: MapDestinationKind;
}
