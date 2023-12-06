import mapboxgl from 'mapbox-gl';
import type { LngLatLike, ThemeType, MapEvent } from './mapModel';
import { Threebox } from 'threebox-plugin';
export type TMapOptions = {
    id: string;
    theme?: ThemeType;
    style?: string | object;
    center?: LngLatLike;
    zoom?: number;
    pitch?: number;
    bearing?: number;
};
export interface polylineOptions {
    id: string;
    geojson: any;
    paint?: Object;
    beforeId?: string;
    options?: Object;
}
export interface polygonOptions extends polylineOptions {
    hasOutline?: boolean;
    outlinePaint?: Object;
}
export declare class TMap {
    static ASSETS_PATH: string;
    _mapId: string;
    styleTheme: string;
    mapInstance: mapboxgl.Map;
    tb: Threebox;
    constructor(params: TMapOptions);
    init(params: TMapOptions): void;
    on(type: MapEvent, layerIds: any, listener: any): void;
    /**
     * 根据geojson 绘制多边形
     * @param id
     * @param geojson
     * @param paint
     * @param hasOutline
     */
    addPolygon({ id, geojson, paint, hasOutline, outlinePaint, beforeId, options, }: polygonOptions): void;
    /**
     * 根据geojson 绘制曲线
     * @param id
     * @param geojson
     * @param paint
     */
    addPolyline({ id, geojson, paint, beforeId, options, }: polylineOptions): void;
    /**
     * 通过Id 移除layer 和 source
     * @param id
     */
    removeLayer(id: string): void;
    /**
     * 显示图层
     * @param layerId
     */
    hideLayer(layerId: string): void;
    /**
     * 隐藏图层
     * @param layerId
     */
    showLayer(layerId: string): void;
}
