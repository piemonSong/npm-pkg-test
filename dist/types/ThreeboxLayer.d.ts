import { Threebox } from 'threebox-plugin';
import { TMap } from './TMap';
type ThreeLayerParams = {
    id?: string;
    tMap: TMap;
    onAdd?: (arg: Threebox) => any;
};
export declare class ThreeboxLayer {
    _id: string;
    _tMap: TMap;
    _tb?: Threebox;
    visible: boolean;
    _onAdd?: (arg: Threebox) => any;
    constructor(props: ThreeLayerParams);
    addTo(): void;
    addTestVeh(): Promise<void>;
    /**
     * 图层隐藏
     */
    hide(): void;
    /**
     * 图层隐藏
     */
    show(): void;
}
export {};
