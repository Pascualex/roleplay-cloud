import { firestore } from 'firebase/app';
export import Timestamp = firestore.Timestamp;

export interface LogEntry {
    message: string,
    timestamp: firestore.Timestamp
};