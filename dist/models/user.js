"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.ShoppingStoreUser = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var database_1 = __importDefault(require("../database"));
var bcrypt_1 = __importDefault(require("bcrypt"));
//getting salt and pepper
dotenv_1["default"].config();
var _a = process.env, BCRYPT_PASSWORD = _a.BCRYPT_PASSWORD, SALT_ROUNDS = _a.SALT_ROUNDS;
var ShoppingStoreUser = /** @class */ (function () {
    function ShoppingStoreUser() {
    }
    //index functions
    ShoppingStoreUser.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()]; //connecting to database
                    case 1:
                        conn = _a.sent() //connecting to database
                        ;
                        sql = "SELECT * FROM users;" //sql query
                        ;
                        return [4 /*yield*/, conn.query(sql)]; //passing query
                    case 2:
                        result = _a.sent() //passing query
                        ;
                        conn.release(); //closing connection
                        return [2 /*return*/, result.rows]; //returning the result
                    case 3:
                        error_1 = _a.sent();
                        throw new Error("Cannot get users ".concat(error_1)); //error handling for no users found
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //get user function
    ShoppingStoreUser.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()]; //connecting to database
                    case 1:
                        conn = _a.sent() //connecting to database
                        ;
                        sql = 'SELECT * FROM users WHERE id=($1);' //sql query
                        ;
                        return [4 /*yield*/, conn.query(sql, [id])]; //passing query
                    case 2:
                        result = _a.sent() //passing query
                        ;
                        conn.release(); //closing connection
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Could not get user with passed id. ".concat(err_1)); //error handling for no user with specified id found
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ShoppingStoreUser.prototype.create = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var hashedPassword, conn, sql, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hashedPassword = bcrypt_1["default"].hashSync(user.password_digest + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS, 10));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 2:
                        conn = _a.sent();
                        sql = "INSERT INTO users(firstName,lastName,password_digest) VALUES ($1, $2, $3) RETURNING *";
                        return [4 /*yield*/, conn.query(sql, [
                                user.firstName,
                                user.lastName,
                                hashedPassword
                            ])];
                    case 3:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 4:
                        error_2 = _a.sent();
                        throw new Error("Could not create new user ".concat(user.id, ". ").concat(error_2));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ShoppingStoreUser.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "DELETE FROM users WHERE id=($1)";
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2: return [4 /*yield*/, (_a.sent()).rows];
                    case 3:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result[0]];
                    case 4:
                        err_2 = _a.sent();
                        throw new Error("couldnt delete user with id".concat(id, ". ").concat(err_2));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    //password authintication function
    ShoppingStoreUser.prototype.authenticateUser = function (fname, lname, password) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT password_digest FROM users WHERE firstName=($1) AND lastName =($2);';
                        return [4 /*yield*/, conn.query(sql, [fname, lname])
                            //console.log(password+pepper)
                        ];
                    case 2:
                        result = _a.sent();
                        //console.log(password+pepper)
                        if (result.rows.length) {
                            user = result.rows[0];
                            //console.log(user)
                            if (bcrypt_1["default"].compareSync(password + BCRYPT_PASSWORD, user.password_digest)) {
                                return [2 /*return*/, user];
                            }
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    return ShoppingStoreUser;
}());
exports.ShoppingStoreUser = ShoppingStoreUser;
