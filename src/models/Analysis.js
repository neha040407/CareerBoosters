import mongoose from 'mongoose';

const AnalysisSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fileName: String,
    results: {
        readiness: Number,
        matchScore: Number,
        skills: [String],
        gaps: [String],
        recommendations: [String],
        roles: [{
            title: String,
            match: Number
        }],
        marketValue: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.models.Analysis || mongoose.model('Analysis', AnalysisSchema);
