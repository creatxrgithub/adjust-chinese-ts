# tsc -m commonjs -t esnext --outDir cjs --strict --sourceMap
# tsc -m esnext -t esnext --outDir mjs --strict --sourceMap
tsc --declaration --allowJs --emitDeclarationOnly --outDir types
