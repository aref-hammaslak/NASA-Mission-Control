const API_URL = 'http://localhost:8000';

async function httpGetPlanets() {
  // TODO: Once API is ready.
  // Load planets and return as JSON.
  const planets = await fetch(`${API_URL}/planets`);
  return planets.json();
}

// TODO: Once API is ready.
async function httpGetLaunches() {

  const response = await fetch(`${API_URL}/launches`)
  const fetchedLaunches = await response.json();
  console.log(fetchedLaunches);
  return fetchedLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  })
}

// TODO: Once API is ready.
async function httpSubmitLaunch(launch) {
  // Submit given launch data to launch system.
  try {
    return await fetch(`${API_URL}/launches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(launch),
    })
  } catch (error) {
    console.error(error);
    return {
      ok: false
    }
  }

}

// TODO: Once API is ready.
async function httpAbortLaunch(id) {
  // Delete launch with given ID.
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method: "delete",
    })
  } catch (error) {
    return {
      ok: false
    }
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};