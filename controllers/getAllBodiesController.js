const knex = require("knex")(require("../knexfile"));

/**
 * Function to return all stellar data at once.
 * @param {Request} _req
 * @param {Response} res
 */
const getAllBodies = async (_req, res) => {
  let sortPlanetColumn = _req.query.sortPlanetColumn || "perihelion";

  let starData = await knex("star")
    .select("star_id", "englishName", "meanRadius")
    .then((starData) => {
      return starData;
    })
    .catch((err) => {
      console.error("getAllBodies", err);
      res.json({
        message: "Something went wrong getting STAR data",
        error: err,
      });
    });

  let planetsData = await knex("planets")
    .select(
      "planet_id",
      "englishName",
      "meanRadius",
      "bodyType",
      "planetType",
      "star_id"
    )
    .orderBy(sortPlanetColumn)
    .then((planetsData) => {
      return planetsData;
    })
    .catch((err) => {
      console.error("getAllBodies", err);
      res.json({
        message: "Something went wrong getting PLANET data",
        error: err,
      });
    });

  let moonData = await knex("moons")
    .select("moon_id", "englishName", "meanRadius", "planet_id")
    .then((moonData) => {
      return moonData;
    })
    .catch((err) => {
      console.error("getAllBodies", err);
      res.json({
        message: "Something went wrong getting MOON data",
        error: err,
      });
    });

  let returnData = {
    star: starData,
    planets: planetsData,
    moons: moonData,
  };

  res.status(200).json(returnData);
};

module.exports = { getAllBodies };
