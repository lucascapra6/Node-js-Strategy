class BaseRoutes {
    static getMethods() {
        return Object.getOwnPropertyNames(this.prototype).filter(method => method !== 'constructor' && !method.startsWith('_')) //prototype === a classe filho que esta chamando esse metodo
    }
}
module.exports = BaseRoutes
