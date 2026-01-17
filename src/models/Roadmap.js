import mongoose from 'mongoose';

const RoadmapSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    targetRole: {
        type: String,
        required: true
    },
    currentExperience: String,
    targetExperience: String,
    steps: [{
        title: String,
        description: String,
        duration: String, // e.g., "Month 1-2"
        status: {
            type: String,
            enum: ['pending', 'active', 'completed'],
            default: 'pending'
        },
        type: {
            type: String,
            enum: ['Qualification', 'Skill', 'Experience', 'Market'],
            default: 'Skill'
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.models.Roadmap || mongoose.model('Roadmap', RoadmapSchema);
