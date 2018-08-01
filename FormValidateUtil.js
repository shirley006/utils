class ValidateTools {

    static isValidUrl(str) {
        if(str && (str.indexOf('http://')==0 || str.indexOf('https://')==0) ) {
            return true;
        }
        return false;
    };

    /**
     * 判断是否是正确的手机号码
     * @param number
     */
    static isValidPhoneNumber(number, strict) {
        const type = typeof number;
        if (!number) {
            return false;
        }
        if (type === 'function' || type === 'object') {
            return false;
        }

        let _number = String(number);
        let pattern = /^1[3456789]\d{9}$/g;
        if (strict) {
            pattern = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/g;
        }
        return pattern.test(_number);
    }

    /**
     * validate ID
     * @param id
     */
    static isValidID(id) {
        const type = typeof id;
        if (!id) {
            return false;
        }
        if (type === 'function' || type === 'object') {
            return false;
        }

        let _id = String(id);
        let pattern = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/g;
        return pattern.test(_id);
    }

    /**
     * validate Passport No.
     * @param passport
     */
    static isValidPassport(passport) {
        const type = typeof passport;
        if (!passport || type === 'function' || type === 'object') {
            return false;
        }

        let _passport = String(passport);
        let pattern = /^1[45][0-9]{7}|([P|p|S|s]\d{7})|([S|s|G|g]\d{8})|([Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ff]\d{8})|([H|h|M|m]\d{8,10})$/;
        return pattern.test(_passport);
    }

}

module.exports = ValidateTools;











