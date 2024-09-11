import Hash "mo:base/Hash";
import Nat8 "mo:base/Nat8";

import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Random "mo:base/Random";
import Blob "mo:base/Blob";
import Option "mo:base/Option";

actor {
  type Astronaut = {
    name: Text;
    age: Nat;
    specialty: Text;
    background: Text;
  };

  type Mission = {
    name: Text;
    description: Text;
  };

  stable var currentAstronaut: ?Astronaut = null;
  stable var missionLog: [Mission] = [];
  stable var seed : Nat = 123456789;

  private func nextRandom() : Nat {
    let newSeed = Option.get(Random.Finite(Blob.fromArray([Nat8.fromNat(seed % 256)])).range(32), 0);
    seed := newSeed;
    newSeed
  };

  private func generateRandomName(): Text {
    let firstNames = ["Neil", "Buzz", "Yuri", "Sally", "Mae", "Chris", "Peggy", "Valentina"];
    let lastNames = ["Armstrong", "Aldrin", "Gagarin", "Ride", "Jemison", "Hadfield", "Whitson", "Tereshkova"];
    let randomFirst = firstNames[nextRandom() % firstNames.size()];
    let randomLast = lastNames[nextRandom() % lastNames.size()];
    randomFirst # " " # randomLast
  };

  private func generateRandomAge(): Nat {
    (nextRandom() % 20) + 25
  };

  private func generateRandomSpecialty(): Text {
    let specialties = ["Pilot", "Engineer", "Scientist", "Medical Officer", "Commander"];
    specialties[nextRandom() % specialties.size()]
  };

  private func generateRandomBackground(): Text {
    let backgrounds = ["Air Force", "Navy", "NASA", "ESA", "Roscosmos", "CNSA", "ISRO"];
    backgrounds[nextRandom() % backgrounds.size()]
  };

  private func generateRandomMission(): Mission {
    let missionNames = ["Lunar Explorer", "Mars Pathfinder", "Asteroid Miner", "Deep Space Observer", "Orbital Station Alpha"];
    let missionDescriptions = ["Explore the lunar surface", "Establish first Mars colony", "Extract resources from nearby asteroids", "Study distant galaxies", "Maintain and expand orbital research station"];
    {
      name = missionNames[nextRandom() % missionNames.size()];
      description = missionDescriptions[nextRandom() % missionDescriptions.size()]
    }
  };

  public func generateAstronaut(): async () {
    currentAstronaut := ?{
      name = generateRandomName();
      age = generateRandomAge();
      specialty = generateRandomSpecialty();
      background = generateRandomBackground();
    };
    missionLog := Array.tabulate(3, func(_: Nat): Mission { generateRandomMission() });
  };

  public query func getAstronautProfile(): async ?Astronaut {
    currentAstronaut
  };

  public query func getMissionLog(): async [Mission] {
    missionLog
  };

  // Initialize the astronaut and mission log
  system func preupgrade() {
    if (currentAstronaut == null) {
      currentAstronaut := ?{
        name = generateRandomName();
        age = generateRandomAge();
        specialty = generateRandomSpecialty();
        background = generateRandomBackground();
      };
      missionLog := Array.tabulate(3, func(_: Nat): Mission { generateRandomMission() });
    };
  };
}
