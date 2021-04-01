"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core = __importStar(require("@actions/core"));
var fs_1 = require("fs");
var getInputFilePath = function (name, def) {
    var path = core.getInput('target', { required: def == undefined });
    if (!path)
        return def;
    return path;
};
var targetFilePath = getInputFilePath('target', undefined); //core.getInput('target', { required: true });
var saveToPath = getInputFilePath('save_to', targetFilePath);
var action = core.getInput('action', { required: true, });
var actionArgs = core.getInput('argument', { required: false });
var targetFile;
try {
    targetFile = require(targetFilePath);
    core.info("Package file opened");
}
catch (e) {
    core.setFailed("Can't open package file: " + targetFilePath);
}
var saveModifiedPackage = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, fs_1.promises.writeFile(saveToPath, JSON.stringify(data, null, 4))];
    });
}); };
var ACTION_MAP = {
    update_version: function (arg) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            targetFile.version = String(arg);
            saveModifiedPackage(targetFile);
            return [2 /*return*/, arg];
        });
    }); },
    update_dep: function (arg) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, depName, version;
        return __generator(this, function (_b) {
            _a = __read(arg.split(" "), 2), depName = _a[0], version = _a[1];
            targetFile.dependencies[depName] = version;
            saveModifiedPackage(targetFile);
            return [2 /*return*/, version];
        });
    }); },
    update_devdep: function (arg) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, depName, version;
        return __generator(this, function (_b) {
            _a = __read(arg.split(" "), 2), depName = _a[0], version = _a[1];
            targetFile.devDependencies[depName] = version;
            saveModifiedPackage(targetFile);
            return [2 /*return*/, version];
        });
    }); },
};
if (ACTION_MAP[action] == null) {
    core.setFailed("Unknown action: " + action);
}
try {
    var res = ACTION_MAP[action](actionArgs);
    core.setOutput("result", res);
}
catch (err) {
    core.setFailed("Action failed with error " + err);
}
//# sourceMappingURL=index.js.map