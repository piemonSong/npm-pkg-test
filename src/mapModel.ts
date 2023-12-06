export type LngLatLike = [number, number]
export type ThemeType = 'dark' | 'light'
export type MapEvent =
    | 'mousedown'
    | 'mouseup'
    | 'mouseover'
    | 'mousemove'
    | 'preclick'
    | 'click'
    | 'dblclick'
    | 'mouseenter'
    | 'mouseleave'
    | 'mouseout'
    | 'contextmenu'
    | 'wheel'
    | 'touchstart'
    | 'touchend'
    | 'touchmove'
    | 'touchcancel'
    | 'movestart'
    | 'move'
    | 'moveend'
    | 'dragstart'
    | 'drag'
    | 'dragend'
    | 'zoomstart'
    | 'zoom'
    | 'zoomend'
    | 'rotatestart'
    | 'rotate'
    | 'rotateend'
    | 'pitchstart'
    | 'pitch'
    | 'pitchend'
    | 'boxzoomstart'
    | 'boxzoomend'
    | 'boxzoomcancel'
    | 'resize'
    | 'load'
    | 'render'
    | 'idle'
    | 'remove'
    | 'error'
    | 'webglcontextlost'
    | 'webglcontextrestored'
    | 'data'
    | 'styledata'
    | 'sourcedata'
    | 'dataloading'
    | 'styledataloading'
    | 'sourcedataloading'
    | 'styleimagemissing'
    | 'style.load'
    | 'speedindexcompleted'
    | 'pluginStateChange'
    | 'isSpriteLoaded'
    | 'neworder'

interface BaseFactor {
    id: string
    minzoom?: number
    maxzoom?: number
    paint?: any
}
export interface UrlRoadFactor extends BaseFactor {
    url: string
}
export interface GeoRoadFactor extends BaseFactor {
    geojson: Object
}
export type RoadFactor = UrlRoadFactor | GeoRoadFactor
export type MapObject = {
    [key: string]: string | undefined
}
export type ZoomRangeType = {
    minzoom?: number
    maxzoom?: number
}
export type XYZType = {
    x: number
    y: number
    z: number
}