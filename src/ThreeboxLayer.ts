// @ts-ignore
import { Threebox } from 'threebox-plugin'
import { TMap } from './TMap'
import {createModels} from "./util";
type ThreeLayerParams = {
    id?: string
    tMap: TMap
    onAdd?: (arg: Threebox) => any
}
export class ThreeboxLayer {
    _id: string = 'custom_layer'
    _tMap: TMap
    _tb?: Threebox
    visible: boolean = true
    _onAdd?: (arg: Threebox) => any
    constructor(props: ThreeLayerParams) {
        this._id = props.id || this._id
        this._tMap = props.tMap
        this._onAdd = props.onAdd
        this.addTo()
    }
    addTo() {
        this._tb = this._tMap.tb
        this._tMap.mapInstance.addLayer({
            id: this._id,
            type: 'custom',
            renderingMode: '3d',
            onAdd: () => {
                this.addTestVeh()
                this._onAdd && this._onAdd(this._tb)
            },
            render: () => {
                this._tb.update()
            },
        })
    }
    async addTestVeh() {
       const models =  await createModels(this._tb)
        const newModel = models.get('1').model.duplicate()

        newModel.setCoords([...[120.65478027603939, 31.437503013769103], 0.1])
        newModel.setRotation({ z: 30 })
        this._tb.add(newModel)
        newModel.addEventListener(
            'SelectedChange',
            () => {
                console.log(11111111)
            },
            false,
        )
    }
    /**
     * 图层隐藏
     */
    hide() {
        this._tMap.hideLayer(this._id)
        this.visible = false
    }

    /**
     * 图层隐藏
     */
    show() {
        this._tMap.showLayer(this._id)
        this.visible = true
    }
}
