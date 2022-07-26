class base{
    constructor(info,message) {
        if (typeof info === 'string'){
            this.message = info

        }

        if (info)
            this.info = info
        if (message)
            this.message = message
        //this.info = temp
    }
}

class sModel extends base{

    constructor(info,message) {
        super(info,message)
        this.status = true

    }
}
class eModel extends base{

    constructor(info,message) {
        super(info,message)
        this.status = false
    }
}

module.exports = {sModel,eModel}