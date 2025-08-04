
var superInit = function (words, sigBytes) {
    words = this.words = words || [];

    if (sigBytes != undefined) {
        this.sigBytes = sigBytes;
    } else {
        this.sigBytes = words.length * 4;
    }
}

var subInit  = function (typedArray) {
    // Convert buffers to uint8
    if (typedArray instanceof ArrayBuffer) {
        typedArray = new Uint8Array(typedArray);
    }

    // Convert other array views to uint8
    if (
        typedArray instanceof Int8Array ||
        (typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray) ||
        typedArray instanceof Int16Array ||
        typedArray instanceof Uint16Array ||
        typedArray instanceof Int32Array ||
        typedArray instanceof Uint32Array ||
        typedArray instanceof Float32Array ||
        typedArray instanceof Float64Array
    ) {
        typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
    }

    // Handle Uint8Array
    if (typedArray instanceof Uint8Array) {
        // Shortcut
        var typedArrayByteLength = typedArray.byteLength;

        // Extract bytes
        var words = [];
        for (var i = 0; i < typedArrayByteLength; i++) {
            words[i >>> 2] |= typedArray[i] << (24 - (i % 4) * 8);
        }

        // Initialize this word array
        superInit.call(this, words, typedArrayByteLength);
    } else {
        // Else call normal init
        superInit.apply(this, arguments);
    }
};

const Latin1_parse = function (latin1Str) {
    // Shortcut
    var latin1StrLength = latin1Str.length;

    // Convert
    var words = [];
    for (var i = 0; i < latin1StrLength; i++) {
        words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
    }

    return new subInit(words, latin1StrLength);
}

function CryptoJS_enc_Utf8_parse (utf8Str) {
    return Latin1_parse(unescape(encodeURIComponent(utf8Str)));
}


var KEY = 'aiding6666666666';
var key = CryptoJS_enc_Utf8_parse(KEY);

function WordArray_create(){
    var instance = {}
    subInit.apply(instance,arguments)
    return instance
}

function parseLoop(base64Str, base64StrLength, reverseMap) {
    var words = [];
    var nBytes = 0;
    for (var i = 0; i < base64StrLength; i++) {
        if (i % 4) {
            var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
            var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
            var bitsCombined = bits1 | bits2;
            words[nBytes >>> 2] |= bitsCombined << (24 - (nBytes % 4) * 8);
            nBytes++;
        }
    }
    return WordArray_create(words, nBytes)
  }


var Base64_parse = function (base64Str) {
    // Shortcuts
    var base64StrLength = base64Str.length;
    var map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
    var reverseMap;

    if (!reverseMap) {
            reverseMap = [];
            for (var j = 0; j < map.length; j++) {
                reverseMap[map.charCodeAt(j)] = j;
            }
    }

    // Ignore padding
    var paddingChar = map.charAt(64);
    if (paddingChar) {
        var paddingIndex = base64Str.indexOf(paddingChar);
        if (paddingIndex !== -1) {
            base64StrLength = paddingIndex;
        }
    }

    // Convert
    return parseLoop(base64Str, base64StrLength, reverseMap);

}


var CipherParams_create = function(properties){
    var instance = {}
    for (var propertyName in properties) {
        if (properties.hasOwnProperty(propertyName)) {
            instance[propertyName] = properties[propertyName];
        }
    }

    // IE won't copy toString using the loop above
    if (properties.hasOwnProperty('toString')) {
        instance.toString = properties.toString;
    }
    return instance
}


var format_parse = function (openSSLStr) {
    var salt;

    // Parse base64
    var ciphertext = Base64_parse(openSSLStr);

    // Shortcut
    var ciphertextWords = ciphertext.words;

    // Test for salt
    if (ciphertextWords[0] == 0x53616c74 && ciphertextWords[1] == 0x65645f5f) {
        // Extract salt
        salt = WordArray_create(ciphertextWords.slice(2, 4));

        // Remove salt from ciphertext
        ciphertextWords.splice(0, 4);
        ciphertext.sigBytes -= 16;
    }

    return CipherParams_create({ ciphertext: ciphertext, salt: salt });
}

var _parse = function (ciphertext, format) {
    if (typeof ciphertext == 'string') {
        return format_parse(ciphertext, this);
    } else {
        return ciphertext;
    }
}

var cipher_createDecryptor = function (key, cfg) {

   var instance = {}
    instance.cfg = cfg
    instance._xformMode = 2
    instance._key = key

    return this.create(2, key, cfg);
}

var SerializableCipher_decrypt = function (cipher, ciphertext, key, cfg) {
    // Apply config defaults
    // cfg = this.cfg.extend(cfg); @params 暂时忽略
    cfg = {}

    // Convert string to CipherParams
    ciphertext = _parse(ciphertext, cfg.format);
    console.log(ciphertext)
    // Decrypt
    var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);

    return plaintext;
}

var CryptoJS_AES_decrypt = function (ciphertext, key, cfg) {
    cipher = {} //@params cipher this上下文
    return SerializableCipher_decrypt(cipher, ciphertext, key, cfg);
}

var str = '2A4w0jqbUivhDV042Ka+VbfXmH65wRwPgKTNHCnEW2hkVTAx4LzvekaBzGEikZHeLblU4KdKeP2LI/nT/Z9vFfby5lg6jI336umLu6ofyFzsHihQ/lJDwCFl7yCY3RXxe6raQF061MqSao4eZ8RUQn6dnITrmFXK4gSCDTbTnrLjUueZnyozu3rmD/XvIYvjtDENnW+T3CjW3SecHQ4x3myB33JETq0coOwn0zgdP2kMqei6MDGpsXX1wp3XqLo05ysk+Pa+rzmgrWtauWcLC5UJxL6JIiP//40bKbOnHhwTcoFdoY+a6t6EGrUDWbQB7JFdJPOLT2RMYKdKz1fiQw=='
var decrypted = CryptoJS_AES_decrypt(str, key, {
    // mode: CryptoJS.mode.ECB,
    // padding: CryptoJS.pad.Pkcs7, // @params mode和padding参数未传
});

