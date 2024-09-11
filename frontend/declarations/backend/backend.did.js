export const idlFactory = ({ IDL }) => {
  const Astronaut = IDL.Record({
    'age' : IDL.Nat,
    'background' : IDL.Text,
    'name' : IDL.Text,
    'specialty' : IDL.Text,
  });
  const Mission = IDL.Record({ 'name' : IDL.Text, 'description' : IDL.Text });
  return IDL.Service({
    'generateAstronaut' : IDL.Func([], [], []),
    'getAstronautProfile' : IDL.Func([], [IDL.Opt(Astronaut)], ['query']),
    'getMissionLog' : IDL.Func([], [IDL.Vec(Mission)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
