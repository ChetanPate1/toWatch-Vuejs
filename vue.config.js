module.exports = {
    runtimeCompiler: true,
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/style/_variables.scss";`
            }
        }
    },
    outputDir: './docs',
    publicPath: process.env.NODE_ENV === 'production'
        ? '/toWatch/'
        : '/'
}
