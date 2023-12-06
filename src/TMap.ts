//@ts-ignore
import mapboxgl from 'mapbox-gl'
import { ACCESS_TOKEN } from './constant'
import type { LngLatLike, ThemeType, MapEvent } from './mapModel'
// @ts-ignore
import { Threebox } from 'threebox-plugin'
mapboxgl.accessToken = ACCESS_TOKEN
export type TMapOptions = {
    id: string //map id
    theme?: ThemeType
    style?: string | object
    center?: LngLatLike
    zoom?: number
    pitch?: number
    bearing?: number
}

export interface polylineOptions {
    id: string
    geojson: any
    paint?: Object
    beforeId?: string
    options?: Object
}
export interface polygonOptions extends polylineOptions {
    hasOutline?: boolean
    outlinePaint?: Object
}
const mapOptions = {
    center: [120.65478027603939, 31.437503013769103],
    zoom: 14,
    pitch: 0,
    bearing: 0,
}
export class TMap {
    static ASSETS_PATH = './'
    _mapId: string
    styleTheme: string = 'drak'
    mapInstance: mapboxgl.Map
    tb: Threebox
    constructor(params: TMapOptions) {
        this._mapId = params.id
        this.styleTheme = params.theme || this.styleTheme
        this.init(params)
    }
    init(params: TMapOptions) {
        this.mapInstance = new mapboxgl.Map({
            container: this._mapId, // container ID
            style:
                'mapbox://styles/bestycw/cky3uuz598bil14o67azr4v2e',
            center: params.center || mapOptions.center,
            zoom: params.zoom || mapOptions.zoom,
            pitch: params.pitch || mapOptions.pitch,
            bearing: params.bearing || mapOptions.bearing,
        })
        // instantiate threebox
        this.tb = new Threebox(
            this.mapInstance,
            this.mapInstance.getCanvas().getContext('webgl'),
            {
                defaultLights: true,
                enableSelectingObjects: true,
                sky: true,
                realSunlight: true,
            },
        )
        ;(window as any).tb = this.tb
    }
    on(type: MapEvent, layerIds: any, listener: any) {
        this.mapInstance.on(type, layerIds, listener)
    }

    /**
     * 根据geojson 绘制多边形
     * @param id
     * @param geojson
     * @param paint
     * @param hasOutline
     */
    addPolygon({
                   id,
                   geojson,
                   paint,
                   hasOutline = false,
                   outlinePaint,
                   beforeId,
                   options = {},
               }: polygonOptions) {
        if (!id) {
            console.error('id can not be undefined')
            return
        }
        this.mapInstance.addSource(id, {
            type: 'geojson',
            data: geojson,
        })
        this.mapInstance.addLayer(
            Object.assign(
                {
                    id,
                    source: id,
                    type: 'fill',
                    paint: paint || {
                        'fill-color': '#000000',
                    },
                },
                options,
            ),
            beforeId,
        )
        if (hasOutline) {
            this.mapInstance.addLayer(
                Object.assign(
                    {
                        id: id + '-outline',
                        source: id,
                        type: 'line',
                        paint: outlinePaint || {
                            'line-color': '#000',
                            'line-width': 3,
                        },
                    },
                    options,
                ),
                beforeId,
            )
            //TODO 添加outline
        }
    }

    /**
     * 根据geojson 绘制曲线
     * @param id
     * @param geojson
     * @param paint
     */
    addPolyline({
                    id,
                    geojson,
                    paint,
                    beforeId,
                    options = {},
                }: polylineOptions) {
        if (!id) {
            console.error('id can not be undefined')
            return
        }
        this.mapInstance.addSource(id, {
            type: 'geojson',
            data: geojson,
        })
        this.mapInstance.addLayer(
            Object.assign(
                {
                    id,
                    source: id,
                    type: 'line',
                    paint: paint || {
                        'line-width': 2,
                        'line-color': '#ffffff',
                    },
                },
                options,
            ),
            beforeId,
        )
    }

    /**
     * 通过Id 移除layer 和 source
     * @param id
     */
    removeLayer(id: string) {
        if (this.mapInstance.getLayer(id)) {
            this.mapInstance.removeLayer(id)
        }
        const outlineId = `${id}-outline`
        if (this.mapInstance.getLayer(outlineId)) {
            this.mapInstance.removeLayer(outlineId)
        }
        if (this.mapInstance.getSource(id)) {
            this.mapInstance.removeLayer(id)
        }
    }

    /**
     * 显示图层
     * @param layerId
     */
    hideLayer(layerId: string) {
        this.mapInstance.setLayoutProperty(layerId, 'visibility', 'none')
    }

    /**
     * 隐藏图层
     * @param layerId
     */
    showLayer(layerId: string) {
        this.mapInstance.setLayoutProperty(layerId, 'visibility', 'visible')
    }
}
