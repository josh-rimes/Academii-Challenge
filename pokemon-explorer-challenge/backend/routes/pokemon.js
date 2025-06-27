import express from "express";
import fetch from "node-fetch";

const router = express.Router();

/**
 * GET /api/pokemon/:name
 *
 * Fetches Pokemon data from the PokeAPI and returns a simplified response
 * containing only the name, sprite, and types.
 *
 * TODO: Implement this route handler to:
 * 1. Fetch Pokemon data from https://pokeapi.co/api/v2/pokemon/{name}
 * 2. Extract only the name, sprite (front_default), and types
 * 3. Return a simplified JSON response
 * 4. Handle errors appropriately (404 for Pokemon not found, 500 for server errors)
 */
router.get("/:name", async (req, res) => {
    const { name } = req.params;
    const APIURL = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`; // .toLowerCase() converts any uppercase characters to lowercase

    try 
    {
        const response = await fetch(APIURL); // Attempts to access the PokeAPI

        
        // If response status is an error then send an error message
        if (!response.ok)
        {
            if (response.status == 404) // Checks for 404 not found error
            {
                return res.status(404).json({ error: `Pokemon "${name}" not found.` });
            }
            else
            {
              return res.status(500).json({ error: 'Failed to fetch Pokemon data.' });
            }
        }

        const data = await response.json(); // response.json holds all the data for the searched Pokemon
        const filteredData = {
            name: data.name,
            sprite: data.sprites.front_default,
            types: data.types.map((t) => t.type.name), // Forms a list of Pokemon types
        };

        res.json(filteredData); // The response data is now filtered using the filteredData json format
    }
    catch (err)
    {
        console.error('Server error:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

export default router;
