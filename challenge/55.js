
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

// var cipher_createDecryptor = function (key, cfg) {

//    var instance = {}
//     instance.cfg = cfg
//     instance._xformMode = 2
//     instance._key = key

//     return this.create(2, key, cfg);
// }

var this_doReset = function(){
    var t;

    // Skip reset of nRounds has been set before and key did not change
    if (this._nRounds && this._keyPriorReset === this._key) {
        return;
    }

    // Shortcuts
    var key = this._keyPriorReset = this._key;
    var keyWords = key.words;
    var keySize = key.sigBytes / 4;

    // Compute number of rounds
    var nRounds = this._nRounds = keySize + 6;

    // Compute number of key schedule rows
    var ksRows = (nRounds + 1) * 4;

    // Compute key schedule
    var keySchedule = this._keySchedule = [];
    for (var ksRow = 0; ksRow < ksRows; ksRow++) {
        if (ksRow < keySize) {
            keySchedule[ksRow] = keyWords[ksRow];
        } else {
            t = keySchedule[ksRow - 1];

            if (!(ksRow % keySize)) {
                // Rot word
                t = (t << 8) | (t >>> 24);

                // Sub word
                t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];

                // Mix Rcon
                t ^= RCON[(ksRow / keySize) | 0] << 24;
            } else if (keySize > 6 && ksRow % keySize == 4) {
                // Sub word
                t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];
            }

            keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
        }
    }

    // Compute inv key schedule
    var invKeySchedule = this._invKeySchedule = [];
    for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
        var ksRow = ksRows - invKsRow;

        if (invKsRow % 4) {
            var t = keySchedule[ksRow];
        } else {
            var t = keySchedule[ksRow - 4];
        }

        if (invKsRow < 4 || ksRow <= 4) {
            invKeySchedule[invKsRow] = t;
        } else {
            invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[(t >>> 16) & 0xff]] ^
                                       INV_SUB_MIX_2[SBOX[(t >>> 8) & 0xff]] ^ INV_SUB_MIX_3[SBOX[t & 0xff]];
        }
    }
}

var Cipher_reset = function () {
    // Reset data buffer
    // BufferedBlockAlgorithm.reset.call(this); @params 暂时忽略 

    // Perform concrete-cipher logic
    this._doReset();
}

var this_reset = function(){
    var modeCreator;

    // Reset cipher
    Cipher_reset(arguments);

    // Shortcuts
    var cfg = this.cfg;
    var iv = cfg.iv;
    var mode = cfg.mode;

    // Reset block mode
    if (this._xformMode == this._ENC_XFORM_MODE) {
        modeCreator = mode.createEncryptor;
    } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
        modeCreator = mode.createDecryptor;
        // Keep at least one block in the buffer for unpadding
        this._minBufferSize = 1;
    }

    if (this._mode && this._mode.__creator == modeCreator) {
        this._mode.init(this, iv && iv.words);
    } else {
        this._mode = modeCreator.call(mode, this, iv && iv.words);
        this._mode.__creator = modeCreator;
    }
}

var this_create = function (xformMode, key, cfg) {
    // this.cfg = this.cfg.extend(cfg);

    // // Store transform mode and key
    // this._xformMode = xformMode;
    // this._key = key; @params 暂时忽略

    // Set initial values
    // this.reset();
    this_reset(arguments);
}


var cipher_createDecryptor =  function (key, cfg) {
    return this.create(this._DEC_XFORM_MODE, key, cfg);
}


var SerializableCipher_decrypt = function (cipher, ciphertext, key, cfg) {
    // Apply config defaults
    // cfg = this.cfg.extend(cfg); @params 暂时忽略
    cfg = {}

    // Convert string to CipherParams
    ciphertext = _parse(ciphertext, cfg.format);
    console.log(ciphertext)
    // Decrypt
    var plaintext = cipher_createDecryptor(key, cfg).finalize(ciphertext.ciphertext);

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

