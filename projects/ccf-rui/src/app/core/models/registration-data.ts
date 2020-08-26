import { XYZTriplet } from '../store/stage/stage.state';

export interface RegistrationData {
    firstName: string;
    lastName: string;
    referenceOrgan: string;
    tissueBlockSize: XYZTriplet;
    tissueBlockPosition: XYZTriplet;
    tissueBlockRotation: XYZTriplet;
    extractionSites: string;
    anatomicalStructureTags: string;
    timestamp: string;
    alignmentID: string;
  }
