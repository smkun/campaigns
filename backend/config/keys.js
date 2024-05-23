require("dotenv").config();

module.exports = {
    mongoURI: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@student-cluster.xghgabq.mongodb.net/campaigns?retryWrites=true&w=majority&appName=student-cluster`,
};
