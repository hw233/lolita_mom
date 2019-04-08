var core;
(function (core) {
    var HASH_OFFSET = 0;
    var HASH_A = 1;
    var HASH_B = 2;
    var b_init_table = false;
    var g_crypt_table = new Array();
    function init_crypt_table() {
        if (b_init_table) {
            return;
        }
        b_init_table = true;
        for (var i = 0; i < 0x500; ++i) {
            g_crypt_table.push(0);
        }
        var seed = 0x00100001;
        var index2 = 0;
        for (var index1 = 0; index1 < 0x100; index1++) {
            index2 = index1;
            for (var i = 0; i < 5; ++i) {
                seed = (seed * 125 + 3) % 0x2AAAAB;
                var temp1 = (seed & 0xffff) << 0x10;
                seed = (seed * 125 + 3) % 0x2AAAAB;
                var temp2 = (seed & 0xffff);
                g_crypt_table[index2] = (temp1 | temp2);
                index2 += 0x100;
            }
        }
    }
    function my_hash(hash_str, hash_type) {
        init_crypt_table();
        var seed1 = 0x7FED7FED;
        var seed2 = 0xEEEEEEEE;
        hash_str = hash_str.toUpperCase();
        var char_c;
        for (var i = 0; i < hash_str.length; ++i) {
            char_c = hash_str.charCodeAt(i);
            var idx = (hash_type << 8) + char_c;
            seed1 = g_crypt_table[idx] ^ (seed1 + seed2);
            seed1 = seed1 & 0xffffffff;
            seed2 = char_c + seed1 + seed2 + (seed2 << 5) + 3;
            seed2 = seed2 & 0xffffffff;
        }
        if (seed1 < 0) {
            seed1 = seed1 + 0xffffffff + 0x1;
        }
        return seed1;
    }
    function get_file_key(file_name) {
        return my_hash(file_name, HASH_OFFSET);
    }
    core.get_file_key = get_file_key;
})(core || (core = {}));
//# sourceMappingURL=myhash.js.map