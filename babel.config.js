module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: { node: 'current' },
        },
      ],
      '@babel/preset-typescript'
    ],
    plugins: [
      ['module-resolver', {
        alias: {
            "@app": './src/app',
            "@config": './src/config',
            "@controllers": './src/controllers',
            "@database": './src/database/index',
            "@errors": './src/errors',
            "@interfaces": './src/interfaces',
            "@jobs": './src/jobs',
            "@middlewares": './src/middlewares',
            "@models": './src/models',
            "@queue": './src/queue/index',
            "@routes": './src/routes',
            "@services": './src/services',
            "@utils": './src/utils/'
        },
      }],
      [
        '@babel/plugin-proposal-decorators',
        { legacy: true }
      ],
      [
        '@babel/plugin-proposal-class-properties',
        { loose: true }
      ],
      'babel-plugin-transform-typescript-metadata'
    ],
    ignore: [
      '**/.spec.ts',
    ],
};
