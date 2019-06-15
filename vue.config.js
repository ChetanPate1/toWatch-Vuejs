module.exports = {
    runtimeCompiler: true,
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/style/_variables.scss";`
            }
        }
    },
    outputDir: './docs'
}
