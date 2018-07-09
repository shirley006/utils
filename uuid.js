/**
 * Created by p_yunfzhang on 2017/3/13.
 * this is uuid generator util used to generate html dom id
 */

class UUID {
    static uuid() {
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
        return 'cmu'+ uuid;
    }

    static uuidWithPrefix(prefix) {
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
        if (prefix) {
            uuid = prefix + uuid;
        }
        return uuid;
    }
}


module.exports = UUID;
