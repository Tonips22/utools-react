export async function getAllPosts() {
    // Importar todos los archivos JSON de la carpeta `src/data`
    const modules = import.meta.glob("@data/*.json", { eager: true });

    // Procesar los datos
    const posts = Object.values(modules).map((module) => module.default);

    return posts;
}

export async function getPostsByTitle(title){
    const posts = await getAllPosts();
    return posts.filter(post => post.title.toLowerCase().includes(title.toLowerCase()));
}


export async function getPostByCategories(categories = []) {
    const posts = await getAllPosts();
    return posts.filter(post => categories.every(category => post.categories.includes(category)));  // every --> AND some --> OR
}

export async function getPostByCategoriesAndTitle(categories = [], title){
    const posts = await getPostByCategories(categories);
    return posts.filter(post => post.title.toLowerCase().includes(title.toLowerCase()));
}