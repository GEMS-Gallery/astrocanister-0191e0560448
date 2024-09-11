import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Astronaut {
  'age' : bigint,
  'background' : string,
  'name' : string,
  'specialty' : string,
}
export interface Mission { 'name' : string, 'description' : string }
export interface _SERVICE {
  'generateAstronaut' : ActorMethod<[], undefined>,
  'getAstronautProfile' : ActorMethod<[], [] | [Astronaut]>,
  'getMissionLog' : ActorMethod<[], Array<Mission>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
