const launches = new Map();


let latestFlightNumber = 100;

type Launch = {
  flightNumber?: number ,
  mission: string,
  rocket: string,
  launchDate: Date,
  target: string,
  custumer?: Array<string>,
  upcoming?: boolean,
  success?: boolean,
}

const launch:Launch = {
  flightNumber : 100 ,
  mission: 'Kepler Exploration X',
  rocket: 'Explor IS1',
  launchDate: new Date('December 27 2030'),
  target: 'Kepler-442 b',
  custumer: ['Aref', 'NASA'],
  upcoming: true,
  success: true

}

launches.set(launch.flightNumber , launch);

function existsLaunchWithID(id:number){
  return launches.has(id);
}

function addNewLaunch(launch:Launch){

  latestFlightNumber++;
  
  launches.set(latestFlightNumber , Object.assign(launch,{
     success: true,
     upcoming: true,
     customers: ['Aref', 'NASA'],
     flightNumber: latestFlightNumber
  }));
}

function abortLaunch(id:number){
  const aborted:Launch = launches.get(id);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

export{
  Launch,
  launches,
  addNewLaunch,
   abortLaunch,
  existsLaunchWithID,
 
}