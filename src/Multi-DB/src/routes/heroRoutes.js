class HeroRoutes {
    constructor(db) {
        this.db = db
    }
    read() {
        return {
            path: '/heroes',
            method: 'GET',
            handler: (request, headers) => {
                return this.db.read()
            }
        }
    }
    create() {
        return {
            path: '/heroess',
            method: 'GET',
            handler: (request, headers) => {
                return 'teste'
            }
        }
    }
}
module.exports = HeroRoutes
