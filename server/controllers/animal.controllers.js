import { nanoid } from "nanoid";
import zooPool from "../db/connection.js";

let allowedAnimalStatus = ["excellent", "good", "fair", "poor", "critical"];

export const addAnimal = async (req, res) => {
  const {
    animalName,
    species,
    healthStatus,
    age,
    weight,
    enclosure,
    lastCheckup,
    diet,
    notes,
    category,
  } = req.body;

  if (
    (!animalName ||
      typeof animalName !== "string" ||
      !species ||
      typeof species !== "string" ||
      !healthStatus ||
      typeof healthStatus !== "string" ||
      age === undefined ||
      typeof age !== "number" ||
      weight === undefined ||
      typeof weight !== "number" ||
      !enclosure ||
      typeof enclosure !== "string" ||
      !diet ||
      typeof diet !== "string" ||
      !category ||
      !notes ||
      typeof notes !== "string",
    typeof category !== "string")
  ) {
    return res
      .status(400)
      .json({ error: "Invalid or missing fields in request body." });
  }
  try {
    let animalId = nanoid();
    await zooPool.query(
      "INSERT INTO ANIMALS (animal_id,animal_name,species,health_status,age,weight,enclosure,last_checkup,diet,notes,category) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
      [
        animalId,
        animalName,
        species,
        healthStatus,
        age,
        weight,
        enclosure,
        lastCheckup,
        diet,
        notes,
        category,
      ]
    );
    return res.status(201).json({ message: "new animal added" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "some server error" });
  }
};
export const getAnimals = async (_, res) => {
  try {
    let animalDetails = await zooPool.query("SELECT * FROM ANIMALS");
    return res.status(200).json({ details: animalDetails.rows });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "some server error." });
  }
};
export const editAnimal = async (req, res) => {
  const { animalId } = req.params;
  const allowedFields = [
    "animalName",
    "species",
    "healthStatus",
    "age",
    "weight",
    "enclosure",
    "lastCheckup",
    "diet",
    "notes",
    "category",
  ];
  const fieldToDbColumn = {
    animalName: "animal_name",
    species: "species",
    healthStatus: "health_status",
    age: "age",
    weight: "weight",
    enclosure: "enclosure",
    lastCheckup: "last_checkup",
    diet: "diet",
    notes: "notes",
    category: "category",
  };

  const updates = [];
  const values = [];
  let idx = 1;

  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      updates.push(`${fieldToDbColumn[field]} = $${idx}`);
      values.push(req.body[field]);
      idx++;
    }
  }

  if (updates.length === 0) {
    return res
      .status(400)
      .json({ error: "No valid fields provided for update." });
  }

  values.push(animalId);

  try {
    const result = await zooPool.query(
      `UPDATE ANIMALS SET ${updates.join(", ")} WHERE animal_id = $${idx}`,
      values
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Animal not found." });
    }
    return res.status(200).json({ message: "Animal details updated." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Some server error." });
  }
};
export const getCriticalHealthAnimals = async (req, res) => {
  const { animalStatus } = req.query;
  if (allowedAnimalStatus.indexOf(animalStatus.toLowerCase()) == -1)
    return res.status(200).json({ message: "this status does not exists." });
  try {
    const result = await zooPool.query(
      "SELECT animal_name,health_status,enclosure,species FROM animals WHERE health_status = $1",
      [animalStatus.toLowerCase()]
    );
    return res.status(200).json({ details: result.rows });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "some server error." });
  }
};
