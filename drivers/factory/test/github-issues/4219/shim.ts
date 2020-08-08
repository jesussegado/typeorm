let _Shim: any;
try {
    // We're in /test
    _Shim = require("../../../../../../core/extra/typeorm-class-transformer-shim");
} catch (e) {
    // We're in /build/compiled/test
    _Shim = require("../../../../../../../core/extra/typeorm-class-transformer-shim");
}

export const Shim = _Shim;
