export async function getAllPosts() {
    // Importar todos los archivos JSON de la carpeta `src/data`
    const modules = import.meta.glob("@data/*.json", { eager: true });

    // Procesar los datos
    const posts = Object.values(modules).map((module) => module.default);

    return posts;
}