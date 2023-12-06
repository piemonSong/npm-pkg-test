

// 为了将引入的 npm 包，也打包进最终结果中
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import static_files from 'rollup-plugin-static-files'
export default {
    input: 'src/TView.ts',
    output: [
        {
            file: 'dist/TView.js',
            format: 'umd',
            name: 'TViews'
        },
    ],
    plugins: [
        typescript(),
        commonjs(),
        nodeResolve(),
        static_files({
            include: ['./public'],
        })
    ]
}