
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

var SBOX = [];
var INV_SBOX = [];
var SUB_MIX_0 = [];
var SUB_MIX_1 = [];
var SUB_MIX_2 = [];
var SUB_MIX_3 = [];
var INV_SUB_MIX_0 = [];
var INV_SUB_MIX_1 = [];
var INV_SUB_MIX_2 = [];
var INV_SUB_MIX_3 = [];

var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];
var xi = 0;
var x = 0;

var d = [];
for (var i = 0; i < 256; i++) {
    if (i < 128) {
        d[i] = i << 1;
    } else {
        d[i] = (i << 1) ^ 0x11b;
    }
}
for (var i = 0; i < 256; i++) {
    // Compute sbox
    var sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);
    sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;
    SBOX[x] = sx;
    INV_SBOX[sx] = x;

    // Compute multiplication
    var x2 = d[x];
    var x4 = d[x2];
    var x8 = d[x4];

    // Compute sub bytes, mix columns tables
    var t = (d[sx] * 0x101) ^ (sx * 0x1010100);
    SUB_MIX_0[x] = (t << 24) | (t >>> 8);
    SUB_MIX_1[x] = (t << 16) | (t >>> 16);
    SUB_MIX_2[x] = (t << 8)  | (t >>> 24);
    SUB_MIX_3[x] = t;

    // Compute inv sub bytes, inv mix columns tables
    var t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);
    INV_SUB_MIX_0[sx] = (t << 24) | (t >>> 8);
    INV_SUB_MIX_1[sx] = (t << 16) | (t >>> 16);
    INV_SUB_MIX_2[sx] = (t << 8)  | (t >>> 24);
    INV_SUB_MIX_3[sx] = t;

    // Compute next counter
    if (!x) {
        x = xi = 1;
    } else {
        x = x2 ^ d[d[d[x8 ^ x2]]];
        xi ^= d[d[xi]];
    }
}

var global_this = {

}

var this__doReset = function () {
    var t;

    // Skip reset of nRounds has been set before and key did not change
    // if (this._nRounds && this._keyPriorReset === this._key) {
    //     return;
    // } // @params 暂时忽略

    // Shortcuts
    var key = global_this._keyPriorReset = global_this._key;
    var keyWords = key.words;
    var keySize = key.sigBytes / 4;

    // Compute number of rounds
    var nRounds = this._nRounds = keySize + 6;

    // Compute number of key schedule rows
    var ksRows = (nRounds + 1) * 4;

    // Compute key schedule
    var keySchedule = global_this._keySchedule = [];
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
    var invKeySchedule = global_this._invKeySchedule = [];
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


var Cipher_reset =  function () {
    // Reset data buffer
   // BufferedBlockAlgorithm.reset.call(this);
   global_this._data = new superInit()
   global_this._nDataBytes = 0;
    // Perform concrete-cipher logic
    this__doReset();
}

var this_reset = function () {
    var modeCreator;

    // Reset cipher
    Cipher_reset();

    // Shortcuts
    // var cfg = this.cfg;
    // var iv = cfg.iv;
    // var mode = cfg.mode; @params 暂时忽略
    
    // Reset block mode
    if (global_this._xformMode == this._ENC_XFORM_MODE) {
        modeCreator = mode.createEncryptor;
    } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
       // modeCreator = mode.createDecryptor; @params 暂时忽略
        // Keep at least one block in the buffer for unpadding
        global_this._minBufferSize = 1;
    }

    // if (this._mode && this._mode.__creator == modeCreator) {
    //     this._mode.init(this, iv && iv.words);
    // } else {
    //     this._mode = modeCreator.call(mode, this, iv && iv.words);
    //     this._mode.__creator = modeCreator;
    // } @params 暂时忽略
}

var cipher_createDecryptor_create = function (xformMode, key, cfg) {
    // Apply config defaults
    // this.cfg = this.cfg.extend(cfg);

    // // Store transform mode and key
    // this._xformMode = xformMode;
    // this._key = key; @params 暂时忽略

    global_this._xformMode = xformMode
    global_this._key = key

    // Set initial values
    return this_reset();
}


var cipher_createDecryptor = function (key, cfg) {
    return cipher_createDecryptor_create(2, key, cfg);
}

var  this_clamp = function () {
    // Shortcuts
    var words = this.words;
    var sigBytes = this.sigBytes;

    // Clamp
    words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
    words.length = Math.ceil(sigBytes / 4);
}

var concat = function (wordArray) {
    // Shortcuts
    var thisWords = this.words;
    var thatWords = wordArray.words;
    var thisSigBytes = this.sigBytes;
    var thatSigBytes = wordArray.sigBytes;

    // Clamp excess bits
    this_clamp.call(this);

    // Concat
    if (thisSigBytes % 4) {
        // Copy one byte at a time
        for (var i = 0; i < thatSigBytes; i++) {
            var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
            thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
        }
    } else {
        // Copy one word at a time
        for (var j = 0; j < thatSigBytes; j += 4) {
            thisWords[(thisSigBytes + j) >>> 2] = thatWords[j >>> 2];
        }
    }
    this.sigBytes += thatSigBytes;

    // Chainable
    return global_this;
}

var _append = function (data) {
    // Convert string to WordArray, else assume WordArray already
    if (typeof data == 'string') {
        data = CryptoJS_enc_Utf8_parse(data);
    }
    concat.call(global_this._data,data)

    // Append
   // this._data.concat(data);
    global_this._nDataBytes += data.sigBytes;
}

var _doCryptBlock = function (M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
    // Shortcut
    var nRounds = 10;

    // Get input, add round key
    var s0 = M[offset]     ^ keySchedule[0];
    var s1 = M[offset + 1] ^ keySchedule[1];
    var s2 = M[offset + 2] ^ keySchedule[2];
    var s3 = M[offset + 3] ^ keySchedule[3];

    // Key schedule row counter
    var ksRow = 4;

    // Rounds
    for (var round = 1; round < nRounds; round++) {
        // Shift rows, sub bytes, mix columns, add round key
        var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[(s1 >>> 16) & 0xff] ^ SUB_MIX_2[(s2 >>> 8) & 0xff] ^ SUB_MIX_3[s3 & 0xff] ^ keySchedule[ksRow++];
        var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[(s2 >>> 16) & 0xff] ^ SUB_MIX_2[(s3 >>> 8) & 0xff] ^ SUB_MIX_3[s0 & 0xff] ^ keySchedule[ksRow++];
        var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[(s3 >>> 16) & 0xff] ^ SUB_MIX_2[(s0 >>> 8) & 0xff] ^ SUB_MIX_3[s1 & 0xff] ^ keySchedule[ksRow++];
        var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[(s0 >>> 16) & 0xff] ^ SUB_MIX_2[(s1 >>> 8) & 0xff] ^ SUB_MIX_3[s2 & 0xff] ^ keySchedule[ksRow++];

        // Update state
        s0 = t0;
        s1 = t1;
        s2 = t2;
        s3 = t3;
    }

    // Shift rows, sub bytes, add round key
    var t0 = ((SBOX[s0 >>> 24] << 24) | (SBOX[(s1 >>> 16) & 0xff] << 16) | (SBOX[(s2 >>> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
    var t1 = ((SBOX[s1 >>> 24] << 24) | (SBOX[(s2 >>> 16) & 0xff] << 16) | (SBOX[(s3 >>> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
    var t2 = ((SBOX[s2 >>> 24] << 24) | (SBOX[(s3 >>> 16) & 0xff] << 16) | (SBOX[(s0 >>> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
    var t3 = ((SBOX[s3 >>> 24] << 24) | (SBOX[(s0 >>> 16) & 0xff] << 16) | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];

    // Set output
    M[offset]     = t0;
    M[offset + 1] = t1;
    M[offset + 2] = t2;
    M[offset + 3] = t3;
}

var _doProcessBlock = function (M, offset) {
    // Swap 2nd and 4th rows
    var t = M[offset + 1];
    M[offset + 1] = M[offset + 3];
    M[offset + 3] = t;

    _doCryptBlock(M, offset, global_this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);

    // Inv swap 2nd and 4th rows
    var t = M[offset + 1];
    M[offset + 1] = M[offset + 3];
    M[offset + 3] = t;
}

var this_process =  function (doFlush) {
    var processedWords;

    // Shortcuts
    var data = this._data;
    var dataWords = data.words;
    var dataSigBytes = data.sigBytes;
    var blockSize = 4;
    var blockSizeBytes = blockSize * 4;

    // Count blocks ready
    var nBlocksReady = dataSigBytes / blockSizeBytes;
    if (doFlush) {
        // Round up to include partial blocks
        nBlocksReady = Math.ceil(nBlocksReady);
    } else {
        // Round down to include only full blocks,
        // less the number of blocks that must remain in the buffer
        nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
    }

    // Count words ready
    var nWordsReady = nBlocksReady * blockSize;

    // Count bytes ready
    var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

    // Process blocks
    if (nWordsReady) {
        for (var offset = 0; offset < nWordsReady; offset += blockSize) {
            // Perform concrete-algorithm logic
            _doProcessBlock(dataWords, offset);
        }

        // Remove processed words
        processedWords = dataWords.splice(0, nWordsReady);
        data.sigBytes -= nBytesReady;
    }

    // Return processed words
    return new subInit(processedWords, nBytesReady);
}

var unpad = function (data) {
    // Get number of padding bytes from last byte
    var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

    // Remove padding
    data.sigBytes -= nPaddingBytes;
}

var _doFinalize = function () {
    var finalProcessedBlocks;

    // Shortcut
    //var padding = this.cfg.padding; @params 暂时忽略

    // Finalize
    if (global_this._xformMode == global_this._ENC_XFORM_MODE) {
        // Pad data
        padding.pad(global_this._data, this.blockSize);

        // Process final blocks
        finalProcessedBlocks = this._process(!!'flush');
    } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
        // Process final blocks
        finalProcessedBlocks = this_process.call(global_this,!!'flush');

        // Unpad data
        unpad(finalProcessedBlocks);
    }

    return finalProcessedBlocks;
}


var finalize = function (dataUpdate) {
    // Final data update
    if (dataUpdate) {
        _append(dataUpdate);
    }

    // Perform concrete-cipher logic
    var finalProcessedData = _doFinalize();

    return finalProcessedData;
}

var SerializableCipher_decrypt = function (cipher, ciphertext, key, cfg) {
    // Apply config defaults
    // cfg = this.cfg.extend(cfg); @params 暂时忽略
    cfg = {}

    // Convert string to CipherParams
    ciphertext = _parse(ciphertext, cfg.format);
    console.log(ciphertext)
    var plain = cipher_createDecryptor(key, cfg)
    // Decrypt
    var plaintext = finalize(ciphertext.ciphertext);

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

var stringify = function (wordArray) {
    try {
        return decodeURIComponent(escape(Latin1_parse(wordArray)));
    } catch (e) {
        throw new Error('Malformed UTF-8 data');
    }
}

var _toString =  function (encoder) {
    return (encoder || Hex).stringify(this);
}

var stringify = function (wordArray) {
    // Shortcuts
    var words = wordArray.words;
    var sigBytes = wordArray.sigBytes;

    // Convert
    var latin1Chars = [];
    for (var i = 0; i < sigBytes; i++) {
        var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
        latin1Chars.push(String.fromCharCode(bite));
    }

    return latin1Chars.join('');
}

console.log(stringify(decrypted))

console.log(decrypted)

