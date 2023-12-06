import {VEHICLE_TYPES} from "./constant";
import {TMap} from './TMap'
function promiseLoaderBack(tb: any, options: any) {
    return new Promise((resolve) => {
        if (tb.map) {
            tb.loadObj(options, (data: any) => resolve(data))
        }
    })
}
export async function createModels(tb: any) {
    console.log(TMap.ASSETS_PATH, '============>')
    const vehicleTypeMap: Map<string, any> = new Map<string, any>()
    for (let i = 0; i < VEHICLE_TYPES.length; i++) {
        const model = await promiseLoaderBack(tb, {
            type: 'gltf', //'gltf'/'mtl'
            obj: TMap.ASSETS_PATH + 'model/' + VEHICLE_TYPES[i].name, //model url
            scale: 0.025,
            rotation: { x: 90, y: 0, z: 0 }, //default rotation
            anchor:
                VEHICLE_TYPES[i].name === 'pole.glb' ? 'bottom-left' : 'center',
            bbox: false,
        })
        // model.castShadow = true;
        vehicleTypeMap.set(VEHICLE_TYPES[i].type, {
            model,
            name: VEHICLE_TYPES[i].cn,
        })
    }
    return vehicleTypeMap
}
