import Header from './components/Header'
import Profiles from './components/Profiles'
import Plants from './components/Plants'
import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import { DateTime } from 'luxon';

function App() {
  const [plants, setPlants] = useState(() => {
    var storedPlants = localStorage.getItem('plants');
    var parsed = JSON.parse(storedPlants);
    return parsed || [];
  });
  const [profiles, setProfiles] = useState(() => {
    var storedProfiles = localStorage.getItem('profiles');
    var parsed = JSON.parse(storedProfiles);    
    return parsed || [];
  });

  useEffect(() => {
    localStorage.setItem('plants', JSON.stringify(plants));
    localStorage.setItem('profiles', JSON.stringify(profiles));    
  })

  

  const addPlant = (plant) => {
    var id = 0;
    if (plants.length > 0) {
      var ids = plants.map(plant => plant.id);
      id = Math.max(...ids) + 1;
    }
    setPlants(prevState => [...prevState, { ...plant, id: id }]);
    
  }

  const deletePlant = (id) => {
    setProfiles(profiles.map((profile) => ({ ...profile, plants: profile.plants.filter(plant => plant.plantId !== id) })));
    setPlants(plants.filter((plant) => plant.id !== id));
  }

  const addProfile = (profile) => {
    var nextId = 0;
    if (profiles.length > 0) {
      var ids = profiles.map(profile => profile.id);
      nextId = Math.max(...ids) + 1;
    }
    setProfiles(prevState => [...prevState, { ...profile, id: nextId }]);
  }

  const deleteProfile = (id) => {
    setProfiles(prevState => prevState.filter(profile => profile.id !== id));
  }

  const addProfilePlant = (profileId, plantId) => {
    var profile = profiles.filter(profile => profile.id === profileId)[0];
    var nextId = profile.plants.length === 0 ? 0 : Math.max(...profile.plants.map(plant => plant.id)) + 1;
    var baseDurationArr = plants.filter(plant => plant.id === plantId)[0].stageTimes[0];
    var date = DateTime.now().plus({ hours: baseDurationArr[0], minutes: baseDurationArr[1], seconds: baseDurationArr[2] })
    var newPlant = { id: nextId, plantId: plantId, currentStage: 0, finishDate: date.toJSDate() }
    var newPlantCollection = [...profile.plants, newPlant];
    setProfiles(profiles.map(profile => profile.id === profileId ? { ...profile, plants: newPlantCollection } : profile));
  }

  const continuePlantGrow = (profileId, plantId, skip) => {
    var profile = profiles.filter(profile => profile.id === profileId)[0];
    var profilePlants = [...profile.plants];
    profilePlants.forEach(plant => {
      if (plant.id === plantId) {
        if ((!skip && plant.finishDate > Date.now()) || plant.currentStage === 3) {
          return;
        }
        plant.currentStage++;
        if (plant.currentStage === 3) {
          plant.finishDate = Date.now();
        } else {
          var stageTime = plants.filter(plantModel => plantModel.id === plant.plantId)[0].stageTimes[plant.currentStage];
          plant.finishDate = DateTime.now().plus({ hours: stageTime[0], minutes: stageTime[1], seconds: stageTime[2] }).toJSDate();
        }
      }
    })
    setProfiles(profiles.map(profile => profileId === profile.id ? { ...profile, plants: profilePlants } : profile));
  }

  const restartPlant = (profileId, plantId) => {
    var profile = profiles.filter(profile => profile.id === profileId)[0];
    var profilePlants = [...profile.plants];
    profilePlants.forEach(plant => {
      if(plant.id === plantId) {
        plant.currentStage = 0;
        var stageTime = plants.filter(plantModel => plantModel.id === plant.plantId)[0].stageTimes[plant.currentStage];
        plant.finishDate = DateTime.now().plus({ hours: stageTime[0], minutes: stageTime[1], seconds: stageTime[2] }).toJSDate();
      }      
    })
    setProfiles(profiles.map(profile => profileId === profile.id ? { ...profile, plants: profilePlants } : profile));
  }

  const deleteProfilePlant = (profileId, plantId) => {
    setProfiles(profiles.map((profile) => profile.id === profileId ? { ...profile, plants: profile.plants.filter(plant => plant.id !== plantId) } : profile));
  }

  var events = {
    onAddProfile: addProfile,
    onDeleteProfile: deleteProfile,
    onAddProfilePlant: addProfilePlant,
    onDeletePlant: deleteProfilePlant,
    onPlantContinue: continuePlantGrow,
    onRestartPlant: restartPlant
  }

  return (
    <div className='appContainer'>
      <Container>
        <Row><Header /></Row>
        <Row>
          <Col md>
            <Profiles
              profiles={profiles}
              plants={plants}
              events={events} />
          </Col>
          <Col md><Plants plants={plants} onDelete={deletePlant} onSubmit={addPlant} /></Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
