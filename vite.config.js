import less from 'less';
import path from 'path';

export default {
  build: {
    sourcemap: true
  },
  plugins: [
    {
      name: 'less-loader',
      async transform(code, id) {
        if (id.endsWith('.less')) {
          const { css, map } = await less.render(code, {
            sourceMap: {
              outputSourceFiles: true,
              sourceMapFileInline: true
            },
            filename: path.resolve(id)
          });

          return {
            code: css,
            map: map && JSON.parse(map.toString())
          };
        }
      }
    }
  ]
};
