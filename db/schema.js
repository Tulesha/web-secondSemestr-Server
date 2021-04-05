module.exports = function (mongoose) {
    const Schema = mongoose.Schema;
    const favoriteCitySchema = new Schema({cityName: {type: "string", unique: true}}, {versionKey: false});

    return mongoose.model("cities", favoriteCitySchema);
}