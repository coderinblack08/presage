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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
dotenv_1.config();
const apollo_server_express_1 = require("apollo-server-express");
const connect_redis_1 = __importDefault(require("connect-redis"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const ioredis_1 = __importDefault(require("ioredis"));
const passport_1 = __importDefault(require("passport"));
const path_1 = require("path");
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const constants_1 = require("./constants");
const google_1 = require("./modules/auth/google");
const hello_1 = require("./modules/hello");
const auth_1 = require("./modules/auth");
const graphql_query_complexity_1 = require("graphql-query-complexity");
const User_1 = require("./entities/User");
const soundbites_1 = require("./modules/soundbites");
const graphql_upload_1 = require("graphql-upload");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield typeorm_1.createConnection({
        type: "postgres",
        database: "presage",
        entities: [path_1.join(__dirname, "./entities/*")],
        migrations: [path_1.join(__dirname, "./migrations/*")],
        logging: !constants_1.__prod__,
        synchronize: !constants_1.__prod__,
    });
    yield conn.runMigrations();
    const app = express_1.default();
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redis = new ioredis_1.default();
    app.use(cors_1.default({
        origin: "http://localhost:3000",
        credentials: true,
    }));
    app.use("/uploads", express_1.default.static(path_1.join(__dirname, "../uploads")));
    const schema = yield type_graphql_1.buildSchema({
        resolvers: [hello_1.HelloResolver, auth_1.UserResolver, soundbites_1.SoundbiteResolver],
        validate: false,
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema,
        uploads: false,
        context: ({ req, res }) => __awaiter(void 0, void 0, void 0, function* () { return ({ req, res, redis }); }),
        plugins: [
            {
                requestDidStart: () => ({
                    didResolveOperation({ request, document }) {
                        const complexity = graphql_query_complexity_1.getComplexity({
                            schema,
                            operationName: request.operationName,
                            query: document,
                            variables: request.variables,
                            estimators: [
                                graphql_query_complexity_1.fieldExtensionsEstimator(),
                                graphql_query_complexity_1.simpleEstimator({ defaultComplexity: 0 }),
                            ],
                        });
                        if (complexity > 50) {
                            throw new apollo_server_express_1.ApolloError("Query complexity was bigger than 50!");
                        }
                    },
                }),
            },
        ],
    });
    app.use(express_session_1.default({
        name: "qid",
        store: new RedisStore({
            client: redis,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: "lax",
            secure: constants_1.__prod__,
        },
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET,
        resave: false,
    }));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    app.use(graphql_upload_1.graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
    passport_1.default.serializeUser((user, done) => done(null, user.id));
    passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield User_1.User.findOne(id);
        done(null, user);
    }));
    app.use("/api/auth", google_1.authRouter);
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(constants_1.PORT, () => console.log(`🚀 Listening on port ${constants_1.PORT}`));
});
main().catch((e) => console.error(e));
//# sourceMappingURL=index.js.map