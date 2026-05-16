"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const match_1 = __importDefault(require("./routes/match"));
const createRelationship_1 = __importDefault(require("./routes/createRelationship"));
const extractSignals_1 = __importDefault(require("./routes/extractSignals"));
const updateLifecycle_1 = __importDefault(require("./routes/updateLifecycle"));
const ecosystemStats_1 = __importDefault(require("./routes/ecosystemStats"));
const getRelationship_1 = __importDefault(require("./routes/getRelationship"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(express_1.default.json());
app.use('/api/match', match_1.default);
app.use('/api/create-relationship', createRelationship_1.default);
app.use('/api/extract-signals', extractSignals_1.default);
app.use('/api/update-lifecycle', updateLifecycle_1.default);
app.use('/api/ecosystem-stats', ecosystemStats_1.default);
app.use('/api/relationships', getRelationship_1.default);
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
app.listen(PORT, () => {
    console.log(`ERIS Backend running on http://localhost:${PORT}`);
});
